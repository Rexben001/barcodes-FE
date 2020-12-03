<template>
  <div class="main-index">
    <h2></h2>
    <div class="main-article">
      <div class="first article">
        <div>
          <p>
            The QR Code Zone Scanner is the perfect tool to scan your QR codes.
            You can use your mobile or laptop and it works on most websites.
          </p>
        </div>
        <img src="../assets/qr.svg" />
      </div>
      <div class="first second-article">
        <img src="../assets/qrboy.svg" />
        <div>
          <p>
            The QR Code Zone Creator is the perfect tool to create your QR codes
            for personal branding. You can use your mobile or laptop and it
            works on most websites.
          </p>
        </div>
      </div>
    </div>
    <div class="how-to">
      <h2>What about QR code</h2>
      <div>
        <p>
          A QR code (abbreviated from Quick Response code) is a type of matrix
          barcode (or two-dimensional barcode) first designed in 1994 for the
          automotive industry in Japan. A barcode is a machine-readable optical
          label that contains information about the item to which it is
          attached. In practice, QR codes often contain data for a locator,
          identifier, or tracker that points to a website or application. A QR
          code uses four standardized encoding modes (numeric, alphanumeric,
          byte/binary, and kanji) to store data efficiently; extensions may also
          be used.[ ~ Wikipedia
        </p>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Barcodes',
};
</script>

<style scoped>
.main-index {
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  margin-bottom: 4rem;
}
h2 {
  margin-top: 30px;
}
.main-article {
  height: 70vh;
}
.first {
  display: flex;
  width: 100%;
  position: relative;
}
.first > div {
  width: 60%;
  position: absolute;
}

.article > div {
  left: 100px;
  top: 140px;
}
.second-article > div {
  right: 30px;
  top: 400px;
}

.first div p {
  font-size: 1.5rem !important;
  font-family: cursive;
  width: 80%;
}

.first img {
  height: 300px;
  width: auto;
  position: absolute;
  right: 200px;
}

.second-article img {
  top: 300px;
  left: 100px;
}

.how-to {
  margin: 1rem auto;
  background: #788455;
  color: white;
  padding-bottom: 1rem;
}
.how-to div {
  width: 70%;
  text-align: center;
  margin: 0 auto;
}

.how-to div p {
  font-size: 1.4rem;
}
@media only screen and (max-width: 700px) {
  .main-article {
    height: auto;
    padding: 1rem;
  }
  .first {
    flex-direction: column;
  }
  .second-article {
    flex-direction: column-reverse;
  }
  .first > div,
  .first img {
    all: revert;
    position: relative;
    width: 100%;
  }
  .first div p {
    all: revert;
    font-size: 1.2rem !important;
    width: 100%;
  }
  .how-to div {
    width: 100%;
  }
  .second-article img {
    all: revert;
    /* top: 300px;
    left: 10px; */
    position: relative;
  }
  .second-article > div {
    all: revert;
    /* right: 300px;
    top: 400px; */
    width: 100%;
  }
}
</style>
