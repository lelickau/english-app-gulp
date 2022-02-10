import foods from '../../data-food-a1.json'
import pointsConntent from '../../data-points.json'
import {createProgressBar} from './progressBar.js'
import {increasePoints, checkingAnswar} from './points.js'

export const scriptsTrainingPage = () => {

    const trainingItems = document.querySelectorAll('.training__item')
    const trainingTestElems= document.querySelectorAll('.training__test')
    const trainingMenu = document.querySelector('.training')

    trainingItems.forEach((item, idx) => {
        item.addEventListener('click', (e) => {
            trainingTestElems[idx].classList.remove('training__hidden')
            trainingMenu.classList.add('training__hidden')
        })
    })

    // Quiz
    const quizTestBlock = document.querySelector('.quiz-test')
    const startQuizBtn = document.querySelector('.quiz-test__btn-start')
    const closeQuizBtn = document.querySelector('.quiz-test__close')
    const quizDescrBox = document.querySelector('.quiz-test__description')
    const questionsBox = document.querySelector('.quiz-test__questions-box')
    const quizProgress= document.querySelector('.progress')
    const quizLogo = document.querySelector('.quiz-test__logo')

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
                if (testWords[i].answars.includes(answarsData[random])) {
                    random = getRandomInt(0, answarsData.length - 1)
                }
                testWords[i].answars.push(answarsData[random])
            }
        }
        testWords.forEach(item => item.answars.sort())
        return testWords
    }

    const startQuizTest = async () => {
        let points = 0
        const questions = await createTestQuiz()

        if (questions) {
            // create progress bar
            const progressBar = createProgressBar(questions.length)

            //create quiz
            quizDescrBox.classList.add('quiz-test__hidden')
            quizLogo.classList.add('quiz-test__hidden')
            quizProgress.appendChild(progressBar)

            questions.forEach((item, idx) => {
                const elem = document.createElement('article')
                elem.className = 'quiz-test__item'
                elem.setAttribute('data-index', idx)
                elem.innerHTML = `
                    <div class="quiz-test__item-header">
                        <div class="quiz-test__console">
                            <img class="quiz-test__console-ico" src="images/question.svg" alt="Подсказка">
                            <div class="quiz-test__word">${item.id}</div>
                            <img class="quiz-test__console-ico" src="images/audio.svg" alt="Audio">
                        </div>
                    </div>
                    <div class="quiz-test__options">
                        <button class="quiz-test__btn" data-answer="${item.answars[0]}">${item.answars[0]}</button>
                        <button class="quiz-test__btn" data-answer="${item.answars[1]}">${item.answars[1]}</button>
                        <button class="quiz-test__btn" data-answer="${item.answars[2]}">${item.answars[2]}</button>
                        <button class="quiz-test__btn" data-answer="${item.answars[3]}">${item.answars[3]}</button>
                    </div>
                    <div class="quiz-test__hint quiz-test__hidden"></div>
                `
                questionsBox.appendChild(elem)
            })

            const getPointsContent = () => {
                const content  = pointsConntent.filter(p => p.max >= points && p.min <= points)
                return content
            }

            const finishTesting = () => {
                const content = getPointsContent()
                console.log(content)
                const finishElem = document.createElement('article')
                finishElem.className = 'quiz-test__results'
                finishElem.innerHTML = `
                    <div class="quiz-test__points">
                        <div class="quiz-test__point-num">${points}</div>
                        <div class="quiz-test__ico">
                        <svg width="107" height="51" viewBox="0 0 107 51" fill="none">
                            <path d="M31.5441 11.4591L21.0969 9.2541L15.772 0V25.6429L25.5194 30L24.388 19.3829L31.5441 11.4591Z" fill="#${content[0].color[0]}"/>
                            <path d="M10.4472 9.2541L0 11.4591L7.1561 19.3829L6.02467 30L15.7721 25.6429V0L10.4472 9.2541Z" fill="#${content[0].color[1]}"/>
                        <path d="M74.9998 25.6206L60.7585 22.6149L53.4998 10V44.9556L66.7872 50.895L65.2448 36.4221L74.9998 25.6206Z" fill="#${content[0].color[0]}"/>
                        <path d="M46.2413 22.6149L32 25.6206L41.755 36.4221L40.2126 50.895L53.5 44.9556V10L46.2413 22.6149Z" fill="#${content[0].color[1]}"/>
                            <path d="M106.544 11.4591L96.0969 9.2541L90.772 0V25.6429L100.519 30L99.388 19.3829L106.544 11.4591Z" fill="#${content[0].color[0]}"/>
                            <path d="M85.4472 9.2541L75 11.4591L82.1561 19.3829L81.0247 30L90.7721 25.6429V0L85.4472 9.2541Z" fill="#${content[0].color[1]}"/>
                        </svg>
                        </div>
                        </div>
                        <div class="quiz-test__point-text">${content[0].text}</div>
                `

                questionsBox.appendChild(finishElem)
            }

            let startIndex = 0
            const nextQuestion = (n) => {
                const slides = document.querySelectorAll('.quiz-test__item')
                let i

                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none"
                }

                if (n === slides.length) {
                    finishTesting()
                } else {
                    slides[startIndex].style.display = "block"
                }

            }
            nextQuestion(0)

            //

            const answersBtn = document.querySelectorAll('.quiz-test__btn')
            answersBtn.forEach(el => {
                el.addEventListener('click', () => {
                    const numberQuestion = el.parentNode.parentNode.getAttribute('data-index')
                    const answer = el.getAttribute('data-answer')

                    if (questions[numberQuestion].translate === answer) {
                        checkingAnswar(questions.length -1, startIndex)
                        points = increasePoints(points, 10)
                        nextQuestion(startIndex += 1)

                    } else {
                        checkingAnswar(questions.length -1, startIndex, false)
                        nextQuestion(startIndex += 1)
                    }
                })
            })
        }
    }

    const closeTest = (e) => {
        e.preventDefault()
        quizDescrBox.classList.remove('quiz-test__hidden')
        questionsBox.innerHTML = ''
        quizTestBlock.classList.add('training__hidden')
        trainingMenu.classList.remove('training__hidden')
    }

    closeQuizBtn.addEventListener('click', closeTest)

    startQuizBtn.addEventListener('click', startQuizTest)
}