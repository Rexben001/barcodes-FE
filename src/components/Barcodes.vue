<template>
  <div class="main">
    <div class="create">
      <div>
        <h2>Create Your QR code</h2>
        <img src="../assets/qrboy.svg" />
      </div>

      <div id="create">
        <form class="form">
          <textarea placeholder="Enter text here " v-model="text" type="text" />
          <button class="submitted" @click.prevent="submitted">Create QR code</button>
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
          <a v-if="url" class="fas fa-save" download="barcode.jpg" :href="url">.jpg</a>
          <a v-if="url" class="fas fa-save" download="barcode.png" :href="url">.png</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Barcodes",

  data: function () {
    return {
      text: "",
      url: "",
      result: "",
      error: "",
      isLoading: false,
    };
  },
  components: {
    Loading,
  },
  methods: {
    async submitted() {
      this.isLoading = true;
      const token = localStorage.getItem("barcodeToken");
      let headers = {};
      if (token) {
        headers = {
          Authorization: token,
        };
      }
      const result = await axios.post(
        "https://2dz7gb09o9.execute-api.us-east-1.amazonaws.com/dev/barcodes",
        {
          text: this.text,
        },
        { headers }
      );

      this.url = result.data.url;
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
}
.create {
  width: 95%;
  position: relative;
}
.create > div, .qrcode .create {
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

.create > div > img, .qrcode .create img {
  margin-left: 50%;
  width: 300px;
  height: 250px;
  position: absolute;
  top: 13%;
  right: 10px;
}

.create > div > h2,
.qrcode h2 {
  position: absolute;
  top: 20%;
  left: 20%;
  font-family: "Nova Cut", cursive;
  font-size: 2rem;
  color: #9eb369;
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
  background: #9eb369;
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
  color: #9eb369;
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
  font-family: cursive;
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
  .create > div > img {
    top: 15%;
    right: 10%;
  }
}
</style>
