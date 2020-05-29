<template>
    <div>
        <el-form size="small" label-width="130px" @keydown.native.enter.prevent>
            <p class="heading">添加</p>
            <el-form-item label="调度类型">
                <el-radio-group v-model="form.type">
                    <el-radio label="nodeAffinity">标签调度</el-radio>
                    <el-radio label="podAffinity">服务实例亲和调度</el-radio>
                    <el-radio label="podAntiAffinity">服务实例反亲和调度</el-radio>
                </el-radio-group>
            </el-form-item>
            <div v-if="form.type === 'nodeAffinity'">
                <el-form-item label="模式">
                    <el-select v-model="form.model" :transfer="true">
                        <el-option value="requiredDuringSchedulingIgnoredDuringExecution" label="调度强制约束"/>
                        <el-option value="preferredDuringSchedulingIgnoredDuringExecution" label="调度非强制约束"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="表达样式">
                    <el-select v-model="form.operator" :transfer="true">
                        <el-option value="In" label="In"/>
                        <el-option value="NotIn" label="NotIn"/>
                        <el-option value="Exists" label="Exists"/>
                        <el-option value="DoesNotExist" label="DoesNotExist"/>
                        <el-option value="Gt" label="Gt"/>
                        <el-option value="Lt" label="Lt"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="权重"
                              v-if="form.model === 'preferredDuringSchedulingIgnoredDuringExecution'">
                    <el-slider v-model="form.weight"
                               :step="1"
                               :min="1"
                               show-input/>
                </el-form-item>
                <el-form-item label="主机标签"
                              v-if="form.operator === 'In' || form.operator === 'NotIn'">
                    <el-checkbox-group v-model="form.hostLabelSelect"
                                       size="large">
                        <el-checkbox v-for="(item,index) in hostLabelList"
                                     :label="item.labelKey + '=' + item.labelValue"
                                     :key="index">
                            {{item.labelKey + '=' + item.labelValue}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="标签名称"
                              v-if="label.operator === 'Exists' || label.operator === 'DoesNotExist' || label.operator === 'Gt' || label.operator === 'Lt'">
                    <el-checkbox-group v-model="form.hostLabelKeySelect"
                                       size="large">
                        <el-checkbox v-for="(item,index) in hostLabelList"
                                     :label="item.labelKey"
                                     :key="index">
                            {{item.labelKey}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="标签值" v-if="form.operator === 'Gt' || form.operator === 'Lt'">
                    <el-input v-model="form.labelValue"/>
                </el-form-item>
            </div>
            <div v-if="form.type === 'podAntiAffinity'">
                <el-form-item label="服务内反亲和设置">
                    <el-switch v-model="form.podAntiAffinityInSet"
                               active-text="开"
                               inactive-text="关"/>
                </el-form-item>
                <el-form-item label="选择服务" v-if="!form.podAntiAffinityInSet">
                    <el-tree ref="appTree"
                             :data="form.proList"
                             show-checkbox
                             node-key="id"/>
                </el-form-item>
            </div>
            <div v-if="form.type === 'podAffinity'">
                <el-form-item label="服务内亲和设置" class="is-required">
                    <el-switch v-model="form.podAffinityInSet"
                               active-text="开"
                               inactive-text="关"/>
                </el-form-item>
                <el-form-item label="选择服务"
                              v-if="!form.podAffinityInSet">
                    <el-tree ref="appTree2"
                             :data="form.aproList"
                             show-checkbox
                             node-key="id"/>
                </el-form-item>
            </div>
            <el-form-item label=" ">
                <el-button type="primary">添加</el-button>
            </el-form-item>
        </el-form>
        <p class="heading">管理调度</p>
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
