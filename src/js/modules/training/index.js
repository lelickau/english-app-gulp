import foods from '../../data-food-a1.json'
import pointsConntent from '../../data-points.json'

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
            quizDescrBox.classList.add('quiz-test__description--hidden')
            questions.forEach((item, idx) => {
                const elem = document.createElement('article')
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
            })

            const getPointsContent = () => {
                const content  = pointsConntent.filter(p => p.max >= points && p.min <= points)
                return content
            }

            const finishTesting = () => {
                const content = getPointsContent()
                const finishElem = document.createElement('article')
                finishElem.className = 'quiz-test__results'
                finishElem.innerHTML = `
                    <div class="quiz-test__points">
                        <div class="quiz-test__point-num" style="color: #${content[0].color}">${points}</div>
                        <div class="quiz-test__ico">
                            <svg width="52" height="57" viewBox="0 0 52 57" fill="none">
                                <path d="M29.2328 39.3906H22.5254V42.6589H29.2328V39.3906Z" fill="#E6E6E6"/>
                                <path d="M24.7344 54.8895H27.0119V53.7507H36.6916V50.4824H15.0547V53.7507H24.7344V54.8895Z" fill="#E6E6E6"/>
                                <path d="M43.9458 15.5672H45.0846V7.77789H49.4689V22.3999H43.9458V15.5672Z" fill="#E6E6E6"/>
                                <path d="M7.80046 15.5672H6.66167V7.77789H2.27734V22.3999H7.80046V15.5672Z" fill="#E6E6E6"/>
                                <path d="M29.0959 19.9971L31.1002 26.1351L25.8731 22.343L20.6461 26.1351L22.6504 19.9971L17.4233 16.2049H23.8803L25.8731 10.0669L27.866 16.2049H34.3229L29.0959 19.9971Z" fill="#${content[0].color}"/>
                                <path d="M41.3266 13.9273H29.5174L25.8732 2.69891L22.2291 13.9273H10.4199L19.9743 20.8739L16.3302 32.1024L25.8846 25.1558L35.4391 32.1024L31.7949 20.8739L41.3266 13.9273ZM25.8732 22.343L20.6462 26.1351L22.6391 19.9971L17.4121 16.2049H23.869L25.8732 10.0669L27.8661 16.2049H34.323L29.096 19.9971L31.0889 26.1351L25.8732 22.343Z" fill="#4D5152"/>
                                <path d="M8.93944 17.8448H6.66187V20.1223H8.93944V17.8448Z" fill="#4D5152"/>
                                <path d="M45.0845 17.8448H42.8069V20.1223H45.0845V17.8448Z" fill="#4D5152"/>
                                <path d="M45.0845 5.50033V0H6.6619V5.50033H0V24.6775H6.6619V29.4262L14.2348 39.3906H20.2476V42.6589H17.7651V48.2048H12.7772V56.0283H24.7344V53.7507H15.0547V50.4824H36.6917V53.7507H27.012V56.0283H38.9693V48.2048H33.9928V42.6589H31.5102V39.3906H37.523L45.0959 29.4262V24.6775H51.7578V5.50033H45.0845ZM31.7038 48.2048H20.0426V44.9365H31.7152V48.2048H31.7038ZM29.2212 42.6589H22.5138V39.3906H29.2212V42.6589ZM49.4689 22.3999H42.807V28.6518L36.3842 37.1016H15.3622L8.93947 28.6518V22.3999H2.27757V7.77791H6.6619V15.5672H8.93947V2.27757H42.7956V15.5672H45.0731V7.77791H49.4575V22.3999H49.4689Z" fill="#4D5152"/>
                            </svg>
                        </div>
                        </div>
                        <div class="quiz-test__point-text">${content[0].text}</div>
                `

                questionsBox.appendChild(finishElem)
            }

            let startIndex = 0
            const showSlides = (n) => {
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
            showSlides(0)

            const answersBtn = document.querySelectorAll('.quiz-test__btn')
            answersBtn.forEach(el => {
                el.addEventListener('click', () => {
                    const numberQuestion = el.parentNode.parentNode.getAttribute('data-index')
                    const answer = el.getAttribute('data-answer')

                    if (questions[numberQuestion].translate === answer) {
                        points += 10
                        showSlides(startIndex += 1)

                    } else {
                        showSlides(startIndex += 1)
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