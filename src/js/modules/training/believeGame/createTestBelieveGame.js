import { cteateIndexData, getRandomInt } from '../cteateIndexData.js'

export const createTestBelieveGame = (level) => {
    let testWords = []
    const lengthData = level.length

    const randomWordsIdx = cteateIndexData(40, lengthData)

    randomWordsIdx.map(idx => {
        const idxAnswar = getRandomInt(0, 1)
        const falseAnswar = level[getRandomInt(0, lengthData-1)].translate
        const answar = [level[idx].translate, falseAnswar]

        const data = {
            id: level[idx].id,
            answar: answar[idxAnswar],
            isBelieve: !idxAnswar,
            mp3: level[idx].mp3
        }

        return testWords.push(data)
    })

    return testWords
}