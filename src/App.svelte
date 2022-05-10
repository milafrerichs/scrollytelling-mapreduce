<script>
  import Scroll from './Scroll.svelte';
  import MapReduceGame from "map-reduce-game";
  export let height = 500;
  export let setState = function() {};
  export let slides = [{headline: "Map Reduce"}, {}, {}];
  export let gameData = [];
  export let gameStarts = 2;
  export let gameEnds = 11;
  export let gameQuestion = {};
  let slide = 0;
  let direction = "down"
  let restartLock = false;

  function gameEvent(direction, slideIndex) {
    window.dispatchEvent(new CustomEvent(`mrGame:${direction}`, { bubbles: true, detail: {slideIndex} }))
  }

  function handleRestart() {
    restartLock = true;

  }

  $: if(slide > gameStarts) {
    let nextPrev = direction === "up" ? "prev" : "next"
    //check if we want to go next or not e.g. provide answer
    if(slide < gameEnds && nextPrev === "next") {
      restartLock = false;
    }
    if(slides[slide].stayOn) {
    }else {
        if(!restartLock) {
      gameEvent(nextPrev, slide)
          }
    }
  }

	$: if(slides) {
		setState({ slides })
	}

	$: if(gameData) {
		setState({ gameData })
	}

	$: if(gameQuestion) {
		//setState({ gameQuestion })
	}
</script>
<svelte:window bind:innerHeight={height}/>
<div>
  <div class="sticky top-0 w-full h-full" id="map-reduce-container">
    {#if slide < gameStarts}
      <div class="w-full h-full bg-cover bg-center" id="flourish-container" style="height:{height}px; background-image: url(/images/summer.jpg)" class:hidden={slide >= gameStarts}>
      </div>
    {:else if slide >= gameStarts && slide < gameEnds }
      <MapReduceGame data={gameData} question={gameQuestion} />
    {:else}
      <div class="w-full h-full bg-cover bg-center" id="flourish-container" style="height:{height}px; background-image: url(/images/summer.jpg)">
      </div>
    {/if}
  </div>
  <Scroll bind:currentStep={slide} bind:direction={direction} stepHeight={height} slides={slides} on:restart={handleRestart}/>
</div>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  @font-face {
      font-family: "Poppins";
        font-style: normal;
          font-weight: 400;
            font-display: swap;
              src: local(""), url("./fonts/poppins-v19-latin-regular.woff2") format("woff2"), /* Chrome 26+, Opera 23+, Firefox 39+ */ url("./fonts/poppins-v19-latin-regular.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* poppins-500 - latin */
  @font-face {
      font-family: "Poppins";
        font-style: normal;
          font-weight: 500;
            font-display: swap;
              src: local(""), url("./fonts/poppins-v19-latin-500.woff2") format("woff2"), /* Chrome 26+, Opera 23+, Firefox 39+ */ url("./fonts/poppins-v19-latin-500.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              
  }
  /* poppins-700 - latin */
  @font-face {
      font-family: "Poppins";
        font-style: normal;
          font-weight: 700;
            font-display: swap;
              src: local(""), url("./fonts/poppins-v19-latin-700.woff2") format("woff2"), /* Chrome 26+, Opera 23+, Firefox 39+ */ url("./fonts/poppins-v19-latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              
  }

  /* DK-Black-Bamboo */
  @font-face {
      font-family: "DK-Black-Bamboo";
        font-style: normal;
          font-weight: 400;
            font-display: swap;
              src: local(""), url("./fonts/DK-Black-Bamboo.woff2") format("woff2"), /* Chrome 26+, Opera 23+, Firefox 39+ */ url("./fonts/DK-Black-Bamboo.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              
  }

</style>
