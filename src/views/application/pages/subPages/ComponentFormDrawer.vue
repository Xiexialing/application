<template>
    <el-drawer
            title="组件信息"
            id="componentFormDrawer"
            :visible.sync="isShow"
            :direction="direction">
        <el-form ref="form" label-width="90px" :model="form" :rules="rules" size="small">
            <el-form-item label="集群" prop="projectName">
                <el-input v-model="form.name"/>
            </el-form-item>
            <el-form-item label="应用">
                <el-input v-model="form.application"/>
            </el-form-item>
            <el-form-item label="value yaml">
                <codemirror v-model="form.code" :options="options"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading" @click="onConfirm">确 定</el-button>&nbsp;&nbsp;
                <el-button @click="onCancel">取 消</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script>
    import 'codemirror/theme/cobalt.css'

    export default {
        name: "ApplicationFormDrawer",
        props: {
            form: {
                type: Object,
                default() {
                    return {
                        name: '',
                        application: '',
                        code: ''
                    }
                }
            }
        },
        data() {
            return {
                isShow: false,
                direction: 'rtl',
                rules: {},
                options: {
                    tabSize: 4,
                    styleActiveLine: true,
                    lineNumbers: false,
                    mode: 'yaml',
                    theme: 'cobalt',
                    readOnly: true
                },
                loading: false
            }
        },
        methods: {
            onConfirm() {

            },
            onCancel() {

            },
            onToggle() {
                this.isShow = !this.show
            }
        }
    }
</script>

<style lang="less">
    #componentFormDrawer {
        .el-drawer {
            width: 600px !important;
        }

        .el-drawer__header {
            margin-bottom: 12px;
        }

        .el-drawer__body {
            padding-right: 20px;

            .el-select {
                width: 100%;
            }

            .el-form-item {
                margin-bottom: 12px;
            }
        }
    }
</style>
