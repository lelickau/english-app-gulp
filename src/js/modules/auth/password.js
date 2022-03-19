export const showOrHidePassword = () => {

    const login = window.location.pathname.indexOf('/login') !== -1
    const signup = window.location.pathname.indexOf('/signup') !== -1
    const recover = window.location.pathname.indexOf('/recover') !== -1

    const changeTypeInput = (input) => {
        if (input.getAttribute('type') === 'password') {
            input.setAttribute('type', 'text')
        } else {
            input.setAttribute('type', 'password')
        }
        return false
    }

    const togglePassword = (input, classImgHide, classImgShow) => {
        const hidePassImg = document.querySelector(classImgHide)
        const showPassImg = document.querySelector(classImgShow)
        hidePassImg.classList.toggle('auth__hidden')
        showPassImg.classList.toggle('auth__hidden')
        changeTypeInput(input)
    }

    if (signup || recover) {
        // inputs
        const inputPassword = document.querySelector('.auth__password')
        const inputRepeadPassword = document.querySelector('.auth__repeatPassword')
        //btns
        const togglePassBtn = document.querySelector('.auth__toggle-pass')
        togglePassBtn.addEventListener('click', (e) => {
            togglePassword(
                inputPassword,
                '.auth__hide-pass-img',
                '.auth__show-pass-img'
                )
        })

        const toggleRepeatPassBtn = document.querySelector('.auth__toggle-repeat-pass')
        toggleRepeatPassBtn.addEventListener('click', (e) => {
            togglePassword(
                inputRepeadPassword,
                '.auth__hide-repeat-pass-img',
                '.auth__show-repeat-pass-img'
                )
        })

    }

    if (login) {
        // input
        const inputPassword = document.querySelector('.auth__password')
        //btn
        const togglePassBtn = document.querySelector('.auth__toggle-pass')
        togglePassBtn.addEventListener('click', (e) => {
            togglePassword(
                inputPassword,
                '.auth__hide-pass-img',
                '.auth__show-pass-img'
                )
        })
    }
}