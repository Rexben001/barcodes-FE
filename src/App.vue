<template>
  <div id="app">
    <nav>
      <div>
        <router-link to="/">Create</router-link>
        <router-link to="/scan">Scan</router-link>
        <router-link v-if="token" to="/dashboard">Dashboard</router-link>
        <router-link v-if="!token" to="/signup">Register</router-link>
        <router-link v-if="!token" to="/login">Login</router-link>
        <button v-if="token" class="submit" @click.prevent="logout">
          Logout
        </button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      token: localStorage.getItem('barcodeToken'),
    };
  },
  methods: {
    async logout() {
      localStorage.removeItem('barcodeToken');
      window.location.href = '/login';
    },
  },
};
</script>

<style>
*,
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #e2ff96;
  margin-bottom: 10px;
  padding: 1rem;
  position: fixed;
  z-index: 300;
  background: white;
}

nav > div {
  text-align: right;
  color: blue;
  position: absolute;
  top: 20px;
  right: 70px;
  margin-bottom: 10px;
}

nav a {
  padding: 10px 20px;
}

nav a:hover,
.submit:hover {
  background: #f5f5f5;
  color: green;
}

.submit {
  border: none;
  background: inherit;
  padding: 10px 20px;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  cursor: pointer;
}
input:focus,
textarea:focus {
  outline: none;
}
textarea {
  font-size: 2rem;
}

@media only screen and (max-width: 700px) {
  nav > div {
    left: 0px;
    right: 110px;
  }

  nav a,
  .submit {
    padding: 4px 6px;
    margin: .2rem 1rem .5rem;
    font-size: 1rem;
    font-weight: 500;
    box-shadow: 1px 1px 3px 1px #ddd;
  }
}
@media only screen and (max-width: 500px) {
  nav > div {
    left: 0px;
    right: 100px;
  }

  nav a,
  .submit {
    padding: 4px 6px;
    margin: .2rem .5rem;
    font-size: 1rem;
    font-weight: 500;
    box-shadow: 1px 1px 3px 1px #ddd;
  }
}

@media only screen and (max-width: 400px) {
  nav > div {
    left: 10px;
    right: 100px;
  }

  nav a,
  .submit {
    padding: 4px 10px;
    margin: 0 auto;
    font-size: 1rem;
    font-weight: 500;
    box-shadow: none;
    border-right: #ddd solid 1px;
  }

  .submit {
    border: none;
  }

  nav a:first-child {
    border-left: #ddd solid 1px;
  }
}
</style>
