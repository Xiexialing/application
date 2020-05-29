<template>
    <div id="addStepTwo">
        <TopologyEditor @nodeDoubleClickEvent="onNodeDoubleClick"/>
        <ApplicationFormDrawer ref="applicationFormDrawerRef"/>
        <ComponentFormDrawer ref="componentFormDrawerRef"/>
        <ServiceFormDrawer ref="serviceFormDrawerRef"/>
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
            return {}
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
