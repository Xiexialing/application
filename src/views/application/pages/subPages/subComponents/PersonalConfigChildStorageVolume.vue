<template>
    <div>
        <el-form size="small" label-width="100px" :model="form" @keydown.native.enter.prevent>
<!--            <p>添加卷</p>-->
<!--            <el-form-item label="类型">-->
<!--                <el-select v-model="form.type">-->
<!--                    <el-option value="storageClass" label="storageClass"/>-->
<!--                    <el-option value="emptyDir" label="临时卷"/>-->
<!--                </el-select>-->
<!--            </el-form-item>-->
<!--            <template v-if="form.type === 'storageClass'">-->
<!--                <el-form-item label="存储名称">-->
<!--                    <el-input v-model="form.name"/>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="storageClass">-->
<!--                    <el-select v-model="form.storageClass" :transfer="true">-->
<!--                        <el-option v-for="(item,index) in storageClassNameList" :key="index" :value="item.metadata.name"-->
<!--                                   :label="item.metadata.name"/>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item :label="$t('labels.accessPattern')">-->
<!--                    <el-radio-group v-model="storageClass.accessModes">-->
<!--                        <el-radio label="ReadWriteOnce">Single User (RWO)</el-radio>-->
<!--                        <el-radio label="ReadWriteMany">Shared Access (RWX)</el-radio>-->
<!--                        <el-radio label="ReadOnlyMany">Read Only (ROX)</el-radio>-->
<!--                    </el-radio-group>-->
<!--                </el-form-item>-->
<!--                <el-form-item :label="$t('tableHeaders.capacity')" class="is-required">-->
<!--                    <el-input v-model="storageClass.storage" style="width: 60%" placeholder="请输入正整数">-->
<!--                        <el-select v-model="storageClass.unit" slot="append" style="width: 70px">-->
<!--                            <el-option value="Mi">MiB</el-option>-->
<!--                            <el-option value="Gi">GiB</el-option>-->
<!--                            <el-option value="Ti">TiB</el-option>-->
<!--                            <el-option value="M">MB</el-option>-->
<!--                            <el-option value="G">GB</el-option>-->
<!--                            <el-option value="T">TB</el-option>-->
<!--                        </el-select>-->
<!--                    </el-input>-->
<!--                </el-form-item>-->
<!--            </template>-->
<!--            <div v-else>-->
<!--                <el-form-item label="卷名">-->
<!--                    <el-input class="cfg-text" v-model="storageClass.name"></el-input>-->
<!--                    <i class="tip" v-if="storageClass.type=='emptyDir'">临时卷第一次添加，卷名必填</i>-->
<!--                </el-form-item>-->
<!--                <el-form-item class="is-required" :label="$t('labels.volume_mountname')">-->
<!--                    <el-input class="cfg-text" v-model="storageClass.mountName"></el-input>-->
<!--                    <i class="tip">{{$t('msg.VolumeM_tip')}}</i>-->
<!--                </el-form-item>-->
<!--            </div>-->
<!--            <el-form-item :label="$t('labels.innerPath')" class="is-required">-->
<!--                <el-input class="cfg-text" v-model="storageClass.path"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item :label="$t('labels.sub_path')">-->
<!--                <el-input class="cfg-text" v-model="storageClass.subPath"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="">-->
<!--                <el-button class="cfg-btn" :disabled="!condition.edit" type="primary" @click="addStorageClass()">-->
<!--                    {{$t('buttons.createAdd')}}-->
<!--                </el-button>-->
<!--            </el-form-item>-->
            <el-form-item label="存储类型">
                <el-select v-model="form.type" >
                    <el-option value="share" label="共享卷"/>
                    <el-option value="local" label="临时卷"/>
                    <el-option value="logs" label="日志"/>
                    <el-option value="NAS" label="NAS"/>
                </el-select>
            </el-form-item>
            <el-form-item label="卷名">
                <el-input v-model="form.name"/>
                <i>存储卷，同一类型第一次添加，卷名必填</i>
            </el-form-item>
            <el-form-item label="卷名">
                <el-select v-model="form.name">
                    <el-option v-for="(item,index) in nameList"
                               :key="index"
                               :label="item.name"
                               :value="item.name"/>
                </el-select>
            </el-form-item>
            <el-form-item label="存储名称">
                <el-select v-model="form.configVolumesMountPath" :transfer="true">
                    <el-option v-for="(item,index) in []"
                               :key="index"
                               :value="item.metadata.name"
                               :label="item.metadata.name + ' - ' + item.spec.resources.requests.storage + ' - ' + item.spec.accessModes[0] + ' - ' + item.status.phase"/>
                </el-select>
            </el-form-item>
            <el-form-item label="容器内路径">
                <el-input v-model="form.path"/>
            </el-form-item>
            <el-form-item label="子路径">
                <el-input v-model="form.subPath"/>
            </el-form-item>
            <el-form-item label="挂载卷名">
                <el-input v-model="form.mountName"/>
                <i>如填写卷名，挂载卷名必须与卷名一致，如没填写卷名，挂载卷名必须是已添加的卷名</i>
            </el-form-item>
            <el-form-item label="">
                <el-button>添加</el-button>
            </el-form-item>
        </el-form>
        <p class="heading">管理卷</p>
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
                storageClassNameList: [],
                nameList: [],
                form: {

                },
                columns: [
                    {
                        label: '存储名称',
                        prop: 'name'
                    },
                    {
                        label: '容器内路径',
                        prop: 'port'
                    },
                    {
                        label: '子路径',
                        prop: 'protocol'
                    },
                    {
                        label: '卷名',
                        prop: 'protocol'
                    },
                    {
                        label: '挂载卷名',
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
