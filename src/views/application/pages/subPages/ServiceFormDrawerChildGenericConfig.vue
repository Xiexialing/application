<template>
    <el-tabs type="border-card" class="">
        <el-tab-pane label="端口">
            <GenericConfigChildPort ref="genericConfigChildPortRef"/>
        </el-tab-pane>
        <el-tab-pane label="资源配置">
            <GenericConfigChildResources ref="genericConfigChildResourcesRef"/>
        </el-tab-pane>
        <el-tab-pane label="健康检查">
            <GenericConfigChildHealth ref="genericConfigChildHealthRef"/>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import GenericConfigChildPort from './subComponents/GenericConfigChildPort'
    import GenericConfigChildHealth from './subComponents/GenericConfigChildHealth'
    import GenericConfigChildResources from './subComponents/GenericConfigChildResources'

    export default {
        name: "ServiceFormDrawerChildGenericConfig",
        data() {
            return {
                form:{

                }
            }
        },
        methods: {},
        components:{
            GenericConfigChildPort,
            GenericConfigChildResources,
            GenericConfigChildHealth
        }
    }
</script>
<style lang="less">

</style>

