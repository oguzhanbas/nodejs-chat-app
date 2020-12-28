let registerButton = document.querySelector('#registerButton');
let errorForm = false;

const errorMessages = {
    nameRequired: "Lütfen isminizi giriniz.",
    surnameRequired: "Lütfen soyisminizi giriniz.",
    emailRequired: "Lütfen email adresinizi giriniz.",
    emailValidate: "Lütfen geçerli email adresi giriniz.",
    passwordRequired: "Lütfen şifrenizi giriniz.",
    passwordNotEqual: "Şifreleriniz eşleşmiyor."
}
const isRequired = (data = []) => {
    data.map(({element,errorMsg}) => {
        varible = element.value;
        varible = varible.replace(/\s/g, '');
        return varible.length == 0 ? error(element, errorMsg) : true
    })  
}

const isEmail = (element, errorMsg) => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(element.value) ? true : error(element, errorMsg)
}

const isEqual = (element1, element2, errorMsg) => {
    if (element1.value !== element2.value) {
        error(element1, errorMsg);
        error(element2, errorMsg);
    }
}

const error = (element, message) => {
    element.parentElement.classList.add("alert-validate");
    element.parentElement.setAttribute("data-validate", message);
    errorForm = true;
}

const clearErrors = (element = []) => {
    element.map(el => {
        el.parentElement.classList.remove("alert-validate");
        el.parentElement.removeAttribute("data-validate");
    });
    errorForm = false;
}


registerButton.addEventListener('click', (e) => {
    let name = document.querySelector('input[name="name"]');
    let surname = document.querySelector('input[name="surname"]');
    let email = document.querySelector('input[name="mail"]');
    let password = document.querySelector('input[name="password"]');
    let repeatPassword = document.querySelector('input[name="repeatPassword"]');
    clearErrors([name,surname,email,password,repeatPassword]);
    isEmail(email, errorMessages.emailValidate);
    isEqual(password, repeatPassword, errorMessages.passwordNotEqual);
    isRequired([
        {element : name , errorMsg : errorMessages.nameRequired },
        {element : surname , errorMsg : errorMessages.surnameRequired },
        {element : email , errorMsg : errorMessages.emailRequired },
        {element : password , errorMsg : errorMessages.passwordRequired },
        {element : repeatPassword , errorMsg : errorMessages.passwordRequired },
    ]);

    if(errorForm){
        e.preventDefault();
    }
    
});

