<template>
    <el-form ref="form"
             label-width="90px"
             :model="form"
             :rules="rules"
             size="small">
        <el-form-item label="服务名" prop="applicationName">
            <el-input v-model="form.applicationName"/>
        </el-form-item>
        <el-form-item label="类型">
            <el-select v-model="form.kind">
                <el-option value="Deployment" label="无状态模式（Deployment）"/>
                <el-option value="DaemonSet" label="进程组模式（DaemonSet）"/>
                <el-option value="StatefulSet" label="有状态模式（StatefulSet）"/>
                <el-option value="BeyondVM" label="胖容器模式（BeyondVM）"/>
            </el-select>
        </el-form-item>
        <el-form-item label="版本" prop="versionName">
            <el-input v-model="form.versionName"/>
        </el-form-item>
        <el-form-item label="实例个数" prop="instance">
            <el-input v-model="form.instance"/>
        </el-form-item>
        <template v-if="['Deployment', 'BeyondVM'].indexOf(form.kind) !== -1">
            <el-form-item label="升级策略">
                <el-select v-model="form.strategy">
                    <el-option label="先创建，后删除" value="create-delete"/>
                    <el-option label="先删除，后创建" value="delete-create"/>
                </el-select>
            </el-form-item>
        </template>
    </el-form>
</template>

<script>
    export default {
        name: "BaseInfoForm",
        props: {
            form: {
                type: Object,
                default() {
                    return {
                        applicationName: '',
                        kind: 'Deployment',
                        versionName: '',
                        instance: '',
                        strategy: ''
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
