import * as flsFunctions from './modules/functions.js';
flsFunctions.isWebp();

// Page Training
import {scriptsTrainingPage} from './modules/training/index.js'

if (window.location.pathname == '/trainings.html') {
    console.log('Page Training')
    scriptsTrainingPage()
}
// Page Grammar
import {scriptsGrammarPage} from './modules/grammar/index.js'

if (window.location.pathname == '/grammar.html') {
    console.log('Page Grammar')
    scriptsGrammarPage()
}

