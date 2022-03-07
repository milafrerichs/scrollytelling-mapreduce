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

  function gameEvent(direction, slideIndex) {
    window.dispatchEvent(new CustomEvent(`mrGame:${direction}`, { bubbles: true, detail: {slideIndex} }))
  }

  $: if(slide > gameStarts) {
    let nextPrev = direction === "up" ? "prev" : "next"
    gameEvent(nextPrev, slide)
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
      <div class="w-full h-full bg-cover bg-center" id="flourish-container" style="height:{height}px; background-image: url(https://c1.wallpaperflare.com/preview/285/61/182/greece-ithaca-island-mediterranean.jpg)" class:hidden={slide >= gameStarts}>
      </div>
    {:else if slide >= gameStarts && slide < gameEnds }
      <MapReduceGame data={gameData} question={gameQuestion} />
    {:else}
      <div class="w-full h-full bg-cover bg-center" id="flourish-container" style="height:{height}px; background-image: url(https://c1.wallpaperflare.com/preview/285/61/182/greece-ithaca-island-mediterranean.jpg)">
      </div>
    {/if}
  </div>
  <Scroll bind:currentStep={slide} bind:direction={direction} stepHeight={height} slides={slides} />
</div>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
