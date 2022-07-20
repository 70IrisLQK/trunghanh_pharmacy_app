import multer from "multer";
import uuidv4 from "uuid";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import cloudinary from 'cloudinary';

dotenv.config();

const DIR = "./images";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(DIR)) {
      fs.mkdirSync(DIR);
    }
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, uuidv4() + "-" + fileName);
  },
});
export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

export const uploadToCloudinary = async (localFilePath) => {
  var filePathOnCloudinary = "trunghanh/images" + "/" + localFilePath;

  return cloudinary.uploader
    .upload(localFilePath, { public_id: filePathOnCloudinary })
    .then((result) => {
      fs.unlinkSync(localFilePath);
      return {
        url: result.url,
      };
    })
    .catch((error) => {
      fs.unlinkSync(localFilePath);
    });
};
