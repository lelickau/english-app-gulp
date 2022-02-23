import a1 from '../../../data/data-a1.json'
import { cteateIndexData, getRandomInt } from '../cteateIndexData.js'

export const createTestBelieveGame = () => {
    let testWords = []
    const lengthData = a1.length

    const randomWordsIdx = cteateIndexData(40, lengthData)

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