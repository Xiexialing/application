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
                    <el-option v-for="(item , index) in groupList"
                               :key="index"
                               :value="item.metadata.name"
                               :label="item.metadata.name"/>
                </el-select>
            </el-form-item>
            <el-form-item label="配置文件名称" v-else>
                <el-cascader :options="fileList" v-model="form.file" expand-trigger="hover" clearable/>
            </el-form-item>
            <el-form-item label="容器内路径">
                <el-input v-model="form.userPath"
                          v-if="form.type === 'group'"
                          :placeholder="'配置文件挂载路径' + '： /config/'"/>
                <el-input v-model="form.userPath"
                          v-else
                          :placeholder="'配置文件挂载路径' + '： /config/config.properties'"/>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="onAdd">添加</el-button>
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
                groupList: [],
                fileList: [],
                form: {
                    type: 'group',
                    current: '',
                    file: [],
                    userPath: ''
                },
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
        methods: {
            onAdd() {
                let {type, current, file, userPath} = this.form
                let {groupList} = this
                let group = groupList.find(item=>item.meta.name === current)
                let item = {
                    ...group,
                    type,
                    userPath
                }
                if(type === 'file' ) {
                    item.file = file
                }
                this.list.push(item)
                this.form.current = ''
                this.form.userPath = ''
                this.form.file = []
            },
            queryAllConfigMaps() {
                let {clusterId, projectName} = this.baseForm
                let {clusterList} = this
                let cluster = clusterList.find(item => item.clusterId === clusterId)
                if (projectName && clusterId) {
                    let {serviceIp, clusterType, clusterPort} = cluster
                    let params = {
                        projectName,
                        resourceType: 'queryAllConfigMaps',
                        currPageNum: 1,
                        pageSize: 9999999,
                        masterIp: serviceIp,
                        masterType: clusterType,
                        masterPort: clusterPort
                    };
                    this.$http.queryAllConfigMaps(params).then((res) => {
                        let {rows} = res.data
                        if (rows) {
                            this.groupList = rows || []
                            this.fileList = []
                            if (rows.length) {
                                this.form.current = rows[0].metadata.name
                                this.fileList = this.groupList.map((item) => {
                                    let {data} = item
                                    let {name} = item.metadata
                                    let obj = {
                                        value: name,
                                        label: name,
                                        children: []
                                    }
                                    if (data) {
                                        for (let key in data) {
                                            obj.children.push({
                                                value: key,
                                                label: key,
                                                data: data[key]
                                            })
                                        }
                                    }
                                    return obj
                                })
                            }
                        }
                    })
                }

            },
        },
        components: {
            CustomRenderComp
        }
    }
</script>

<style scoped>

</style>
