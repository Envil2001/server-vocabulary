const { Router } = require("express");
const router = new Router();
const controllers = require('../controllers/authController');
const { body } = require('express-validator');


router.post('/registration', [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    body('fullName', 'Имя не помжет быть пустое').notEmpty(),
], controllers.registration);
router.post('/login', [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
], controllers.login);
router.post('/logout', controllers.logout);
router.get('/activate/:link', controllers.activate);
router.get('/refresh', controllers.refresh);
module.exports = router;