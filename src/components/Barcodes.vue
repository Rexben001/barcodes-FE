<template>
  <div class="main">
    <div class="create">
      <div>
        <h2>Create Your QR code</h2>
        <img src="../assets/qrboy.svg" alt="qr boy" />
      </div>

      <div id="create">
        <form class="form">
          <label hidden>Enter text</label>
          <textarea placeholder="Enter text here " v-model="text" type="text" />
          <button class="submitted" @click.prevent="submitted">
            Create QR code
          </button>
        </form>

        <div>
          <loading
            :active.sync="isLoading"
            :can-cancel="true"
            :on-cancel="onCancel"
            :is-full-page="fullPage"
          ></loading>
          <p class="result">Result</p>
          <img v-if="url" class="codes" :src="url" />
          <a v-if="url" class="fas fa-save" download="barcode.jpg" :href="url"
            >.jpg</a
          >
          <a v-if="url" class="fas fa-save" download="barcode.png" :href="url"
            >.png</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Barcodes',

  data: function() {
    return {
      text: '',
      url: '',
      result: '',
      error: '',
      isLoading: false,
    };
  },
  components: {
    Loading,
  },
  methods: {
    async submitted() {
      this.isLoading = true;
      const token = localStorage.getItem('barcodeToken');
      let headers = {};
      if (token) {
        headers = {
          Authorization: token,
        };
      }
      const result = await axios.post(
        'https://2dz7gb09o9.execute-api.us-east-1.amazonaws.com/dev/barcodes',
        {
          text: this.text,
        },
        { headers }
      );

      this.url = result.data.url;
      this.$gtag.event('create qrcode', {
        event_category: 'qrcode',
        event_label: 'create_qrcode',
        value: 3,
      });
      if (this.url) {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
#create a {
  background: rgb(23, 228, 88);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-top: 1rem;
}

.codes {
  display: block;
  margin: 1rem auto 2rem;
  width: 40%;
  height: 45%;
}
.qrcode-main {
  width: 500px;
  height: auto;
  margin: 0 auto;
}
hr {
  height: 20rem;
  color: black;
}
.error {
  color: red;
  font-weight: 700;
}
.result {
  font-size: 1.2rem;
}

.main {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 2rem;
  margin-bottom: 8rem;
}
.create {
  width: 95%;
  position: relative;
}
.create > div,
.qrcode .create {
  display: flex;
  width: inherit;
  justify-content: center;
  height: 48%;
}
.qrcode {
  width: 50%;
}

.drop-area {
  width: 500px;
  height: 300px;
  color: #fff;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  /* border: 2px solid green; */
  background-color: rgba(0, 0, 0, 0.5);
  margin: 1rem auto;
}

.dragover {
  background-color: rgba(0, 0, 0, 0.8);
}

.create > div > img,
.qrcode .create img {
  margin-left: 50%;
  width: 300px;
  height: 250px;
  position: absolute;
  top: 13%;
  right: 10px;
  opacity: .4;
}

.create > div > h2,
.qrcode h2 {
  position: absolute;
  top: 20%;
  left: 20%;
  font-size: 2rem;
  color: #597b06;
}

#create {
  display: flex;
  width: 80%;
  box-sizing: border-box;
  justify-content: center;
  margin: 0 auto;
  height: 450px;
}

#create > div {
  border: 2px solid #f5f5f5;
  width: 40%;
  margin: 0;
  padding: 1rem;
  border-radius: 10px;
}
#create > .form {
  width: 60%;
  margin: 0;
  padding: 0;
  background: #f5f5f5;
  border-radius: 10px;
}

textarea {
  border: 0;
  box-shadow: 5px 5px 10px 5px #ddd;
  padding: 1rem;
  margin: 1rem;
  border-radius: 7px;
  resize: none;
  height: 300px;
}

.submitted {
  border: none;
  background: #597b06;
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  margin: 1rem;
  box-shadow: 5px 5px 10px 5px #ddd;
  border-radius: 7px;
  cursor: pointer;
  color: white;
}

.submitted:hover,
.fa-save:hover {
  color: #597b06;
  background: #dde5cd;
}

.fa-save {
  color: white;
  background: #98ad65;
  font-size: 1.5rem;
  margin: 1rem;
  box-shadow: 5px 5px 10px 5px #f5f5f5;
}

.result {
  font-size: 2rem;
}

@media only screen and (max-width: 700px) {
  .main {
    display: flex;
    flex-direction: column;
  }
  .create,
  .qrcode {
    width: 100%;
  }
  #create {
    flex-direction: column;
    margin-top: 60vh;
  }
  #create > .form,
  #create > div {
    width: 100%;
  }
  .create {
    width: 100%;
    margin: 0 auto;
  }
  .create > div > h2 {
    top: 10%;
    left: 12%;
  }
  .create > div > img,
  .qrcode .create img {
    top: 15%;
    right: 10%;
  }

  .qrcode .create h2 {
    top: 12%;
    left: 10%;
  }

  .qrcode .create img {
    right: 5px;
  }

  .qrcode #create {
    margin-top: 10px;
    box-sizing: border-box;
  }

  .qrcode #create .form {
    width: 100% !important;
    box-sizing: border-box;
    margin-top: 2rem;
    height: 350px;
  }

  input[type='file'] {
    padding: 0.5rem !important;
    font-size: 1rem !important;
  }
  .drop {
    top: 20% !important;
  }
  #create > div {
    width: 90%;
  }
  #create {
    height: auto;
  }
  .camera {
    height: 400px;
  }
}
</style>
