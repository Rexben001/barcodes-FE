<template>
  <div class="main">
    <div class="qrcode">
      <h2>Scan Barcodes</h2>
      <qrcode-stream
        v-if="!error"
        :camera="camera"
        @decode="onDecode"
        @init="onInit"
        class="qrcode-main"
      />
      <p v-if="result">Result👇</p>
      <p v-if="result">{{ result }}</p>
      <p v-if="error" class="error">{{ error }}</p>

      <h2>Drag and Drop zone</h2>
      <qrcode-drop-zone @detect="onDetect" @dragover="onDragOver" @init="logErrors">
        <div class="drop-area" :class="{ dragover: dragover }">DROP SOME IMAGES HERE</div>
      </qrcode-drop-zone>
      <p v-if="dragResult">Result👇</p>
      <p v-if="dragResult">{{ dragResult }}</p>
      <p v-if="dragError" class="error">{{ dragError }}</p>

      <h2>Upload zone</h2>
      <qrcode-capture @decode="onDecodeUpload" />

      <p v-if="uploadResult">Result👇</p>
      <p v-if="uploadResult">{{ uploadResult }}</p>
      <p v-if="uploadError" class="error">{{ uploadError }}</p>
    </div>

    <div class="create">
      <h2>Create Your QR code</h2>
      <form>
        <textarea placeholder="Enter text here " v-model="text" type="text" />
        <button id="submit" @click.prevent="submitted">Create QR code</button>
      </form>

      <p v-if="url">QR codee👇</p>
      <img v-if="url" :src="url" />
      <a v-if="url" download="barcode.png" :href="url">Download</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";

export default {
  name: "Barcodes",
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
  },
  data: function () {
    return {
      text: "",
      url: "",
      result: "",
      error: "",
      camera: "auto",
      dragResult: "",
      uploadResult: "",
      dragError: "",
    };
  },
  methods: {
    async submitted() {
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
    },

    async onDecode(result) {
      if (result) {
        this.result = result;
        this.turnCameraOff();
        await this.timeout(4000);
        this.turnCameraOn();
      }
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error =
            "You need to grant camera access permisson to scan barcodes";
        } else if (error.name === "NotFoundError") {
          this.error = "No camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "Secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "Is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "Installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "Stream API is not supported in this browser";
        }
      }
    },
    turnCameraOn() {
      this.camera = "auto";
    },

    turnCameraOff() {
      this.camera = "off";
    },
    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
      });
    },
    onDragOver(isDraggingOver) {
      this.dragover = isDraggingOver;
    },
    logErrors(promise) {
      promise.catch(console.error);
    },
    async onDetect(promise) {
      try {
        console.log(promise);
        const { content } = await promise;

        this.dragResult = content;
        this.dragError = null;
      } catch (error) {
        if (error.name === "DropImageFetchError") {
          this.dragError = "Sorry, you can't load cross-origin images :/";
        } else if (error.name === "DropImageDecodeError") {
          this.dragError = "Ok, that's not an image. That can't be decoded.";
        } else {
          this.dragError = "Ups, what kind of error is this?! " + error.message;
        }
      }
    },
    onDecodeUpload(result) {
      this.uploadResult = result;
    },
  },
};
</script>

<style scoped>
a {
  background: rgb(23, 228, 88);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-top: 1rem;
}

img {
  display: block;
  margin: 0.5rem auto 2rem;
  width: 35%;
  height: 40%;
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
}
.create,
.qrcode {
  width: 50%;
}

textarea {
  padding: 1rem;
  margin: 1rem;
  border-radius: 7px;
  resize: none;
  height: 200px;
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

@media only screen and (max-width: 700px) {
  .main {
    display: flex;
    flex-direction: column;
  }
  .create,
  .qrcode {
    width: 100%;
  }
}
</style>
