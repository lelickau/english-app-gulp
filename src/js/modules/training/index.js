import foods from '../../data-food-a1.json'

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
    const quizBox = document.querySelector('.quiz')
    const quizTestBlock = document.querySelector('.quiz-test')
    const startQuizBtn = document.querySelector('.quiz-test__btn-start')
    const closeQuizBtn = document.querySelector('.quiz-test__close')
    const quizDescrBox = document.querySelector('.quiz-test__description')
    const questionsBox = document.querySelector('.quiz-test__questions-box')

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

        if (questions) {
            quizDescrBox.classList.add('quiz-test__description--hidden')
            questions.forEach((item, idx) => {
                const elem = document.createElement('aside')
                elem.className = 'quiz-test__item'
                elem.setAttribute('data-index', idx)
                elem.innerHTML = `
                    <div class="quiz-test__item-header">
                        <div class="quiz-test__console">
                            <img class="quiz-test__console-ico" src="images/question.svg" alt="Подсказка">
                            <img class="quiz-test__console-ico" src="images/audio.svg" alt="Audio">
                        </div>
                        <div class="quiz-test__word">${item.id}</div>
                    </div>
                    <div class="quiz-test__options">
                        <button class="quiz-test__btn" data-answer="${item.answars[0]}">${item.answars[0]}</button>
                        <button class="quiz-test__btn" data-answer="${item.answars[1]}">${item.answars[1]}</button>
                        <button class="quiz-test__btn" data-answer="${item.answars[2]}">${item.answars[2]}</button>
                        <button class="quiz-test__btn" data-answer="${item.answars[3]}">${item.answars[3]}</button>
                    </div>
                    <div class="quiz-test__hint quiz-test__hint--hidden"></div>
                `
                questionsBox.appendChild(elem)
                //console.log(elem);
            })

            const showSlides = (n) => {
                let startIndex = 0
                const slides = document.querySelectorAll('.quiz-test__item')
                let i

                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none"
                }

                slides[startIndex].style.display = "block"

            }
            showSlides(0)

            //
            const answersElems = document.querySelectorAll('.quiz-test__item')
            const answersBtn = document.querySelectorAll('.quiz-test__btn')
            answersBtn.forEach(el => {
                //console.log(el);
                answersElems.addEventListener('click', () => {
                    const numberQuestion = answersElems.parentNode.parentNode.getAttribute('data-index')
                    const answer = answersElems.getAttribute('data-answer')
                    console.log(answersElems.getAttribute('data-answer'));
                    console.log(answersElems.parentNode.parentNode.getAttribute('data-index'));
                    console.log(questions[numberQuestion])
                    if (questions[numberQuestion].translate === answer) {
                        console.log(true);
                        startIndex++

                    } else {
                        console.log(false);
                    }
                })
            })


        }

    }

    const closeTest = (e) => {
        e.preventDefault()
        quizDescrBox.classList.remove('quiz-test__description--hidden')
        questionsBox.innerHTML = ''
        quizTestBlock.classList.add('training__hidden')
        trainingMenu.classList.remove('training__hidden')
    }

    closeQuizBtn.addEventListener('click', closeTest)

    startQuizBtn.addEventListener('click', startQuizTest)
}