<template>
  <div class="detail-form">
    <el-form @submit.prevent="handleSubmit" size="mini" label-width="70px">
      <el-form-item label="分组名称" v-if="type === 'group'">
        <el-input v-model="formModel.label" @blur.prevent="handleSubmit"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { omit } from 'lodash'

export default {
  name: 'DetailForm',

  created () {
    const formModel = this.root.propsAPI.getSelected()[0].getModel()
    this.formModel = Object.assign({}, { shape: 'flow-smooth' }, formModel)
  },

  methods: {
    handleSubmit () {
      const { getSelected, executeCommand, update } = this.root.propsAPI
      const { formModel } = this
      setTimeout(() => {
        const item = getSelected()[0]
        if (!item) return
        executeCommand(() => {
          // this is for duplicate node in mind chart
          update(item, { ...omit(formModel, 'children') })
        })
      }, 0)
    }
  },

  inject: ['root'],

  props: ['type'],

  data () {
    return {
      formModel: {}
    }
  }
}
</script>
<style lang="less">
  .detail-form{
    padding: 15px 12px;
  }
</style>
