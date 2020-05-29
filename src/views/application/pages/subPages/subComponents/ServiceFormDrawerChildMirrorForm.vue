<template>
    <el-form ref="form"
             label-width="90px"
             :model="form"
             :rules="rules"
             size="small">
        <el-form-item label="选择仓库">
            <el-select v-model="form.registryId">
                <el-option v-for="(registry ,index) in registryList"
                           :key="index"
                           :disabled="registry.status === 2"
                           :label="registry.warehouseName"
                           :value="registry.warehouseId"/>
            </el-select>
        </el-form-item>
        <el-form-item label="选择目录">
            <el-select v-model="form.name">
                <el-option label="1111" value="1111"/>
                <el-option label="2222" value="2222"/>
            </el-select>
        </el-form-item>
        <el-form-item label="选择镜像">
            <el-select v-model="form.image">
                <el-option v-for="(image ,index) in imageList"
                           :key="index"
                           :label="image.imageName"
                           :value="image.imageName"/>
            </el-select>
        </el-form-item>
        <el-form-item label="选择版本">
            <el-select v-model="form.imgVersion">
                <el-option v-for="(image ,index) in versionList"
                           :key="index"
                           :label="image.imageTag"
                           :value="image.imageTag"/>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "ServiceFormDrawerChildMirrorForm",
        props: {
            form: {
                type: Object,
                default() {
                    return {
                        registryId: '',
                        image: '',
                        imgVersion: ''
                    }
                }
            }
        },
        data() {
            return {
                registryList: [],
                imageList: [],
                versionList: [],
                rules: {}
            }
        }
    }
</script>

<style scoped>

</style>
