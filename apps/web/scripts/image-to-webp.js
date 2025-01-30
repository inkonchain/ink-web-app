// Small script to download the images for the apps-data.json file
const fs = require("fs/promises");
const path = require("path");

var [imagePathArg] = process.argv.slice(2);

// Install this globally: npm install -g sharp
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");

const run = async () => {
  const imagePath = path.join(__dirname, "..", imagePathArg);
  const imagesInFolder = await fs.readdir(imagePath);

  const processedImages = await Promise.all(
    imagesInFolder.map(async (file) => {
      if (file.endsWith(".webp")) {
        return false;
      }

      const imagePathWithNewExtension = path.join(
        imagePath,
        `${file.split(".")[0]}.webp`
      );
      await sharp(path.join(imagePath, file))
        .webp()
        .toFile(imagePathWithNewExtension);
      await fs.unlink(path.join(imagePath, file));
      return true;
    })
  );

  console.debug("Processed images:", processedImages.filter(Boolean).length);
};

run();
