import fs from "fs";

export const deleteOldImage = (image) => {
  fs.unlink(image.path, (err) => {
    if (err) {
      console.log("Error deleting image " + image.filename);
    } else {
      console.log("Error deleting image " + image.filename);
    }
  });
};
