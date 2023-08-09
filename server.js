const mongoose = require("mongoose")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const fieldRouter = require("./router/fieldRouter");
const wordRouter = require("./router/wordRouter");
const errorMiddleware = require('./middlewares/error-middleware1')
const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json());
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/fields", fieldRouter);
app.use("/words", wordRouter);
app.use(errorMiddleware);
app.use('/uploads', express.static('uploads'))

// Настройки CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Укажите адрес вашего фронтенда
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Укажите разрешенные методы
    next();
});
const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://sherbakov20041:qweasdzxc2@cluster0.ghp2bhd.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => {
                console.log('Connected to MongoDB');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB', error);
            });
        app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))

    } catch (e) {
        console.log(e);
    }
}

start();
