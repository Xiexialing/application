<template>
    <el-form ref="form"
             label-width="90px"
             :model="form"
             :rules="rules"
             size="small">
        <el-form-item label="网络模式">
            <el-radio-group v-model="form.radio">
                <el-radio :label="3">主机网络</el-radio>
                <el-radio :label="6">自定义网络</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="选择网络">
            <el-radio-group v-model="form.radio">
                <el-radio :label="3">default</el-radio>
                <el-radio :label="6">网络1</el-radio>
                <el-radio :label="9">网络2</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="固定IP">
            <el-select v-model="form.name" placeholder="请选择IP">
                <el-option label="1111" value="1111"/>
                <el-option label="2222" value="2222"/>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "NetInfoForm",
        props: {
            form: {
                type: Object,
                default() {
                    return {

                    }
                }
            }
        },
        data() {
            return {
                rules: {}
            }
        }
    }
</script>

<style scoped>

</style>
