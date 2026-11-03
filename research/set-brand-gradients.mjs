import fs from "node:fs";

const file = "content/site.json";
let t = fs.readFileSync(file, "utf8");

t = t.replace(
  /color1=\\"#([0-9A-Fa-f]{6})\\" color2=\\"#([0-9A-Fa-f]{6})\\" color3=\\"#([0-9A-Fa-f]{6})\\" color4=\\"#([0-9A-Fa-f]{6})\\"/g,
  'color1=\\"#4b28b5\\" color2=\\"#6d45ea\\" color3=\\"#b8a6ff\\" color4=\\"#ff2daa\\"',
);

fs.writeFileSync(file, t);
console.log("updated", (t.match(/color1=\\"#4b28b5\\"/g) || []).length);
