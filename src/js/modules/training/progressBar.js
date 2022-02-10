export const createProgressBar = (numOfQuestions) => {
    const progressPoints = document.querySelector('.progress__points')
    progressPoints.classList.remove('progress__hidden')

    const box = document.createElement('div')
    box.className = 'progress__bar'

    for (let i = 0; i < numOfQuestions; i++) {
        const item = document.createElement('div')
        item.className = 'progress__item'

        if (i === 0) {
            item.className = 'progress__item progress__item-start'
        }

        if (i === numOfQuestions -1) {
            item.className = 'progress__item progress__item-end'
        }

        box.appendChild(item)
    }

    console.log(box);
    return box
}