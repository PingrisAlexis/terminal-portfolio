<template>
  <div class="landing-container">
    <div class="terminal-title">
      <span v-html="displayedMessage"></span>
    </div>
    <div class="terminal-title" v-if="showPresentation">
      <span v-html="displayedPresentationMessage"></span>
    </div>
    <div class="terminal-title" v-if="showEnterPrompt">
      <span :class="{ 'with-cursor': showCursor }" v-html="displayedEnterMessage"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const promptMessage = 'C:\\Users\\Alexis_Pingris\\Portfolio>'
const welcomeMessage = ' Welcome to my portfolio! Thank you for visiting.'
const presentationMessage = 'Use commands in the prompt to explore further.'
const enterMessage = 'Press "enter" to continue.'
const showCursor = ref(false)

const displayedMessage = ref('')
const displayedPresentationMessage = ref('')
const displayedEnterMessage = ref('')
const showPresentation = ref(false)
const showEnterPrompt = ref(false)
const isTransitioning = ref(false)

const typeText = (text: string, delay: number, outputRef: any, callback: () => void) => {
  let index = 0
  const interval = setInterval(() => {
    if (index < text.length) {
      outputRef.value += text[index]
      index++
    } else {
      clearInterval(interval)
      callback()
    }
  }, delay)
}

const handleEnterKey = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && showEnterPrompt.value) {
    isTransitioning.value = true
    setTimeout(() => {
      router.push('/terminal')
    }, 500)
  }
}

onMounted(() => {
  displayedMessage.value = promptMessage

  typeText(welcomeMessage, 150, displayedMessage, () => {
    showPresentation.value = true

    displayedPresentationMessage.value = ''
    typeText(presentationMessage, 120, displayedPresentationMessage, () => {
      setTimeout(() => {
        showEnterPrompt.value = true

        displayedEnterMessage.value = ''
        typeText(enterMessage, 150, displayedEnterMessage, () => {
          showCursor.value = true
        })
      }, 1000)
    })
  })

  window.addEventListener('keydown', handleEnterKey)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleEnterKey)
})
</script>

<style scoped lang="scss">
.landing-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  overflow-y: auto;
  position: relative;
  top: 10px;
  left: 10px;

  .terminal-title {
    color: var(--first-txt);
    text-align: center;
    display: block;
    overflow: hidden;
  }

  .with-cursor::after {
    content: '';
    display: inline-block;
    position: relative;
    top: 5px;
    width: 1px;
    height: 20px;
    margin-left: 2px;
    background-color: var(--first-txt);
    animation: blink 1s steps(1, start) infinite;
  }
  .fade-out {
    animation: fadeOut 0.5s forwards;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>
