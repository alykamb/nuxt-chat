<template>
  <div class="messages">
    <Message
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
      :type="getType(message, index)"
    ></Message>
  </div>
</template>

<script>
export default {
  name: 'Messages',
  computed: {
    messages() {
      if (!this.$store.selectedUser) {
        return []
      }
      return this.$store.chat[this.$store.selectedUser]
    },
  },
  methods: {
    getType(message, index) {
      if (this.messages?.[index - 1]?.from !== message.from) {
        if (this.messages?.[index + 1]?.from !== message.from) {
          return 'unique'
        }
        return 'last'
      }
      if (this.messages?.[index + 1]?.from !== message.from) {
        return 'first'
      }
      return 'middle'
    },
  },
}
</script>

<style scoped>
.messages {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  padding: 1em;

  overflow: auto;
}
</style>
