<template>
    <div>
        <el-form size="small" :inline="true" class="cfg-el-form" label-width="70px" @keydown.native.enter.prevent="">
            <p class="heading">添加变量</p>
            <el-form-item>
                <el-input v-model="form.key"
                          placeholder="Key"/>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.value"
                          placeholder="Value"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">添加</el-button>
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
