const express = require('express')
      router = express.Router(),
      multer = require('../middlewares/multer.js'),
      multerLib = require('multer')(),
      controller = require('../controllers/carController.js'),

// create image dengan multer di lokal
router.post('/create',multer.image.single('image'),controller.addCars )
//  create image dengan imagekit
router.post('/createWithImageKit', multerLib.single('image'), controller.addWithImageKit)
router.post('/imageKit', multerLib.single('image'), controller.uploadImage)


router.get('/show', controller.show)
router.get('/show/:id', controller.showById)
router.put('/edit/:id', controller.show)
router.delete("/delete/:id", controller.delete);
module.exports = router
