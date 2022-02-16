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

// Page Training
import {scriptsTrainingPage} from './modules/training/index.js'

if (window.location.pathname == '/trainings.html') {
    console.log('Page Training')
    scriptsTrainingPage()
}
// Page Grammar
import {scriptsGrammarPage} from './modules/grammar/index.js'
const presentSimple = window.location.pathname == '/presentSimple.html'
const pastSimple = window.location.pathname == '/pastSimple.html'

if (presentSimple || pastSimple) {
    console.log('Page Grammar')
    scriptsGrammarPage()
}


