const fs = require("fs/promises");
require("dotenv").config();

(async () => {
  const path = "public/affirmation_month.json";
  const affirmations = JSON.parse(await fs.readFile(path));

  const randomAffirmation = affirmations.filter((a) => !a.used)[0];

  // update affirmation.json
  await fs.writeFile(
    "public/affirmation.json",
    JSON.stringify(randomAffirmation)
  );

  // Update the used property to true
  const updatedAffirmations = affirmations.map((a) => {
    if (a.affirmation === randomAffirmation.affirmation) {
      return { affirmation: a.affirmation, used: true };
    } else {
      return a;
    }
  });

  // Write the updated affirmations to the file
  await fs.writeFile(path, JSON.stringify(updatedAffirmations));
})();
