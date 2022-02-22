import a1 from '../../../data/data-a1.json'
import { getRandomInt } from '../randomInt.js'

export const createTestBelieveGame = () => {
    let testWords = []
    const lengthData = a1.length -1

    const randomWordsIdx = []
    for (let i = 0; i < 35; i++) {
        let int = getRandomInt(0, lengthData)
        if (randomWordsIdx.includes(int)) {
            int = getRandomInt(0, lengthData)
        }
        randomWordsIdx.push(int)
    }

    randomWordsIdx.map(idx => {
        const idxAnswar = getRandomInt(0, 1)
        const falseAnswar = a1[getRandomInt(0, lengthData)].translate
        const answar = [a1[idx].translate, falseAnswar]

        const data = {
            id: a1[idx].id,
            answar: answar[idxAnswar],
            isBelieve: !idxAnswar,
            mp3: a1[idx].mp3
        }

        return testWords.push(data)
    })

    return testWords
}