<template>
  <div id="app">
    <div id="allTheNav">
      <nav id="navigator" class="navbar" :class="{ navbaropen: opened }">
        <span class="open-slide">
          <button @click="opened = !opened">
            <div>
              <div class="bar" :class="{ topopen: opened }"></div>
              <div class="bar" :class="{ midopen: opened }"></div>
              <div class="bar" :class="{ botopen: opened }"></div>
            </div>
          </button>
        </span>
        <ul class="navbar-nav">
          <router-link to="/" class="home"
            ><img class="head-logo" src="./assets/qr.png"
          /></router-link>
          <div class="menu-right">
            <router-link to="/create">Create</router-link>
            <router-link to="/scan">Scan</router-link>
            <router-link v-if="token" to="/dashboard">Dashboard</router-link>
            <router-link v-if="!token" to="/signup">Register</router-link>
            <router-link v-if="!token" to="/login">Login</router-link>
            <button v-if="token" class="submit" @click.prevent="logout">
              Logout
            </button>
          </div>
        </ul>
      </nav>
      <div id="side-menu" class="side-nav" :class="{ sidenavopen: opened }">
        <router-link to="/" @click.native="opened = false">Home</router-link>
        <router-link to="/create" @click.native="opened = false"
          >Create</router-link
        >
        <router-link to="/scan" @click.native="opened = false"
          >Scan</router-link
        >
        <router-link v-if="token" to="/dashboard" @click.native="opened = false"
          >Dashboard</router-link
        >
        <router-link v-if="!token" to="/signup" @click.native="opened = false"
          >Register</router-link
        >
        <router-link v-if="!token" to="/login" @click.native="opened = false"
          >Login</router-link
        >
        <button v-if="token" class="submit" @click.prevent="logout">
          Logout
        </button>
      </div>
    </div>
    <!-- <div id="main" :class="{ mainopen: opened }"> -->
    <!-- <h1>Responsive side menu</h1> -->
    <router-view />

    <footer>
      <p class="copy logo">QR CODE ZONE</p>
      <p class="copy">@Copyright 2020</p>
      <p class="contact">Contact Us</p>
    </footer>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      token: localStorage.getItem('barcodeToken'),
      opened: false,
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
  position: relative;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

nav a:hover,
.submit:hover {
  background: #f5f5f5;
  color: green;
}

.navbar-nav a {
  color: green;
}
.head-logo {
  height: 70px;
  width: 70px;
  position: absolute;
  top: -5px;
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

footer {
  background: #374c01;
  color: white;
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 1.5rem;
  display: flex;
}

.copy {
  font-size: 16px !important;
  margin-left: 1rem;
  text-align: center;
  width: 30%;
}

.logo {
  text-align: left;
}

.contact {
  text-align: right;
  width: 30%;
}
.open-slide {
  display: none;
  position: absolute;
  right: 10px;
  top: 10px;
}

.navbar-nav {
  display: block;
  /* border-bottom: green 2px solid; */
}

@media only screen and (max-width: 700px) {
  nav > div {
    left: 0px;
    right: 110px;
  }

  nav a,
  .submit {
    padding: 4px 6px;
    margin: 0.2rem 1rem 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    box-shadow: 1px 1px 3px 1px #ddd;
  }

  footer {
    padding: 0.5rem;
    font-size: 13px !important;
    box-sizing: border-box;
  }
  .copy {
    font-size: 13px !important;
  }
  .open-slide {
    display: block;
  }
  .navbar-nav {
    display: none;
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
    margin: 0.2rem 0.5rem;
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

.navbar {
  background-color: white;
  overflow: hidden;
  height: 63px;
  position: relative;
}

.navbaropen {
  background-color: white;
  overflow: hidden;
  height: 63px;
  margin-left: 250px;
}

.navbar a {
  float: left;
  display: block;
  color: green;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.navbar ul {
  margin: 8px 0 0 0;
  list-style: none;
}

.navbar a:hover {
  background-color: #ddd;
  color: #000;
}

.side-nav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  opacity: 0.9;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.3s;
}

.menu-right .submit {
  color: green;
  padding-top: 15px;
}
.side-nav .submit {
  color: #ccc;
  font-size: 22px;
  font-weight: 100;
}

.sidenavopen {
  height: 100%;
  width: 250px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #121901;
  opacity: 0.9;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.3s;
}

.side-nav a {
  padding: 10px 10px 10px 30px;
  text-decoration: none;
  font-size: 22px;
  color: #ccc;
  display: block;
  transition: 0.3s;
}

.side-nav a:hover {
  color: #fff;
}

.side-nav .btn-close {
  position: absolute;
  top: 0;
  right: 22px;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left 0.3s;
  padding: 20px;
  overflow: hidden;
  width: 100%;
}

.mainopen {
  transition: margin-left 0.3s;
  padding: 20px;
  overflow: hidden;
  width: 100%;
  margin-left: 250px;
}

nav {
  transition: margin-left 0.3s;
}

.bar {
  display: block;
  height: 5px;
  width: 35px;
  background: green;
  margin: 5px auto;
}

.midopen {
  width: 0;
}
.bar {
  transition: all 0.3s ease;
}
.topopen {
  transform: translateY(10px) rotateZ(45deg);
}
.botopen {
  transform: translateY(-10px) rotateZ(-45deg);
}

.open-slide button {
  background: white;
  border: none;
}
.menu-right {
  position: absolute;
  right: 100px;
}
.navbar-nav .home:hover {
  color: none;
  background: none;
}
</style>
