<template>
    <div id="addStepTwo">
        <TopologyEditor @nodeDoubleClickEvent="onNodeDoubleClick"/>
        <ApplicationFormDrawer ref="applicationFormDrawerRef" :form="form"/>
        <ServiceFormDrawer ref="serviceFormDrawerRef" :form="form"/>
        <ComponentFormDrawer ref="componentFormDrawerRef" :form="form"/>
    </div>
</template>

<script>
    import TopologyEditor from '@/plugins/topographyEditor'
    import ApplicationFormDrawer from './subPages/ApplicationFormDrawer'
    import ComponentFormDrawer from './subPages/ComponentFormDrawer'
    import ServiceFormDrawer from './subPages/ServiceFormDrawer'

    export default {
        name: "addStepOne",
        data() {
            return {
                form:{
                    // 应用字段
                    projectName: '',
                    frameType: 'common',
                    projectType: '1',
                    registryCenterId: '',
                    description: '',
                    resourceQuota: true,
                    defaultCpu: '200m',
                    defaultMem: '256M',
                    //以下是应用组件子组件的form参数
                    clusterId: 5,
                    partitionId: '',
                    networkName: '',
                    cpu: 1,
                    memory: 1,
                    pods: 1,
                    requestStorage: 0,
                    // 服务字段
                    applicationName: '',
                    kind: 'Deployment',
                    versionName: '',
                    instance: '',
                    strategy: 'create-delete',
                    // 仓库镜像
                    registryId: '',
                    image: '',
                    imgVersion: '',
                    directory: '',
                    // 网络信息
                    hostNetwork: 0,
                    net: 'default',
                    networkIps: '',
                }
            }
        },
        methods: {
            onNodeDoubleClick(target) {
                let {name} = target
                this.$refs[name + 'FormDrawerRef'].onToggle()
            }
        },
        components: {
            ApplicationFormDrawer,
            ComponentFormDrawer,
            ServiceFormDrawer,
            TopologyEditor
        }
    }
</script>

<style lang="less">
    #addStepTwo {
        margin: -20px;
        .el-drawer__header > :first-child {
            outline: none;
        }
        .el-form-item__label{
            font-size: 12px !important;
        }
    }
</style>
