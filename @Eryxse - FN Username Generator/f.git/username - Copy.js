// ==================== HEADER ====================
console.clear();
console.log("\n\n      ╔═══════════════════════════════════════════════════════════════╗");
console.log("      ║                           ERYXSE                             ║");
console.log("      ╚═══════════════════════════════════════════════════════════════╝\n");
// ================================================

const readline = require("node:readline");
const fs = require("node:fs");
const path = require("node:path");

// biome-ignore format: no need to format this object
const unicodeMap = {
  a: "а", c: "с", d: "ԁ", e: "е", i: "і", j: "ј",
  o: "ο", p: "р", q: "ԛ", s: "ѕ", w: "ԝ", x: "х", y: "у",
  A: "Α", B: "Β", C: "С", E: "Ε", H: "Η", I: "Ι", J: "Ј",
  K: "Κ", M: "Μ", N: "Ν", O: "Ο", P: "Ρ", S: "Ѕ", T: "Τ",
  X: "Χ", Y: "Υ", Z: "Ζ"
};

function generateVariations(word, unicodeMap) {
  const replaceablePositions = Array.from(word)
    .map((char, i) => (unicodeMap[char] ? [i, unicodeMap[char]] : null))
    .filter(Boolean);

  const variations = new Set();

  for (let r = 1; r <= replaceablePositions.length; r++) {
    const combos = getCombinations(replaceablePositions, r);
    for (const combo of combos) {
      const newWord = word.split("");
      for (const [pos, replacement] of combo) {
        newWord[pos] = replacement;
      }
      variations.add(newWord.join(""));
    }
  }
  return Array.from(variations).sort();
}

function getCombinations(array, r) {
  if (r === 0) return [[]];
  if (array.length === 0) return [];

  const [first, ...rest] = array;
  const withFirst = getCombinations(rest, r - 1).map((comb) => [first, ...comb]);
  const withoutFirst = getCombinations(rest, r);

  return [...withFirst, ...withoutFirst];
}

function printVariations(word, variations) {
  variations.forEach((variation, index) => {
    console.log(` [${index + 1}] ${variation}`);
  });
}

// ✅ Universal save — works in current directory OR any custom path
function saveToFile(word, variations, customDir = process.cwd()) {
  if (!fs.existsSync(customDir)) {
    fs.mkdirSync(customDir, { recursive: true });
  }

  const fileName = `@ERYXSE - '${word}' COPY + PASTE.txt`;
  const filePath = path.join(customDir, fileName);

  const fileContent = variations.map((v, i) => `[${i + 1}] ${v}`).join("\n");

  fs.writeFileSync(filePath, fileContent, "utf8");

  console.log(`\n [+] Saved Name Variations to: 

     ${filePath}\n`);
}

function main(word, customDir) {
  const variations = generateVariations(word, unicodeMap);
  if (variations.length > 0) {
    saveToFile(word, variations, customDir);
  } else {
    console.log(" No variations for this word found");
  }

  // ==================== FOOTER ====================
  console.log("\n\n      ╔═══════════════════════════════════════════════════════════════╗");
  console.log("      ║       * Operation Completed * Press any key to continue...    ║");
  console.log("      ╚═══════════════════════════════════════════════════════════════╝\n");
  // ================================================
  readlineInterface.question(``, () => {
    menu();
  });
}

function clear() {
  console.clear();
}

function menu() {
  clear();

  console.log("\n\n      ╔═══════════════════════════════════════════════════════════════╗");
  console.log("      ║                       *Coded By Eryxse*                       ║");
  console.log("      ╚═══════════════════════════════════════════════════════════════╝\n");

  console.log("                           Made with ❤️  by Eryxse\n");

  readlineInterface.question("  [+] Please enter your new name: ", (word) => {
    console.log();
    main(word.trim()); 
  });
}

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

menu();
