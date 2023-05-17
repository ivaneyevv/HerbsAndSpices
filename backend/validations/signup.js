import { body } from "express-validator";

export const signUpValidation = [
    body('nickName', 'Nickname must contain more than 4 symbols!').isLength({ min: 4}),
    body('email', 'Wrong email format!').isEmail(),
    body('password', 'Password must contain more than 8 symbols!').isLength({ min: 8}),
];
