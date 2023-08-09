const fieldService = require("../service/fieldService");
const { validationResult } = require('express-validator')
class FieldController {
    async fieldsAll(req, res, next) {
        try {
            const { page, limit } = req.query;
            const fields = await fieldService.fieldsAll(page, limit);
            return res.json(fields);
        } catch (e) {
            next(e);
        }
    }
    async fieldOne(req, res, next) {
        try {
            const postId = req.params.id;
            const field = await fieldService.fieldOne(postId)
            return res.json(field)
        } catch (e) {
            next(e);
        }
    }
    async search(req, res, next) {
        try {
            const searchTerm = req.query.q;
            const field = await fieldService.search(searchTerm)
            return res.json(field)
        } catch (e) {
            next(e);
        }
    }

    async fieldsOwner(req, res, next) {
        try {
            const userId = req.params.id
            const fields = await fieldService.fieldsOwner(userId)
            return res.json(fields)
        } catch (e) {
            next(e);
        }
    }
    async fieldCreate(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest(400, 'Ошибка при валидации', errors.array()))
            }
            const { title } = req.body;
            const userId = req.user.id;
            const fieldData = await fieldService.fieldCreate(title, userId);

            return res.json(fieldData)
        } catch (e) {
            next(e);
        }
    }
    async fieldUpdate(req, res, next) {
        const { id } = req.params;
        const { title } = req.body;
        try {
            const fieldData =  await fieldService.fieldUpdate(title, id);

            return res.json(fieldData)
        } catch (e) {
            next(e);
        }
    }
    async fieldDelete(req, res, next) {
        try {
            const postId = req.params.id;

            await fieldService.fieldDelete(postId);
            return res.json({ message: "Файл был успешно удален" })
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new FieldController();