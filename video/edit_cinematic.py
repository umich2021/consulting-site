# Cuts the generated clips into one looping 1600x900 hero video (MP4 + WebM).
# Run from video/: uv run --with imageio-ffmpeg python edit_cinematic.py
import subprocess

import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
WIDTH, HEIGHT, FPS = 1600, 900, 24
CLIP_START, CLIP_LENGTH = 1.0, 4.0
FADE = 0.8

# (clip id, crop filter). The crops remove letterbox bars and soft edges some clips came back with.
SEQUENCE = [
    ('03-aerial', 'crop=1422:800:249:140'),
    ('01-street', 'crop=1862:1048:29:16'),
    ('02-phone', 'crop=1862:1048:29:16'),
    ('04-counter', 'crop=1536:864:192:108'),
    ('05-light', 'crop=1862:1048:29:16'),
    ('06-night', 'crop=1804:1015:58:32'),
]

inputs, chains = [], []
for index, (clip, crop) in enumerate(SEQUENCE):
    inputs += ['-ss', str(CLIP_START), '-t', str(CLIP_LENGTH), '-i', f'clips/{clip}.mp4']
    chains.append(
        f'[{index}:v]{crop},scale={WIDTH}:{HEIGHT},fps={FPS},setsar=1,'
        f'eq=contrast=1.04:saturation=0.92,format=yuv420p[v{index}]'
    )

# Crossfade each clip into the next.
previous, offset = 'v0', CLIP_LENGTH - FADE
for index in range(1, len(SEQUENCE)):
    label = f'x{index}'
    chains.append(f'[{previous}][v{index}]xfade=transition=fade:duration={FADE}:offset={offset:.2f}[{label}]')
    previous, offset = label, offset + CLIP_LENGTH - FADE

total = len(SEQUENCE) * CLIP_LENGTH - (len(SEQUENCE) - 1) * FADE
# Dip from and to black so the loop point is seamless.
chains.append(f'[{previous}]fade=t=in:st=0:d=0.6,fade=t=out:st={total - 0.6:.2f}:d=0.6[out]')
graph = ';'.join(chains)

common = [FFMPEG, '-y', '-loglevel', 'error', *inputs, '-filter_complex', graph, '-map', '[out]', '-an']
subprocess.run([*common, '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-movflags', '+faststart', 'out/hero-cinematic.mp4'], check=True)
subprocess.run([*common, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '38', '-row-mt', '1', 'out/hero-cinematic.webm'], check=True)
print(f'Wrote out/hero-cinematic.mp4 and .webm, {total:.1f}s')
