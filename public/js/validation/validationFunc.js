
const validate = (field,regex)=>{
    if(field.value.test(regex))return true;
    return false;
}
module.exports = validate;