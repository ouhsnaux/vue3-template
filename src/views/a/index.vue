<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'AView',
  props: { msg: { type: String, default: '' } },
  setup() {
    const store = useStore();
    const add = () => {
      const result = store.dispatch('a/asyncAddOne');
      console.log(result);
    };
    return { count: computed(() => store.state.a.count), add };
  },
};
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="add">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code>
    to test hot module replacement.
  </p>
</template>

<style scoped lang="scss">
a {
  color: #42b983;
  // color: red;
}
</style>
