import ProductModel from "../models/product.js"

export const create = async (req, res) => {
    try {
        const productItem = new ProductModel({
            title: req.body.title,
            cost: req.body.cost,
            weight: req.body.weight,
            tag: req.body.tag,
            amount: req.body.amount,
            imageUrl: req.body.imageUrl,
        })

        const product = await productItem.save();

        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can't Create Product!",
        });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const product = await ProductModel.find();

        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can't Get Products!",
        });
    }
}

export const getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProductModel.findOne({ _id: productId, },)
        res.json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can't Get Product!",
        });
    }
}

export const remove = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProductModel.deleteOne({ _id: productId, },)
        res.json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can't Delete Product!",
        });
    }
}

export const update = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProductModel.updateOne({ 
            _id: productId, 
        },{
            title: req.body.title,
            cost: req.body.cost,
            weight: req.body.weight,
            tag: req.body.tag,
            amount: req.body.amount,
            imageUrl: req.body.imageUrl,
        })
        res.json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can't Update Product!",
        });
    }
}