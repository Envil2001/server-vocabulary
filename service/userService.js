const UserDto = require("../dtos/userDto");
const userModel = require("../models/userModel");
const tokenServce = require("./tokenServce");
const ApiError = require('../exceptions/api-error')



class UserService {
    async getAllUsers() {
        const users = await userModel.find();
        return users;
    }
    async getUserById(userId) {
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error('Пользователь не найден');
        }
        const userDto = new UserDto(user);

        return userDto;
    }
    async updateUser({ userId, fullName, aboutInfo, email, avatarPath }) {
        const uData = {
            fullName,
            aboutInfo,
            email,
            avatarPath,
        };
        const userUpdateOne = await userModel.findOneAndUpdate({
            _id: userId, // Фильтр для поиска пользователя по его ID
        }, uData, {
            new: true, // Установить параметр new в true для получения обновленного документа
        });


        const updatedUserDto = new UserDto(userUpdateOne);
        return updatedUserDto
    }
    async activate(activationCode, userId) {
        const user = await userModel.findOne({ _id: userId, activationLink: activationCode });
        if (!user) {
            throw new Error('Неккоректная ссылка авторизации')
        }
        user.isActivated = true;
        await user.save();
        return { user }
    }
}


module.exports = new UserService(); 