export const increasePoints = (allPoints, scoreForAnswer) => {
    const progressPoints = document.querySelector('.progress__points')

    const newPoints = allPoints + scoreForAnswer
    progressPoints.innerHTML = newPoints
    return newPoints
}

export const checkingAnswar = (totalQuestions, idxAnswar, correctAnswar = true) => {
    const progressItems = document.querySelectorAll('.progress__item')
    if (totalQuestions !== idxAnswar) {
        progressItems[idxAnswar+1].classList.add('progress__item--active')
    }

    !correctAnswar
        ? progressItems[idxAnswar].classList.add('progress__item--error')
        : progressItems[idxAnswar].classList.add('progress__item--done')
}