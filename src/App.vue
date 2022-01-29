<script setup>
import { useIntervalFn } from "@vueuse/core";
import { useMainStore } from "./stores/MainStore";
import { gameLoop } from "./gameLoop";

import DimensionComponent from "./components/DimensionComponent.vue";

const store = useMainStore();

function START_THE_GAME_ALREADY() {
  useIntervalFn(() => {
    gameLoop(store.$state);
  }, 1000);
}

onMounted(() => {
  // Allows us to start with whatever level of dimensions unlocked
  for (let i = 1; i < store.level + 1; i++) {
    store.unlockDimension(i);
  }

  START_THE_GAME_ALREADY();
});
</script>

<template>
  <header>
    <div class="container">
      <h1>Antimatter Dimensions</h1>
    </div>
  </header>
  <section id="gameStats">
    <div class="container">
      <p>You have {{ store.antimatter.total }} antimatter.</p>
      <p>You are getting {{ store.antimatter.rate }} antimatter per second.</p>
    </div>
  </section>
  <section id="dimensions">
    <div class="container">
      <DimensionComponent
        v-for="dimension in store.dimensions"
        :dimension="dimension"
        :key="dimension.level"
      />
    </div>
  </section>
</template>

<style>
@import "./style.css";
</style>
