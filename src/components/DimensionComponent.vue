<template>
  <div class="dimension">
    <div>{{ dimension.name }} Dimension (x{{ dimension.multiplier }})</div>
    <div>
      {{ dimension.revenue * dimension.owned }}
    </div>
    <div>
      <button
        @click="buyDimension(1)"
        :disabled="antimatterTotal < dimension.cost"
      >
        Cost: {{ dimension.cost }}
      </button>
      <button
        @click="buyDimension(dimension.toTen)"
        :disabled="antimatterTotal < dimension.toTen * dimension.cost"
      >
        Until 10, Cost: {{ dimension.cost * dimension.toTen }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMainStore } from "../stores/MainStore";

export default {
  setup() {
    const store = useMainStore();
    return {
      store,
    };
  },
  props: {
    dimension: {
      level: Number,
      name: String,
      cost: Number,
      revenue: Number,
      owned: Number,
    },
  },
  data() {
    return {
      count: ref(0),
      owned: this.dimension.owned,
      revenue: this.dimension.revenue,
    };
  },
  methods: {
    buyDimension(count) {
      if (this.dimension.cost * count <= this.store.antimatter.total) {
        this.store.buyDimension(
          this.dimension.level,
          count,
          this.dimension.cost * count
        );
      }
    },
  },
  computed: {
    antimatterTotal() {
      return this.store.antimatter.total;
    },
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
