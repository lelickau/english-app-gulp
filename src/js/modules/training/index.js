import { quizTest } from "./quiz/quiz.js"
import { believeGame } from "./believeGame/believeGame.js"

export const scriptsTrainingPage = () => {

    const trainingMenu = document.querySelector('.training')
    const quizTestBtn = document.querySelector('.quiz-test')
    const believeTestBtn = document.querySelector('.believe-test')
    const constructorTestBtn = document.querySelector('.constructor-test')

    quizTestBtn.addEventListener('click', () => {
        trainingMenu.classList.add('training__hidden')
        quizTest()
    })

    believeTestBtn.addEventListener('click', () => {
        trainingMenu.classList.add('training__hidden')
        console.log('Believe Test');
        believeGame()
    })
}