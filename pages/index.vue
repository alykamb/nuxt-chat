<template>
  <div class="container">
    <div class="main">
      <div class="contacts"></div>
      <Chat class="chat"></Chat>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;

  /* min-width: 100vw; */
  padding: 0;
}

.main {
  flex: 1;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'contacts chat';
}

.chat {
  grid-area: 'chat';
  /* background-color: red; */
}

.contacts {
  grid-area: 'contacts';
  background-color: white;
}
</style>
