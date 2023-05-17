import express from 'express';
import mongoose from 'mongoose';

import { signUpValidation } from './validations/signup.js';
import { productValidation } from './validations/product.js';

import checkLogIn from './utility/checkLogIn.js';

import { signUp, logIn, account } from './controllers/userController.js';
import * as productController from './controllers/productController.js';

mongoose
    .connect('mongodb+srv://admin:YDpoOF31VSiP3vgq@cluster0.mzhyhr9.mongodb.net/shop')
    .then(() => console.log("Database is ok"))
    .catch((err) => console.log("Database is not ok", err));


const app = express();

app.use(express.json());

app.post('/signup', signUp)
app.post('/login', signUpValidation, logIn)
app.get('/account', checkLogIn, account)


app.get('/product', productController.getAllProducts)
app.get('/product/:id', productController.getProduct)
app.post('/product', checkLogIn, productValidation, productController.create);
app.delete('/product/:id', checkLogIn, productController.remove);
app.patch('/product/:id', checkLogIn, productValidation, productController.update);

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log("server is ok");
});