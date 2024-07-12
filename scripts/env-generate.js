const fs = require("fs");

fs.readFile(".env", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");

  const variables = {};

  lines.forEach((line) => {
    if (line.trim() === "" || line.startsWith("#")) {
      return;
    }

    const [key, value] = line.split("=");

    variables[key.trim()] = value.trim();
  });

  let envExampleContent = "";
  for (const key in variables) {
    envExampleContent += `${key}=********\n`;
  }

  fs.writeFile(".env.example", envExampleContent, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(".env.example file has been generated");
  });
});
