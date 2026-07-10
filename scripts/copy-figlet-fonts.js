const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'node_modules', 'figlet', 'fonts');
const targetDir = path.join(__dirname, '..', 'out', 'fonts');

if (!fs.existsSync(sourceDir)) {
	throw new Error(`Missing figlet fonts at ${sourceDir}. Run npm install first.`);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

const copiedFonts = fs.readdirSync(sourceDir)
	.filter((fileName) => fileName.endsWith('.flf'))
	.sort();

if (copiedFonts.length === 0) {
	throw new Error(`No figlet .flf fonts found in ${sourceDir}.`);
}

for (const fileName of copiedFonts) {
	fs.copyFileSync(path.join(sourceDir, fileName), path.join(targetDir, fileName));
}

console.log(`Copied ${copiedFonts.length} figlet fonts to ${targetDir}`);
