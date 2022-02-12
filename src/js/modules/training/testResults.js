import results from '../../data/test-results.json'

export const getResult = (testName, points) => {
    const getResultsForTest = results.filter(item => item.test === testName)

    const result  = getResultsForTest.filter(r => r.max >= points && r.min <= points)
    return result
}