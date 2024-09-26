<template>
  <section>
    <header><h1>My Friends</h1></header>
    <ul>
        <friend-contact></friend-contact>
        <friend-contact></friend-contact>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
        return {
            friend: {
                id: 'Mukul',
                name: 'Mukul Upadhyaya',
                phone: '09639136578',
                email: 'mukulfb49@gmail.com',
            },
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');
</style>
