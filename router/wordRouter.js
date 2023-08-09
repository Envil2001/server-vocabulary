const { Router } = require("express");
const authMiddleware = require('../middlewares/auth-middleware')
const controllers = require("../controllers/wordController")
const router = new Router();

router.post('/createword/:fieldId', authMiddleware, controllers.createWord); 
router.patch('/updateeword/:fieldId/:wordId', authMiddleware, controllers.updateWord); 
router.delete('/deleteword/:fieldId/:wordId', authMiddleware, controllers.deleteWord); 

module.exports = router;