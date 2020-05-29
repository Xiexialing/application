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
                <el-input v-model="form.text"/>
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
