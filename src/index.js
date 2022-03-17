import App from './App.svelte';
import { getData } from './utils.js';

let islands = [ "Crete", "Evia", "Lesbos", "Rhodes", "Chíos", "Cephalonia", "Corfu", "Lemnos", "Samos", "Naxos", "Zakynthos", "Thassos", "Andros", "Lefkada", "Karpathos", "Kos", "Kythira", "Icaria", "Skyros", "Paros", "Tinos", "Samothrace", "Milos", "Kea", "Amorgos", "Kalymnos", "Ios", "Kythnos", "Astypalaia", "Ithaca", "Salamis" ];
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


let state = {
  slides: [
    { headline: "Map Reduce", size: 'm'},
    { headline: "What is Map Reduce", text: "text about map reduce?", size: 'm'},
    { headline: "Game Explanation", text: "Some detailed explanation about the game and the platform, etc"},
    { headline: "Imagine that", text: "We want to go to an greek island and want to find the best one to visit" , size: 'm', gameStart: true},
    { headline: question.text, text: "This is the question you will need to answer. " },
    { text: "The dots in the background are your data points, we will show you what they are in a minute. Keep scrolling." , size: 'm'},
    { headline: "Your assigned data", text: "This is the data you got assigned", size: 'm' },
    { headline: "Your turn", text: "Now it's your turn to answer the question based on your assigned data." , size: 's'},
    { stayOn: true },
    { headline: "Answers from all other mappers", text: "This is the data that all the other mappers provided to the reducer" , size: 'm'},
    { },
    { text: "Explanation about the game, concept, etc. Encouregement to play again." },
    { headline: "End", text: "You can restart the game if you want", restart: true , size: 'm'},
  ],
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
