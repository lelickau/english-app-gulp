import { cteateIndexData } from '../cteateIndexData.js'

export const createConstructorTest = (level) => {
    const dataTest = []
    const randomIdx = cteateIndexData(10, level.length)

    randomIdx.forEach(idx => {
        const construct = [...level[idx].id].sort()
        const data = {
            id: level[idx].id,
            answer: [...level[idx].id],
            translate: level[idx].translate,
            construct
        }

        return dataTest.push(data)
    })

    return dataTest
}