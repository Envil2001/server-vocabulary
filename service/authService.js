const uuid = require('uuid');
const bcrypt = require('bcrypt');
const mailService = require('./mailService');
const tokenService = require('./tokenServce');
const UserModel = require('../models/userModel')
const UserDto = require('../dtos/userDto');
const ApiError = require('../exceptions/api-error');
const randomSkinToneColor = require("../utils/randomSkinToneColor");
const generateOTP = require('../utils/generateOtp');


class AuthService {
    async registration(fullName, email, password) {
        // const candidate = await UserModel.findOne({ email });
        // if (candidate) {
        //     throw ApiError.BadRequest(409, `Пользователь с почтовым адресом ${email} уже существует`);
        // }

        // const hashPassword = await bcrypt.hash(password, 3);
        // const generatedOTP = await generateOTP();
        // const randomColor = randomSkinToneColor();
        // const user = await UserModel.create({ fullName, email, password: hashPassword, activationLink: generatedOTP, aboutInfo: "", colorAvatar: randomColor })
        // await mailService.SendActivationMail(email, generatedOTP);

        // const userDto = new UserDto(user);
        // const tokens = tokenService.generateTokens({ ...userDto });
        // await tokenService.saveToken(userDto.id, tokens.refreshToken);

        // return {
        //     ...tokens,
        //     user: userDto
        // }

        // Проверка, существует ли уже пользователь с таким email
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw ApiError.BadRequest(409, `Пользователь с почтовым адресом ${email} уже существует`);
        }

        // Хеширование пароля перед сохранением в базу данных
        const hashPassword = await bcrypt.hash(password, 3);
        // Создание нового пользователя
        const newUser = new UserModel({
            fullName,
            email,
            password: hashPassword,
            colorAvatar: randomSkinToneColor(), // Вызов функции для генерации случайного цвета аватарки
        });

        // Сохранение пользователя в базу данных
        await newUser.save();
        // await mailService.SendActivationMail(email, generatedOTP);

        const userDto = new UserDto(newUser);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
    async login(email, password) {

        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest(404, `Пользователь с почтовым адресом ${email} не найден`);
        }

        // Проверка пароля
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw ApiError.BadRequest(401, `Неверный пароль`);
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }

    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    // async refresh(refreshToken) {
    //     if (!refreshToken) {
    //         throw ApiError.UnautorizedError();
    //     }

    //     const userData = tokenService.validateRefreshToken(refreshToken);
    //     return userData;
    //     const tokenFromDb = await tokenService.findToken(refreshToken);
    //     if (!userData || !tokenFromDb) {
    //         throw ApiError.UnautorizedError();
    //     }
    //     const user = await UserModel.findById(userData.id);
    //     const userDto = new UserDto(user);
    //     const tokens = tokenService.generateTokens({ ...userDto });;

    //     await tokenService.saveToken(userDto.id, tokens.refreshToken);
    //     return {
    //         ...tokens,
    //         user: userDto
    //     }
    // }


    async refresh(refreshToken) {
        console.log("refreshToken: ", refreshToken)
        if (!refreshToken) {
            throw ApiError.UnautorizedError();
        }
        
        const userData = tokenService.validateRefreshToken(refreshToken); // null
        const tokenFromDb = await tokenService.findToken(refreshToken);  // null

        console.log("userData: ", userData)
        console.log("tokenFromDb: ", tokenFromDb)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnautorizedError();
        }


        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }
}

module.exports = new AuthService();