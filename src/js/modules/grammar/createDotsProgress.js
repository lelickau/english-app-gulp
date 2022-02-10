const createOneDot = () => {
    const dot = document.createElement('div')
    dot.className = 'tense__dot'
    dot.innerHTML = `
        <img class="tense__dot-img-hidden" src="images/done.svg", alt="Done"/>
    `
    return dot
}

export const createDots = (numberOfDots) => {
    const dotsBox = document.createElement('div')
    dotsBox.className = 'tense__dots'

    for (let i = 0; i <= numberOfDots; i++) {
        if (i < numberOfDots) {
            const dot = createOneDot()
            dotsBox.appendChild(dot)

            const line = document.createElement('div')
            line.className = 'tense__dot-progress-line'
            dotsBox.appendChild(line)
        } else {
            const dot = createOneDot()
            dotsBox.appendChild(dot)
        }
    }
    return dotsBox
}