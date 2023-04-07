const fs = require("fs/promises");
const axios = require("axios");
const { execSync } = require("child_process");
require("dotenv").config();

(async () => {
  const randomAffirmation = JSON.parse(
    await fs.readFile("public/affirmation.json")
  );

  let tags = await retrieveVideoTags(randomAffirmation.affirmation);
  tags = tags.map((x) => x.replace(/#/g, ""));

  // create info.json
  const info = {
    title: randomAffirmation.affirmation,
    tags,
    tiktoksessionid: process.env.tiktoksessionid,
  };
  await fs.writeFile("public/info.json", JSON.stringify(info));

  execSync("python post.py", { stdio: "inherit" });
})();

async function retrieveVideoTags(title) {
  try {
    const headers = {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
      referer: "https://rapidtags.io/generator/",
    };

    const res = await axios.get(
      `https://rapidtags.io/api/generator?type=TikTok&query=${title}`,
      { headers }
    );
    return res.data["tags"];
  } catch (error) {
    return [];
  }
}
