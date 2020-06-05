<template>
    <div>
        <el-form size="small" label-width="100px" @keydown.native.enter.prevent>
            <p class="heading">添加</p>
            <el-form-item label="类型">
                <el-radio-group v-model="form.type">
                    <el-radio label="com">命令</el-radio>
                    <el-radio label="arg">参数</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="内容">
                <div v-for="(item, index) in form.commands"
                     :key="index"
                     class="command-item">
                    <el-input :placeholder="item.text" v-model="item.value"/>
                    <el-button type="text" @click="onAddCommand"><i class="icon icon-add el-icon-plus"></i></el-button>
                    <el-button type="text" @click="onCloseCommand"><i class="icon icon-close el-icon-close"></i></el-button>
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
                form: {
                    type: 'com',
                    commands: [
                        {value: '', text: '请输入命令或参数'}
                    ]
                },
                columns: [
                    {
                        label: '类型',
                        prop: 'type'
                    },
                    {
                        label: '内容',
                        render: (createElement, row) => {
                            let {texts} = row
                            return createElement('div', texts.map((text, index) => createElement('el-tag', {
                                props: {
                                    closable: texts.length !== 1,
                                    size: 'small'
                                },
                                style:{
                                  margin: '5px'
                                },
                                on: {
                                    close:()=>{
                                        texts.splice(index, 1)
                                    }
                                }
                            }, text)))
                        }
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
                let {type, text} = this.form
                let {list} = this
                let item = list.find(item => item.type === type)
                if (!item) {
                    list.push({
                        type,
                        texts: [text]
                    })
                } else {
                    item.texts.push(text)
                }
            }
        },
        components: {
            CustomRenderComp
        }
    }
</script>

<style scoped>

</style>
