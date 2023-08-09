const wordModel = require("../models/wordModel");
const FieldModel = require("../models/folderModel");
const ApiError = require('../exceptions/api-error');

class WordService {
  async createWord(fieldId, userId, title, translate, description) {
    // const oldPost = await FieldModel.findById({ _id: postId });

    // if (!oldPost) {
    //   throw ApiError.BadRequest(404, `Поле с id: ${postId} не найден`);
    // }

    // const newWord = new wordModel({
    //   title,
    //   translate,
    //   description,
    //   post_id: postId,
    //   user_id: userId,
    // });

    // const savedWord = await newWord.save();
    // oldPost.words.push(savedWord._id);
    // await oldPost.save();

    // return {
    //   field: savedWord,
    // };
    const folder = await FieldModel.findById({ _id: fieldId });
    const word = await wordModel.create({ user_id: userId, post_id: fieldId, title, translate, description });
    if (!folder) {
      throw ApiError.BadRequest(404, `Поле не найдено`);
    }
    folder.words.push(word);
    await folder.save();
    return word;
  }


  async updateWord(fieldId, wordId, title, translate, description) {
    const word = await wordModel.findByIdAndUpdate(wordId, { title, translate, description });
    if (!word) {
      throw ApiError.BadRequest(404, `Слово не найдено`);
    }
    const folder = await FieldModel.findById({ _id: fieldId });
    if (!folder) {
      throw ApiError.BadRequest(404, `Поле не найдено`);
    }
    const wordIndex = folder.words.indexOf({ _id: wordId });
    if (wordIndex !== -1) {улин
      folder.words[wordIndex] = word;
      await folder.save();
    }
    return word;
  }

  async deleteWord(fieldId, wordId) {
    const folder = await FieldModel.findById({ _id: fieldId });
    if (!folder) {
      throw ApiError.BadRequest(404, `Поле не найдено`);
    }
    folder.words.pull(wordId);
    await folder.save();
    const word = await wordModel.findByIdAndRemove({ _id: wordId });
    if (!word) {
      throw ApiError.BadRequest(404, `Слово не найдено`);
    }
    return word;
  }
}


module.exports = new WordService();