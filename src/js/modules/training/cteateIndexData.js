export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const cteateIndexData = (numOfQuestionInTest, lengthData) => {
    const randomIdx = []
    for (let i = 0; i < numOfQuestionInTest; i++) {
        let int = getRandomInt(0, lengthData -1)
        if (randomIdx.includes(int)) {
            int = getRandomInt(0, lengthData -1)
        }
        randomIdx.push(int)
    }
    return randomIdx
}