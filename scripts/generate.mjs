import fs from "fs";

const url =
  "https://raw.githubusercontent.com/yeun/open-color/refs/heads/master/open-color.json";

const json = await fetch(url).then((r) => r.json());

const colors = Object.fromEntries(
  Object.keys(json).flatMap((color) => {
    if (Array.isArray(json[color])) {
      return json[color].map((hex, i) => [color + i, hex]);
    } else {
      return [[color, json[color]]];
    }
  })
);

fs.writeFileSync(
  "./index.mjs",
  "export default " + JSON.stringify(colors, null, 2) + ";\n"
);
