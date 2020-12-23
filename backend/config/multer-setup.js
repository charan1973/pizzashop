const multer = require("multer")
const path = require("path")

exports.multerUpload = multer({
    storage: multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
          }
    })
})