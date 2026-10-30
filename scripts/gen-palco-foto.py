#!/usr/bin/env python3
# Gera src/assets/glass/palco-conferencia.webp — "foto" de palco de conferência
# (telão de LED, fachos de luz, bokeh e plateia em silhueta, tudo desfocado).
# Feita só com matemática: sem foto de terceiros, sem licença, sem hotlink.
# Serve de palco REAL pros demos de /glass (vidro precisa de algo atrás).
#
# Uso:  python3 scripts/gen-palco-foto.py /tmp/palco.png
#       cwebp -q 80 /tmp/palco.png -o src/assets/glass/palco-conferencia.webp
# Requer numpy + Pillow. Semente fixa (26): sai sempre a mesma imagem.
import numpy as np, sys
from PIL import Image, ImageFilter
W, H = 1600, 1000
rng = np.random.default_rng(26)
y, x = np.mgrid[0:H, 0:W].astype(np.float32)
img = np.zeros((H, W, 3), np.float32)
# 1. base: navy profundo, levemente mais claro no meio
t = y / H
base_top = np.array([2, 22, 42]) / 255
base_mid = np.array([10, 31, 59]) / 255
base_bot = np.array([1, 8, 18]) / 255
k = np.clip(t * 2, 0, 1)[..., None]
img = np.where(t[..., None] < .5, base_top * (1 - k) + base_mid * k, base_mid * (2 - 2 * t[..., None]) + base_bot * (2 * t[..., None] - 1))
def add(layer, color, a=1.0):
    global img
    img += layer[..., None] * np.array(color, np.float32) * a
def soft_rect(x0, y0, x1, y1, feather):
    fx = np.clip(np.minimum(x - x0, x1 - x) / feather, 0, 1)
    fy = np.clip(np.minimum(y - y0, y1 - y) / feather, 0, 1)
    return fx * fy
# 2. telão de LED desfocado (luz fria, com faixas de "conteúdo")
wall = soft_rect(430, 120, 1170, 520, 60)
bands = 0.75 + 0.25 * np.sin(y / 9.0) * np.sin(x / 140.0 + 1.3)
add(wall * bands, [0.36, 0.55, 0.86], .55)
add(soft_rect(560, 230, 1040, 330, 40), [0.85, 0.92, 1.0], .55)   # título claro no telão
add(soft_rect(620, 360, 980, 400, 30), [0.6, 0.75, 0.95], .35)
# 3. fachos de luz do teto (cones aditivos com névoa)
haze = np.array(Image.fromarray((rng.random((H // 8, W // 8)) * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC), np.float32) / 255
for (ox, ang, spread, a, col) in [(240, 0.42, 0.16, .42, [0.62, 0.78, 1]), (500, 0.16, 0.12, .34, [0.85, 0.9, 1]),
                                   (1100, -0.16, 0.12, .34, [0.85, 0.9, 1]), (1360, -0.42, 0.16, .42, [0.62, 0.78, 1]),
                                   (800, 0.0, 0.07, .24, [1, 1, 1])]:
    dx = x - ox; dy = y + 40
    theta = np.arctan2(dx, dy) - ang
    cone = np.exp(-(theta / spread) ** 2) * np.exp(-dy / 900)
    add(cone * (0.6 + 0.4 * haze), col, a)
# 4. bokeh (luzes fora de foco)
bok = np.zeros((H, W), np.float32); bokc = np.zeros((H, W, 3), np.float32)
for i in range(70):
    far = i < 52
    if far:   # luzes distantes: pequenas, perto do palco e da linha do teto
        cx = rng.normal(W / 2, W * .3); cy = rng.choice([rng.uniform(20, 120), rng.uniform(480, 640)])
        r = rng.uniform(3, 12); a = rng.uniform(.25, .8)
    else:     # primeiro plano: grandes, nas bordas, bem transparentes
        cx = rng.choice([rng.uniform(-60, 380), rng.uniform(W - 380, W + 60)]); cy = rng.uniform(80, H * .85)
        r = rng.uniform(40, 110); a = rng.uniform(.05, .14)
    d = np.sqrt((x - cx) ** 2 + (y - cy) ** 2)
    disc = np.clip((r - d) / 2.2, 0, 1) * (0.75 + 0.25 * np.clip(d / r, 0, 1))  # borda mais acesa
    col = np.array([[0.75, 0.85, 1.0], [1, 1, 1], [0.45, 0.62, 0.95], [0.6, 0.7, 0.85]][i % 4], np.float32)
    bokc += disc[..., None] * col * a
img += bokc
# 5. plateia em silhueta (cabeças e ombros, primeiro plano escuro)
sil = np.zeros((H, W), np.float32)
for row, (yb, sz, n) in enumerate([(905, 70, 14), (975, 105, 9)]):
    for j in range(n):
        cx = (j + rng.uniform(-.3, .3)) * W / (n - 1)
        hr = sz * rng.uniform(.38, .5)
        hy = yb - sz * rng.uniform(.9, 1.2)
        head = ((x - cx) / hr) ** 2 + ((y - hy) / (hr * 1.15)) ** 2 < 1
        sh = (((x - cx) / (sz * 1.25)) ** 2 + ((y - yb - sz * .2) / (sz * .9)) ** 2) < 1
        sil = np.maximum(sil, (head | sh).astype(np.float32))
sil = np.maximum(sil, (y > 990).astype(np.float32))
sil_img = Image.fromarray((sil * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(5))
sil = np.array(sil_img, np.float32) / 255
img = img * (1 - sil[..., None] * 0.92) + sil[..., None] * np.array([1, 5, 12]) / 255 * 0.92
# 6. desfoque de lente (a foto é "fora de foco" fora do palco), vinheta, grão
pil = Image.fromarray((np.clip(img, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(3.2))
img = np.array(pil, np.float32) / 255
vig = 1 - 0.55 * (((x - W / 2) / (W * .62)) ** 2 + ((y - H * .42) / (H * .8)) ** 2)
img *= np.clip(vig, 0.25, 1)[..., None]
img += (rng.normal(0, 0.018, (H, W, 1))).astype(np.float32)
Image.fromarray((np.clip(img, 0, 1) ** 0.95 * 255).astype(np.uint8)).save(sys.argv[1])
