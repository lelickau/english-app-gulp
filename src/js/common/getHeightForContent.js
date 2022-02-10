export const getHeightForContent = () => {
    const windowInnerHeight = window.innerHeight
    const heightFooter = document.querySelector('.footer').clientHeight

    const main = document.querySelector('.main')
    const style = getComputedStyle(main);
    const paddingTopMain = +(style.paddingTop).slice(0, -2)
    const paddingBottomMain = +(style.paddingBottom).slice(0, -2)

    const heightContentTense = windowInnerHeight - (paddingTopMain + heightFooter + paddingBottomMain)

    return heightContentTense
};