module.exports = class UserDto {
    fullName;
    email;
    id;
    isActivated;
    colorAvatar;
    aboutInfo;
    avatarPath;
    constructor(model) {
        this.fullName = model.fullName;
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.isActivated = model.isActivated;
        this.colorAvatar = model.colorAvatar;
        this.aboutInfo = model.aboutInfo;
        this.avatarPath = model.avatarPath;
    }
}