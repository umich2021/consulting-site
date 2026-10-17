# Cuts the generated b-roll and motion graphics into two ad-style hero loops (MP4 + WebM).
# Run from video/: uv run --with imageio-ffmpeg python edit_ad.py [cinematic|hybrid]
import subprocess
import sys

import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
WIDTH, HEIGHT, FPS = 1600, 900, 24
SRC_W, SRC_H = 1920, 1080


def keep(fraction):
    """Centered 16:9 crop keeping this fraction of the frame (trims film borders and soft edges)."""
    w = round(SRC_W * fraction / 2) * 2
    h = round(SRC_H * fraction / 2) * 2
    return f'crop={w}:{h}:{(SRC_W - w) // 2}:{(SRC_H - h) // 2}'


# How much of each generated clip is clean picture.
CROPS = {
    'ad-01-brass': keep(0.90), 'ad-02-eye': 'crop=1422:800:249:140', 'ad-03-archival': keep(0.80),
    'ad-04-ladies': keep(0.96), 'ad-05-streetcar': keep(0.82), 'ad-06-latte': keep(0.94),
    'ad-07-pixels': keep(0.86), 'ad-08-moss': keep(0.78), 'ad-09-bell': keep(0.80),
    'ad-11-gate': keep(0.90), 'ad-12-thumb': keep(0.90), 'ad-13-ink': keep(0.88),
    'ad-14-shelves': keep(0.96), '01-street': keep(0.97), '02-phone': keep(0.97),
    '03-aerial': 'crop=1422:800:249:140', '04-counter': 'crop=1536:864:192:108',
    '05-light': keep(0.97), '06-night': keep(0.94),
}

# (source, in-point seconds, length seconds). Sources without a crop are motion graphics or renders.
EDITS = {
    'cinematic': [
        ('ad-01-brass', 1.2, 1.4), ('ad-13-ink', 1.0, 0.9), ('ad-02-eye', 1.4, 1.0),
        ('ad-03-archival', 1.0, 1.2), ('ad-04-ladies', 1.0, 1.3), ('ad-05-streetcar', 1.2, 1.0),
        ('ad-11-gate', 1.0, 1.2), ('ad-09-bell', 1.4, 0.8), ('ad-06-latte', 1.2, 1.1),
        ('ad-14-shelves', 1.2, 1.0), ('04-counter', 3.2, 1.3), ('ad-07-pixels', 1.0, 0.8),
        ('02-phone', 2.6, 1.1), ('ad-12-thumb', 1.4, 1.2), ('ad-08-moss', 1.0, 1.4),
        ('01-street', 2.0, 1.1), ('05-light', 2.0, 0.9), ('06-night', 2.0, 1.6),
    ],
    'hybrid': [
        ('mg-rings', 0.3, 1.5), ('ad-01-brass', 1.4, 0.9), ('ad-02-eye', 1.6, 0.9),
        ('mg-map', 0.4, 1.6), ('ad-04-ladies', 1.2, 1.0), ('ad-05-streetcar', 1.4, 0.8),
        ('mg-nodes', 0.3, 1.6), ('ad-09-bell', 1.5, 0.7), ('ad-06-latte', 1.4, 0.9),
        ('mg-phone', 0.3, 1.8), ('04-counter', 3.4, 1.0), ('mg-stack', 0.2, 1.6),
        ('ad-12-thumb', 1.6, 1.0), ('mg-mosaic', 0.4, 1.4), ('ad-07-pixels', 1.4, 0.7),
        ('hero-wall', 3.0, 1.6), ('ad-08-moss', 1.2, 1.1), ('06-night', 2.4, 1.4),
    ],
}

# One grade over everything: a touch more contrast, slightly muted color, green shadows and warm highlights.
GRADE = 'eq=contrast=1.05:saturation=0.9,colorbalance=rs=-0.03:gs=0.02:bs=-0.01:rh=0.03:bh=-0.03'


def source_path(name):
    return 'out/hero-wall.mp4' if name == 'hero-wall' else f'clips/{name}.mp4'


def build(edit_name):
    shots = EDITS[edit_name]
    inputs, chains = [], []
    for index, (name, start, length) in enumerate(shots):
        inputs += ['-ss', str(start), '-t', str(length), '-i', source_path(name)]
        crop = CROPS.get(name)
        grade = f',{GRADE}' if crop else ''
        chains.append(
            f'[{index}:v]{crop + "," if crop else ""}scale={WIDTH}:{HEIGHT},fps={FPS},setsar=1{grade},format=yuv420p[v{index}]'
        )
    total = sum(length for _, _, length in shots)
    chains.append(''.join(f'[v{i}]' for i in range(len(shots))) + f'concat=n={len(shots)}:v=1:a=0[cut]')
    # Dip from and to black so the loop point is clean.
    chains.append(f'[cut]fade=t=in:st=0:d=0.4,fade=t=out:st={total - 0.4:.2f}:d=0.4[out]')
    common = [FFMPEG, '-y', '-loglevel', 'error', *inputs, '-filter_complex', ';'.join(chains), '-map', '[out]', '-an']
    out = f'out/hero-ad-{edit_name}'
    subprocess.run([*common, '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-movflags', '+faststart', f'{out}.mp4'], check=True)
    subprocess.run([*common, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '37', '-row-mt', '1', f'{out}.webm'], check=True)
    print(f'{out}.mp4/.webm: {len(shots)} shots, {total:.1f}s')


for name in sys.argv[1:] or EDITS:
    build(name)
