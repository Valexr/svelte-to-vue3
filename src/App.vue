<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <SpectreButton @click="click" variant="primary">
    <span>SpectreButton</span>
  </SpectreButton>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue';
import SpectreButton from "./svelte_components/Button";

import { createApp, resolveComponent, h } from "vue";

// createApp({
//   components: {
//     SpectreButton
//   }
// });
const click = (e) => console.log('click', e);
console.log(HelloWorld, SpectreButton);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
