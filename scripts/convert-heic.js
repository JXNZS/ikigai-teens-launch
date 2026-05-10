import fs from 'fs';
import path from 'path';
import heicConvert from 'heic-convert';

const assetsDir = path.resolve(process.cwd(), 'src', 'assets');
const files = [
  { src: 'Jiya.HEIC', dest: 'Jiya.jpeg' },
];

for (const f of files) {
  const inPath = path.join(assetsDir, f.src);
  const outPath = path.join(assetsDir, f.dest);

  if (!fs.existsSync(inPath)) {
    console.error('Source file not found:', inPath);
    continue;
  }

  const inputBuffer = fs.readFileSync(inPath);

  (async () => {
    try {
      const outputBuffer = await heicConvert({
        buffer: inputBuffer, // the HEIC file buffer
        format: 'JPEG',      // output format
        quality: 1           // the jpeg compression quality 0 .. 1
      });

      fs.writeFileSync(outPath, outputBuffer);
      console.log('Wrote converted image:', outPath);
    } catch (err) {
      console.error('Failed to convert', inPath, err);
    }
  })();
}
