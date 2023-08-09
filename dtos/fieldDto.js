module.exports = class FieldDto {
    title;
    id;
    viewsCount;
    words;
    user;

    constructor(model) {
        this.id = model._id;
        this.title = model.title;
        this.viewsCount = model.viewsCount;
        this.words = model.words;
        this.user = model.user;
    }
}