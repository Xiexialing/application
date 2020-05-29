<template>
    <div>
        <el-form size="small" label-width="70px" @keydown.native.enter.prevent>
            <p class="heading">添加端口</p>
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
        name: "GenericConfigChildPort",
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
                        render: (createElement, row) => {
                            return createElement('el-button', {
                                props:{
                                    type: 'text'
                                },
                                on:{
                                    click:()=>{
                                        let {name} = row
                                        this.list = this.list.filter(item => item.name !== name)
                                    }
                                }
                            }, '删除')
                        }
                    }
                ],
                list: []
            }
        },
        methods:{
            onAddPortHandle() {
                let {port, protocol} = this.form
                let name = protocol.toLowerCase() + port
                if(this.list.some(item=>item.name === name)) {
                    this.$popError('同端口同协议的已存在')
                }else {
                    this.list.push({
                        name,
                        port,
                        protocol
                    })
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
