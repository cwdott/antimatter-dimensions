<script>
import { defineComponent } from "vue";
import { useIntervalFn } from "@vueuse/core";
import { useMainStore } from "./stores/MainStore";

import Dimensions from "./dimensions.js";
import DimensionComponent from "./components/DimensionComponent.vue";

export default defineComponent({
  components: {
    DimensionComponent,
  },
  setup() {
    const store = useMainStore();
    return {
      store,
    };
  },
  data() {
    return {
      dimensions: Dimensions,
    };
  },
  methods: {
    gameLoop() {
      useIntervalFn(() => {
        this.store.antimatter.total += this.store.antimatter.rate;
      }, 1000);
    },
  },
  mounted() {
    // Allows us to start with whatever level of dimensions unlocked
    for (let i = 1; i < this.store.level + 1; i++) {
      this.store.unlockDimension(i);
    }

    this.gameLoop();
  },
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
