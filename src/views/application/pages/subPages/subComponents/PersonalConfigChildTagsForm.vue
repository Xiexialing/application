<template>
    <el-card>
        <el-form ref="form"
                 :model="form"
                 inline
                 size="small">
            <el-form-item>
               <el-input placeholder="key"/>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="value"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">添加</el-button>
            </el-form-item>
        </el-form>
        <div>
           <span>dasdads</span>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "PersonalConfigChildTagsForm",
        data() {
            return {
                form: {}
            }
        }
    }
</script>

<style scoped>

</style>
