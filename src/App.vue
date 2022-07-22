<template>
  <div id="app" class="app-container">
    <nav class="navbar navbar-expand-sm bg-success navbar-dark navbar-menu">
      <ul class="navbar-nav" style="margin-right: auto !important">
        <li class="nav-item">
          <router-link :to="{ name: 'Create' }" class="nav-link">
            <i class="fa fa-fw fa-envelope"></i>
            Add News
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'List' }" class="nav-link">
            <i class="fa fa-fw fa-home"></i>
            All News
          </router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item" v-bind:style="{ display: logoutDisplay }">
          <a class="nav-link" style="cursor:pointer;" v-on:click="logout();">
            <i class="fa fa-close"></i>
            Logout
          </a>
        </li>
        <li class="nav-item" v-bind:style="{ display: loginDisplay }">
          <router-link :to="{ name: 'Login' }" class="nav-link">
            <i class="fa fa-fw fa-user"></i>
            Login
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Register' }" class="nav-link">
            <i class="fa fa-bell-o"></i>
            SignUp
          </router-link>
        </li>
      </ul>
    </nav>
    <transition name="fade">
      <div class="" style="background-color: white;">
        <router-view></router-view>        
      </div>
    </transition>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-bottom navbar-menu flex-container-space-between">
      <div>
        &copy; Copyright 2022
      </div>
      <div id="site-mark">
        News Potal Site
      </div>
      <div>
        wangmingming0111@gmail.com
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        loginDisplay: 'inline',
        logoutDisplay: 'none'
      }
    },

    created: function(){
      // console.log("created");
    },
    mounted: function(){
      // console.log("mounted");
      sessionStorage.setItem("userId", "");
      if (window.location.pathname != '/list') {
        this.$router.push({name: 'List'});
      }
    },
    updated: function(){
      // console.log("updated");
      if (sessionStorage.getItem("userId").length < 1) {
        this.loginDisplay = 'inline';
        this.logoutDisplay = 'none';
      }
      else {
        this.loginDisplay = 'none';
        this.logoutDisplay = 'inline';
      }
    },
    methods: {
      logout() {
        this.loginDisplay = 'inline';
        this.logoutDisplay = 'none';
        sessionStorage.setItem("userId", "");
        this.$router.push({name: 'Login'});
      }
    }
  }
</script>

<style>
</style>
