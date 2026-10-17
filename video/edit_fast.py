# Cuts five 15-second fast-paced variations from the realistic "fx" shots, ungraded, 1920x1080.
# Also writes an edit list per variation so the cuts can be rebuilt in an editor.
# Run from video/: uv run --with imageio-ffmpeg python edit_fast.py
import csv
import subprocess

import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
FPS = 24
TOTAL = 15.0

# Each variation is a list of (shot id, in-point seconds, relative length).
# Relative lengths are scaled so every variation lands on exactly 15 seconds (about 0.8 s per shot).
VARIATIONS = {
    '1-rush': [
        ('fx-04-crosswalk', 0.6, 1.0), ('fx-05-courier', 1.2, 0.8), ('fx-28-train', 0.8, 0.9), ('fx-03-espresso', 1.4, 0.7),
        ('fx-21-flythrough', 0.4, 1.0), ('fx-02-tickets', 1.0, 0.6), ('fx-01-wok', 1.6, 0.8), ('fx-22-freeway', 0.5, 0.9),
        ('fx-16-tap', 1.2, 0.7), ('fx-20-neon', 0.6, 0.8), ('fx-25-server', 1.0, 0.8), ('fx-06-swipe', 1.4, 0.6),
        ('fx-23-conveyor', 0.8, 0.7), ('fx-24-pack', 1.6, 0.7), ('fx-15-sneakers', 0.6, 0.6), ('fx-17-bags', 1.2, 0.8),
        ('fx-27-concert', 0.8, 0.9), ('fx-19-cocktail', 1.6, 0.7), ('fx-31-cheers', 1.0, 1.0),
    ],
    '2-service': [
        ('fx-02-tickets', 0.4, 0.8), ('fx-01-wok', 0.8, 0.9), ('fx-18-pizza', 1.0, 1.0), ('fx-25-server', 0.6, 0.9),
        ('fx-03-espresso', 0.8, 0.7), ('fx-32-line', 1.2, 0.9), ('fx-19-cocktail', 0.6, 0.8), ('fx-07-buzz', 1.0, 0.7),
        ('fx-16-tap', 0.6, 0.7), ('fx-17-bags', 0.6, 0.8), ('fx-11-bouquet', 1.0, 0.8), ('fx-24-pack', 0.6, 0.7),
        ('fx-23-conveyor', 1.6, 0.6), ('fx-05-courier', 0.4, 0.8), ('fx-30-checkout', 1.2, 0.8), ('fx-26-door', 0.6, 0.9),
        ('fx-31-cheers', 1.6, 0.9), ('fx-21-flythrough', 1.6, 0.8), ('fx-20-neon', 1.8, 0.9),
    ],
    '3-trades': [
        ('fx-29-grinder', 0.6, 0.9), ('fx-13-wrench', 1.0, 0.8), ('fx-12-carwash', 0.8, 1.0), ('fx-10-clippers', 1.2, 0.8),
        ('fx-14-dogshake', 0.8, 0.9), ('fx-08-ropes', 0.6, 0.8), ('fx-09-bag', 1.0, 0.7), ('fx-11-bouquet', 1.6, 0.8),
        ('fx-15-sneakers', 1.4, 0.7), ('fx-26-door', 1.4, 0.8), ('fx-18-pizza', 2.0, 0.8), ('fx-03-espresso', 2.2, 0.6),
        ('fx-06-swipe', 0.4, 0.7), ('fx-16-tap', 2.0, 0.7), ('fx-17-bags', 2.0, 0.7), ('fx-04-crosswalk', 2.0, 0.9),
        ('fx-28-train', 2.0, 0.8), ('fx-22-freeway', 2.0, 0.9), ('fx-27-concert', 2.0, 1.0),
    ],
    '4-phones': [
        ('fx-06-swipe', 0.8, 0.8), ('fx-07-buzz', 0.4, 0.9), ('fx-30-checkout', 0.4, 0.8), ('fx-27-concert', 1.4, 0.9),
        ('fx-16-tap', 0.2, 0.7), ('fx-04-crosswalk', 1.2, 0.8), ('fx-32-line', 0.4, 0.8), ('fx-03-espresso', 0.2, 0.7),
        ('fx-10-clippers', 0.4, 0.7), ('fx-08-ropes', 1.6, 0.7), ('fx-14-dogshake', 2.0, 0.8), ('fx-12-carwash', 2.0, 0.8),
        ('fx-01-wok', 2.4, 0.7), ('fx-19-cocktail', 2.4, 0.7), ('fx-17-bags', 0.2, 0.7), ('fx-05-courier', 2.2, 0.8),
        ('fx-20-neon', 0.2, 0.8), ('fx-21-flythrough', 2.6, 0.8), ('fx-31-cheers', 2.4, 1.1),
    ],
    '5-buildup': [
        ('fx-21-flythrough', 0.2, 1.4), ('fx-32-line', 2.2, 1.2), ('fx-03-espresso', 2.6, 1.1), ('fx-26-door', 2.4, 1.0),
        ('fx-11-bouquet', 0.4, 0.9), ('fx-13-wrench', 2.4, 0.8), ('fx-09-bag', 2.4, 0.75), ('fx-18-pizza', 0.4, 0.7),
        ('fx-02-tickets', 2.4, 0.6), ('fx-01-wok', 0.2, 0.55), ('fx-08-ropes', 0.2, 0.5), ('fx-10-clippers', 2.4, 0.45),
        ('fx-29-grinder', 2.4, 0.45), ('fx-05-courier', 0.2, 0.45), ('fx-23-conveyor', 0.2, 0.4), ('fx-16-tap', 2.6, 0.4),
        ('fx-28-train', 2.6, 0.4), ('fx-22-freeway', 2.6, 0.5), ('fx-27-concert', 2.6, 1.2),
    ],
}


def build(name, shots):
    scale = TOTAL / sum(length for _, _, length in shots)
    # Round each cut to whole frames, then give the last shot whatever is left so the total is exact.
    frames = [round(length * scale * FPS) for _, _, length in shots]
    frames[-1] += round(TOTAL * FPS) - sum(frames)
    inputs, chains, rows, cursor = [], [], [], 0.0
    for index, ((shot, start, _), count) in enumerate(zip(shots, frames)):
        length = count / FPS
        inputs += ['-ss', f'{start:.3f}', '-t', f'{length + 0.2:.3f}', '-i', f'clips/{shot}.mp4']
        chains.append(f'[{index}:v]fps={FPS},trim=end_frame={count},setpts=PTS-STARTPTS,setsar=1,format=yuv420p[v{index}]')
        rows.append([index + 1, shot, f'{shot}.mp4', f'{start:.3f}', f'{start + length:.3f}', f'{length:.3f}', f'{cursor:.3f}'])
        cursor += length
    chains.append(''.join(f'[v{i}]' for i in range(len(shots))) + f'concat=n={len(shots)}:v=1:a=0[out]')
    subprocess.run([FFMPEG, '-y', '-loglevel', 'error', *inputs, '-filter_complex', ';'.join(chains), '-map', '[out]', '-an',
                    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
                    f'out/edits/corrino-{name}.mp4'], check=True)
    with open(f'out/edits/corrino-{name}-edit-list.csv', 'w', newline='') as handle:
        writer = csv.writer(handle)
        writer.writerow(['cut', 'shot', 'source file', 'source in (s)', 'source out (s)', 'length (s)', 'timeline start (s)'])
        writer.writerows(rows)
    print(f'corrino-{name}.mp4: {len(shots)} shots, {cursor:.2f}s, average {cursor / len(shots):.2f}s per shot')


if __name__ == '__main__':
    import os

    os.makedirs('out/edits', exist_ok=True)
    for variation, shot_list in VARIATIONS.items():
        build(variation, shot_list)
