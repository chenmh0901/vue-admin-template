<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
function goHome() {
  router.push('/home')
}
</script>

<template>
  <div>
    <p>
      HTTP:
      <span>404</span>
    </p>
    <code>
      <span>this_page is not found</span>
    </code>
    <code>
      <a style="cursor: pointer;" @click="goHome">HOME</a>
    </code>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Bevan');
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

div {
  overflow: hidden;
  height: 100vh;
}

p {
  font-family: 'Bevan', cursive;
  font-size: 130px;
  margin: 10vh 0 10vh;
  text-align: center;
  letter-spacing: 5px;
  background-color: black;
  color: transparent;
  text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.1);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
}
p span {
  font-size: 1.2em;
}

code {
  color: #bdbdbd;
  text-align: center;
  display: block;
  font-size: 16px;
  margin: 0 30px 25px;
}
code span {
  color: #f0c674;
  font-size: 20px;
}

a {
  color: #8abeb7;
  font-family: monospace;
  font-size: 20px;
  text-decoration: underline;
  margin-top: 10px;
  display: inline-block;
}

@media screen and (max-width: 880px) {
  p {
    font-size: 14vw;
  }
}
</style>
