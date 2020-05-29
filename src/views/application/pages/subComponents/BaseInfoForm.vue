<template>
  <el-form size="small" label-width="80px">
    <el-form-item label="模板名称">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="form.desc" type="textarea"/>
    </el-form-item>
    <el-form-item>
      <el-button @click="onCancel"> 取 消</el-button>
      <el-button type="primary" @click="onNext"> 下一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "BaseInfoForm",
    data() {
      return {
        form: {
          name: '',
          desc: ''
        }
      }
    },
    methods:{
      onCancel() {
        this.$router.back(-1)
      },
      onNext() {
        this.$emit('nextEvent', {...this.form})
      }
    }
  }
</script>

<style scoped>

</style>
