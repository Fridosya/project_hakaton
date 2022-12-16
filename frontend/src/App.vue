<template>
  <CHeader/>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import CHeader from '@/components/CHeader.vue'

export default {
  name: 'App',
  components: {
    CHeader
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    margin: 0;
  }

  main {
    background: #e2f0f2;
    min-height: calc(100vh - 75px); /* минус высота шапки */
    overflow: auto; /* против схлопывающихся отступов */
  }

  a {
    text-decoration: none;
    color: #467BE3;
  }

  input:not([type="checkbox"]) {
    width: 100%;
    display: block;
    height: 40px;
    background: #fff;
    border: 1px solid #D5D9DD;
    border-radius: 6px;
    padding: 0 15px;
  }

  input:focus {
    outline: none;
  }

  input:disabled {
    background: #F0F4FD;
  }

</style>
