const express = require("express");
const File = require("../controller/file");
const countRequest = require("../middleware");

const router = express.Router();

router.get("/files/:publicKey", countRequest, File.getFile);
router.post("/files", File.fileUpload);
router.delete("/files/:privateKey", File.deleteFile);

router.get("/health", (_, res) => {
  res.send("ok");
});

module.exports = router;
