<template>
    <div id="lifecycle">
        <el-form size="small" class="cfg-el-form" label-width="100px" @keydown.native.enter.prevent="">
            <p class="heading">添加</p>
            <el-form-item label="类型">
                <el-radio-group v-model="form.type">
                    <el-radio label="poststart">启动后任务（poststart）</el-radio>
                    <el-radio label="prestop">停止前任务（prestop）</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="内容">
                <div v-for="(item,index) in form.commands"
                     class="command-item"
                     :key="index">
                    <el-input :placeholder="item.text" v-model="item.value"/>
                    <el-button type="text" @click="onAddCommand"><i class="icon icon-add el-icon-plus"></i></el-button>
                    <el-button type="text" @click="onCloseCommand(index)"><i class="icon icon-close el-icon-close"></i></el-button>
                </div>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="onAdd">添加</el-button>
            </el-form-item>
        </el-form>
        <p class="heading">管理</p>
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
                hostLabelList: [],
                form: {
                    type: 'poststart',
                    commands: [
                        {value: '', text: '请输入命令或参数'}
                    ]
                },
                columns: [
                    {
                        label: '类型',
                        prop: 'name'
                    },
                    {
                        label: '内容',
                        prop: 'port'
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
            onAddCommand() {
                this.form.commands.push( {value: '', text: '请输入参数或命令'})
            },
            onCloseCommand(index) {
                this.form.commands.splice(index, 1)
            },
            onAdd() {

            }
        },
        components: {
            CustomRenderComp
        }
    }
</script>

<style scoped lang="less">
    #lifecycle {
        .command-item {
            display: flex;
        }

        .icon {
            font-size: 18px;

            &.icon-add {
                margin-left: 5px;
            }
        }
    }
</style>
