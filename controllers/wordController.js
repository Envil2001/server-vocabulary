const wordService = require("../service/wordService");
const FieldModel = require("../models/folderModel");

// const { Configuration, OpenAIApi } = require("openai")
// const config = new Configuration({
//     organization: "org-vaW8FeIQONxMsa8P2Y1kNDGb",
//     apiKey: "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"
// })


// const openai = new OpenAIApi(config);


class WordController {
    async createWord(req, res, next) {
        try {
            // const prompt = "как переводится слово Hello";

            // const response = await openai.createCompletion({
            //     model: "text-davinci-003",
            //     prompt: prompt,
            //     maxTokens: 2048,
            //     temperature: 1,
            // })

            // const response = await openai.createCompletion({
            //     model: "text-davinci-003",
            //     prompt: "Say this is a test",
            //     max_tokens: 3000,
            //     temperature: 0,
            // });
            const userId = req.user.id;
            const fieldId = req.params.fieldId;

            const { title, translate, description } = req.body;
            const word = await wordService.createWord(fieldId, userId, title, translate, description);
            return res.json(word);
        } catch (e) {
            next(e);
        }
    }
    async updateWord(req, res, next) {
        try {
            const { fieldId } = req.params;
            const { wordId } = req.params;
            const { title, translate, description } = req.body;

            const word = await wordService.updateWord(fieldId, wordId, title, translate, description);
            return res.json(word);
        } catch (e) {
            next(e);
        }
    }

    async deleteWord(req, res, next) {
        try {
            const { fieldId } = req.params;
            const { wordId } = req.params;

            const word = await wordService.deleteWord(fieldId, wordId);
            return res.json({ result: word, message: 'Successfully deleted comment!' });
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new WordController();