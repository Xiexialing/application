<template>
    <div>
        <el-form size="small" label-width="100px" @keydown.native.enter.prevent>
            <el-form-item label="配置类型">
                <el-select v-model="form.type" :transfer="true">
                    <el-option value="group" label="配置组"/>
                    <el-option value="file" label="配置文件"/>
                </el-select>
            </el-form-item>
            <el-form-item label="配置组名" v-if="form.type === 'group'">
                <el-select v-model="form.current" :transfer="true">
                    <el-option v-for="(item , index) in selectList"
                               :key="index"
                               :value="index"
                               :label="item.metadata.name"/>
                </el-select>
            </el-form-item>
            <el-form-item label="配置文件名称" v-else>
                <el-cascader :options="files" v-model="form.file" expand-trigger="hover" clearable/>
            </el-form-item>
            <el-form-item label="容器内路径">
                <el-input v-model="form.userPath"
                          v-if="form.type === 'group'"
                          :placeholder="'配置文件挂载路径' + '： /config/'" />
                <el-input v-model="form.userPath"
                          v-else
                          :placeholder="'配置文件挂载路径' + '： /config/config.properties'"/>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary">添加</el-button>
            </el-form-item>
        </el-form>
        <p class="heading">配置文件挂载路径</p>
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
                selectList: [],
                files: [],
                form: {},
                columns: [
                    {
                        label: 'Name',
                        prop: 'name'
                    },
                    {
                        label: 'Path',
                        prop: 'port'
                    },
                    {
                        label: '文件名',
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
