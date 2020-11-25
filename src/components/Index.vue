<template>
  <div class="main">
    <h2>Main Page</h2>
    <img src="../assets/qr.svg" />

    <div>
      <p>Create QR codes</p>
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
  position: relative;
}
h2 {
  margin-top: 70px;
}
</style>
