function isWebp() {
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        }
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    })
}
isWebp()

window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
}

import {openMobileMenu} from './modules/header/menu.js'
openMobileMenu()

// auth pages
import { validateForm } from './modules/auth/validation.js'
import { showOrHidePassword } from './modules/auth/password.js'

const signup = window.location.pathname.indexOf('/signup') !== -1
const login = window.location.pathname.indexOf('/login') !== -1
const forgot = window.location.pathname.indexOf('/forgot') !== -1
const recover = window.location.pathname.indexOf('/recover') !== -1
if (signup || login || forgot || recover) {
    console.log('Auth Page');
    validateForm()
    showOrHidePassword()
}

// Page Training
import {scriptsTrainingPage} from './modules/training/index.js'

if (window.location.pathname.indexOf('/trainings') !== -1) {
    console.log('Page Training')
    scriptsTrainingPage()
}
// Page Grammar
import {scriptsGrammarPage} from './modules/grammar/index.js'
const presentSimple = window.location.pathname.indexOf('/presentSimple') !== -1
const pastSimple = window.location.pathname.indexOf('/pastSimple') !== -1
const futureSimple = window.location.pathname.indexOf('/futureSimple') !== -1
const presentContinuous = window.location.pathname.indexOf('/presentContinuous') !== -1
const pastContinuous = window.location.pathname.indexOf('/pastContinuous') !== -1
const futureContinuous = window.location.pathname.indexOf('/futureContinuous') !== -1
const presentPerfect = window.location.pathname.indexOf('/presentPerfect') !== -1
const pastPerfect = window.location.pathname.indexOf('/pastPerfect') !== -1
const futurePerfect = window.location.pathname.indexOf('/futurePerfect') !== -1
const presentPerfectContinuous = window.location.pathname.indexOf('/presentPerfectContinuous') !== -1
const pastPerfectContinuous = window.location.pathname.indexOf('/pastPerfectContinuous') !== -1
const futurePerfectContinuous = window.location.pathname.indexOf('/futurePerfectContinuous') !== -1



if (presentSimple || pastSimple || futureSimple || presentContinuous || pastContinuous || futureContinuous || presentPerfect || pastPerfect || futurePerfect || presentPerfectContinuous || pastPerfectContinuous || futurePerfectContinuous) {
    console.log('Page Grammar')
    scriptsGrammarPage()
}

//Cards
import { scriptCardsPage } from './modules/cards/index.js'

if (window.location.pathname.indexOf('/cards') !== -1) {
    console.log('Page Cards')
    scriptCardsPage()
}


