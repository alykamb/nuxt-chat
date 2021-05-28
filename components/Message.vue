<template>
  <div
    class="message"
    :class="[{ 'from-me': fromMe, 'new-message': newMessage !== false }, type]"
  >
    <template v-for="(section, index) in text">
      <span
        :key="index"
        :class="{ user: section.meta === 'user' }"
        :title="section.value ? getUserName(section.value) : ''"
      >
        {{ section.meta ? section.value : section }}
      </span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    newMessage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    fromMe() {
      return this.message.from === this.$store.auth.id
    },
    text() {
      return this.message.text.split(' ').reduce(
        (text, word) => {
          if (word[0] === '@') {
            text.push({
              value: word,
              meta: 'user',
            })
          } else if (text[text.length - 1]?.meta) {
            text.push(` ${word}`)
          } else {
            text[text.length - 1] += ` ${word}`
          }
          return text
        },
        ['']
      )
    },
  },
  methods: {
    getUserName(id) {
      if (!id) {
        return ''
      }
      return this.$store.users.find((user) => user.id === id.slice(1))?.name
    },
  },
}
</script>

<style scoped lang="scss">
.message {
  --radius-big: 1em;
  --radius-small: 0.5em;
  --radius-tiny: 0.1em;
  background-color: var(--secodary-dark);
  color: white;
  padding: 1em;
  margin: 0.1em;
  box-shadow: 0 0 15px 2px #00000063;
  border-top-right-radius: var(--radius-big);
  border-bottom-right-radius: var(--radius-big);
  border-top-left-radius: var(--radius-small);
  border-bottom-left-radius: var(--radius-small);
}

.user {
  text-decoration: underline;
}

.new-message {
  animation-name: appear;
  animation-duration: 500ms;
}

@keyframes appear {
  from {
    transform: scaleY(0) translateY(-50%);
  }
  to {
    transform: scaleY(1) translateY(0);
  }
}

.last {
  margin-bottom: 1em;
  border-bottom-left-radius: var(--radius-big);
  &.from-me {
    border-bottom-right-radius: var(--radius-big);
  }
}

.first {
  border-top-left-radius: var(--radius-tiny);
  &.from-me {
    border-top-right-radius: var(--radius-tiny);
  }
  margin-top: 1em;
}

.unique {
  margin: 1em 0;
  border-top-left-radius: var(--radius-tiny);
  border-bottom-left-radius: var(--radius-small);
  &.from-me {
    border-top-right-radius: var(--radius-tiny);
    border-bottom-right-radius: var(--radius-small);
  }
}

.from-me {
  background-color: var(--tertiary);
  align-self: flex-end;
  border-top-right-radius: var(--radius-small);
  border-bottom-right-radius: var(--radius-small);
  border-top-left-radius: var(--radius-big);
  border-bottom-left-radius: var(--radius-big);
}
</style>
