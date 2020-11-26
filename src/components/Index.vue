<template>
  <div class="main-index">
    <h2></h2>
    <div class="main-article">
      <div class="first article">
        <div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </div>
        <img src="../assets/qr.svg" />
      </div>
      <div class="first second-article">
        <img src="../assets/qrboy.svg" />
        <div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </div>
      </div>
    </div>
    <div class="how-to">
      <h2>How to Use</h2>
      <div>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
        <p>
          The point of using Lorem Ipsum is that it has a more-or-less normal
          distribution of letters, as opposed to using 'Content here, content
          here', making it look like readable English.
        </p>
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
  width: 50%;
  text-align: center;
  margin: 0 auto;
}

.how-to div p {
  font-size: 1.4rem;
}
@media only screen and (max-width: 700px) {
  .main-article {
    height: auto;
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
