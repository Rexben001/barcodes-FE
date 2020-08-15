<template>
  <div>
    <div>Dashboard</div>
    <div class="barcodes">
      <div v-bind:key="imageIndex" v-for="(image, imageIndex) in values">
        <a v-if="image" download="barcode.png" :href="image">
          <img :src="image" :key="imageIndex" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Dashboard",
  data: function () {
    return {
      values: "",
    };
  },
  async mounted() {
    const token = localStorage.getItem("barcodeToken");

    const result = await axios.get(
      "https://2dz7gb09o9.execute-api.us-east-1.amazonaws.com/dev/barcodes/all",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(result.data.barcodes.Items);
    this.values = result.data.barcodes.Items.map(({ barcodes }) => barcodes);
  },
};
</script>

<style scoped>
div {
  max-width: 100%;
  overflow: hidden;
}
.barcodes {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}
.barcodes > div {
  width: 20%;
}
</style>