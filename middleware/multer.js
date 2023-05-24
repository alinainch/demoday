const multer = require("multer");
const path = require("path");
const videoExtensions = [
  ".mp4",
  ".avi",
  ".mov",
  ".wmv",
  ".flv",
  ".mkv",
  ".mpg",
  ".mpeg",
  ".rm",
  ".rmvb",
  ".3gp",
  ".webm"
];
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && !videoExtensions.includes(ext)) {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});