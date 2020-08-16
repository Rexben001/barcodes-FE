<template>
  <form>
    <p>Login to get all your qrcodes</p>
    <p class="error">{{error}}</p>
    <input placeholder="Email address" v-model="email" type="email" />
    <input placeholder="Password" v-model="password" type="password" />
    <button id="submit" @click.prevent="submitted">Login</button>
    <router-link to="/signup">Don't have an account? Register</router-link>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data: function () {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async submitted() {
      try {
        const result = await axios.post(
          "https://2dz7gb09o9.execute-api.us-east-1.amazonaws.com/dev/get",
          {
            password: this.password,
            email: this.email,
          }
        );
        localStorage.setItem("barcodeToken", result.data.token);
        this.$router.push("/dashboard");
        window.location.href = "/dashboard";
      } catch (error) {
        this.error = error.response.data.message;
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
