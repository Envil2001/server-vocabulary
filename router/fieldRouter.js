const { Router } = require("express");
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');
const controllers = require('../controllers/filedController');
const { body } = require('express-validator');

// localhost:5000/fields/
router.get('/', controllers.fieldsAll);
router.get('/field/:id', controllers.fieldOne);
router.get('/search', controllers.search);
router.get('/fields/:id/owner', controllers.fieldsOwner); 
router.post('/create', [
    body('title', 'Заголовок не помжет быть пустым').notEmpty(),
], authMiddleware, controllers.fieldCreate);
router.patch('/field/:id', authMiddleware, controllers.fieldUpdate);
router.delete('/field/:id', authMiddleware, controllers.fieldDelete);

module.exports = router;