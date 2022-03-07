import App from './App.svelte';
import { getData } from './utils.js';

let islands = [ "Crete", "Evia", "Lesbos", "Rhodes", "Chíos", "Cephalonia", "Corfu", "Lemnos", "Samos", "Naxos", "Zakynthos", "Thassos", "Andros", "Lefkada", "Karpathos", "Kos", "Kythira", "Icaria", "Skyros", "Paros", "Tinos", "Samothrace", "Milos", "Kea", "Amorgos", "Kalymnos", "Ios", "Kythnos", "Astypalaia", "Ithaca", "Salamis" ];
var monthNames = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];

let types = [{name: "highest", method: Math.max}, {name: "lowest", method: Math.min}]
let columns = [{name: "temperature", column: "temp"}]
let data = getData();
let randomMonthIndex = Math.random()*monthNames.length | 0;
let randomMonth = monthNames[randomMonthIndex]
let randomTypeIndex = Math.random() * types.length | 0;
let randomType = types[randomTypeIndex]
let question = {
  column: columns[0].column,
  filter: (d) => { return d.month === randomMonth  },
  typeFunction: randomType.method,
  text: `Which Island has the ${randomType.name} ${columns[0].name} in ${randomMonth}`
}


let state = {
  slides: [
    { headline: "Map Reduce"},
    { headline: "What is Map Reduce", text: "text about map reduce?"},
    { headline: "Game Explanation", text: "Some detailed explanation about the game and the platform, etc"},
    { },
    { headline: question.text, text: "This is the question you will need to answer. The dots in the background are your data points, we will show you what they are in a minute. Keep scrolling." },
    { text: "This is the data you got assigned" },
    { text: "let's look at the data more closely" },
    { },
    { text: "This is what the actual data is" },
    { headline: "Your turn", text: "Now it's your turn to answer the question based on your assigned data." },
    { headline: "Answers from all other mappers", text: "This is the data that all the other mappers provided to the reducer" },
    { text: "The result of the reducer is the following data"},
    { text: "Explanation about the game, concept, etc. Encouregement to play again." },
    { text: "End", restart: true },
  ],
  gameQuestion: question,
  gameStarts: 3,
  gameData: data
}
var app = new App({
  target: document.body,
  props: Object.assign( {}, state )
});

window.addEventListener("resize", function() {
	//app.$destroy();
});

// The update function is called when the user changes a state property in
// the settings panel or presentation editor. It updates elements to reflect
// the current state.
/*
export function update() {

  if(app) {
    app.$set( Object.assign( {}, state, data ) );
  }
}
*/
