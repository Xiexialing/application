<template>
  <el-form :inline="true" size="small" class="card-header-form">
    <el-form-item>
      <el-button type="primary" icon="el-icon-plus" @click="onAdd"> 新增</el-button>
    </el-form-item>
    <el-form-item>
      <el-input v-model="form.name" placeholder="输入模板名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="onSubmit"> 查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "QueryForm",
    data() {
      return {
        form: {
          name: ''
        }
      }
    },
    methods: {
      onAdd() {
        this.$emit('addEvent')
      },
      onSubmit() {
        let {name} = this.form
        this.$emit('submitEvent', {name})
      }
    }
  }
</script>
<style lang="less">

</style>
