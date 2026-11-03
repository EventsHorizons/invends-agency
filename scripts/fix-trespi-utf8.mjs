import fs from "fs";

const path = "app/utils/trespiData.ts";
let s = fs.readFileSync(path, "utf8");

s = s.replaceAll("Planificaci\uFFFDn", "Planificación");
s = s.replaceAll("Bogot\uFFFD", "Bogotá");
s = s.replaceAll("Atenci\uFFFDn", "Atención");

// Fallbacks if already half-broken differently
s = s.replace(/Planificaci.n de prototipo/g, "Planificación de prototipo");
s = s.replace(/city: "Bogot., Colombia"/g, 'city: "Bogotá, Colombia"');
s = s.replace(
  /address: "Atenci.n por agenda\\nBogot. \/ LATAM"/g,
  'address: "Atención por agenda\\nBogotá / LATAM"',
);

fs.writeFileSync(path, s, "utf8");
const out = fs.readFileSync(path, "utf8");
console.log("has replacement char:", out.includes("\uFFFD"));
console.log(
  out
    .split("\n")
    .filter((l) => /Bogot|Atenci|Planific/.test(l))
    .join("\n"),
);
