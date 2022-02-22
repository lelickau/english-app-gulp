export const createProgressPoint = (selector) => {
    const progress = document.querySelector(selector)

    const progressPoints = document.createElement('div')
    progressPoints.className = 'progress__points'
    progressPoints.innerHTML = '0'

    progress.append(progressPoints)

    return progress

}

export const createProgressBar = (numOfQuestions) => {

    const progressBar = document.createElement('div')
    progressBar.className = 'progress__bar'

    for (let i = 0; i < numOfQuestions; i++) {
        const item = document.createElement('div')
        item.className = 'progress__item'

        if (i === 0) {
            item.className = 'progress__item progress__item-start'
        }

        if (i === numOfQuestions -1) {
            item.className = 'progress__item progress__item-end'
        }

        progressBar.appendChild(item)
    }

    return progressBar
}