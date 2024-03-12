const fs = require("fs");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

if (!fs.existsSync(UPLOADS_FOLDER)) {
  fs.mkdirSync(UPLOADS_FOLDER);
}

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const filehash = crypto.randomBytes(10).toString("hex");
      const filename = `${filehash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};

module.exports = { TMP_FOLDER, UPLOADS_FOLDER, MULTER };
