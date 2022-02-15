<template>
  <div>
    <Home />
  </div>
</template>

<script lang="ts">
import Home from "@/views/Home.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Home,
  },
});
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
