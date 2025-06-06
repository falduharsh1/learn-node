const Joi = require("joi");

const addCategory = {
    body : Joi.object().keys({
        name :  Joi.string().required().trim(),
        description : Joi.string().required(),
    })
}

const updateCategory = {
    params : Joi.object().keys({
        id :  Joi.string().required()
    }),
    body : Joi.object().keys({
        name :  Joi.string().required(),
        description : Joi.string().required(),
        cat_img : Joi.object()
    })
}

const deleteCategory = {
    params : Joi.object().keys({
        id :  Joi.string().required()
    })
}


module.exports = {
    addCategory,
    updateCategory,
    deleteCategory
}