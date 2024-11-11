<template>
  <div class="terminal-header">
    <div class="title-container">
      <img src="../assets//img/icon-command-prompt.png" alt="" />
      <span>Command Prompt</span>
    </div>
    <div class="btn-container">
      <span class="minimize" @click="onMinimizeClick"></span>
      <span class="maximize" @click="onMaximizeClick"></span>
      <span class="close"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['minimize', 'maximize'])

const onMinimizeClick = () => {
  emit('minimize')
}

const onMaximizeClick = () => {
  emit('maximize')
}
</script>
<style lang="scss">
.terminal-header {
  background-color: var(--second-background);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  color: #ffffff;
  height: 35px;
  border: var(--border);
  border-radius: 5px 5px 0 0;
  position: relative;
  top: 0;
  width: 99vw;
  .title-container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--first-background);
    border-radius: 8px 8px 0 0;
    position: relative;
    top: 5px;
    padding: 0px 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 160px;
    height: 35px;
    img {
      height: 20px;
    }
    span {
      font-size: 13px;
      color: #ffffff;
      margin-left: 10px;
    }
  }
  .btn-container {
    display: flex;
    width: 105px;
    position: relative;
    left: 1px;
    span {
      display: inline-block;
      position: relative;
      left: 7px;
      width: 35px;
      height: 33px;
      &.minimize::before,
      &.maximize::before,
      &.close::before {
        font-weight: 300;
        display: block;
        text-align: center;
        font-size: 20px;
        color: white;
        position: absolute;
        left: 0;
        right: 0;
      }

      &.minimize::before {
        content: '-';
      }

      &.maximize::before {
        content: '□';
      }

      &.close::before {
        content: '×';
      }

      &.minimize:hover,
      &.maximize:hover {
        background-color: #4d4d4d;
      }

      &.close:hover {
        background-color: #cf2331;
        border-radius: 0 5px 0 0;
      }
    }
  }
}
</style>
