<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheTopBar from '../src/components/topBar.vue'
</script>

<template>
  <header>
    <TheTopBar />
  </header>
  <main>
    <RouterView />
  </main>
</template>
