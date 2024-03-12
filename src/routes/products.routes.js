const { Router } = require("express");
const ProductsController = require('../controllers/productsController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const multer = require('multer');
const uploadConfig = require('../configs/upload');

const productsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const productsController = new ProductsController();

productsRoutes.use(ensureAuthenticated);

productsRoutes.post('/', verifyUserAuthorization('admin'), upload.single('image'), productsController.create);
productsRoutes.put('/:id', verifyUserAuthorization('admin'), upload.single('image'), productsController.update);
productsRoutes.delete('/:id', verifyUserAuthorization('admin'), productsController.delete);

productsRoutes.get('/:id', productsController.index);
productsRoutes.get('/', productsController.show);

module.exports = productsRoutes;
