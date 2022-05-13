const path = require("path");
const variableConfiguration = require("../config");
const createError = require("../helper/errorHandler");

const { countObjectLength } = require("../helper/utils");
const {
  storeFileInformationToDB,
  getFileByKey,
  removeFile,
  removeFileRecord,
  updateCoin,
} = require("../helper/file");
const { generateSecretHash } = require("../helper/hash");

const fileUpload = async (req, res) => {
  try {
    let requestFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    requestFile = req.files.document;
    const newFileName = new Date().getTime() + "_" + req.files.document.name;
    uploadPath = variableConfiguration.FOLDER + newFileName;
    const privateKey = await generateSecretHash();
    const publicKey = await generateSecretHash(16);
    const data = {
      fileName: newFileName,
      privateKey,
      publicKey,
    };
    requestFile.mv(
      path.join(
        __dirname,
        variableConfiguration.FOLDER + "uploads",
        newFileName
      ),
      async function (err) {
        if (err) return res.status(500).send(err);
        await storeFileInformationToDB(data);
        res.send(data);
      }
    );
  } catch (error) {
    createError(500, "Server Error");
  }
};

const getFile = async (req, res) => {
  try {
    //console.log(req.connection.remoteAddress);
    const fileInformation =
      (await getFileByKey(req.params.publicKey, "publicKey")) || {};
    console.log(fileInformation);
    if (countObjectLength(fileInformation) > 0) {
      await updateCoin(req.connection.remoteAddress);
      res.status(200).json(fileInformation?.fileName);
    }
    res.status(300);
  } catch (error) {
    res.status(500);
  }
};

const deleteFile = async (req, res) => {
  try {
    const fileInformation =
      (await getFileByKey(req.params.privateKey, "privateKey")) || {};
    console.log(fileInformation, "ct");
    if (Object.keys(fileInformation).length > 0) {
      removeFileRecord(fileInformation);
      res.send(true);
    } else {
      res.send("No File Found");
    }
  } catch (error) {
    res.status(500);
  }
};

module.exports = { fileUpload, getFile, deleteFile };
