import sharp from "sharp";
import fs from "fs";

const svg = fs.readFileSync("public/favicon.svg");
const png512 = await sharp(svg, { density: 384 }).resize(512, 512).png().toBuffer();

await sharp(png512).resize(32, 32).png().toFile("public/favicon-32x32.png");
await sharp(png512).resize(48, 48).png().toFile("public/favicon-48x48.png");
await sharp(png512).resize(180, 180).png().toFile("public/apple-touch-icon.png");
await sharp(png512).resize(192, 192).png().toFile("public/icon-192.png");
await sharp(png512).resize(512, 512).png().toFile("public/icon-512.png");

const png32 = await sharp(png512).resize(32, 32).png().toBuffer();
const png48 = await sharp(png512).resize(48, 48).png().toBuffer();

function icoFromPngs(pngs, dims) {
  const count = pngs.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = pngs.map((png) => {
    const meta = { size: png.length, offset };
    offset += png.length;
    return meta;
  });
  const buf = Buffer.alloc(offset);
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(count, 4);
  let entryAt = 6;
  for (let i = 0; i < count; i++) {
    const dim = dims[i];
    const e = entries[i];
    buf.writeUInt8(dim >= 256 ? 0 : dim, entryAt);
    buf.writeUInt8(dim >= 256 ? 0 : dim, entryAt + 1);
    buf.writeUInt8(0, entryAt + 2);
    buf.writeUInt8(0, entryAt + 3);
    buf.writeUInt16LE(1, entryAt + 4);
    buf.writeUInt16LE(32, entryAt + 6);
    buf.writeUInt32LE(e.size, entryAt + 8);
    buf.writeUInt32LE(e.offset, entryAt + 12);
    entryAt += 16;
  }
  let w = headerSize;
  for (const png of pngs) {
    png.copy(buf, w);
    w += png.length;
  }
  return buf;
}

fs.writeFileSync("public/favicon.ico", icoFromPngs([png32, png48], [32, 48]));
console.log("favicon built");
