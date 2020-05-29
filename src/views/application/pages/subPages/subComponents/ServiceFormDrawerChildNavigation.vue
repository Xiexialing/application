<template>
    <el-steps :active="activeIndex" align-center id="stepsWrapper">
        <el-step v-for="(step, index) in stepList"
                 :key="index"
                 :title="step.title"
                 class="step-item"
                 @click.native="onClickHandle(index)"/>
    </el-steps>
</template>

<script>
    export default {
        name: "Navigation",
        props: ['activeIndex'],
        data() {
            return {
                stepList: [
                    {
                        title: '基本信息'
                    },
                    {
                        title: '仓库镜像'
                    },
                    {
                        title: '网络信息'
                    },
                    {
                        title: '通用配置'
                    },
                    {
                        title: '个性化配置'
                    }
                ]
            }
        },
        methods:{
            onClickHandle(index) {
               this.$emit('clickEvent', index)
            }
        }
    }
</script>

<style lang="less">
    #stepsWrapper {
        .el-step__title {
            font-size: 14px !important;
            font-weight: normal !important;
        }

        .el-step__head.is-finish {
            color: #C0C4CC !important;
            border-color: #C0C4CC !important;
        }

        .el-step__title.is-finish {
            color: #C0C4CC !important;
        }

        .el-step__head.is-process {
            color: #409EFF !important;
            border-color: #409EFF !important;
        }

        .el-step__title.is-process {
            color: #409EFF !important;
        }
        .step-item{
            cursor: pointer;
        }
    }
</style>
