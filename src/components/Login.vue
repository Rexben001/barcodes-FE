<template>
  <form class="login">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>

    <p class="details">Login to get all your qrcodes</p>
    <p class="error">{{ error }}</p>
    <input placeholder="Email address" v-model="email" type="email" />
    <input placeholder="Password" v-model="password" type="password" />
    <button id="submit" @click.prevent="submitted">Login</button>
    <router-link to="/signup">Don't have an account? Register</router-link>
  </form>
</template>

<script>
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Login',
  data: function() {
    return {
      email: '',
      password: '',
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
      try {
        const result = await axios.post(
          'https://2dz7gb09o9.execute-api.us-east-1.amazonaws.com/dev/get',
          {
            password: this.password,
            email: this.email,
          }
        );
        localStorage.setItem('barcodeToken', result.data.token);
        window.location.href = '/dashboard';
      } catch (error) {
        this.error = error.response.data.message;
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
.error {
  color: red;
  font-weight: 500;
  font-style: italic;
}
</style>
