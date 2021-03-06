import a1 from '../../../data/data-a1.json'
import {createProgressBar, createProgressPoint} from '../progressBar.js'
import {increasePoints, checkingAnswar} from '../points.js'
import {playAudio} from '../../audio/play.js'
import {createHint} from '../../hint/hint.js'
import { createTestQuiz } from './createQuizTest.js'
import { htmlTestResults } from '../htmlTestResults.js'

export const quizTest = () => {

    const quizTestBlock = document.querySelector('.quiz')
    const startQuizBtn = document.querySelector('.quiz__btn-start')
    const closeQuizBtn = document.querySelector('.quiz__close')
    const quizDescrBox = document.querySelector('.quiz__description')
    const questionsBox = document.querySelector('.quiz__questions-box')
    const quizLogo = document.querySelector('.quiz__logo')

    quizTestBlock.classList.remove('quiz__hidden')

    const finishTesting = (points, level, testData) => {
        const finishElem = htmlTestResults('quiz', points, level, testData)
        questionsBox.appendChild(finishElem)
    }

    const startQuizTest = (level) => {
        let points = 0
        const testData = []
        const questions = createTestQuiz(level) // //*

        if (questions) {
            const quizHeader = document.querySelector('.quiz__header')
            const progressPoint = createProgressPoint('.progress__quiz')
            quizHeader.insertAdjacentElement('afterbegin', progressPoint)

            const progressBar = createProgressBar(questions.length)

            quizDescrBox.classList.add('quiz__hidden')
            quizLogo.classList.add('quiz__hidden')
            progressPoint.appendChild(progressBar)

            questions.forEach((item, idx) => {
                const hint = createHint(item.definitions)
                const elem = document.createElement('article')
                elem.className = 'quiz__item'
                elem.setAttribute('data-index', idx)
                elem.innerHTML = `
                    <div class="quiz__item-header">
                        <div class="quiz__console">
                            <img class="quiz__console-ico quiz__show-hint" src="images/question.svg" alt="??????????????????">
                            <div class="quiz__word">${item.id}</div>
                            ${item.mp3 ? `<img class="quiz__console-ico quiz__audio-ico" src="images/audio.svg" alt="Audio" data-audio-src="${item.mp3}">`: "<div class='quiz__console-ico'></div>"}
                        </div>
                    </div>
                    <div class="quiz__options">
                        <button class="quiz__btn" data-answer="${item.answars[0]}">${item.answars[0]}</button>
                        <button class="quiz__btn" data-answer="${item.answars[1]}">${item.answars[1]}</button>
                        <button class="quiz__btn" data-answer="${item.answars[2]}">${item.answars[2]}</button>
                        <button class="quiz__btn" data-answer="${item.answars[3]}">${item.answars[3]}</button>
                    </div>
                    <div class="quiz__hint quiz__hidden">
                        ${hint}
                    </div>
                `
                questionsBox.appendChild(elem)
            })

            // audio
            const audioIco = document.querySelectorAll('.quiz__audio-ico')
            audioIco.forEach((elem) => {
                elem.addEventListener('click', () => {
                    const audioSrc = elem.getAttribute('data-audio-src')
                    playAudio(audioSrc)
                })
            })

            // hint
            const hintBtn = document.querySelectorAll('.quiz__show-hint')
            hintBtn.forEach((elem, idx) => {
                elem.addEventListener('click', () => {
                    const quizHints = document.querySelectorAll('.quiz__hint')
                    quizHints[idx].classList.remove('quiz__hidden')
                })
            })

            let startIndex = 0
            const nextQuestion = (n) => {
                const questionsItems = document.querySelectorAll('.quiz__item')
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

            const answersBtn = document.querySelectorAll('.quiz__btn')
            answersBtn.forEach(btn => {
                btn.addEventListener('click', () => {
                    const questionNumber = btn.parentNode.parentNode.getAttribute('data-index')
                    const answer = btn.getAttribute('data-answer')
                    const id = questions[questionNumber].id

                    if (questions[questionNumber].translate === answer) {
                        checkingAnswar(questions.length -1, startIndex)
                        points = increasePoints(points, 100)
                        testData.push([id, 25])
                        nextQuestion(startIndex += 1)

                    } else {
                        checkingAnswar(questions.length -1, startIndex, false)
                        testData.push([id, -25])
                        nextQuestion(startIndex += 1)
                    }
                })
            })
        }
    }

    const closeTest = (e) => {
        window.location.reload()
    }

    closeQuizBtn.addEventListener('click', closeTest)

    startQuizBtn.addEventListener('click', () => {
        startQuizTest(a1)
    })
}