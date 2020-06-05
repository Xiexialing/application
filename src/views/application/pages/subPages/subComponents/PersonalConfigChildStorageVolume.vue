<template>
    <div id="storageVolume">
        <p class="heading">添加卷</p>
        <StorageVolumeChildStatefulSetForm v-if="form.kind === 'StatefulSet'"
                                           @storageTypeChangeEvent="onStorageTypeChange($event, 'statefulSetType')"
                                           ref="storageVolumeChildStatefulSetFormRef"
                                           :baseForm="form"/>
        <StorageVolumeChildDefaultForm v-else
                                       @storageTypeChangeEvent="onStorageTypeChange($event, 'defaultType')"
                                       ref="storageVolumeChildDefaultFormRef"
                                       :baseForm="form"/>
        <div class="add-btn-wrapper">
            <el-button type="primary" size="small" @click="onAdd">添加</el-button>
        </div>
        <p class="heading">管理卷</p>
        <el-table border
                  :data="list"
                  size="small">
            <template v-for="(column, index) in columns">
                <el-table-column v-if="!column.render"
                                 :label="column.label"
                                 :prop="column.prop"
                                 :key="index"/>
                <el-table-column v-else
                                 :label="column.label"
                                 :key="index">
                    <template slot-scope="scope">
                        <CustomRenderComp :render="column.render" :row="scope.row"/>
                    </template>
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>

<script>
    import CustomRenderComp from '@/components/CustomRenderComp'
    import StorageVolumeChildStatefulSetForm from './StorageVolumeChildStatefulSetForm'
    import StorageVolumeChildDefaultForm from './StorageVolumeChildDefaultForm'

    export default {
        name: "PersonalConfigChildTagsForm",
        props: {
            form: {
                type: Object,
                default() {
                    return {
                        clusterId: '',
                        projectName: '',
                        kind: 'Deployment'
                    }
                }
            }
        },
        data() {
            return {
                storageClassNameList: [],
                nameList: [],
                defaultType: 'share',   // 非StatefulSet类型的存储类型
                statefulSetType: 'storageClass',    // StatefulSet类型的存储类型
                list: []
            }
        },
        computed: {
            columns() {
                let {kind} = this.form
                let {defaultType} = this
                let columns = []
                if (kind === 'StatefulSet') {
                    columns = [
                        {
                            label: '类型',
                            prop: 'type'
                        },
                        {
                            label: '特性',
                            render: (createElement, row) => {
                                let {statefulSetType} = this
                                if(statefulSetType === 'storageClass') {
                                    return createElement('div', [
                                        createElement('p', '访问模式：' + row.accessModes),
                                        createElement('p', '存储名称：' + row.name),
                                        createElement('p', '容量：' + row.storage + row.unit),
                                        createElement('p', 'storageClass：' + row.storageClass)
                                    ])
                                }else{
                                    return createElement('div', [
                                        row.name ? createElement('p', '卷名：' + row.name) : '',
                                        createElement('p', '挂载卷名：' + row.mountName)
                                    ])
                                }
                            }
                        },
                        {
                            label: '容器内路径',
                            prop: 'path'
                        },
                        {
                            label: '子路径',
                            prop: 'subPath'
                        }
                    ]
                } else {
                    if (defaultType === 'NAS') {
                        columns = [
                            {
                                label: '存储名称',
                                prop: 'configVolumesMountPath'
                            },
                            {
                                label: '容器内路径',
                                prop: 'path'
                            },
                            {
                                label: '卷名',
                                prop: 'name'
                            }
                        ]
                    } else {
                        columns = [
                            {
                                label: '存储名称',
                                prop: 'configVolumesMountPath'
                            },
                            {
                                label: '容器内路径',
                                prop: 'path'
                            },
                            {
                                label: '子路径',
                                prop: 'subPath'
                            },
                            {
                                label: '卷名',
                                prop: 'name'
                            },
                            {
                                label: '挂载卷名',
                                prop: 'mountName'
                            }
                        ]
                    }
                }
                columns.push({
                    label: '操作',
                    render: (createElement, row) => {
                        return createElement('el-button', {
                            props: {
                                type: 'text',
                                icon: "icon icon-close el-icon-close"
                            },
                            on: {
                                click: () => {
                                    this.list.splice(row.index, 1)
                                }
                            }
                        })
                    }
                })
                return columns
            }
        },
        methods: {
            onStorageTypeChange(type, name) {
                this[name] = type
            },
            onAdd() {
                let {kind} = this.form
                let {storageVolumeChildStatefulSetFormRef, storageVolumeChildDefaultFormRef} = this.$refs
                let params = null
                if (kind === 'StatefulSet') {
                    params = storageVolumeChildStatefulSetFormRef.getParams()
                } else {
                    params = storageVolumeChildDefaultFormRef.getParams()
                }
                this.list.push(params)
            },
            getList() {
                return this.list
            }
        },
        components: {
            CustomRenderComp,
            StorageVolumeChildDefaultForm,
            StorageVolumeChildStatefulSetForm
        }
    }
</script>

<style lang="less">
    #storageVolume {
        .form-tip {
            color: #f90;
        }

        .add-btn-wrapper {
            margin: 10px 0 15px 100px;
        }
    }
</style>
