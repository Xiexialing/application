<template>
    <div id="personalConfig">
        <div class="inline-block">
            <label class="label">标签</label>
            <div class="tags-form-wrapper">
                <PersonalConfigChildTagsForm/>
            </div>
        </div>
        <div class="tabs-wrapper">
            <el-tabs type="border-card">
                <el-tab-pane label="环境变量">
                    <PersonalConfigChildEnv/>
                </el-tab-pane>
                <el-tab-pane label="存储卷">
                    <PersonalConfigChildStorageVolume/>
                </el-tab-pane>
                <el-tab-pane label="卷服务配置">
                    <PersonalConfigChildService/>
                </el-tab-pane>
                <el-tab-pane label="调度管理">
                    <PersonalConfigChildSchedule/>
                </el-tab-pane>
                <el-tab-pane label="命令管理">
                    <PersonalConfigChildCommand/>
                </el-tab-pane>
                <el-tab-pane label="生命周期">
                    <PersonalConfigChildLifecycle/>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import PersonalConfigChildTagsForm from './subComponents/PersonalConfigChildTagsForm'
    import PersonalConfigChildCommand from './subComponents/PersonalConfigChildCommand'
    import PersonalConfigChildEnv from './subComponents/PersonalConfigChildEnv'
    import PersonalConfigChildLifecycle from './subComponents/PersonalConfigChildLifecycle'
    import PersonalConfigChildService from './subComponents/PersonalConfigChildService'
    import PersonalConfigChildStorageVolume from './subComponents/PersonalConfigChildStorageVolume'
    import PersonalConfigChildSchedule from './subComponents/PersonalConfigChildSchedule'

    export default {
        name: "ServiceFormDrawerChildPersonalConfig",
        data() {
            return {}
        },
        methods: {},
        components: {
            PersonalConfigChildTagsForm,
            PersonalConfigChildCommand,
            PersonalConfigChildEnv,
            PersonalConfigChildLifecycle,
            PersonalConfigChildService,
            PersonalConfigChildStorageVolume,
            PersonalConfigChildSchedule
        }
    }
</script>
<style lang="less">
    #personalConfig{
        padding-right: 15px;
        .inline-block{
            display: flex;
            margin-bottom: 20px;
            .label{
                display: inline-block;
                width: 70px;
                padding-right: 12px;
                text-align: right;
                font-size: 12px;
                line-height: 32px;
                box-sizing: border-box;
            }
            .tags-form-wrapper{
                flex: 1;
            }
        }
        .tabs-wrapper{
            margin-left: 70px;
        }
    }
</style>
