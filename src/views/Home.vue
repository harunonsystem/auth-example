<template>
  <div class="home">
      <img src="../assets/logo.png" alt="">
      <h1>This is Home Page.</h1>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
export default {
    name: 'home',
    components: {
        HelloWorld
    }
}
</script>