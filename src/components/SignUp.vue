<template>
  <form>
    <p>Backup your barcodes</p>
    <input placeholder="Email address" v-model="email" type="email" />
    <input placeholder="Password" v-model="password" type="password" />
    <button id="submit" @click.prevent="submitted">Signup</button>
    <router-link to="/login">Already have an account? Login</router-link>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SignUp',
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
        'https://2dz7gb09o9.execute-api.us-east-1.amazonaws.com/dev/add',
        {
          password: this.password,
          email: this.email,
        }
      );
      localStorage.setItem('barcodeToken', result.data.token);
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
