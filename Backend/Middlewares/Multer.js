import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Removed leading ./
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
    cb(null, `${file.fieldname}-${uniqueSuffix}-${sanitizedFilename}`);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log("Received file:", file);
    // Accept glb files only
    if (
      file.mimetype === "model/gltf-binary" ||
      file.originalname.toLowerCase().endsWith(".glb")
    ) {
      cb(null, true);
    } else {
      console.log("File rejected:", file.mimetype);
      cb(
        new Error(
          `Invalid file type. Only GLB files are allowed. Got ${file.mimetype}`
        ),
        false
      );
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
});
