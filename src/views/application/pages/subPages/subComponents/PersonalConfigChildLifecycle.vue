<template>
    <div>
        <el-form size="small" class="cfg-el-form" label-width="100px" @keydown.native.enter.prevent="">
            <p class="heading">添加</p>
            <el-form-item label="类型">
                <el-radio-group v-model="form.type">
                    <el-radio label="poststart">启动后任务（poststart）</el-radio>
                    <el-radio label="prestop">停止前任务（prestop）</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="内容">
                <div v-for="(item,index) in []"
                     :key="index">
                    <el-input :placeholder="item.text"
                              v-model="item.value"/>
                    <span class="b-added"></span>
                    <span class="b-shutdown"></span>
                </div>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary">添加</el-button>
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
                    port: '',
                    protocol: 'TCP'
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
                        render: () => {

                        }
                    }
                ],
                list: []
            }
        },
        components: {
            CustomRenderComp
        }
    }
</script>

<style scoped>

</style>
