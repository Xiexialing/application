<template>
    <el-card>
        <div class="step-wrapper" slot="header">
            <el-steps :active="active" align-center finish-status="success">
                <el-step title="基本信息"></el-step>
                <el-step title="可视化编排"></el-step>
            </el-steps>
        </div>
        <BaseInfoForm v-if="active === 0" @nextEvent="onNext"/>
        <AddStepTwo v-else/>
    </el-card>
</template>

<script>
    import BaseInfoForm from './subComponents/BaseInfoForm'
    import AddStepTwo from './AddStepTwo'

    export default {
        name: "addStepOne",
        data() {
            return {
                active: 0,
                form: null  // 收集表单数据
            }
        },
        methods: {
            onNext(form) {
                this.form = form
                this.active++
            }
        },
        components: {
            BaseInfoForm,
            AddStepTwo
        }
    }
</script>

<style lang="less">
    .step-wrapper {
        .el-step__icon {
            width: 32px;
            height: 32px;
        }

        .el-step__head.is-success {
            color: #409eff !important;
            border-color: #409eff !important;
        }

        .el-step__title.is-success {
            color: rgba(0, 0, 0, 0.6) !important;
        }

        .el-step__head.is-process {
            color: #fff !important;
            border-color: #409eff !important;

            .el-step__icon {
                background-color: #409eff !important;
            }
        }

        .el-step__title.is-process {
            color: #333 !important;
        }
    }
</style>
