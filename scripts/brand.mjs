/**
 * Erzeugt aus dem Original-Logo (public/brand/mk-logo.png, schwarz, transparent)
 * die eingefärbten Varianten und Icons. Einmalig ausführen: node scripts/brand.mjs
 */
import sharp from "sharp"

const SOURCE = "public/brand/mk-logo.png"
const INK = "#141916"
const LINEN = "#f6f6f1"
const GREEN = "#1e3a2f"

/** Logo in einer Farbe: Alpha-Kanal des Originals als Maske. */
async function tinted(color, { crop } = {}) {
  let input = sharp(SOURCE).ensureAlpha()
  if (crop) input = input.extract(crop)
  const { data: alpha, info } = await input.extractChannel(3).raw().toBuffer({ resolveWithObject: true })
  return sharp({ create: { width: info.width, height: info.height, channels: 3, background: color } })
    .joinChannel(alpha, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toBuffer()
}

async function trimmedLogo(color, width, file) {
  const buffer = await sharp(await tinted(color)).trim({ threshold: 1 }).toBuffer()
  const out = await sharp(buffer).resize({ width }).png({ compressionLevel: 9, palette: true }).toFile(file)
  console.log(file, out.width, "x", out.height)
  return out
}

/** Icon: Monogramm mit Krone (Ausschnitt), hell auf Flaschengrün. */
async function icon(size, file, { radius = 0 } = {}) {
  const monogram = await sharp(await tinted(LINEN, { crop: { left: 285, top: 170, width: 720, height: 740 } }))
    .trim({ threshold: 1 })
    .resize({ width: Math.round(size * 0.8), height: Math.round(size * 0.8), fit: "inside" })
    .toBuffer()
  const background = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${GREEN}"/></svg>`,
  )
  await sharp(background).composite([{ input: monogram, gravity: "center" }]).png({ compressionLevel: 9 }).toFile(file)
  console.log(file, size)
}

await trimmedLogo(INK, 240, "public/brand/mk-logo-ink.png")
await trimmedLogo(LINEN, 480, "public/brand/mk-logo-linen.png")
await trimmedLogo(INK, 1024, "public/brand/mk-logo-ink-gross.png")
await icon(512, "src/app/icon.png", { radius: 96 })
await icon(180, "src/app/apple-icon.png")
