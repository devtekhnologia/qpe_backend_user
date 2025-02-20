import multer from 'multer';
import path from 'path';

// Create the multer instance
const upload = (fileSizeLimit: number) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'Uploads/');  // Directory to save files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
    }
  });

  return multer({
    storage,
    limits: { fileSize: fileSizeLimit },  // Set dynamic file size limit
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpg|jpeg|png/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);

      if (extname && mimetype) {
        return cb(null, true);  // Accept the file
      } else {
        return cb(new Error('Only jpg, jpeg, and png files are allowed.'));
      }
    }
  });
};

// Define storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Uploads/'); // Specify the directory to save files
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});


export { upload, storage };
