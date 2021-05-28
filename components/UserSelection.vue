<template>
  <div
    class="user-selection"
    :style="`--top:${selection.top}; --left:${selection.left}`"
  >
    <b-card>
      <div class="users">
        <div
          v-for="(user, i) in users"
          :key="user.id"
          class="user"
          :class="{ selected: selected === i }"
          @click="userClick(user)"
          @mouseenter="selected = i"
        >
          @{{ user.id }} - {{ user.name }}
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
const includesLowerCase = (needle) => (target) =>
  target.toLowerCase().includes(needle.toLowerCase())

export default {
  name: 'UserSelection',
  props: {
    selection: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selected: 0,
    }
  },
  computed: {
    users() {
      return this.$store.users.filter((user) => {
        const eq = includesLowerCase(this.selection.text)
        return (
          user.id !== this.$store.auth.id &&
          (!this.selection.text || eq(user.id) || eq(user.name))
        )
      })
    },
  },
  watch: {
    users() {
      this.selected = 0
    },
  },
  mounted() {
    document.addEventListener('keydown', this.listenKeys)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.listenKeys)
  },
  methods: {
    userClick(user) {
      this.$emit('select', user)
    },
    listenKeys(e) {
      // on esc
      if (e.keyCode === 27) {
        this.$emit('close')
      }
    },
    change(n) {
      const newValue = this.selected + n
      this.selected =
        newValue < 0 ? this.users.length - 1 : newValue % this.users.length
    },
    getSelectedUser() {
      return this.users[this.selected]
    },
  },
}
</script>

<style scoped>
.user-selection {
  position: absolute;
  top: var(--top, 0);
  left: var(--left, 0);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 20vw;
  min-width: 300px;
  max-width: 100vw;
  height: 250px;
  transform: translate(calc(calc(var(--left) / 2) * 1px), -250px);
}

.users {
  overflow: auto;
  max-height: 250px;
}

.user:hover,
.user.selected {
  cursor: pointer;
  background-color: var(--secodary-light);
}
</style>
