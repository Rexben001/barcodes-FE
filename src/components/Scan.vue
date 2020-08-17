<template>
  <div class="scan-page">
    <div class="tab">
      <p
        @click.prevent="clicked('stream')"
        v-bind:style="{background: stream ? '#9EB369': '', color: stream ? '#fff': 'inherit'}"
      >Camera Scan</p>
      <p
        @click.prevent="clicked('drop')"
        v-bind:style="{background: drop ? '#9EB369': '', color: drop ? '#fff': 'inherit'}"
      >Drag and Drop Scan</p>
      <p
        @click.prevent="clicked('capture')"
        v-bind:style="{background: capture ? '#9EB369': '', color: capture ? '#fff': 'inherit'}"
      >Upload Scan</p>
    </div>
    <div class="qrcode">
      <div class="create">
        <h2 v-if="drop">Drag and Drop zone</h2>
        <h2 v-if="stream">Scan Barcodes</h2>
        <h2 v-if="capture">Upload zone</h2>
        <img src="../assets/qr.svg" />
      </div>
      <div v-if="stream">
        <div id="create">
          <qrcode-stream
            v-if="!error"
            :camera="camera"
            @decode="onDecode"
            @init="onInit"
            class="qrcode-main form"
          />
          <div>
            <p>Result</p>
            <p v-if="result && !isUrl">{{ result }}</p>
            <a v-if="result && isUrl" target="_blank" :href="result">{{ result }}</a>
            <p v-if="error" class="error">{{ error }}</p>
          </div>
        </div>
      </div>

      <div v-if="drop">
        <div id="create">
          <qrcode-drop-zone
            @detect="onDetect"
            @dragover="onDragOver"
            @init="logErrors"
            class="qrcode-main form"
          >
            <div class="qrcode-main form" :class="{ dragover: dragover }">DROP SOME IMAGES HERE</div>
          </qrcode-drop-zone>

          <p>Result</p>
          <p v-if="dragResult">{{ dragResult }}</p>
          <p v-if="dragError" class="error">{{ dragError }}</p>
        </div>
      </div>

      <div v-if="capture">
        <div id="create">
          <qrcode-capture @decode="onDecodeUpload" class="qrcode-main form" />
          <p v-if="uploadResult">Result</p>
          <p v-if="uploadResult">{{ uploadResult }}</p>
          <p v-if="uploadError" class="error">{{ uploadError }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";

export default {
  name: "Scan",
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
      uploadError: "",
      stream: true,
      drop: false,
      capture: false,
      isUrl: false,
    };
  },
  methods: {
    async onDecode(result) {
      if (result) {
        this.result = result;
        this.checkResult(this.result);
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
        const { content } = await promise;
        if (!content) {
          this.dragError = "Unable to scan qrcode, pls provide a valid qrcode";
        } else this.dragResult = content;
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
      if (!result)
        return (this.uploadError =
          "Unable to scan qrcode, pls provide a valid qrcode");

      this.uploadResult = result;
    },
    clicked(value) {
      console.log("value", value);
      this.stream = value === "stream";
      this.drop = value === "drop";
      this.capture = value === "capture";
    },
    checkResult(result) {
      const re = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
      if (re.test(result)) {
        this.isUrl = true;
      }
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
  width: 50%;
  height: auto;
  /* margin: 0 auto; */
}

.error {
  color: red;
  font-weight: 700;
}
.result {
  font-size: 1.2rem;
}
.qrcode {
  width: 100%;
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

.scan-page {
  display: flex;
  box-sizing: border-box;
  top: 9%;
  position: absolute;
  width: 100%;
}

.tab {
  width: 20%;
  box-sizing: border-box;
  margin-top: 10px;
}
.tab > p {
  font-size: 1.3rem;
  cursor: pointer;
  padding: 2rem 0.5rem 2rem 2rem;
  text-align: left;
  border-bottom: 0.5px solid #ddd;
  border-right: 0.5px solid #ddd;
}

.tab > p:hover {
  background: rgb(165 187 108);
  color: white !important;
}

.qrcode {
  margin-top: 1rem;
  position: relative;
}

.qrcode #create {
  width: 100%;
  display: flex;
}

.qrcode #create .form {
  width: 50%;
}
.qrcode .create {
  height: 35%;
}
.qrcode .create img {
  top: -28px;
}
</style>
