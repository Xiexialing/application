<script>
  export default {
    name: "CustomRenderComp",
    props: ['render', 'row'],
    render(createElement) {
      return this.render(createElement, this.row)
    }
  }
</script>

