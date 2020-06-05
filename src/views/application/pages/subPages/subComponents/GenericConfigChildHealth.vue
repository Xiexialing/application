<template>
    <div id="health">
        <el-form size="small"
                 label-width="80px"
                 @keydown.native.enter.prevent>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="检查类型">
                        <el-select v-model="form.type">
                            <el-option value="livenessProbe" label="存活检查（livenessProbe）"/>
                            <el-option value="readinessProbe" label="启动完成检查（readinessProbe）"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="检查方式">
                        <el-select v-model="form.requestType">
                            <el-option value="httpGet" label="HTTP GET"/>
                            <el-option value="exec" label="Container Command"/>
                            <el-option value="tcpSocket" label="TCP Socket"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="延迟时间">
                        <el-slider v-model="form.delaySeconds"
                                   :step="1"
                                   :min="1"
                                   :max="1500"
                                   show-input
                                   controls-position="right"
                                   :precision="0"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="超时时间">
                        <el-slider v-model="form.timeoutSeconds"
                                   :step="1"
                                   :min="1"
                                   :max="1500"
                                   show-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="失败阈值">
                        <el-slider v-model="form.failureThreshold"
                                   :step="1"
                                   :min="1"
                                   :max="1500"
                                   show-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="成功阈值">
                        <el-slider v-model="form.successThreshold"
                                   :disabled="form.type === 'livenessProbe'"
                                   :step="1"
                                   :min="1"
                                   :max="1500"
                                   show-input/>
                    </el-form-item>
                </el-col>
                <template v-if="form.requestType === 'httpGet'">
                    <el-col :span="12">
                        <el-form-item label="路径">
                            <el-input v-model="form.path" placeholder="/index"/>
                        </el-form-item>
                    </el-col>
                </template>
                <template v-if="['httpGet', 'tcpSocket'].indexOf(form.requestType) !== -1">
                    <el-col :span="12">
                        <el-form-item label="端口">
                            <el-input v-model="form.port"/>
                        </el-form-item>
                    </el-col>
                </template>
                <template v-if="form.requestType === 'httpGet'">
                    <el-col :span="12">
                        <el-form-item label="协议">
                            <el-select v-model="form.scheme">
                                <el-option value="HTTP" label="HTTP"/>
                                <el-option value="HTTPS" label="HTTPS"/>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </template>
                <template v-if="form.requestType === 'exec'">
                    <el-col :span="24">
                        <el-form-item label="命令">
                            <div v-for="(item, index) in form.commands"
                                 :key="index"
                                 class="command-item">
                                <el-input :placeholder="item.text" v-model="item.value"/>
                                <div class="btn-wrapper">
                                    <el-button type="text" v-show="index === form.commands.length - 1"
                                               @click="onAddCommand"><i class="icon icon-add el-icon-plus"></i>
                                    </el-button>
                                </div>
                                <div class="btn-wrapper">
                                    <el-button type="text" v-show="form.commands.length !== 1"
                                               @click="onCloseCommand(index)"><i
                                            class="icon icon-close el-icon-close"></i></el-button>
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                </template>
                <el-col :span="form.requestType === 'exec' ? 24 : 12">
                    <el-form-item label=" ">
                        <el-button type="primary" @click="onAdd">新增</el-button>
                        <el-button type="primary" @click="onReset">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
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
                    type: 'livenessProbe',
                    requestType: 'httpGet',
                    delaySeconds: 10,
                    timeoutSeconds: 1,
                    failureThreshold: 3,
                    successThreshold: 1,
                    path: '',
                    port: '',
                    scheme: 'HTTP',
                    commands: [
                        {value: '', text: '请输入单条命令'}
                    ]
                },
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
                            let {
                                requestType, delaySeconds, timeoutSeconds, failureThreshold, successThreshold,
                                path, port, scheme, commands
                            } = row
                            return createElement('div', [
                                createElement('div', '延迟时间：' + delaySeconds),
                                createElement('div', '超时时间：' + timeoutSeconds),
                                createElement('div', '失败阈值：' + failureThreshold),
                                createElement('div', '成功阈值：' + successThreshold),
                                createElement('div', requestType === 'httpGet' ? '路径：' + path : ''),
                                createElement('div', ['httpGet', 'tcpSocket'].indexOf(requestType) !== -1 ? '端口：' + port : ''),
                                createElement('div', requestType === 'httpGet' ? '协议：' + scheme : ''),
                                createElement('div', requestType === 'exec' ? '命令：' + commands.reduce((prev, command) => prev + command.value + '; ', '') : '')
                            ])
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
            /**
             * 添加命令
             */
            onAddCommand() {
                this.form.commands.push({value: '', text: '请输入单条命令'})
            },
            /**
             * 删除命令
             * @param index
             */
            onCloseCommand(index) {
                this.form.commands.splice(index, 1)
            },
            onAdd() {
                let {
                    type, requestType, delaySeconds, timeoutSeconds,
                    failureThreshold, successThreshold, path, port, scheme, commands
                } = this.form
                let item = {
                    type, requestType, delaySeconds, timeoutSeconds, failureThreshold, successThreshold
                }
                if (requestType === 'httpGet') {
                    item.path = path
                    item.port = port
                    item.scheme = scheme
                } else if (requestType === 'exec') {
                    item.commands = commands
                } else if (requestType === 'tcpSocket') {
                    item.port = port
                }
                this.list.push(item)
            },
            onReset() {
                this.form.path = ''
                this.form.port = ''
                this.form.commands = [{value: '', text: '请输入单条命令'}]
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
    #health {
        .command-item {
            display: flex;
        }

        .btn-wrapper {
            width: 25px;
        }

        .icon {
            font-size: 18px;

            &.icon-add {
                margin-left: 5px;
            }
        }
    }
</style>
