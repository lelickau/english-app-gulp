export const checkedAuth = () => {
    const training = document.querySelector('.training')
    return training.getAttribute('data-auth')
}