const validate = (field, regex, cb) => {
    let notAccepteable = [];
    const keys = Object.keys(field)
    for (let i = 0; i < keys.length; i++) {
        if (!regex[i].test(field[keys[i]])) {
            notAccepteable.push(keys[i]);
        }
    }
    if (notAccepteable.length > 0) {
        swal(text: `make sure you fill the following fields ${unaccepteable.join(',')}`, type: "warning");
        return cb(false);
    }
    return cb(true);
};
const ToggleDisplay = (prev, next) => {
    prev.style.display = "none";
    next.style.display = "block";
};
const getElement = (val,id) => {
    let item;
    if(val){
    return item = document.getElementById(id).value;}
    return item = document.getElementById(id);
}
module.exports = { validate, ToggleDisplay, getElement , getBtn};