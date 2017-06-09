<script>
export default {
  render() {
    return (

      <h1>标题{this.level} VUE</h1>
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
