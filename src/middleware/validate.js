const Joi = require("joi");
const pick = require("../helper/pick");

const validate = (schema) => async (req, res, next) => {
    try {
        // console.log(schema, req, Object.keys(schema));

        const obj = pick(req, Object.keys(schema))

        console.log(obj);

        const { value, error } = await
            Joi.compile(schema)
                .prefs({
                    abortEarly: false
                })
                .validate(obj);

        console.log(value, error);

        if (error) {
            const err = error.details.map((v) => v.message).join(",")

            console.log(err);

            return res.status(400)
                .json({
                    success: false,
                    message: 'validation error ' + err
                })
        }

        Object.assign(req, value)

        next()

    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: 'error in server' + error.message
            })
    }
}

module.exports = validate