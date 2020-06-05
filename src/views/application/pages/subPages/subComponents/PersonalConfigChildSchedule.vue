<template>
    <div>
        <el-form size="small" label-width="130px" @keydown.native.enter.prevent>
            <p class="heading">添加</p>
            {{list}}
            <el-form-item label="调度类型">
                <el-radio-group v-model="form.type">
                    <el-radio label="nodeAffinity">标签调度</el-radio>
                    <el-radio label="podAffinity">服务实例亲和调度</el-radio>
                    <el-radio label="podAntiAffinity">服务实例反亲和调度</el-radio>
                </el-radio-group>
            </el-form-item>
            <template v-if="form.type === 'nodeAffinity'">
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
                <template v-if="form.model === 'preferredDuringSchedulingIgnoredDuringExecution'">
                    <el-form-item label="权重">
                        <el-slider v-model="form.weight"
                                   :step="1"
                                   :min="1"
                                   show-input/>
                    </el-form-item>
                </template>
                <template v-if="['In', 'NotIn'].indexOf(form.operator) !== -1">
                    <el-form-item label="主机标签">
                        <el-card>
                            <el-checkbox-group v-model="form.hostLabelSelect"
                                               size="large">
                                <el-checkbox v-for="(item,index) in labelList"
                                             :label="item.labelKey + '=' + item.labelValue"
                                             :key="index">
                                    {{item.labelKey + '=' + item.labelValue}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-card>
                    </el-form-item>
                </template>
                <template v-if="['Exists', 'DoesNotExist', 'Gt', 'Lt'].indexOf(form.operator) !== -1">
                    <el-form-item label="标签名称">
                        <el-card>
                            <el-checkbox-group v-model="form.hostLabelKeySelect"
                                               size="large">
                                <el-checkbox v-for="(item,index) in labelList"
                                             :label="item.labelKey"
                                             :key="index">
                                    {{item.labelKey}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-card>
                    </el-form-item>
                </template>
                <template v-if="['Gt', 'Lt'].indexOf(form.operator) !== -1">
                    <el-form-item label="标签值">
                        <el-input v-model="form.labelValue"/>
                    </el-form-item>
                </template>
            </template>
            <template v-if="form.type === 'podAntiAffinity'">
                <el-form-item label="服务内反亲和设置">
                    <el-switch v-model="form.podAntiAffinityInSet"
                               active-text="开"
                               inactive-text="关"/>
                </el-form-item>
                <template v-if="!form.podAntiAffinityInSet">
                    <el-form-item label="选择服务">
                        <el-card>
                            <el-tree ref="appTree"
                                     :data="serviceTreeData"
                                     show-checkbox
                                     node-key="id"/>
                        </el-card>
                    </el-form-item>
                </template>
            </template>
            <template v-if="form.type === 'podAffinity'">
                <el-form-item label="服务内亲和设置">
                    <el-switch v-model="form.podAffinityInSet"
                               active-text="开"
                               inactive-text="关"/>
                </el-form-item>
                <template v-if="!form.podAffinityInSet">
                    <el-form-item label="选择服务">
                        <el-card>
                            <el-tree ref="appTree2"
                                     :data="serviceTreeData"
                                     show-checkbox
                                     node-key="id"/>
                        </el-card>
                    </el-form-item>
                </template>
            </template>
            <el-form-item label=" ">
                <el-button type="primary" @click="onAdd">添加</el-button>
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
                                 :width="!index || index === 2 ? '120px' : ''"
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
        name: "PersonalConfigChildTagsForm",
        props: {
            clusterList: {
                type: Array,
                default() {
                    return [
                        {
                            "clusterId": 5,
                            "clusterName": "fabric231",
                            "clusterHostId": "5",
                            "clusterType": "https",
                            "clusterRegistryId": "31,51",
                            "clusterStatus": 1,
                            "clusterPort": "6443",
                            "clusterDesc": "fabric cluster",
                            "clusterCreatetime": "2020-05-20T07:59:26.000+0000",
                            "userId": 1,
                            "clusterResType": 0,
                            "clusterTotalCpu": 11,
                            "clusterTotalMem": 22,
                            "clusterFreeCpu": 33,
                            "clusterFreeMem": 44,
                            "serviceIp": "192.168.1.231",
                            "haEnable": null,
                            "envId": null,
                            "clusterHostArray": null,
                            "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Iko1MUhQVUpnSHk3cVdJZk1hcGN5ckcwbVBfblFiYzRIbkUwazFuSmlxVUkifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJtYW5hZ2VtZW50LWFkbWluLXRva2VuLWJrZ214Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6Im1hbmFnZW1lbnQtYWRtaW4iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI3OTZmZGMyOS04MGVhLTQ4ZWEtODYzNS0yOGM3YTBhMjA0ZTEiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06bWFuYWdlbWVudC1hZG1pbiJ9.LHM7c-zOA8SHRPnMVMh6sskpcM07smso-sQHXnCvFnjInZkqic2-JA5h80j4R2kMljY5s7OTzVBzx4JITpNYuaSrxPunsb6ANudhdRNNJ-ll4w7FMs8o7DUp-s046_o7R75y3FPlDn7G-S0O3f9fPiih7Il7sh7pMratONmFsSRU8yd2PeWKXhZUb2bstUXLn-AIlafvX9xmuMHPdhLtfHLzIYn27xHp52ySMZcQEUOXRl_4mIJCFMgTcVYuUDYlpcpWrstg8M6ZanekAb1S0xVHnfoLh93yo7SYR3QcrFxFQnX-B1_mqhxU2Lly8SAQ5OM-ZR5IuxMYWrfqhiaN8A",
                            "platformType": "kubernetes",
                            "defaultEnvId": 4,
                            "defaultEnvName": "fabric231-default",
                            "page": 0,
                            "total": 0,
                            "records": 0,
                            "rowsh": null,
                            "hostsGridBean": null,
                            "alertsGridBean": null,
                            "createClusterFlag": null,
                            "logAddr": "192.168.1.231:31065",
                            "prometheusAddr": "192.168.1.231:30909",
                            "ingressAddr": "192.168.1.239:9014",
                            "version": "1.17.2",
                            "createTimeFormat": null,
                            "status": null,
                            "esAddr": "192.168.1.231:30029",
                            "esName": "",
                            "clusterRealName": "fabric231",
                            "remoteApiAddr": "192.168.1.231",
                            "kubewatchName": "kubewatch",
                            "clusterIp": null,
                            "envAccountStatus": 1,
                            "skywalkingAddr": "",
                            "skywalkingProbeAddr": "",
                            "networkType": "fabric",
                            "apolloCallbackAddr": "",
                            "esAlertAddr": "192.168.1.232:3030",
                            "deploymentAircraftAddr": null,
                            "deploymentAircraftUser": null,
                            "deploymentAircraftPwd": null,
                            "serviceIpv4": "",
                            "networkVirtualization": "underlay",
                            "labelKey": null,
                            "labelValue": null,
                            "partitionId": null,
                            "clusterHarborId": "38",
                            "logAddrIpv4": null,
                            "haProxyAddress": null,
                            "clusterHaProxy": null,
                            "ingressMgrGridBean": null
                        }, {
                            "clusterId": 11,
                            "clusterName": "calico72",
                            "clusterHostId": "35",
                            "clusterType": "https",
                            "clusterRegistryId": "51,31",
                            "clusterStatus": 1,
                            "clusterPort": "6443",
                            "clusterDesc": "calico",
                            "clusterCreatetime": "2020-05-21T01:43:47.000+0000",
                            "userId": 1,
                            "clusterResType": 0,
                            "clusterTotalCpu": 12,
                            "clusterTotalMem": 23,
                            "clusterFreeCpu": 34,
                            "clusterFreeMem": 45,
                            "serviceIp": "192.168.1.72",
                            "haEnable": null,
                            "envId": null,
                            "clusterHostArray": null,
                            "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IlJQSjd1UlF6NkNTRVNORjE5WTVNdG5ydkhHbEFnQUcxam1LQ0VDWnNOME0ifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJtYW5hZ2VtZW50LWFkbWluLXRva2VuLTZ3OXRzIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6Im1hbmFnZW1lbnQtYWRtaW4iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiIxOGRlNWY5My1mZmQxLTQ4MzQtYmQ5ZS1iZGE2NThhMGRkNzMiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06bWFuYWdlbWVudC1hZG1pbiJ9.kBqgs4H3YBtH2B_0Fbg0vD2LGFLHRD2qR2Rw-DPx1-Pp6RSH6UK9-9xMBaLRKlZKFGsG6PYR3K9C-k899IJmSDZwjNRlRCXqRwQIWCSOtZ9RoTwjbnb_zfk7WlFs163eoQ6ew05nvb4K5wwOo5q6HJHr0D4jeEbXZDGjhh3NgmdGt4Jf43CkIl50Mo9OEduxTFzLPWDlOZuixPulnBFZZ8SdU0JVXTUnKVa9ksZB_HCANqXdqqUdMw4-RbqM1HVa9nz2IhwbR2XLE_Dv9g4Ly25JPl3N9jl7hQ_yNFKJFuXsCrUrkCZOnQH1h5vevubtcwT_RVNyGueXQOQg2HkRFg",
                            "platformType": "kubernetes",
                            "defaultEnvId": 15,
                            "defaultEnvName": "calico72-default",
                            "page": 0,
                            "total": 0,
                            "records": 0,
                            "rowsh": null,
                            "hostsGridBean": null,
                            "alertsGridBean": null,
                            "createClusterFlag": null,
                            "logAddr": "192.168.1.72:31065",
                            "prometheusAddr": "192.168.1.72:30909",
                            "ingressAddr": "192.168.1.79:9014",
                            "version": "1.17.2",
                            "createTimeFormat": null,
                            "status": null,
                            "esAddr": "192.168.1.72:30029",
                            "esName": "",
                            "clusterRealName": "calico72",
                            "remoteApiAddr": "192.168.1.72",
                            "kubewatchName": "kubewatch",
                            "clusterIp": null,
                            "envAccountStatus": 1,
                            "skywalkingAddr": "",
                            "skywalkingProbeAddr": "",
                            "networkType": "calico",
                            "apolloCallbackAddr": "",
                            "esAlertAddr": "192.168.1.73:3030",
                            "deploymentAircraftAddr": null,
                            "deploymentAircraftUser": null,
                            "deploymentAircraftPwd": null,
                            "serviceIpv4": "",
                            "networkVirtualization": null,
                            "labelKey": null,
                            "labelValue": null,
                            "partitionId": null,
                            "clusterHarborId": "38,56",
                            "logAddrIpv4": null,
                            "haProxyAddress": null,
                            "clusterHaProxy": null,
                            "ingressMgrGridBean": null
                        }
                    ]
                }
            },
            baseForm: {
                type: Object,
                default() {
                    return {
                        projectName: '',
                        clusterId: ''
                    }
                }
            }
        },
        data() {
            return {
                project: {},   // 当前应用信息
                partition: {},  // 当前分区信息
                labelList: [],
                serviceTreeData: [],   // 树形图数据
                form: {
                    type: 'nodeAffinity',
                    model: 'requiredDuringSchedulingIgnoredDuringExecution',
                    operator: 'In',
                    weight: 1,
                    hostLabelSelect: '',
                    hostLabelKeySelect: '',
                    labelValue: '',
                    podAntiAffinityInSet: '',
                    podAffinityInSet: ''
                },
                columns: [
                    {
                        label: '类型',
                        render: (createElement, row) => {
                            let {type} = row
                            let msg = '标签调度'
                            if (type === 'podAffinity') {
                                msg = '服务实例亲和调度'
                            } else if (type === 'podAntiAffinity') {
                                msg = '服务实例反亲和调度'
                            }
                            return createElement('span', msg)
                        }
                    },
                    {
                        label: '内容',
                        render: (createElement, row) => {
                            let {type} = row
                            if (type === 'nodeAffinity') {
                                return this.renderNdeAffinity(createElement, row)
                            } else if (type === 'podAffinity') {
                                return this.renderPodAffinity(createElement, row)
                            } else {
                                return this.renderPodAntiAffinity(createElement, row)
                            }
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
            renderNdeAffinity(createElement, row) {
                let {children} = row
                let models = Object.keys(children)
                return createElement('div', models.map(model => [
                    createElement('div', [
                        createElement('div', [
                            createElement('span', '模式：调度强制约束'),
                            createElement('span', ' 表达样式：' + children[model].operator),
                            model === 'preferredDuringSchedulingIgnoredDuringExecution' ? createElement('span', ' 权重：' + children[model].weight) : ''
                        ]),
                        ['In', 'NotIn'].indexOf(children[model].operator) !== -1 ? createElement('span', ' 主机标签：' + children[model].hostLabelSelect.reduce((prev, item) => item + '; ', '')) : '',
                        ['Exists', 'DoesNotExist', 'Gt', 'Lt'].indexOf(children[model].operator) !== -1 ? createElement('span', ' 标签名称：' + children[model].hostLabelKeySelect.reduce((prev, item) => item + '; ', '')) : '',
                        ['Gt', 'Lt'].indexOf(children[model].operator) !== -1 ? createElement('span', ' 标签值：' + children[model].labelValue) : ''
                    ])
                ]))
            },
            renderPodAffinity(createElement, row) {
                let {podAffinityInSet, appNodes} = row
                return createElement('div', [
                    createElement('span', '服务内亲和设置：' + (podAffinityInSet ? '开' : '关')),
                    createElement('div', '所选应用：' + appNodes.reduce(item => item.label + '; ', '')),
                ])
            },
            renderPodAntiAffinity(createElement, row) {
                let {podAntiAffinityInSet, appNodes} = row
                return createElement('div', [
                    createElement('span', '服务内反亲和设置：' + (podAntiAffinityInSet ? '开' : '关')),
                    createElement('div', '所选应用：' + appNodes.reduce(item => item.label + '; ', '')),
                ])
            },
            onAdd() {
                let {
                    type, model, operator, weight, hostLabelSelect, hostLabelKeySelect,
                    labelValue, podAntiAffinityInSet, podAffinityInSet
                } = this.form
                let {list} = this
                let isExist = false  // 是否已经存在
                let item = list.find(item => item.type === type)
                if (item) {
                    isExist = true
                } else {
                    item = {type}
                }
                if (type === 'nodeAffinity') {
                    // 标签调度
                    if (model === 'preferredDuringSchedulingIgnoredDuringExecution') {
                        // 调度非强制约束
                        if (!item.children) {
                            item.children = {}
                        }
                        this.$set(item.children, [model], {
                            model,
                            weight
                        })
                    } else {
                        // 调度强制约束
                        if (item.children && item.children[model]) {
                            return this.$popError('该模式已添加', '友情提示')
                        } else {
                            if (!item.children) {
                                item.children = {}
                            }
                            this.$set(item.children, [model], {})
                        }
                    }
                    item.children[model].operator = operator
                    if (['In', 'NotIn'].indexOf(operator) !== -1) {
                        item.children[model].hostLabelSelect = hostLabelSelect || []
                    } else if (['Exists', 'DoesNotExist', 'Gt', 'Lt'].indexOf(operator) !== -1) {
                        item.children[model].hostLabelKeySelect = hostLabelKeySelect || []
                    } else if (['Gt', 'Lt'].indexOf(operator) !== -1) {
                        item.children[model].labelValue = labelValue
                    }
                } else if (type === 'podAffinity') {
                    // 服务实例亲和调度
                    item.podAffinityInSet = podAffinityInSet
                    let {appTree2} = this.$refs
                    let nodes = appTree2.getCheckedNodes(true)
                    item.appNodes = nodes
                } else {
                    // podAntiAffinity服务实例反亲和调度
                    item.podAntiAffinityInSet = podAntiAffinityInSet
                    let {appTree} = this.$refs
                    let nodes = appTree.getCheckedNodes(true)
                    item.appNodes = nodes
                }
                if (!isExist) {
                    this.list.push(item)
                }
            },
            /**
             * 查询应用列表、获取当前应用的详情
             */
            getProject() {
                let {projectName} = this.baseForm
                this.$http.projectList_Paas({currPageNum: 1, pageSize: 99999}).then((res) => {
                    let {rows} = res.data
                    if (rows) {
                        this.project = rows.find(item => item.projectName === projectName)
                        this.getPartition()
                    }
                })
            },
            /**
             * 查询选中的应用和集群下分区
             */
            getPartition() {
                let {projectId} = this.project
                let {clusterId} = this.baseForm
                if (projectId) {
                    this.$http.selectProView({projectId, clusterId}).then((res) => {
                        let {state, data} = res.data
                        if (state === 'success') {
                            let {projectViewList} = data
                            if (projectViewList && projectViewList.length) {
                                this.partition = projectViewList[0]
                                this.getLabelList()
                            }
                        }
                    })
                }
            },
            /**
             * 获取标签列表
             */
            getLabelList() {
                let {clusterId} = this.baseForm
                let {envId} = this.$store.state.currentTenant
                let {partitionId} = this.partition
                this.$http.getLabelByClusterId({
                    clusterId,
                    envId,
                    partitionId
                }).then((res) => {
                    let {state, data} = res.data
                    if (state === 'success') {
                        this.form.labelList = data || []
                    }
                })
            },
            /**
             * 获取应用列表
             */
            getApplicationList() {
                let {clusterList} = this
                let {clusterId} = this.baseForm
                let cluster = clusterList.find(cluster => cluster.clusterId === clusterId)
                if (cluster) {
                    let {platformType, serviceIp, prometheusAddr} = cluster
                    let {envId, userId, isManager} = this.$store.state.currentTenant
                    let {partitionId} = this.partition
                    let params = {
                        currPageNum: 1,
                        pageSize: 99999,
                        resourceType: 'queryApplicationInfoByProjectId',
                        platformType,
                        masterIp: serviceIp,
                        prometheusAddr,
                        envId,
                        partitionId
                    }
                    if (!isManager) {
                        params.userId = userId
                    }
                    this.$http.appList(params).then((res) => {
                        let {rows} = res.data
                        if (rows) {
                            if (rows && rows.length) {
                                this.formatTreeData(rows);
                            }
                        }
                    })
                }
            },
            /**
             * 格式化树形图数据
             * @param applicationList
             */
            formatTreeData(applicationList) {
                let treeArr = []  // 二维数组，外层是应用列表，children是服务列表
                applicationList.forEach((item) => {
                    let {id, applicationName, projectId, projectName} = item.v2Application
                    let project = treeArr.find(project => project.projectId === projectId)
                    if (project) {
                        // 如果是已经存在的应用
                        project.children.push({
                            id,
                            label: applicationName
                        })
                    } else {
                        treeArr.push({
                            id: projectId,
                            label: projectName,
                            children: [
                                {
                                    id,
                                    label: applicationName
                                }
                            ]
                        })
                    }
                })
                this.serviceTreeData = treeArr
            }
        },
        components: {
            CustomRenderComp
        }
    }
</script>

<style scoped>

</style>
