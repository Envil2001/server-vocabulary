const { Router } = require("express");
const authMiddleware = require('../middlewares/auth-middleware')
const router = new Router();
const controllers = require('../controllers/userController');
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage });

router.get('/', controllers.getUsers);
router.get('/user/:id', controllers.getUser);
router.patch('/user/:id/update', authMiddleware, controllers.updateUser);
router.post('/upload', authMiddleware, upload.single('image'), controllers.upload)
router.get('/activate/:userId/:code', controllers.activate);
// router.delete('/user/:id', authMiddleware, controllers.deleteUser);


module.exports = router;