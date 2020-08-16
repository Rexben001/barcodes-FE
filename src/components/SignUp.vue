<template>
  <form>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <p>Backup your qrcodes</p>
    <p class="error">{{ error }}</p>
    <input placeholder="Email address" v-model="email" type="email" />
    <input placeholder="Password" v-model="password" type="password" />
    <button id="submit" @click.prevent="submitted">Signup</button>
    <router-link to="/login">Already have an account? Login</router-link>
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
          'https://2dz7gb09o9.execute-api.us-east-1.amazonaws.com/dev/add',
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
#submit {
  background: green;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  color: white;
  border-radius: 7px;
  margin: 1rem;
  cursor: pointer;
}

#submit:hover {
  color: green;
  background: white;
  border: green solid 2px;
}
form {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 500px;
  font-size: 1rem;
}
input {
  padding: 1rem;
  margin: 1rem;
  border-radius: 7px;
}

input:focus,
button:focus {
  outline: 0px;
}

p:first-child {
  font-size: 2rem;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: green;
}
</style>
