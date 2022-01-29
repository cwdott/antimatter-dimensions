import { defineStore } from "pinia";
import dimensionData from "../dimensions.js";

export const useMainStore = defineStore("main", {
  state: () => ({
    level: 1,
    antimatter: {
      total: 10,
      rate: 0,
    },
    dimensions: [],
  }),
  actions: {
    unlockDimension(level) {
      if (this.dimensions.length < level) {
        this.dimensions.push(dimensionData[level - 1]);
      }
    },
    buyDimension(level, count, cost) {
      let targetDimension = this.dimensions[level - 1];
      this.antimatter.total -= cost;
      targetDimension.toTen -= count;
      targetDimension.owned += count;

      if (targetDimension.toTen == 0) {
        targetDimension.cost *= 10;
        targetDimension.toTen = 10;
        targetDimension.multiplier++;
        this.unlockDimension(level + 1);
      }

      this.updateRevenue();
    },
    updateRevenue() {
      let rate = 0;
      for (let dimension of this.dimensions) {
        rate += dimension.owned * (dimension.revenue * dimension.multiplier);
      }
      this.antimatter.rate = rate;
    },
  },
});
