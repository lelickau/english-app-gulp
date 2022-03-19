import { getTopicData } from "./getTopicData.js"
import { createContentDictionary } from "./createContentDictionary.js"
import { playAudio } from "../audio/play.js"

export const scriptCardsPage = () => {
    const cards = document.querySelector('.cards')
    const dictionary = document.querySelector('.dictionary')
    const topicsBtn = document.querySelectorAll('.cards__topics-item')
    const dictionaryContentBox = document.querySelector('.dictionary__content')

    const closeBtn = document.querySelector('.dictionary__close')

    const closeTopicContent = (e) => {
        cards.classList.remove('cards__hidden')
        dictionary.classList.add('dictionary__hidden')
        dictionaryContentBox.innerHTML = ''
    }

    closeBtn.addEventListener('click', closeTopicContent)

    const showExample = (e) => {
        const parent = e.currentTarget.closest('.dictionary__item-box')
        parent.querySelector('.dictionary__example').classList.remove('dictionary__hidden')
    }

    const openTopic = (e) => {
        const dictionaryTitleBox = document.querySelector('.dictionary__title')
        const topicName = e.currentTarget.getAttribute('data-topic')
        const topicLevel = e.currentTarget.getAttribute('data-level')
        const topicTitle = e.currentTarget.getAttribute('data-title')
        dictionaryTitleBox.innerHTML = topicTitle

        cards.classList.add('cards__hidden')
        dictionary.classList.remove('dictionary__hidden')

        const topicData = getTopicData(topicLevel, topicName)

        const content = createContentDictionary(topicData)

        dictionaryContentBox.appendChild(content)

        const showExampleBtn = document.querySelectorAll('.show-example')
        showExampleBtn.forEach(btn => btn.addEventListener('click', showExample))

        const audioBtns = document.querySelectorAll('.dictionary__audio')
        audioBtns.forEach(btn => btn.addEventListener('click', (e) => {
            playAudio(e.currentTarget.getAttribute('data-audio-src'))
        }))

        window.scrollTo(screenY, 0)
    }

    topicsBtn.forEach(btn => {
        btn.addEventListener('click', openTopic)
    })


}