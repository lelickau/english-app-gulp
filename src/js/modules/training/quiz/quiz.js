import foods from '../../../data/data-food-a1.json'
import {createProgressBar} from '../progressBar.js'
import {increasePoints, checkingAnswar} from '../points.js'
import {playAudio} from '../../audio/play.js'
import {createHint} from '../../hint/hint.js'
import { createTestQuiz } from './createQuizTest.js'
import { htmlTestResults } from '../htmlTestResults.js'

export const quizTest = () => {
    const trainingMenu = document.querySelector('.training')

    const quizTestBlock = document.querySelector('.quiz')
    const startQuizBtn = document.querySelector('.quiz__btn-start')
    const closeQuizBtn = document.querySelector('.quiz__close')
    const quizDescrBox = document.querySelector('.quiz__description')
    const questionsBox = document.querySelector('.quiz__questions-box')
    const quizProgress= document.querySelector('.progress')
    const quizLogo = document.querySelector('.quiz__logo')

    quizTestBlock.classList.remove('quiz__hidden')

    const startQuizTest = async () => {
        let points = 0
        const questions = await createTestQuiz(foods) // //*

        if (questions) {
            const progressBar = createProgressBar(questions.length)

            quizDescrBox.classList.add('quiz__hidden')
            quizLogo.classList.add('quiz__hidden')
            quizProgress.appendChild(progressBar)

            questions.forEach((item, idx) => {
                const hint = createHint(item.definitions)
                const elem = document.createElement('article')
                elem.className = 'quiz__item'
                elem.setAttribute('data-index', idx)
                elem.innerHTML = `
                    <div class="quiz__item-header">
                        <div class="quiz__console">
                            <img class="quiz__console-ico quiz__show-hint" src="images/question.svg" alt="Подсказка">
                            <div class="quiz__word">${item.id}</div>
                            <img class="quiz__console-ico quiz__audio-ico" src="images/audio.svg" alt="Audio" data-audio-src="${item.mp3}">
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

            const finishTesting = () => {
                const finishElem = htmlTestResults('quiz', points)
                questionsBox.appendChild(finishElem)
            }

            let startIndex = 0
            const nextQuestion = (n) => {
                const questionsItems = document.querySelectorAll('.quiz__item')
                let i

                for (i = 0; i < questionsItems.length; i++) {
                    questionsItems[i].style.display = "none"
                }

                if (n === questionsItems.length) {
                    finishTesting()
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

                    if (questions[questionNumber].translate === answer) {
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
        quizDescrBox.classList.remove('quiz__hidden')
        questionsBox.innerHTML = ''
        quizTestBlock.classList.add('quiz__hidden')
        trainingMenu.classList.remove('training__hidden')
    }

    closeQuizBtn.addEventListener('click', closeTest)

    startQuizBtn.addEventListener('click', startQuizTest)
}