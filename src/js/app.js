import * as flsFunctions from './modules/functions.js';
flsFunctions.isWebp();

import foods from './data-food-a1.json'
// slides func
// const showSlides = (n) => {
//     let i

//     n === slides.length ? visibilityNextArrow(false) : visibilityNextArrow(true)

//     n === 1 ? visibilityPrevArrow(false) : visibilityPrevArrow(true)

//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none"
//     }

//     for (i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace(" tense__dot--active", "")
//         dotsText[i].className = dotsText[i].className.replace(" tense__dot-text--active", "")
//     }

//     slides[startIndex - 1].style.display = "block"
//     content.scrollTo({top: 0, left: 0, behavior: 'smooth'})
//     dots[startIndex - 1].className += " tense__dot--active"
//     dotsText[startIndex - 1].className += " tense__dot-text--active"
// }


// //////////////////////////////////////////////
if (window.location.pathname == '/trainings.html') {
    console.log('Page Training');
    const quizBox = document.querySelector('.quiz')
    const trainingMenu = document.querySelector('.training')
    const quizTestBlock = document.querySelector('.quiz-test')
    const startQuizBtn = document.querySelector('.quiz-test__btn-start')


    const createTestQuiz = () => {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        let testWords = []
        const lengthData = foods.length -1

        const randomWordsIdx = []
        for (let i = 0; i < 10; i++) {
            let int = getRandomInt(0, lengthData)
            if (randomWordsIdx.includes(int)) {
                int = getRandomInt(0, lengthData)
            }
            randomWordsIdx.push(int)
        }

        randomWordsIdx.map(idx => testWords.push(foods[idx]))

        const filterDataElement = (thema) => {
            const dataAnswars = []
            foods.filter(elem => {
                if (elem.thema === thema) {
                    dataAnswars.push(elem.translate)
                }
            })
            return dataAnswars
        }

        for (let i = 0; i < testWords.length; i++) {
            const answarsData = filterDataElement(testWords[i].thema)
            testWords[i].answars = []
            testWords[i].answars.push(testWords[i].translate)
            for (let j = 0; j < 3; j++) {
                let random = getRandomInt(0, answarsData.length - 1)
                if (testWords[i].answars.includes(random)) {
                    random = getRandomInt(0, answarsData.length - 1)
                }
                testWords[i].answars.push(answarsData[random])
            }
        }
        console.log(testWords);
        return testWords
    }

    const startQuizTest = async () => {
        const questions = await createTestQuiz()
        const quizDescrBox = document.querySelector('.quiz-test__description')
        const questionsBox = document.querySelector('.quiz-test__questions-box')

        if (questions) {
            quizDescrBox.classList.add('quiz-test__description--hidden')
            questions.forEach(item => {
                const elem = document.createElement('aside')
                elem.className = 'quiz-test__item'
                elem.innerHTML = `
                    <div class="quiz-test__item-header">
                        <div class="quiz-test__console">
                            <img class="quiz-test__console-ico" src="images/question.svg" alt="Подсказка">
                            <img class="quiz-test__console-ico" src="images/audio.svg" alt="Audio">
                        </div>
                        <div class="quiz-test__word">${item.id}</div>
                    </div>
                    <div class="quiz-test__options">
                        <button class="quiz-test__btn">${item.answars[0]}</button>
                        <button class="quiz-test__btn">${item.answars[1]}</button>
                        <button class="quiz-test__btn">${item.answars[2]}</button>
                        <button class="quiz-test__btn">${item.answars[3]}</button>
                    </div>
                    <div class="quiz-test__hint quiz-test__hint--hidden"></div>
                `
                questionsBox.appendChild(elem)
                console.log(elem);
            })
            const showSlides = (n) => {
                let startIndex = 0
                const slides = document.querySelectorAll('.quiz-test__item')
                let i

                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none"
                }

                // for (i = 0; i < dots.length; i++) {
                //     dots[i].className = dots[i].className.replace(" tense__dot--active", "")
                //     dotsText[i].className = dotsText[i].className.replace(" tense__dot-text--active", "")
                // }

                slides[startIndex].style.display = "block"
            }
            showSlides(0)
        }

    }

    startQuizBtn.addEventListener('click', startQuizTest)
}
///////////////////////////////////////

if (window.location.pathname == '/grammar.html') {
    console.log('Page Grammar');
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
    }

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


