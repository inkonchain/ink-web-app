// Small script to download the images for the apps-data.json file
const fs = require("fs/promises");
const path = require("path");

// Install this globally: npm install -g sharp
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");

const exceptions = ["Kraken", "Kraken Wallet"];

const run = async () => {
  const appsDataFile = path.join(
    ROOT,
    "src/app/[locale]/(dashboard)/dashboard/_components/apps-data.json"
  );
  const appsDataRaw = await fs.readFile(appsDataFile, "utf8");
  const appsData = JSON.parse(appsDataRaw);

  const newApps = await Promise.all(
    appsData.apps.map(async (app) => {
      if (exceptions.includes(app.name)) {
        return app;
      }

      const imageUrl = app.imageUrl;
      if (!imageUrl.startsWith("http")) {
        return app;
      }

      const imageName = app.name
        .toLowerCase()
        .replaceAll(/ /g, "")
        .replaceAll(/:/g, "_");
      const maybeExtension = imageUrl.split(".").pop();
      // Just a fallback if the image URL has no extension for some reason
      const extension = maybeExtension.length > 4 ? "png" : maybeExtension;
      const imageData = await fetch(imageUrl);
      const imageBuffer = await imageData.arrayBuffer();

      const newImageRelativePath = path.join(
        "featured-apps/icons",
        `${imageName}.webp`
      );

      if (extension === "webp") {
        await fs.writeFile(
          path.join(ROOT, "public", newImageRelativePath),
          Buffer.from(imageBuffer)
        );
      } else {
        await sharp(Buffer.from(imageBuffer))
          .webp()
          .toFile(path.join(ROOT, "public", newImageRelativePath));
      }

      app.imageUrl = `/${newImageRelativePath}`;

      return app;
    })
  );

  await fs.writeFile(appsDataFile, JSON.stringify({ apps: newApps }, null, 2));
};

run();
