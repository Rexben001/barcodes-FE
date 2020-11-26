<template>
  <div class="main">
    <h2></h2>
    <div class="first article">
      <div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
      </div>
      <img src="../assets/qr.svg" />
    </div>
    <div class="first second-article">
      <img src="../assets/qrboy.svg" />
      <div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
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
.main {
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
}
h2 {
  margin-top: 30px;
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
</style>
