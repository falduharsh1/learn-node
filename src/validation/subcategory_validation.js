const Joi = require("joi");

const addsubCategory = {
    body : Joi.object().keys({
        name :  Joi.string().required().trim(),
        description : Joi.string().required(),
    })
}

const updatesubCategory = {
    params : Joi.object().keys({
        id :  Joi.string().required()
    }),
    body : Joi.object().keys({
        name :  Joi.string().required(),
        description : Joi.string().required(),
    })
}

const deletesubCategory = {
    params : Joi.object().keys({
        id :  Joi.string().required()
    })
}


module.exports = {
    addsubCategory,
    updatesubCategory,
    deletesubCategory
}