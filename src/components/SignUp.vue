<template>
  <form class="login">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <p class="details">Backup your qrcodes</p>
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
        this.$gtag.event('signup', {
          event_category: 'auth',
          event_label: 'create account',
          value: 2,
        });
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
  background: #597b06;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  color: white;
  border-radius: 7px;
  margin: 1rem;
  cursor: pointer;
}

#submit:hover {
  color: #597b06;
  background: white;
  border: #597b06 solid 2px;
}
form {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 500px;
  font-size: 1rem;
  padding-top: 20vh;
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
/* .login {
  margin-top: 70px;
} */

.login > input {
  border: #597b06 1px solid;
}

.login > button {
  border: #597b06 1px solid;
}

.details {
  font-size: 1.2rem;
  font-weight: 700;
  font-family: Avenir;
  color: #2a3b00;
}
@media only screen and (max-width: 700px) {
  form {
    width: 100%;
  }
}
</style>
