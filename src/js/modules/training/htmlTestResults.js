import { checkedAuth } from "./checkedAuth.js"
import { getResult } from "./testResults.js"

export const htmlTestResults = (testName, points, level, testData=[]) => {
    const auth = checkedAuth()

    const result = getResult(testName, points)
    const dataStr = JSON.stringify(testData)
    const finishElem = document.createElement('article')
    finishElem.className = 'results'

    finishElem.innerHTML = `
        <div class="results__points">
            <div class="results__point-num">${points}</div>
            <div class="results__ico">
            <svg width="107" height="51" viewBox="0 0 107 51" fill="none">
                <path d="M31.5441 11.4591L21.0969 9.2541L15.772 0V25.6429L25.5194 30L24.388 19.3829L31.5441 11.4591Z" fill="#${result[0].color[0]}"/>
                <path d="M10.4472 9.2541L0 11.4591L7.1561 19.3829L6.02467 30L15.7721 25.6429V0L10.4472 9.2541Z" fill="#${result[0].color[1]}"/>
                <path d="M74.9998 25.6206L60.7585 22.6149L53.4998 10V44.9556L66.7872 50.895L65.2448 36.4221L74.9998 25.6206Z" fill="#${result[0].color[0]}"/>
                <path d="M46.2413 22.6149L32 25.6206L41.755 36.4221L40.2126 50.895L53.5 44.9556V10L46.2413 22.6149Z" fill="#${result[0].color[1]}"/>
                <path d="M106.544 11.4591L96.0969 9.2541L90.772 0V25.6429L100.519 30L99.388 19.3829L106.544 11.4591Z" fill="#${result[0].color[0]}"/>
                <path d="M85.4472 9.2541L75 11.4591L82.1561 19.3829L81.0247 30L90.7721 25.6429V0L85.4472 9.2541Z" fill="#${result[0].color[1]}"/>
            </svg>
            </div>
            </div>
            <div class="results__point-text">${result[0].text}</div>
            <form action='/trainings' method="post">
                <input type="hidden" name="points" value="${points}">
                <input type="hidden" name="data" value='${dataStr}'>
                <input type="hidden" name="level" value='${level}'>
                ${ auth ? '<button class="quiz__btn-end" name="points-btn" type="submit">Завершить</button>' : '<p class="auth__error">Для сохранения прогресса следует <a class="home__auth-link" href="/login">авторизоваться</a></p>'}
            </form>
    `

    return finishElem
}