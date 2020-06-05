<template>
    <div id="env">
        <p class="heading">添加变量</p>
        <el-form size="small" :inline="true" class="inline-form" @keydown.native.enter.prevent>
            <el-form-item>
                <el-select v-model="form.type">
                    <el-option label="自定义" value=""/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.key"
                          placeholder="Key"/>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.value"
                          placeholder="Value"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onAdd">添加</el-button>
            </el-form-item>
        </el-form>
        <p class="heading">管理变量</p>
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

    export default {
        name: "PersonalConfigChildTagsForm",
        data() {
            return {
                form: {
                    type: '',
                    key: '',
                    value: ''
                },
                columns: [
                    {
                        label: '类型',
                        prop: 'type',
                        render: (createElement) => {
                            return createElement('span', '自定义')
                        }
                    },
                    {
                        label: 'key',
                        prop: 'key'
                    },
                    {
                        label: 'value',
                        prop: 'value'
                    },
                    {
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
                    }
                ],
                list: []
            }
        },
        methods: {
            onAdd() {
                let {type, key, value} = this.form
                let whiteList = {
                    applicationName: true,
                    applicationType: true,
                    envId: true,
                    parentKind: true,
                    versionName: true,
                    imageGroupStrategy: true,
                    shrinkageImageGroupId: true,
                    targetReplica: true,
                    oldReplica: true,
                    'kubernetes.customized/pod-affinity': true,
                    'kubernetes.customized/bocloud_component_id': true,
                    nfs: true
                }
                if (whiteList[key]) {
                    return this.$popError('该key为系统默认key,请修改')
                }
                if (this.list.some(item => item.key === key)) {
                    this.$popError('key已存在')
                } else {
                    this.list.push({
                        type,
                        key,
                        value
                    })
                }
            },
            getList() {
                return this.list
            }
        },
        components: {
            CustomRenderComp
        }
    }
</script>

<style scoped lang="less">
    #env {
        .inline-form {
            display: flex;
        }
    }
</style>
