export default {
  render(h) {
    return (
      <h1>标题{this.level} JSX</h1>
    )
    // return h(
    //   'h' + this.level,
    //   this.$slots.default
    // )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
}
