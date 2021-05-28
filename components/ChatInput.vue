<template>
  <div class="input">
    <input
      v-model="text"
      type="text"
      class="text-input form-control"
      @input="handleInput"
      @keyup="handleKeyUp"
      @click="handleInput"
      @focus="handleInput"
    />
    <b-button @click="send">
      {{ $t('send') }}
    </b-button>
    <UserSelection
      v-if="userSelection"
      ref="userSelection"
      :selection="userSelection"
      @close="close"
      @select="selectUser"
    />
  </div>
</template>

<script>
import getCaretCoordinates from 'textarea-caret'

export default {
  name: 'ChatInput',
  data() {
    return {
      text: '',
      userSelection: null,
      closeModalIndex: null, // keep track if esc was pressed on the current word count
      cursorPosition: 0,
    }
  },
  computed: {
    words() {
      return this.text.split(' ') // array of words to look for the '@' in the last word
    },
  },
  methods: {
    close() {
      this.closeModalIndex = this.words.length
      this.userSelection = null
    },
    handleKeyUp(e) {
      this.getCursorPosition(e)
      if (e.keyCode === 13) {
        const user =
          this.$refs.userSelection && this.$refs.userSelection.getSelectedUser()
        if (user) {
          return this.selectUser(user)
        }
        return this.send()
      }
      // arrows down and up
      const code = e.keyCode === 40 ? 1 : e.keyCode === 38 ? -1 : 0
      if (code && this.$refs.userSelection) {
        e.preventDefault()
        e.stopPropagation()
        this.$refs.userSelection.change(code)
      }
    },
    send() {
      if (!this.text) {
        return
      }
      this.$emit('message', this.text)
      this.text = ''
      this.reset()
    },
    selectUser(user) {
      this.text = `${[...this.words.slice(0, -1), `@${user.id}`].join(' ')}`
      this.reset()
    },
    getCursorPosition(e) {
      this.cursorPosition = e.target.selectionEnd
    },
    reset() {
      this.userSelection = null
      this.closeModalIndex = null
    },
    handleInput(e) {
      this.getCursorPosition(e)
      const selectedWord =
        this.words[
          this.text.slice(0, this.cursorPosition).split(' ').length - 1
        ]
      // if it starts with an '@', show the modal and pass down the text to filter
      if (selectedWord?.[0] === '@') {
        if (
          !this.closeModalIndex ||
          this.closeModalIndex !== this.words.length
        ) {
          this.userSelection = {
            ...getCaretCoordinates(e.target, this.cursorPosition),
            text: selectedWord.slice(1),
          }
          this.closeModalIndex = null
        }
      } else {
        if (this.userSelection) {
          this.userSelection = null
        }
        if (this.closeModalIndex) {
          this.closeModalIndex = null
        }
      }
    },
  },
}
</script>

<style lang="scss">
.input {
  display: flex;
  flex: 1;
}

.text-input {
  flex: 1;
  padding: 1em;
  margin: 0.3em;
}
</style>
