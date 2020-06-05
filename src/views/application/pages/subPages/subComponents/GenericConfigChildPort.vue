<template>
    <div>
        <p class="heading">添加端口</p>
        <el-form size="small" inline label-width="70px" class="inline-form" @keydown.native.enter.prevent>
            <el-form-item>
                <el-select v-model="form.type">
                    <el-option label="自定义" value=""/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.port" placeholder="端口"/>
            </el-form-item>
            <el-form-item>
                <el-select v-model="form.protocol">
                    <el-option value="TCP" label="TCP"/>
                    <el-option value="UDP" label="UDP"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onAddPortHandle">添加</el-button>
            </el-form-item>
        </el-form>
        <p class="heading">管理端口</p>
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
                        <CustomRenderComp :render="column.render" :row="{...scope.row, index: scope.$index}"/>
                    </template>
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>

<script>
    import CustomRenderComp from '@/components/CustomRenderComp'

    export default {
        name: "GenericConfigChildPort",
        data() {
            return {
                form: {
                    type: '',
                    port: '',
                    protocol: 'TCP'
                },
                columns: [
                    {
                        label: '名称',
                        prop: 'name'
                    },
                    {
                        label: '端口',
                        prop: 'port'
                    },
                    {
                        label: '协议',
                        prop: 'protocol'
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
            onAddPortHandle() {
                let {port, protocol} = this.form
                let name = protocol.toLowerCase() + port
                if (this.list.some(item => item.name === name)) {
                    this.$popError('同端口同协议的已存在')
                } else {
                    this.list.push({
                        name,
                        port,
                        protocol
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
    .inline-form {
        display: flex;
    }
</style>
