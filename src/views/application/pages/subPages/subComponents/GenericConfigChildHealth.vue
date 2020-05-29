<template>
    <div id="health">
        <el-form size="small"
                 label-width="80px"
                 @keydown.native.enter.prevent>
            <el-row>
                <el-col :span="12">
                    <div class="left-part">
                        <el-form-item label="检查类型">
                            <el-select v-model="form.type" :transfer="true">
                                <el-option value="livenessProbe" label="存活检查（livenessProbe）"/>
                                <el-option value="readinessProbe" label="启动完成检查（readinessProbe）"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="延迟时间">
                            <el-slider v-model="form.delaySeconds"
                                       :step="1"
                                       :min="1"
                                       :max="1500"
                                       show-input
                                       controls-position="right"
                                       :precision="0"/>
                        </el-form-item>
                        <el-form-item label="失败阈值">
                            <el-slider v-model="form.failureThreshold"
                                       :step="1"
                                       :min="1"
                                       :max="1500"
                                       show-input/>
                        </el-form-item>
                        <el-form-item label="路径">
                            <el-input v-model="form.path" placeholder="/index"/>
                        </el-form-item>
                        <el-form-item label="协议">
                            <el-select v-model="form.scheme" :transfer="true">
                                <el-option value="HTTP" label="HTTP"/>
                                <el-option value="HTTPS" label="HTTPS"/>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="right-part">
                        <el-form-item label="检查方式">
                            <el-select v-model="form.requestType" :transfer="true">
                                <el-option value="httpGet" label="HTTP GET"/>
                                <el-option value="exec" label="Container Command"/>
                                <el-option value="tcpSocket" label="TCP Socket"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="超时时间">
                            <el-slider v-model="form.timeoutSeconds"
                                       :step="1"
                                       :min="1"
                                       :max="1500"
                                       show-input/>
                        </el-form-item>
                        <el-form-item label="成功阈值">
                            <el-slider v-model="form.successThreshold"
                                       :step="1"
                                       :min="1"
                                       :max="1500"
                                       show-input/>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="端口">
                        <el-input v-model="form.port"/>
                    </el-form-item>
                </el-col>
                <el-form-item label="命令">
                    <div v-for="(item, index) in [1]" :key="index">
                        <el-input :placeholder="item.text" v-model="item.value"/>
                        <i class="b-added"></i>
                        <i class="b-shutdown"></i>
                    </div>
                </el-form-item>
                <el-col :span="12">
                    <el-form-item label=" ">
                        <el-button type="primary">新增</el-button>
                        <el-button type="primary">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>

            <div v-if="form.requestType === 'httpGet'"></div>
        </el-form>
        <p class="heading">健康列表</p>
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
                columns: [
                    {
                        label: '检查类型',
                        prop: 'type'
                    },
                    {
                        label: '检查方式',
                        prop: 'requestType'
                    },
                    {
                        label: '内容',
                        render: (createElement, row) => {
                            return createElement('div', row)
                        }
                    },
                    {
                        label: '操作',
                        render: (createElement, row) => {
                            return createElement('div', row)
                        }
                    }
                ],
                form: {},
                list: []
            }
        },
        components: {
            CustomRenderComp
        }
    }
</script>

<style scoped lang="less">
    #health{
        .left-part{
            padding-right: 15px;
        }
    }
</style>
