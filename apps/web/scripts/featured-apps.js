const fs = require("fs/promises");
const path = require("path");

const fileNameToAppNameMapping = {};

const run = async () => {
  const featuredAppsImageNames = await fs.readdir(
    path.join(__dirname, "..", "public", "featured-apps")
  );
  await fs.writeFile(
    path.join(__dirname, "..", "src", "generated", "featured-apps.json"),
    JSON.stringify(
      featuredAppsImageNames.map((app) => {
        const name = app.split(".").slice(0, -1).join(".");
        return {
          name: fileNameToAppNameMapping[name] || name,
          url: `/featured-apps/${app}`,
        };
      }),
      null,
      2
    )
  );
};

run();
