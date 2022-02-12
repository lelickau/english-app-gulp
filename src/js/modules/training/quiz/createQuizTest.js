import { getRandomInt } from "../randomInt.js"

export const createTestQuiz = (dataWords) => {

    let testWords = []
    const lengthData = dataWords.length -1

    const randomWordsIdx = []
    for (let i = 0; i < 10; i++) {
        let int = getRandomInt(0, lengthData)
        if (randomWordsIdx.includes(int)) {
            int = getRandomInt(0, lengthData)
        }
        randomWordsIdx.push(int)
    }

    randomWordsIdx.map(idx => testWords.push(dataWords[idx]))

    const filterDataElement = (thema) => {
        const dataAnswars = []
        dataWords.filter(elem => {
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