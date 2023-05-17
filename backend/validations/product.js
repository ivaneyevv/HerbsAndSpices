import { body } from "express-validator";

export const productValidation = [
    body('title', 'Enter the title').isLength({ min: 3}).isString(),
    body('cost', 'Enter the cost').isLength({ min: 1}).isString(),
    body('tag', 'Enter the tag').optional().isString(),
    body('amount', 'Enter the amount').isNumeric(),
    body('weight', 'Enter the weight in grams').isLength({ min: 2}).isString(),
    body('imageUrl', 'Wrong link on the image').optional().isString(), 
];
