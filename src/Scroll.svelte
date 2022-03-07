<script>
  import "intersection-observer";
  import scrollama from "scrollama";

  import { onMount } from 'svelte';

  export let currentStep = 0;
  export let direction = "down";
  export let stepHeight = 796;
  export let slides;
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
<div id="scroller" bind:this={scrolParent}>
  {#each slides as slide}
    <div class="step" style="height:{stepHeight}px">
    <div class="flex h-screen justify-center items-center">
    {#if slide.text || slide.headline }
    <div class="bg-white max-w-7xl mx-auto  py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      {#if slide.headline}
        <h2 class="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl mb-8">{slide.headline}</h2>
      {/if}
      {#if slide.text}
      <p>{slide.text}</p>
      {/if}
      {#if slide.restart}
        <a on:click={() => window.dispatchEvent(new CustomEvent(`mrGame:restart`, { bubbles: true }))}>Restart</a>
      {/if}
    </div>
      {/if}
    </div>
  </div>
  {/each}
</div>
<style>
  #scroller {
    position:relative;padding:0;margin:0 auto;pointer-events:none
  }
  .step:last-child{margin-bottom:0}
</style>
