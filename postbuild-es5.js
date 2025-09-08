// postbuild-es5.js
// Script om na een Angular build de JS-bestanden te transpilen naar ES5 en nomodule scripts te genereren

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const distDir = path.join(__dirname, "dist");
const es5Dir = path.join(__dirname, "dist-es5");

// 1. Maak de ES5 output map leeg of aan
if (fs.existsSync(es5Dir)) {
  fs.rmSync(es5Dir, { recursive: true, force: true });
}
fs.mkdirSync(es5Dir);

// 2. Transpile alle JS-bestanden in dist/ naar dist-es5/ met Babel
execSync(
  `npx babel "${distDir}" --out-dir "${es5Dir}" --presets=@babel/preset-env`,
  { stdio: "inherit" }
);

// 3. Kopieer overige niet-JS bestanden (html, css, assets)
function copyRecursive(src, dest) {
  fs.readdirSync(src).forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    if (fs.lstatSync(srcPath).isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath);
    } else if (!srcPath.endsWith(".js")) {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}
copyRecursive(distDir, es5Dir);

// 4. Pas index.html aan om nomodule scripts toe te voegen
const indexPath = path.join(es5Dir, "index.html");
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, "utf8");

  // Zoek alle script tags met type="module"
  const scriptRegex = /<script src="([^"]+)" type="module"><\/script>/g;
  let match;
  const nomoduleScripts = [];

  while ((match = scriptRegex.exec(indexContent)) !== null) {
    const scriptSrc = match[1];
    nomoduleScripts.push(`<script src="${scriptSrc}" nomodule defer></script>`);
  }

  // Voeg nomodule scripts toe voor </body>
  if (nomoduleScripts.length > 0) {
    const nomoduleSection =
      "\n\n<!-- ES5 fallback voor oude browsers (zoals veel TV's) -->\n" +
      nomoduleScripts.join("\n");
    indexContent = indexContent.replace(
      "</body>",
      nomoduleSection + "\n</body>"
    );
    fs.writeFileSync(indexPath, indexContent);
  }
}

console.log("ES5 build klaar in dist-es5/ met nomodule scripts toegevoegd.");
