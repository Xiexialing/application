<template>
    <el-form ref="form" label-width="100px" :model="form" :rules="rules" class="resource-form" size="small">
        <el-row>
            <el-col :span="11">
                <el-form-item label="集群">
                    <el-select v-model="form.clusterId" @change="onClusterChange">
                        <el-option v-for="(item, index) in clusterList"
                                   :key="index"
                                   :value="item.clusterId"
                                   :label="item.clusterName"/>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="9">
                <el-form-item label="分区" label-width="56px" @change="onPartitionChange">
                    <el-select v-model="form.partitionId">
                        <el-option v-for="(item, index) in partitionList"
                                   :key="index"
                                   :value="item.partitionId"
                                   :label="item.partitionName"/>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <i class="bocloudpublic bopublic-dropdown"></i>
                <i class="b-shutdown"></i>
            </el-col>
        </el-row>
        <template v-show="isCollapse">
            <el-form-item label="网络">
                <el-select v-model="form.networkName">
                    <el-option v-for="(item, index) in networktList"
                               :key="index"
                               :value="item.netWorkName"
                               :label="item.netWorkName"/>
                </el-select>
            </el-form-item>
            <el-form-item label-width="24px">
                <span class="subtitle">资源限额</span>
            </el-form-item>
            <el-form-item label="CPU(核)">
                <el-input v-model="form.cpu" @input="onNumberChange($event, 'cpu')">
                    <template slot="append">当前可用额度：{{resources.cpu}}</template>
                </el-input>
            </el-form-item>
            <el-form-item label="内存(GB)">
                <el-input v-model="form.memory" @input="onNumberChange($event, 'memory')">
                    <template slot="append">当前可用额度：{{resources.memory}}</template>
                </el-input>
            </el-form-item>
            <el-form-item label="实例">
                <el-input v-model="form.pods" @input="onNumberChange($event, 'pods')">
                    <template slot="append">当前可用额度：{{resources.pods}}</template>
                </el-input>
            </el-form-item>
            <el-form-item label="存储(GB)">
                <el-input v-model="form.requestStorage" @change="onNumberChange($event, 'requestStorage')">
                    <template slot="append">当前可用额度：{{resources.requestStorage}}</template>
                </el-input>
            </el-form-item>
        </template>
    </el-form>
</template>

<script>
    const resources = {
        cpu: 0,
        memory: 0,
        pods: 0,
        requestStorage: 0
    }
    export default {
        name: "ApplicationFormDrawerChildResourceForm",
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
                            "clusterTotalCpu": 0,
                            "clusterTotalMem": 0,
                            "clusterFreeCpu": 0,
                            "clusterFreeMem": 0,
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
                            "clusterTotalCpu": 0,
                            "clusterTotalMem": 0,
                            "clusterFreeCpu": 0,
                            "clusterFreeMem": 0,
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
            envId: {
                type: Number
            }
        },
        data() {
            return {
                partitionList: [], // 分区列表
                networktList: [],  // 网络列表
                form: {
                    clusterId: '',
                    partitionId: '',
                    netWorkName: '',
                    cpu: 1,
                    memory: 1,
                    pods: 1,
                    requestStorage: 0
                },
                resources: Object.assign({}, resources),
                rules: {},
                isCollapse: true
            }
        },
        methods: {
            /**
             * 监听集群变化
             * @param clusterId
             */
            onClusterChange(clusterId) {
                this.form.partitionId = ''
                this.form.networkName = ''
                this.partitionList = []
                this.networktList = []
                this.form.cpu = 1
                this.form.memory = 1
                this.form.pods = 1
                this.form.requestStorage = 0
                this.resources = Object.assign({}, resources)
                //获取集群下的分区
                this.$http.getPartitionTags({
                    envId: this.envId,
                    clusterId
                }).then((res) => {
                    let {state, data} = res.data
                    if (state === 'success') {
                        this.partitionList = data
                    }
                })
            },
            onPartitionChange(partitionId) {
                this.form.networkName = ''
                this.networktList = []
                this.form.cpu = 1
                this.form.memory = 1
                this.form.pods = 1
                this.form.requestStorage = 0
                this.resources = Object.assign({}, resources)
                let partition = this.partitionList.find(partition => partition.partitionId === partitionId)
                let {resourceCPU, resourceMemory, resourceInstance, resourceHd} = partition
                this.resources = {
                    cpu: resourceCPU,
                    memory: resourceMemory,
                    pods: resourceInstance,
                    requestStorage: resourceHd
                }
            },
            onNumberChange(value, key) {
                value = parseInt(value)
                value = value ? value : key === 'requestStorage' ? 0 : 1
                value = value <= this.resources[key] ? value : this.resources[key]
                this.form[key] = value
            }
        }
    }
</script>
<style lang="less">
    .resource-form{
        margin: 0 0 20px 24px;
        padding: 20px 20px 10px 0;
        background-color: #ebeef5;
    }
</style>
