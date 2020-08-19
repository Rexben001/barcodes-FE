<template>
  <div class="scan-page">
    <!-- <p v-if="open" @click.prevent="menuOpen" class="sideMenu">☰</p>
    <p v-if="!open" @click.prevent="menuOpen" class="sideMenuX">X</p>-->
    <div class="tab" :class="open ? '' : 'open'">
      <p
        @click.prevent="clicked('stream')"
        v-bind:style="{
          background: stream ? '#9EB369' : '',
          color: stream ? '#fff' : 'inherit',
          cursor: 'pointer',
        }"
      >
        <span class="fas fa-camera"></span>Camera Scan
      </p>
      <p
        @click.prevent="clicked('drop')"
        v-bind:style="{
          background: drop ? '#9EB369' : '',
          color: drop ? '#fff' : 'inherit',
          cursor: 'pointer',
        }"
      >
        <span class="fas fa-arrows-alt"></span> Drag and Drop Scan
      </p>
      <p
        @click.prevent="clicked('capture')"
        v-bind:style="{
          background: capture ? '#9EB369' : '',
          color: capture ? '#fff' : 'inherit',
          cursor: 'pointer',
        }"
      >
        <span class="fas fa-upload"></span> Upload Scan
      </p>
    </div>
    <div class="qrcode">
      <div class="create">
        <h2 v-if="drop" class="drop">Drag and Drop zone</h2>
        <h2 v-if="stream">Scan Barcodes</h2>
        <h2 v-if="capture">Upload zone</h2>
        <img src="../assets/qr.svg" />
      </div>
      <div v-if="stream">
        <div id="create">
          <div class="camera">
            <p v-if="error" class="error">{{ error }}</p>
            <qrcode-stream
              v-if="!error"
              :camera="camera"
              @decode="onDecode"
              @init="onInit"
              class="qrcode-main form"
            />
          </div>
          <div>
            <p class="res">Result</p>
            <p class="answer" v-if="result && !isUrl">{{ result }}</p>
            <a v-if="result && isUrl" target="_blank" :href="result">
              {{
              result
              }}
            </a>
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
            <div class="qrcode-main form drop" :class="{ dragover: dragover }">
              <p>DROP SOME IMAGES HERE</p>
            </div>
          </qrcode-drop-zone>

          <div>
            <p>Result</p>
            <p v-if="dragResult" class="answer">{{ dragResult }}</p>
            <p v-if="dragError" class="error">{{ dragError }}</p>
          </div>
        </div>
      </div>

      <div v-if="capture">
        <div id="create">
          <div class="qrcode-main form">
            <qrcode-capture @decode="onDecodeUpload" class="input" @change="loadFile($event)" />
          </div>
          <div>
            <p>Result</p>
            <p v-if="uploadResult" class="answer">{{ uploadResult }}</p>
            <p v-if="uploadError" class="error">{{ uploadError }}</p>
          </div>
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
      open: true,
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
      try {
        if (!result)
          return (this.uploadError =
            "Unable to scan qrcode, pls provide a valid qrcode");

        this.uploadResult = result;
      } catch (error) {
        console.log("error>>", error);
      }
    },
    clicked(value) {
      console.log("value", value);
      this.stream = value === "stream";
      this.drop = value === "drop";
      this.capture = value === "capture";
      this.open = true;
    },
    checkResult(result) {
      const re = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
      if (re.test(result)) {
        this.isUrl = true;
      }
    },
    loadFile(event) {
      var reader = new FileReader();
      reader.onload = function () {
        // var output = document.getElementById("output");
        // output.src = reader.result;

        console.log(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    menuOpen() {
      this.open = !this.open;
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
  margin-top: -30px;
  position: absolute;
  height: 90vh;
  border-right: 0.5px solid #ddd;
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
  /* margin-left: 2rem; */
}

.qrcode #create {
  width: 100%;
  display: flex;
}

.qrcode #create .form {
  width: 50%;
}
.qrcode .create {
  height: 40%;
}
.qrcode .create img {
  top: -28px;
}

.answer {
  margin-top: 3rem;
  font-size: 1.5rem;
}

input[type="file"] {
  padding: 1rem;
  font-size: 1.5rem;
  background: #6e7d47;
  margin-top: 20vh;
}
.qrcode-main .form > p {
  color: #6e7d47;
  width: 100%;
  margin-top: 3rem;
}

.sideMenu {
  font-size: 2.5rem;
  color: rgb(165 187 108);
  display: none;
  margin-top: 8px;
  position: fixed;
  z-index: 250;
  box-shadow: 5px 5px 10px 5px #ddd;
  border-radius: 7px;
  cursor: pointer;
}
.sideMenuX {
  font-size: 2.1rem;
  display: none;
  margin-top: 15px;
  position: fixed;
  z-index: 300;
  right: 10px;
  color: #597b06;
  font-weight: 700;
  cursor: pointer;
}

.qrcode h2 {
  left: 30%;
  top: 30%;
}
.qrcode {
  width: 80%;
  margin-left: 50vh;
}
.qrcode .create img {
  top: -15px;
  right: -25%;
}

.camera .form {
  width: 100% !important;
}
#create > div a {
  margin-top: 3rem;
}
.fa-camera,
.fa-arrows-alt,
.fa-upload {
  margin-right: 2rem;
}
@media only screen and (max-width: 700px) {
  .sideMenu,
  .sideMenuX {
    display: block;
  }
  .tab {
    display: none;
    margin-top: 40px;
  }
  .open {
    width: 100%;
    z-index: 200;
    background: white;
    height: 80vh;
    top: -20px;
    display: block;
  }
  .qrcode .create {
    top: 20px;
  }
  .qrcode #create {
    margin-top: 10vh;
  }
  .qrcode {
    width: 100%;
    margin-left: 0vh;
  }
  .qrcode h2 {
    left: 10%;
    top: 10%;
  }
  .qrcode .create img {
    top: -15px;
    right: 5%;
  }

  .res {
    margin-bottom: 3rem;
  }
}
@media only screen and (max-width: 850px) {
  .tab {
    display: none;
  }
}
</style>
