
export const scriptsGrammarPage = () => {
    const getHeightForContent = () => {
        const windowInnerHeight = window.innerHeight
        const heightFooter = document.querySelector('.footer').clientHeight

        const main = document.querySelector('.main')
        const style = getComputedStyle(main);
        const paddingTopMain = +(style.paddingTop).slice(0, -2)
        const paddingBottomMain = +(style.paddingBottom).slice(0, -2)

        const heightContentTense = windowInnerHeight - (paddingTopMain + heightFooter + paddingBottomMain)
        console.log(heightContentTense)

        return heightContentTense
    };

    const tenseContent = document.querySelector('.tense__content')
    tenseContent.style.cssText = `
        height: ${getHeightForContent()}px;
    `

    if (navigator.userAgent.includes('Firefox')) {
        const tenseBottom = document.querySelector('.tense__footer')
        tenseBottom.classList.remove('hidden')
    }
    /////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////

    // slider
    let startIndex = 1

    const tenseHeaderClose = document.querySelector(".tense__header-close")
    const tenses = document.querySelector(".tenses")
    const tense = document.querySelector(".tense")
    const tensesLinks = document.querySelectorAll('.tenses__link')

    const slides = document.querySelectorAll(".tense__main")
    const dots = document.querySelectorAll(".tense__dot")
    const dotsText = document.querySelectorAll(".tense__dot-text")
    const content = document.querySelector('.tense__content')
    const arrowNext = document.querySelector('.tense__arrow-next')
    const arrowPrev = document.querySelector('.tense__arrow-prev')
    const isDoneBtn = document.querySelector('.tense__list-done')
    const doneImg = document.querySelectorAll('.tense__dot-img-hidden')

    const openContentTense = (e) => {
        e.preventDefault()
        const targetAttr = e.target.id
        const content = document.querySelector(`.tense[data-tense-id="${targetAttr}"]`)
        content.classList.remove('tense__hidden')
        tenses.classList.add('tenses__hidden')
    }
    tensesLinks.forEach(link => link.addEventListener('click', openContentTense))


    const closeContent = (e) => {
        tense.classList.add('tense__hidden')
        tenses.classList.remove('tenses__hidden')
    }

    const visibilityNextArrow = (val) => {
        if (val) {
            arrowNext.style.cssText = `
            visibility: visible;
            `
        } else {
            arrowNext.style.cssText = `
            visibility: hidden;
            `
        }
    }

    const visibilityPrevArrow = (val) => {
        if (val) {
            arrowPrev.style.cssText = `
            visibility: visible;
            `
        } else {
            arrowPrev.style.cssText = `
            visibility: hidden;
            `
        }
    }

    const showSlides = (n) => {
        let i

        n === slides.length ? visibilityNextArrow(false) : visibilityNextArrow(true)

        n === 1 ? visibilityPrevArrow(false) : visibilityPrevArrow(true)

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"
        }

        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" tense__dot--active", "")
            dotsText[i].className = dotsText[i].className.replace(" tense__dot-text--active", "")
        }

        slides[startIndex - 1].style.display = "block"
        content.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        dots[startIndex - 1].className += " tense__dot--active"
        dotsText[startIndex - 1].className += " tense__dot-text--active"
    }

    const plusSlide = () => {
        showSlides(startIndex += 1)
    }

    const minusSlide = () => {
        showSlides(startIndex -= 1)
    }

    const clickHandlerNext = (e) => {
        plusSlide()
    }

    const clickHandlerPrev = (e) => {
        minusSlide()
    }

    arrowNext.addEventListener('click', clickHandlerNext)
    arrowPrev.addEventListener('click', clickHandlerPrev)

    const clickHandlerDone = (e) => {
        if (startIndex < slides.length) {
            doneImg[startIndex -1].classList.remove('tense__dot-img-hidden')
            dotsText[startIndex -1].classList.add('tense__dot-text--hidden')
            dots[startIndex -1].style.cssText = `
                border: none;
            `
            plusSlide()
        } else {
            doneImg[startIndex -1].classList.remove('tense__dot-img-hidden')
            dotsText[startIndex -1].classList.add('tense__dot-text--hidden')
            dots[startIndex -1].style.cssText = `
                border: none;
            `
        }
    }

    isDoneBtn.addEventListener('click', clickHandlerDone)


    tenseHeaderClose.addEventListener('click', closeContent)

    showSlides(startIndex)


}
