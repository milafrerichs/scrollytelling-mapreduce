import App from './App.svelte';
import { getData } from './utils.js';
import slides from '../data/slides.csv';

let islands = [ "Crete", "Euboea", "Lesbos", "Rhodes", "Chios", "Cephalonia", "Corfu", "Lemnos", "Samos", "Naxos", "Zakynthos", "Thasos", "Andros", "Lefkada", "Karpathos", "Kos", "Kythira", "Icaria", "Skyros", "Paros", "Tinos", "Samothraki", "Milos", "Kea", "Amorgos", "Kalymnos", "Ios", "Kythnos", "Astypalaia", "Ithaca", "Salamis"   ];

var monthNames = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];

let types = [{name: "highest", method: Math.max}] //, {name: "lowest", method: Math.min}]
let columns = [{name: "temperature", column: "temp"}]
let data = getData();

function generateQuestion() {
let randomMonthIndex = Math.random()*monthNames.length | 0;
let randomMonth = monthNames[randomMonthIndex]
let randomTypeIndex = Math.random() * types.length | 0;
let randomType = types[randomTypeIndex]
let question = {
  column: columns[0].column,
  filter: (d) => { return d.month === randomMonth  },
  typeFunction: randomType.method,
  text: `Which Island has the ${randomType.name} ${columns[0].name} in ${randomMonth}`,
  month: randomMonth,
  typeText: `${types[0].name} ${columns[0].name}`
}

return question;
}
let question = generateQuestion();

function parseSlides(slides, question) {
  return slides.map(function(slide) {
    let match = slide.headline.match(/\{question.(.*)\}/)
    if(match && match.length > 0) {
      slide.headline = question[match[1]]
    }
    return slide;
  })
}
let state = {
  slides: parseSlides(slides, question),
  gameQuestion: question,
  gameStarts: 3,
  gameData: data
}
var app = new App({
  target: document.body,
  props: Object.assign( {}, state )
});

window.addEventListener("mrGame:restart", () => {
  let question = generateQuestion();
  let { slides } = state;
  slides[4] = { headline: question.text, text: "This is the question you will need to answer. " }
  app.$set({gameQuestion: question, slides })
})


window.addEventListener("resize", function() {
});
