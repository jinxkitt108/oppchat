<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("user", ["handleAuthStateChanged"])
  },

  mounted() {
    this.handleAuthStateChanged();
  }
};
</script>
