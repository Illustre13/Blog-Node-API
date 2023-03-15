const Joi =  require("joi");

const validator = (schema) => (payload) =>
    schema.validate(payload, {abortEarly: false});

    const signup_schema = Joi.object({
        username: Joi.string().alphanum().required(),
        email: Joi.string().email().required(),
        password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).max(16).required(),
        role: Joi.string(),
        rePassword: Joi.ref('password'),
        //repeat_password: Joi.ref('password'),
       // password: Joi.string().min(8).max(16).required(),
      });

      const signin_schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).max(16).required(),

      });

      exports.validateSignup = validator(signup_schema);
      exports.validateSignin = validator(signin_schema);