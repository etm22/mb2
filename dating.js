const fs = require("fs/promises");
require("dotenv").config();

(async () => {
  const path = "public/datings.json";
  const tips = JSON.parse(await fs.readFile(path));

  const usedTips = tips.filter((a) => a.used);
  const randomTip = tips.filter((a) => !a.used)[0];

  // update dating.json
  await fs.writeFile(
    "public/dating.json",
    JSON.stringify({ ...randomTip, idx: usedTips.length })
  );

  // Update the used property to true
  const updatedTips = tips.map((a) => {
    if (a.tip === randomTip.tip) {
      return { tip: a.tip, used: true };
    } else {
      return a;
    }
  });

  // Write the updated tips to the file
  await fs.writeFile(path, JSON.stringify(updatedTips));
})();
