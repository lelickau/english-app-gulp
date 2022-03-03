import a1  from '../../../data/data-a1.json'
import { cteateIndexData } from '../cteateIndexData.js'

export const createConstructorTest = () => {
    const dataTest = []
    const randomIdx = cteateIndexData(10, a1.length)

    randomIdx.forEach(idx => {
        const construct = [...a1[idx].id].sort()
        const data = {
            id: a1[idx].id,
            answer: [...a1[idx].id],
            translate: a1[idx].translate,
            construct
        }

        return dataTest.push(data)
    })

    return dataTest
}