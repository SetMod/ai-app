<template>
  <div>
    <nav class="navbar">
      <router-link
        v-for="route, index in routes"
        class="navbar__item"
        :to="route.path"
        :key="index"
      >{{ route.name }}</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { routes } from "@/routes/index"

export default defineComponent({
  setup() {
    return {
      routes
    }
  }
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

.navbar {
  display: flex;
  margin: auto;
  width: fit-content;
}
.navbar__item {
  margin-right: 1rem;
  color: #3a5a79;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
}
.navbar__item:last-child {
  margin-right: 0;
}
.navbar__item.router-link-exact-active {
  color: #42b983;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex > section {
  padding: 0 15px 0 0;
}
.flex > section:last-child {
  padding: 0;
}
.result {
  font-weight: bolder;
  font-size: 2rem;
}
.teta {
  margin: 1rem 0;
}
.learn {
  padding: 0.5rem 2rem;
  background-color: rgb(159, 202, 110);
  border-radius: 0.2rem;
  font-weight: bolder;
  color: darkslategrey;
  text-transform: uppercase;
}
button {
  margin: 0.5rem 0.5rem 0.5rem 0;
}
button:last-child {
  margin-right: 0;
}
</style>
