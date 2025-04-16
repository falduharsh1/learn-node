const pick = require("../helper/pick");

const validate = (schema) => (req,res,next) => {
    try {
        console.log(schema,req,Object.keys(schema));

        const obj = pick(req,Object.keys(schema))

        console.log(obj);
        
        
    } catch (error) {
        
    }
}

module.exports = validate