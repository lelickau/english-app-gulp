export const authScripts = () => {
    const createAccauntBtn = document.querySelector('.auth__change-create')
    const authBtn = document.querySelector('.auth__change-auth')
    const signupForm = document.querySelector('.auth__signup')
    const loginForm = document.querySelector('.auth__login')

    createAccauntBtn.addEventListener('click', (e) => {
        loginForm.classList.add('auth__hidden')
        signupForm.classList.remove('auth__hidden')
        authBtn.classList.remove('auth__hidden')
        e.currentTarget.classList.add('auth__hidden')
    })

    authBtn.addEventListener('click', (e) => {
        loginForm.classList.remove('auth__hidden')
        signupForm.classList.add('auth__hidden')
        createAccauntBtn.classList.remove('auth__hidden')
        e.currentTarget.classList.add('auth__hidden')
    })

}