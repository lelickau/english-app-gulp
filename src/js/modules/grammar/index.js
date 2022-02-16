import { getHeightForContent } from "../../common/getHeightForContent.js"
import { createDots } from "./createDotsProgress.js"

export const scriptsGrammarPage = () => {

    let startIndex = 1

    const slides = document.querySelectorAll(".tense__main")
    const content = document.querySelector('.tense__content')
    const arrowNext = document.querySelector('.tense__arrow-next')
    const arrowPrev = document.querySelector('.tense__arrow-prev')
    const isDoneBtn = document.querySelector('.tense__list-done')

    const dotsContent = createDots(slides.length - 1)
    const tenseProgress = document.querySelector('.tense__progress')
    tenseProgress.appendChild(dotsContent)

    const dots = document.querySelectorAll(".tense__dot")
    const doneImg = document.querySelectorAll('.tense__dot-img-hidden')


    const tenseContent = document.querySelector('.tense__content')
    tenseContent.style.cssText = `
        height: ${getHeightForContent()}px;
    `

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
        }

        slides[startIndex - 1].style.display = "block"
        content.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        dots[startIndex - 1].className += " tense__dot--active"
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
            dots[startIndex -1].style.cssText = `
                border: none;
            `
            plusSlide()
        } else {
            doneImg[startIndex -1].classList.remove('tense__dot-img-hidden')
            dots[startIndex -1].style.cssText = `
                border: none;
            `
            isDoneBtn.classList.add('tense__list-done--hidden')
        }
    }

    isDoneBtn.addEventListener('click', clickHandlerDone)

    showSlides(startIndex)
}
