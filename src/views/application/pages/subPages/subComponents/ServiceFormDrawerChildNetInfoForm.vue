<template>
    <el-form ref="form"
             label-width="90px"
             :model="form"
             :rules="rules"
             size="small">
        <el-form-item label="网络模式">
            <el-radio-group :value="form.hostNetwork">
                <el-radio :label="0" @click.native.prevent="onHostNetworkClick(0)">主机网络</el-radio>
                <el-radio :label="1" @click.native.prevent="onHostNetworkClick(1)" v-if="isFabricNetworkType">自定义网络
                </el-radio>  <!--自定义网络只有在网络用Fabric时显示，用于预约服务IP-->
            </el-radio-group>
        </el-form-item>
        <template v-if="form.hostNetwork === 1">
            <el-form-item label="选择网络">
                <el-radio-group v-model="form.net">
                    <el-radio label="default">default</el-radio>
                    <el-radio label="net1">网络1</el-radio>
                    <el-radio label="net2">网络2</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="固定IP">
                <el-select v-model="form.networkIps" multiple placeholder="请选择IP">
                    <el-option v-for="(networkIp, index) in networkIpList"
                               :key="index"
                               :label="networkIp.ip"
                               :value="networkIp.ip"/>
                </el-select>
            </el-form-item>
        </template>
    </el-form>
</template>

<script>
    export default {
        name: "NetInfoForm",
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
            form: {
                type: Object,
                default() {
                    return {
                        clusterId: 5,
                        hostNetwork: 0,
                        net: 'default',
                        networkIps: ''
                    }
                }
            }
        },
        computed: {
            isFabricNetworkType() {
                let {clusterId} = this.form
                let {clusterList} = this
                console.log(clusterId)
                if (clusterId) {
                    return clusterList.find(cluster => cluster.clusterId === clusterId).networkType === 'fabric'
                }
                return false
            }
        },
        data() {
            return {
                networkIpList: [],
                rules: {}
            }
        },
        methods: {
            onHostNetworkClick(val) {
                let {hostNetwork} = this.form
                if (hostNetwork === val) {
                    this.form.hostNetwork = ''
                } else {
                    this.form.hostNetwork = val
                }
            },
            getNetworkIps() {
                this.networkIpList = []
                let {clusterId, net} = this.form
                let {clusterList} = this
                let cluster = clusterList.find(cluster => cluster.clusterId === clusterId)
                let params = {
                    masterIp: cluster.serviceIp,
                    name: net
                }
                this.$http.getFreeIp(params).then((res) => {
                    let {code, ipslist} = res.data
                    if (code === 0 && ipslist) {
                        this.networkIpList = ipslist
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
