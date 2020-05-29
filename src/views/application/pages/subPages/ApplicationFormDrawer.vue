<template>
    <el-drawer id="applicationFormDrawer"
               :visible.sync="isShow"
               direction="rtl">
        <ApplicationFormDrawerChildWarning/>
        <el-form ref="form" label-width="100px" :model="form" :rules="rules" size="small">
            <el-form-item label="应用名称" prop="projectName">
                <el-input v-model="form.projectName"/>
            </el-form-item>
            <el-form-item label="部署类型">
                <el-select v-model="form.projectType" size="small">
                    <el-option value="1" label="通用"/>
                    <el-option value="2" label="容器"/>
                </el-select>
            </el-form-item>
            <el-form-item label="应用类型">
                <el-select v-model="form.frameType"
                           placeholder="请选择"
                           filterable>
                    <el-option v-for="(item, index) in frameTypeList"
                               :key="index"
                               :value="item.value"
                               :label="item.label"/>
                </el-select>
            </el-form-item>
            <el-form-item label="注册中心"
                          v-if="form.frameType !== 'common'"
                          prop="registryCenterId">
                <el-select v-model="query.registryCenterId"
                           filterable>
                    <el-option
                            v-for="(item, index) in registryCenterIdList"
                            :key="index"
                            :label="item.label"
                            :value="item.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="应用描述">
                <el-input type="textarea" v-model="form.projectDescription"/>
            </el-form-item>
            <el-form-item label="资源设置">
                <el-switch v-model="form.resourceQuota"
                           active-text="开"
                           inactive-text="关"/>
            </el-form-item>
            <template v-if="form.resourceQuota">
                <el-form-item label-width="24px">
                    <span class="subtitle">默认实例资源</span>
                </el-form-item>
                <el-form-item label="CPU(核)">
                    <el-select v-model="form.defaultCpu">
                        <el-option v-for="(item, index) in CPUList"
                                   :key="index"
                                   :value="item"
                                   :label="item"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="内存(GB)">
                    <el-select v-model="form.defaultMem">
                        <el-option v-for="(item, index) in memList"
                                   :key="index"
                                   :value="item"
                                   :label="item"/>
                    </el-select>
                </el-form-item>
                <ApplicationFormDrawerChildResourceForm/>
                <div class="text-center">
                    <el-button type="primary"
                               icon="el-icon-plus"
                               class="is-circle"
                               round/>
                </div>
            </template>
            <el-form-item label-width="24px">
                <el-button type="primary" :loading="loading" @click="onConfirm">确 定</el-button>&nbsp;&nbsp;
                <el-button @click="onCancel">取 消</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script>
    import {mapState} from 'vuex'
    import ApplicationFormDrawerChildWarning from './subComponents/ApplicationFormDrawerChildWarning'
    import ApplicationFormDrawerChildResourceForm from './subComponents/ApplicationFormDrawerChildResourceForm'
    export default {
        name: "ApplicationFormDrawer",
        props: ['drawer'],
        data() {
            return {
                frameTypeList: [   // 应用类型数组
                    {label: 'Spring Cloud', value: 'SC'},
                    {label: 'Dubbo', value: 'dubbo'},
                    {label: '通用', value: 'common'}
                ],
                registryCenterIdList: [],   // 注册中心数组
                CPUList: ['200m', '400m', '600m', '800m', '1', '2', '4'],
                memList: ['256M', '512M', '1G', '2G', '4G', '8G', '16G'],
                isShow: false,
                form: {
                    projectName: '',
                    frameType: 'common',
                    projectType: '1',
                    registryCenterId: '',
                    projectDescription: '',
                    resourceQuota: false,
                    defaultCpu: '200m',
                    defaultMem: '256M'
                },
                rules: {

                },
                loading: false
            }
        },
        computed: {
            ...mapState(['currentTenant', 'clusters'])
        },
        methods: {
            onConfirm() {

            },
            onCancel() {

            },
            onToggle() {
                this.isShow = !this.show
            },
            /**
             *  获取注册中心数组
             */
            getRegistryCenterIdList() {
                let {envId} = this.currentTenant
                this.$http.getRegistryList_bon({tenantId: envId, isAdmin: !envId}).then(res => {
                    let {state, data, message} = res.data
                    if (state === 'success') {
                        this.registryCenterIdList = data.map(item => ({value: item.id, label: item.name}))
                    } else {
                        this.$popError(message)
                    }
                })
            },
        },
        components: {
            ApplicationFormDrawerChildWarning,
            ApplicationFormDrawerChildResourceForm
        }
    }
</script>

<style lang="less">
    #applicationFormDrawer {
        .el-drawer__header {
            margin-bottom: 12px;
        }
        .el-drawer{
            width: 700px !important;
            overflow-y: auto;
        }
        .el-drawer__body {
            padding-right: 20px;

            .el-select {
                width: 100%;
            }

            .subtitle {
                font-weight: 600;
            }

            .el-form-item {
                margin-bottom: 12px;
            }
        }
        .text-center{
            text-align: center;
        }
    }
</style>
