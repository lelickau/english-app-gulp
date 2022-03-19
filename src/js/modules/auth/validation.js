export const validateForm = () => {
    const login = window.location.pathname.indexOf('/login') !== -1
    const forgot = window.location.pathname.indexOf('/forgot') !== -1
    const signup = window.location.pathname.indexOf('/signup') !== -1
    const recover = window.location.pathname.indexOf('/recover') !== -1

    const formInputs = document.querySelectorAll('.auth__input')

    formInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            input.classList.remove('error')
            const sibling = input.previousElementSibling
                if (sibling) {
                    sibling.innerHTML = ''
                }
        })
    })

    const validateLogin = (login) => {
        if (String(login).length > 13) {
            return false
        } else {
            return true
        }
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase())
    }

    const addError = (inputElem, errorMsg) => {
        inputElem.classList.add('error')
        const sibling = inputElem.previousElementSibling

        if (sibling) {
            sibling.innerHTML = errorMsg
            return false
        }
    }

    const checkedInputs = () => {
        return Array.from(formInputs).filter(input => input.value === '')
    }

    const showErrorIfInputEmpty = () => {
        formInputs.forEach(input => {

            if (input.value === '') {
                input.classList.add('error')
                const inputPlaceholder = input.getAttribute('placeholder')
                const sibling = input.previousElementSibling
                if (sibling) {
                    sibling.innerHTML = `${inputPlaceholder} обязательно для заполнения`
                }
            } else {
                input.classList.remove('error')
            }
        })
    }

    if (signup) {
        const form = document.querySelector('.auth__signup')
        const inputEmail = document.querySelector('.auth__email')
        const inputPass = document.querySelector('.auth__password')
        const inputRepeatPass = document.querySelector('.auth__repeatPassword')
        const inputLogin = document.querySelector('.auth__username')

        form.onsubmit = function () {
            let loginVal = inputLogin.value
            let emailVal = inputEmail.value
            let passVal = inputPass.value
            let repeatPassVal = inputRepeatPass.value

            showErrorIfInputEmpty()

            const emptyInputs = checkedInputs()
            if (emptyInputs.length !== 0) {
                return false
            }

            if (!validateLogin(loginVal)) {
                return addError(inputLogin, `Длина логина не должна превышать 12 символов`)
            } else {
                inputLogin.classList.remove('error')
            }

            if(!validateEmail(emailVal)) {
                return addError(inputEmail, `Некорректный Email`)
            } else {
                inputEmail.classList.remove('error')
            }

            if(passVal !== repeatPassVal) {
                return addError(inputRepeatPass, `Пороли не совпадают`)
            } else {
                inputRepeatPass.classList.remove('error')
            }
        }

    }

    if (recover) {
        const form = document.querySelector('.auth__recover')
        const inputPass = document.querySelector('.auth__password')
        const inputRepeatPass = document.querySelector('.auth__repeatPassword')

        form.onsubmit = function () {
            let passVal = inputPass.value
            let repeatPassVal = inputRepeatPass.value

            showErrorIfInputEmpty()

            const emptyInputs = checkedInputs()
            if (emptyInputs.length !== 0) {
                return false
            }

            if(passVal !== repeatPassVal) {
                return addError(inputRepeatPass, `Пороли не совпадают`)
            } else {
                inputRepeatPass.classList.remove('error')
            }
        }

    }

    if (login || forgot) {
        let form;
        const inputEmail = document.querySelector('.auth__email')

        if (login) form = document.querySelector('.auth__login')
        if (forgot) form = document.querySelector('.auth__forgot')

        form.onsubmit = function () {
            let emailVal = inputEmail.value

            showErrorIfInputEmpty()

            const emptyInputs = checkedInputs()
            if (emptyInputs.length !== 0) {
                return false
            }

            if(!validateEmail(emailVal)) {
                return addError(inputEmail, `Некорректный Email`)
            } else {
                inputEmail.classList.remove('error')
            }
        }

    }


}