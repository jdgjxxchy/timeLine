<template>
  <div class="root">
    <h1>这里是主页</h1>
    <button @click="toShow">开启倒计时</button>
    <button @click="toEdit">编辑倒计时</button>
  </div>
</template>

<script>
export default {
  name: 'Main',
  methods: {
    toShow () {
      this.$router.push('/show')
    },
    toEdit () {
      this.$router.push('/edit')
    }
  }
}
</script>

<style scoped>

</style>
