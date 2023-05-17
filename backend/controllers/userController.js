import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';

import UserModel from '../models/user.js'

export const signUp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            nickName: req.body.nickName,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
        },'tokenHash',
        {
            expiresIn: '180d',
        },
        )

        const { passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can't Sign Up!",
        });
    }
};

export const logIn = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({
                message: 'User not found!'
            });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPassword){
            return res.status(404).json(
                {
                    message: 'Wrong password!'
                }
            )
        }

        const token = jwt.sign({
            _id: user._id,
        },'tokenHash',
        {
            expiresIn: '180d',
        },
        )

        const { passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can't Log In"
        })
    }
}

export const account = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json(
                {
                    message: 'User Not Found!'
                }
            )
        }

        const { passwordHash, ...userData} = user._doc;

        res.json(userData);
    } catch (error) {
        res.status(403).json(
            {
                message: 'No Access',
            }
        )
    }
}