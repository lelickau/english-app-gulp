import { createTestBelieveGame } from "./createTestBelieveGame.js"
import { playAudio } from "../../audio/play.js"
import {increasePoints, checkingAnswar} from '../points.js'
import { createProgressPoint } from "../progressBar.js"
import { htmlTestResults } from "../htmlTestResults.js"

export const believeGame = () => {

    const trainingMenu = document.querySelector('.training')

    const believeTestBlock = document.querySelector('.believe')
    const startBelieveGameBtn = document.querySelector('.believe__btn-start')
    const closeBelieveGameBtn = document.querySelector('.believe__close')
    const believeTestDescrBox = document.querySelector('.believe__description')
    const believeTestLogo = document.querySelector('.believe__logo')
    const questionsBox = document.querySelector('.believe__questions-box')
    const believeOptions = document.querySelector('.believe__options')

    believeTestBlock.classList.remove('believe__hidden')

    const finishTest = (points) => {
        const finishElem = htmlTestResults('believe', points)
        questionsBox.innerHTML = ''
        believeOptions.classList.add('believe__hidden')
        questionsBox.appendChild(finishElem)
    }

    const startBelieveGameTest = (e) => {
        let points = 0
        const questions = createTestBelieveGame()

        if (questions) {
            believeOptions.classList.remove('believe__hidden')

            const believeHeader = document.querySelector('.believe__header')
            const progressPoint = createProgressPoint('.progress__believe')
            believeHeader.insertAdjacentElement('afterbegin', progressPoint)

            const progressBelieve = document.querySelector('.progress__believe')
            const deadline = document.createElement('div')
            deadline.className = 'progress__deadline'
            progressBelieve.insertAdjacentElement('afterbegin', deadline)

            believeTestDescrBox.classList.add('believe__hidden')
            believeTestLogo.classList.add('believe__hidden')

            questions.forEach((item, idx) => {
                const elem = document.createElement('article')
                elem.className = 'believe__item'
                elem.setAttribute('data-index', idx)
                elem.innerHTML = `
                    <div class="believe__item-header">
                        <div class="believe__console">
                            <div class="believe__word">${item.id} - ${item.answar}</div>
                            ${item.mp3 ? `<img class="believe__console-ico believe__audio-ico" src="images/audio.svg" alt="Audio" data-audio-src="${item.mp3}">` : ''}
                        </div>
                    </div>
                `
                questionsBox.appendChild(elem)
            })

            // audio
            const audioIco = document.querySelectorAll('.believe__audio-ico')
            audioIco.forEach((elem) => {
                elem.addEventListener('click', () => {
                    const audioSrc = elem.getAttribute('data-audio-src')
                    playAudio(audioSrc)
                })
            })

            let startIndex = 0
            const nextQuestion = (n) => {
                const questionsItems = document.querySelectorAll('.believe__item')
                let i

                for (i = 0; i < questionsItems.length; i++) {
                    questionsItems[i].style.display = "none"
                    questionsItems[i].classList.remove('active-question')
                }

                if (n === questionsItems.length) {
                    clearInterval(downloadTimer)
                    finishTest(points)
                    document.querySelector(".progress__deadline").innerHTML = "0s"
                } else {
                    questionsItems[startIndex].style.display = "block"
                    questionsItems[startIndex].classList.add('active-question')
                }

            }
            nextQuestion(0)

            const checkingAnswar = (e) => {
                let answer
                if (e.code == 'ArrowRight') {
                    answer = false
                } else if (e.code == 'ArrowLeft') {
                    answer = true
                } else {
                    answer = e.currentTarget.getAttribute('data-answer')
                }
                const questionNumber  = document.querySelector('.active-question').getAttribute('data-index')

                if (questions[questionNumber].isBelieve === Boolean(answer)) {
                    points = increasePoints(points, 100)
                    nextQuestion(startIndex += 1)

                } else {
                    nextQuestion(startIndex += 1)
                }
            }

            let timeleft = 30
            const downloadTimer = setInterval(function(){
                if(timeleft <= 0){
                    clearInterval(downloadTimer)
                    finishTest(points)
                    document.querySelector(".progress__deadline").innerHTML = "0s"
                } else {
                    document.querySelector(".progress__deadline").innerHTML = `${timeleft}s`
                }
                timeleft -= 1;
            }, 1000)

            const answerTrueBtn = document.querySelector('.believe__btn-true')
            const answerFalseBtn = document.querySelector('.believe__btn-false')
            window.addEventListener('keydown', checkingAnswar)
            window.addEventListener('keydown', checkingAnswar)
            answerTrueBtn.addEventListener('click', checkingAnswar)
            answerFalseBtn.addEventListener('click', checkingAnswar)

        }
    }

    const closeTest = (e) => {
        window.location.reload()
    }

    closeBelieveGameBtn.addEventListener('click', closeTest)
    startBelieveGameBtn.addEventListener('click', startBelieveGameTest)
}