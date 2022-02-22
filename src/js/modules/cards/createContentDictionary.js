export const createContentDictionary = (topicData) => {
    const content = document.createElement('div')
    content.className = 'dictionary__items'

    for (let i = 0; i < topicData.length; i++) {
        const elem = `
        <div class="dictionary__item-box">
            <div class="dictionary__item">
                <img class="dictionary__example-img show-example" src="images/question.svg" alt="hint" />
                <div class="dictionary__audio ${!topicData[i].mp3 && ' dictionary__audio-null'}" data-audio-src="${topicData[i].mp3}">
                    <img class="dictionary__audio-img" src="images/audio.svg" alt="audio" />
                </div>
                <p class="dictionary__word-box">
                    <span class="dictionary__word">${topicData[i].id}</span> -
                    <span class="dictionary__word">${topicData[i].translate}</span>
                </p>
            </div>
            <p class="dictionary__example dictionary__hidden">${topicData[i].example}</p>
        </div>
        `
        content.insertAdjacentHTML('beforeend', elem)
    }

    return content
}