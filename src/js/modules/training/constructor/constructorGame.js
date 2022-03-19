import a1  from '../../../data/data-a1.json'
import { htmlTestResults } from "../htmlTestResults.js"
import { checkingAnswar, increasePoints } from "../points.js"
import { createProgressBar, createProgressPoint } from "../progressBar.js"
import { createConstructorTest } from "./createConstructorTest.js"

export const constructorGame = () => {
    const constructorTestBlock = document.querySelector('.constructor')
    const startConstructorGameBtn = document.querySelector('.constructor__btn-start')
    const closeConstructorGameBtn = document.querySelector('.constructor__close')
    const constructorTestDescrBox = document.querySelector('.constructor__description')
    const constructorTestLogo = document.querySelector('.constructor__logo')
    const questionsBox = document.querySelector('.constructor__questions-box')

    constructorTestBlock.classList.remove('constructor__hidden')

    const cteateContentConstructorWord = (word) => {
        return `
            <div class="constructor__answer-word">${word}</div>
        `
    }

    const finishTesting = (points, level, testData) => {
        if (points < 0) points = 0

        const finishElem = htmlTestResults('constructor', points, level, testData)
        questionsBox.appendChild(finishElem)
    }

    const startConstructorTest = (level) => {
        let points = 0
        const testData = []
        const questions = createConstructorTest(level)

        if (questions) {
            const constructorHeader = document.querySelector('.constructor__header')
            const progressPoint = createProgressPoint('.progress__constructor')
            constructorHeader.insertAdjacentElement('afterbegin', progressPoint)

            const progressBar = createProgressBar(questions.length)
            progressPoint.appendChild(progressBar)

            constructorTestDescrBox.classList.add('constructor__hidden')
            constructorTestLogo.classList.add('constructor__hidden')

            questions.forEach((item, idx) => {
                const elem = document.createElement('article')
                elem.className = 'constructor__item'
                elem.setAttribute('data-index', idx)

                const createBtnConstructor = () => {
                    let html = ''
                    item.construct.forEach((letter, i) => html+=`<button class="constructor__btn" data-answer="${letter}" data-index="${idx}">${letter}</button>`)

                    return html
                }

                const construct = createBtnConstructor()

                elem.innerHTML = `
                    <div class="constructor__item-header">
                        <div class="constructor__console">
                            <div class="constructor__word">${item.translate}</div>
                        </div>
                        <div class="constructor__answar answer-${idx}" data-answer data-mistake></div>
                    </div>
                    <div class="constructor__options">
                        ${construct}
                    </div>
                `
                questionsBox.appendChild(elem)
            })

            let startIndex = 0
            const nextQuestion = (n) => {
                const questionsItems = document.querySelectorAll('.constructor__item')
                let i

                for (i = 0; i < questionsItems.length; i++) {
                    questionsItems[i].style.display = "none"
                }

                if (n === questionsItems.length) {
                    finishTesting(points, 'Beginner', testData)
                } else {
                    questionsItems[startIndex].style.display = "block"
                }

            }
            nextQuestion(0)

            //
            const answersBtns = document.querySelectorAll('.constructor__btn')
            const deleteErrorClass = () => {
                answersBtns.forEach(elem => {
                    elem.classList.remove('error')
                })
            }

            const showCorrectAnswer = (isMistake) => {
                if (!isMistake) {
                    document.querySelectorAll('.constructor__answer-word').forEach(elem => {
                        elem.classList.add('correct')
                    })
                } else {
                    document.querySelectorAll('.constructor__answer-word').forEach(elem => {
                        elem.classList.add('correct-mistake')
                    })
                }
            }

            const checkanswer = (e) => {
                const answerIdx = e.currentTarget.getAttribute('data-index')
                const btnLetter = e.currentTarget.getAttribute('data-answer')
                const answerBox = document.querySelector(`.answer-${answerIdx}`)
                const answerData = answerBox.getAttribute('data-answer')

                const questionData = questions[answerIdx]
                const lengthAnswer = answerData.length
                let answarFinish = ''
                const id = questionData.id

                if (btnLetter === questionData.answer[lengthAnswer]) {
                    answarFinish += answerData + btnLetter
                    answerBox.setAttribute('data-answer', answarFinish)
                    e.currentTarget.style.display = "none"
                    points = increasePoints(points, 10)
                    const word = cteateContentConstructorWord(btnLetter)
                    answerBox.insertAdjacentHTML('beforeend', word)
                    if (answarFinish === questionData.id) {
                        const mistake = answerBox.getAttribute('data-mistake')
                        if (mistake) {
                            testData.push([id, -25])
                        } else {
                            testData.push([id, 25])
                        }
                        showCorrectAnswer(mistake)
                        setTimeout(() => {
                            checkingAnswar(questions.length -1, startIndex, Boolean(!mistake))
                            nextQuestion(startIndex += 1)
                        }, 2000)
                    }
                } else {
                    answerBox.setAttribute('data-mistake', 'true')
                    points = increasePoints(points, -5)
                    e.currentTarget.classList.add('error')
                    setTimeout(deleteErrorClass, 1000)
                }

            }
            answersBtns.forEach(btn => btn.addEventListener('click', checkanswer))
        }
    }

    const closeTest = (e) => {
        window.location.reload()
    }

    closeConstructorGameBtn.addEventListener('click', closeTest)
    startConstructorGameBtn.addEventListener('click', () => {
        startConstructorTest(a1)
    })
}