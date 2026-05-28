import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const items = [
  { key: 'zubaida-ep1-blog', file: 'temp_docx_extract/zubaida_clean/Zubaida Ep1 blog.txt' },
  { key: 'zubaida-ep2-blog', file: 'temp_docx_extract/zubaida_clean/Zubaida Ep2 Blog.txt' },
  { key: 'zubaida-ep3-blog', file: 'temp_docx_extract/zubaida_clean/Zubaida Ep3 Blog.txt' },
  { key: 'zubaida-ep4-blog', file: 'temp_docx_extract/zubaida_clean/Zubaida Ep4 Blog.txt' },
  { key: 'zubaida-ep5-blog', file: 'temp_docx_extract/zubaida_clean/Zubaida Ep 5Blog.txt' },
  { key: 'zubaida-ep6-blog', file: 'temp_docx_extract/zubaida_clean/Zubaida Ep6 Blog.txt' },
  { key: 'zubaida-ep7-blog', file: 'temp_docx_extract/zubaida_clean/Zubaida Ep7 Blog.txt' },
];

const lines = ['export const zubaidaBodies: Record<string, string> = {'];
for (const item of items) {
  const text = fs.readFileSync(path.join(root, item.file), 'utf8');
  lines.push(`  ${JSON.stringify(item.key)}: ${JSON.stringify(text)},`);
}
lines.push('};', '');
fs.writeFileSync(path.join(root, 'src/lib/zubaidaBodies.generated.ts'), lines.join('\n'), 'utf8');
