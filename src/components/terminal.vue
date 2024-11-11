<template>
  <div :class="['terminal', { minimized: isMinimized, maximized: isMaximized }]">
    <div class="terminal-body" @click="focusInput">
      <div v-for="(line, index) in output" :key="index" class="output-line">{{ line }}</div>
      <div class="input-line">
        <span class="prompt">C:\Users\Alexis_Pingris\Portfolio></span>
        <div
          class="input-container"
          contenteditable="true"
          @input="updateInput"
          @keydown.enter.prevent="executeCommand"
          ref="inputField"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref, nextTick } from 'vue'
import { defineProps } from 'vue'

defineProps({
  isMinimized: Boolean,
  isMaximized: Boolean,
})
const terminalBodyRef = ref<HTMLElement | null>(null)
const input: Ref<string> = ref('')
const output: Ref<string[]> = ref([])

const messages = {
  title: 'Portfolio [Version 1.0.0]',
  right: '(c) Pingris Alexis 2024. All rights reserved.',
  help: 'Type "help" to see the list of available commands.',
  line: 'C:\WINDOWS\System32>',
  commands: {
    help: 'Available commands:',
    about:
      "I'm Alexis, a frontend web developer specializing in JavaScript. I create customized, interactive, and scalable web applications.",
    skills: {
      frontend:
        '- Frontend : JavaScript, TypeScript, Vue.js, Nuxt.js, React.js, HTML5, CSS3, SASS, TailwindCSS, Bootstrap',
      backend: '- Backend : Node.js, Express',
      database: '- Database : MongoDB, MySQL',
    },
    contact: {
      linkedin: ' - LinkedIn : https://www.linkedin.com/in/pingrisalexis/',
      malt: ' - Malt : https://www.malt.fr/profile/pingrisalexis',
      github: ' - GitHub : https://github.com/pingrisalexis',
      email: ' - Email : pingrisalexis@gmail.com',
    },
    clear: 'Clears the screen',
    lang: 'Language is set to English.',
    unknown: (command: string) =>
      `'${command}' is not recognized as an internal or external command,
operable program or batch file. Type "help" to see the list of commands.`,
  },
}

output.value.push(messages.title)
output.value.push(messages.right)
output.value.push(messages.help)

const inputField: Ref<HTMLInputElement | null> = ref(null)

const focusInput = async () => {
  await nextTick()
  inputField.value?.focus()
}

const updateInput = (event) => {
  const text = event.target.innerText.trim()
  if (text.length > 20) {
    input.value = text.slice(0, 20)
    event.target.innerText = input.value
  } else {
    input.value = text
  }
}
const executeCommand = (): void => {
  inputField.value?.focus()
  const command = input.value.trim()

  if (command === '') {
    output.value.push('C:\\Users\\Alexis_Pingris\\Documents\\Portfolio>')
  } else {
    output.value.push(`> ${command}`)
    handleCommand(command.toLowerCase())
  }
  input.value = ''
  if (inputField.value) inputField.value.innerText = ''

  scrollToBottom()
  focusInput()
}

const handleCommand = (command: string): void => {
  const cmds = messages.commands
  console.log('handleCommand')

  switch (command) {
    case 'help':
      output.value.push(cmds.help)
      output.value.push('- about')
      output.value.push('- projects')
      output.value.push('- skills')
      output.value.push('- contact')
      output.value.push('- clear')
      output.value.push('- lang')
      break
    case 'about':
      output.value.push(cmds.about)
      break
    case 'projects':
      output.value.push(cmds.projects)
      break
    case 'skills':
      output.value.push(cmds.skills.frontend)
      output.value.push(cmds.skills.backend)
      output.value.push(cmds.skills.database)
      break
    case 'contact':
      output.value.push(cmds.contact.linkedin)
      output.value.push(cmds.contact.malt)
      output.value.push(cmds.contact.github)
      break
    case 'clear':
      output.value = []
      output.value.push(messages.title)
      output.value.push(messages.right)
      output.value.push(messages.help)
      break
    case 'lang':
      output.value.push(cmds.lang)
      break
    default:
      output.value.push(cmds.unknown(command))
  }
}

const scrollToBottom = async (): Promise<void> => {
  await nextTick()
  if (terminalBodyRef.value) {
    terminalBodyRef.value.scrollTop = terminalBodyRef.value.scrollHeight
  }
}

onMounted(() => {
  focusInput()
})
</script>

<style lang="scss" scoped>
.screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--first-background);
}

.terminal {
  background-color: var(--first-background);
  color: var(--first-txt);
  font-family: Consolas, monospace;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.terminal-header .title {
  font-size: 14px;
  font-weight: bold;
}

.terminal-body {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.output-line {
  margin: 2px 0;
  color: var(--first-txt);
}

.input-line {
  display: flex;
  align-items: center;
}

.input-line .prompt {
  color: var(--first-txt);
}

.input-container {
  display: inline-flex;
  align-items: center;
  position: relative;
  border: none;
  outline: none;
  white-space: nowrap;
}

.input-line input[type='text'] {
  background-color: transparent;
  border: none;
  color: var(--first-txt);
  font-family: Consolas, monospace;
}
</style>
