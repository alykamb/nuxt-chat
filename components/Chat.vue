<template>
  <div class="chat">
    <Messages class="messages" />
    <div class="input-wrapper"><ChatInput @message="addMessage" /></div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  methods: {
    addMessage(text) {
      if (!this.$store.chat[this.$store.selectedUser]) {
        this.$store.chat[this.$store.selectedUser] = []
      }
      this.$store.chat[this.$store.selectedUser].unshift({
        text,
        from: this.$store.auth.id,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.chat {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: calc(100vh - 3em) 3em;
  grid-template-areas:
    'messages'
    'input';
}

.messages {
  grid-area: messages;
}

.input-wrapper {
  grid-area: input;
  display: flex;
}
</style>
