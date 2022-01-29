<script setup>
import { useMainStore } from "../stores/MainStore";

const store = useMainStore();

const props = defineProps({
  dimension: {
    level: Number,
    name: String,
    cost: Number,
    revenue: Number,
    owned: Number,
  },
});

function buyDimension(count) {
  if (props.dimension.cost * count <= store.antimatter.total) {
    store.buyDimension(
      props.dimension.level,
      count,
      props.dimension.cost * count
    );
  }
}

const antimatterTotal = computed(() => store.antimatter.total);
</script>

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
