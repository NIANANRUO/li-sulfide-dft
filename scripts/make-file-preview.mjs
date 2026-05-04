import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
}

function assetPrefixFor(filePath) {
  const relativeDir = path.relative(outDir, path.dirname(filePath));
  if (!relativeDir) return "./";
  const depth = relativeDir.split(path.sep).filter(Boolean).length;
  return "../".repeat(depth);
}

const htmlFiles = await walk(outDir);

for (const filePath of htmlFiles) {
  const prefix = assetPrefixFor(filePath);
  const html = await readFile(filePath, "utf8");
  const rewritten = html
    .replaceAll("/_next/", `${prefix}_next/`)
    .replaceAll('href="/', `href="${prefix}`)
    .replaceAll('src="/', `src="${prefix}`)
    .replaceAll('\\"/_next/', `\\"${prefix}_next/`);

  await writeFile(filePath, rewritten);
}

console.log(`Rewrote ${htmlFiles.length} HTML files for file:// preview.`);

