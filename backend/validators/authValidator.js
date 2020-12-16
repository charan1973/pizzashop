const Joi = require("@hapi/joi")

exports.signupValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6)
    })
    return schema.validate(data)
}

exports.signinValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}