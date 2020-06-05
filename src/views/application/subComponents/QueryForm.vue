<template>
    <el-form :inline="true" size="small" class="bo-form" @keydown.native.enter.prevent>
        <el-form-item>
            <el-button type="primary" icon="el-icon-plus" @click="onAdd"> 新增</el-button>
        </el-form-item>
        <el-form-item>
            <el-input v-model="form.templateName" placeholder="输入模板名称" @keydown.native.enter="onSubmit"/>
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
                    templateName: ''
                }
            }
        },
        methods: {
            onAdd() {
                this.$emit('addEvent')
            },
            onSubmit() {
                this.$emit('submitEvent', this.form)
            }
        }
    }
</script>
<style lang="less">

</style>
