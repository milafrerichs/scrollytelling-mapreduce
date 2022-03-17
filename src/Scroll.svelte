<script>
  import "intersection-observer";
  import scrollama from "scrollama";

  import { onMount } from 'svelte';

  import Slide from "./Slide.svelte";

  export let currentStep = 0;
  export let direction = "down";
  export let stepHeight = 796;
  export let slides;
  let allowEvents = false;
  let scrolParent;
  let scroller = scrollama();

    $: if(scrolParent) {
      scrolParent.style.marginTop =`-${stepHeight}px`;
    }
  function handleStepEnter(response) {
    if(response.index !== currentStep) {
      direction = "down";
      if(response.index < currentStep) {
        direction = "up";
      }
      currentStep = response.index;
    }
      if(response.index === slides.length-1) {
          allowEvents = true;
        }
  }
    function handleRestart() {
        document.getElementById("start").scrollIntoView();
        window.dispatchEvent(new CustomEvent(`mrGame:restart`, { bubbles: true }))
        allowEvents = false;
      }


  onMount(() => {
    scroller.resize()
    scroller
      .setup({
          step: '#scroller .step',
          offset: 0.6,
          debug: false,
        })
      .onStepEnter(handleStepEnter);
    window.addEventListener("resize", scroller.resize);
  })
</script>
<div id="scroller" bind:this={scrolParent} class="{allowEvents ? "pointer-events-auto" : "pointer-events-none"}">
  {#each slides as slide}
    <div class="step" style="height:{stepHeight}px" id="{slide.gameStart ? "start": ""}">
    <div class="flex h-screen justify-center items-center">
    {#if slide.text || slide.headline }
      <Slide size="{slide.size}">
				{#if slide.headline}
					<h1 class="text-4xl"> {slide.headline} </h1>
				{/if}
				{#if slide.text}
          <p class="text-2xl {slide.headline ? 'mt-16': ''}">
        {slide.text}
					</p>
				{/if}
				{#if slide.restart}
          <button on:click={handleRestart}>Restart</button>
				{/if}
      </Slide>
      {/if}
    </div>
  </div>
  {/each}
</div>
<style>
  #scroller {
    position:relative;padding:0;margin:0 auto;
  }
  .step:last-child{margin-bottom:0}
</style>
