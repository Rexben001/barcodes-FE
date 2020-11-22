<template>
  <div class="dashboard">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <h2>Dashboard</h2>
    <div class="barcodes">
      <div
        v-bind:key="imageIndex"
        class="bars"
        v-for="(image, imageIndex) in values"
      >
        <a v-if="image" download="barcode.png" :href="image">
          <p class="fas fa-download"></p>
          <img :src="image" :key="imageIndex" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  name: 'Dashboard',
  data: function() {
    return {
      values: '',
      isLoading: false,
    };
  },
  components: {
    Loading,
  },
  async mounted() {
    this.isLoading = true;
    const token = localStorage.getItem('barcodeToken');

    const result = await axios.get(
      'https://2dz7gb09o9.execute-api.us-east-1.amazonaws.com/dev/barcodes/all',
      {
        headers: {
          Authorization: token,
        },
      }
    );
    this.$gtag.event('load qrcode', {
      event_category: 'qrcode',
      event_label: 'load_qrcode',
      value: 4,
    });
    this.values = result.data.barcodes.Items.map(({ barcodes }) => barcodes);
    this.isLoading = false;
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

.dashboard {
  position: absolute;
  top: 70px;
}

.dashboard > h2 {
  text-align: left;
  padding-left: 1rem;
  font-size: 2rem;
  color: #9eb369;
  margin-left: 15%;
  margin-bottom: 2rem;
  padding-top: 1rem;
}

.bars {
  box-shadow: 5px 5px 10px #ddd;
  width: 30%;
  margin: 1rem;
  padding: 0.5rem;
  position: relative;
}

.bars:hover {
  box-shadow: 5px 5px 10px #fff;
}

.bars img {
  width: 100%;
  height: auto;
}

.fa-download {
  position: absolute;
  font-size: 2rem;
  right: 10px;
  top: 2px;
  color: #b9e250;
}

@media only screen and (max-width: 700px) {
  .bars {
    box-shadow: 5px 5px 10px #ddd;
    width: 30%;
    margin: 0.5rem;
    padding: 0.8rem 0.5rem;
  }

  .bars img {
    width: 100%;
    height: auto;
  }
  .fa-download {
    font-size: 1rem;
  }
  .dashboard > h2 {
    text-align: left;
    padding-left: 1rem;
    font-size: 2rem;
    color: #9eb369;
    margin-bottom: 1rem;
    padding-top: 0.5rem;
  }
}
</style>
