<template>
  <form>
    <p>Login to get all your barcode</p>
    <input placeholder="Email address" v-model="email" type="email" />
    <input placeholder="Password" v-model="password" type="password" />
    <button id="submit" @click.prevent="submitted">Login</button>
    <router-link to="/signup">Don't have an account? Register</router-link>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data: function() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async submitted() {
      console.log({ password: this.password, email: this.email });
      const result = await axios.post(
        'https://2dz7gb09o9.execute-api.us-east-1.amazonaws.com/dev/get',
        {
          password: this.password,
          email: this.email,
        }
      );
      localStorage.setItem('barcodeToken', result.data.token);
      //   window.location.href = '/dashboard';
      this.$router.push('/dashboard');
    },
    // mounted() {
    //   this.$router.push('/home');
    // },
  },
};
</script>
