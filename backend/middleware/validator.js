
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(new Error(error.details[0].message));
        } else {
            next(); 
        }
    };
};
module.exports = {
    validate,
};