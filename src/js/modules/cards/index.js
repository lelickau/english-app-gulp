import a1 from '../../data/data-a1.json';

export const scriptCardsPage = () => {

    const createContentDictionary = (topicData) => {
        const content = document.createElement('div')
        content.className = 'dictionary__items'

        for (let i = 0; i < topicData.length; i++) {
            const elem = `
                <div class="dictionary__item">
                    <div class="dictionary__audio" data-audio-src="${topicData[i].mp3}">
                        <img class="dictionary__audio-img" src="images/audio.svg" alt="audio" />
                    </div>
                    <img class="dictionary__example-img" src="images/question.svg" alt="hint" />
                    <p class="dictionary__word-box">
                        <span class="dictionary__word">${topicData[i].id}</span> -
                        <span class="dictionary__word">${topicData[i].translate}</span>
                    </p>
                    <p class="dictionary__example dictionary__hidden">${topicData[i].example}</p>
                </div>
            `
            content.insertAdjacentHTML('beforeend', elem)
        }

        return content
    }

    const getTopicData = (level, topic) => {
        const levels = {
            a1
        }
        return levels[level].filter(elem => elem.thema === topic)
    }

    const openTopic = (e) => {
        const cards = document.querySelector('.cards')
        const dictionary = document.querySelector('.dictionary')
        const dictionaryContentBox = document.querySelector('.dictionary__content')

        const topicName = e.target.getAttribute('data-topic')
        const topicLevel = e.target.getAttribute('data-level')
        cards.classList.add('cards__hidden')
        dictionary.classList.remove('dictionary__hidden')

        const topicData = getTopicData(topicLevel, topicName)

        const content = createContentDictionary(topicData)

        dictionaryContentBox.appendChild(content)
    }

    const topicsBtn = document.querySelectorAll('.cards__topics-item')
    topicsBtn.forEach(btn => {
        btn.addEventListener('click', openTopic)
    })
}