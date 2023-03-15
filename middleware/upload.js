const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })
const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/.*\.(gif|jpe?g|bmp|png)$/igm)) {
        return cb(new Error('Please upload Image')) 
    }
    cb(undefined, true)
}
const upload = multer({
    storage, 
    fileFilter,
    limits: 10000000 //10 MB
}).any('photos')
module.exports = {
    upload
}