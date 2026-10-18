# Cuts the 10-second tech reel: slow open, accelerating cuts, an impact, then a held resolve shot.
# Each shot gets a slow zoom push; the light layer (tech/overlay.html, rendered to clips/tech-overlay.mp4)
# is screen-blended on top, and a few cuts get an RGB-split glitch. Ungraded.
# Run from video/: uv run --with imageio-ffmpeg python edit_tech.py [--cuts] [ending]
#   --cuts   print the cut times as JSON (for the overlay render) and exit
#   ending   which shot holds at the end: satellite (default) or city
import json
import subprocess
import sys

import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
FPS = 24
TOTAL_FRAMES = 240

# (shot, in-point seconds, frames, speed). Frames shrink through the middle section: 29 -> 6.
SHOTS = [
    ('tx-01-circuit', 0.4, 29, 1.0),
    ('tx-03-fiber', 0.6, 24, 1.0),
    ('tx-02-servers', 0.8, 19, 1.0),
    ('tx-04-typing', 0.6, 15, 1.0),
    ('tx-05-code-eyes', 1.0, 13, 1.0),
    ('tx-06-robot-arm', 0.6, 12, 2.0),
    ('tx-14-laser', 1.0, 10, 1.0),
    ('tx-07-chip', 1.6, 9, 1.0),
    ('tx-09-phone-ui', 1.0, 9, 1.0),
    ('tx-18-switch', 1.0, 8, 1.0),
    ('tx-12-drone', 0.8, 8, 1.5),
    ('tx-10-led-wall', 1.2, 7, 1.0),
    ('tx-13-vr', 1.0, 6, 1.0),
    ('tx-17-lightspeed', 1.6, 7, 1.5),
]
ENDINGS = {'satellite': ('tx-15-satellite', 0.6), 'city': ('tx-11-city-data', 0.4)}
GLITCH_CUTS = [5, 9, 12]  # shot indexes that open with three frames of RGB split


def timeline(ending):
    hold_frames = TOTAL_FRAMES - sum(frames for _, _, frames, _ in SHOTS)
    shot, start = ENDINGS[ending]
    return SHOTS + [(shot, start, hold_frames, 1.0)]


def cut_times(shots):
    times, frame = [], 0
    for _, _, frames, _ in shots[:-1]:
        frame += frames
        times.append(round(frame / FPS, 3))
    return times


def build(ending):
    shots = timeline(ending)
    inputs, chains = [], []
    for index, (shot, start, frames, speed) in enumerate(shots):
        seconds = frames / FPS
        inputs += ['-ss', f'{start:.3f}', '-t', f'{seconds * speed + 0.3:.3f}', '-i', f'clips/{shot}.mp4']
        # Slow push in: scale up a little over the shot, then crop back to 1920x1080.
        push = 0.06 if frames > 12 else 0.1
        chain = (
            f'[{index}:v]setpts=PTS/{speed},fps={FPS},trim=end_frame={frames},setpts=PTS-STARTPTS,'
            f"scale=w='1920*(1+{push}*t/{seconds:.3f})':h='1080*(1+{push}*t/{seconds:.3f})':eval=frame,"
            f'crop=1920:1080,setsar=1'
        )
        if index in GLITCH_CUTS:
            chain += f",rgbashift=rh=-14:bh=14:enable='lt(t,{3 / FPS:.3f})'"
        chains.append(chain + f',format=yuv420p[v{index}]')
    chains.append(''.join(f'[v{i}]' for i in range(len(shots))) + f'concat=n={len(shots)}:v=1:a=0,format=gbrp[cut]')
    inputs += ['-i', 'clips/tech-overlay.mp4']
    overlay = len(shots)
    # Screen blending only works in RGB; in YUV it tints the whole frame.
    chains.append(f'[{overlay}:v]fps={FPS},format=gbrp[light]')
    chains.append('[cut][light]blend=all_mode=screen,format=yuv420p,'
                  'fade=t=in:st=0:d=0.25,fade=t=out:st=9.75:d=0.25[out]')
    out = f'out/tech/corrino-tech-10s-{ending}.mp4'
    subprocess.run([FFMPEG, '-y', '-loglevel', 'error', *inputs, '-filter_complex', ';'.join(chains), '-map', '[out]', '-an',
                    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], check=True)
    print(f'{out}: {len(shots)} shots, {TOTAL_FRAMES / FPS:.1f}s')


if __name__ == '__main__':
    import os

    args = sys.argv[1:]
    if '--cuts' in args:
        print(json.dumps(cut_times(timeline('satellite'))))
        sys.exit()
    os.makedirs('out/tech', exist_ok=True)
    for ending in args or ENDINGS:
        build(ending)
