import { quizTest } from "./quiz/quiz.js"
export const scriptsTrainingPage = () => {

    const trainingItems = document.querySelectorAll('.training__item')
    const trainingTestElems= document.querySelectorAll('.training__test')

    const trainingMenu = document.querySelector('.training')
    const quizTestBtn = document.querySelector('.quiz-test')
    const believeTestBtn = document.querySelector('.believe-test')
    const constructorTestBtn = document.querySelector('.constructor-test')

    quizTestBtn.addEventListener('click', () => {
        trainingMenu.classList.add('training__hidden')
        quizTest()
    })

    // trainingItems.forEach((item, idx) => {
    //     item.addEventListener('click', (e) => {
    //         trainingTestElems[idx].classList.remove('training__hidden')
    //         trainingMenu.classList.add('training__hidden')
    //     })
    // })
}