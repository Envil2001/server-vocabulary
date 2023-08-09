const FieldDto = require("../dtos/fieldDto");
const FieldModel = require("../models/folderModel");
const wordModel = require("../models/wordModel");
const ApiError = require('../exceptions/api-error');

class FieldService {
    async fieldCreate(title, userId) {
        const field = await FieldModel.create({ title, user: userId });
        const popField = field.populate(['user', 'words']);
        return popField
    }
    async fieldsAll(page, limit) {
        // .skip((page - 1) * pageSize)
        // .limit(pageSize);
        const skip = (page - 1) * limit;
        const fields = await FieldModel.find().skip(skip).limit(Number(limit)).populate(['user', 'words']).exec();
        return fields;

    }
    async fieldOne(postId) {

        const field = await FieldModel.findOneAndUpdate({ _id: postId },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
        ).populate(['user', 'words']);
        if (!field) {
            throw ApiError.BadRequest(404, `Файл был не найден`);
        }
        return field;
    }
    async search(searchTerm) {
        const filteredItems = await FieldModel.find({
            title: { $regex: searchTerm, $options: "i" },
        });
        return filteredItems;
    }
    async fieldIncrement(postId) {
        const updatedField = FieldModel.findOneAndUpdate({ _id: postId },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
        ).populate(['user', 'words']);

        if (!updatedField) {
            throw ApiError.BadRequest(404, `Файл был не найден`);
        }
        return updatedField
    }
    async fieldsOwner(userId) {
        const fields = await FieldModel.find({ user: userId }).populate(['user', 'words']);
        return fields;
    }
    async fieldUpdate(title, id) {
        const field = await FieldModel.findByIdAndUpdate(id, { title }, { new: true }).populate(['user', 'words']);;
        return field;
    }
    async fieldDelete(postId) {
        await FieldModel.findByIdAndRemove({
            _id: postId,
        })
        await wordModel.deleteMany({ post_id: postId }).exec();
    }
}

module.exports = new FieldService();