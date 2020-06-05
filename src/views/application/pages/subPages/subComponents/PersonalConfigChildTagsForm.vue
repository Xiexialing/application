<template>
    <el-card id="tagsForm">
        <el-form ref="form"
                 :model="form"
                 inline
                 size="small">
            <el-form-item>
                <el-input placeholder="key" v-model="form.key"/>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="value" v-model="form.value"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onAdd">添加</el-button>
            </el-form-item>
        </el-form>
        <div>
            <el-tag size="small"
                    class="tag-item"
                    v-for="(item, index) in list"
                    :key="index"
                    closable
                    @close="onClose(index)">{{item.key}}={{item.value}}
            </el-tag>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "PersonalConfigChildTagsForm",
        data() {
            return {
                form: {
                    key: '',
                    value: ''
                },
                list: []
            }
        },
        methods: {
            onAdd() {
                let {key, value} = this.form
                if (this.list.some(item => item.key === key)) {
                    this.$popError('key已存在')
                }
                this.list.push({
                    key,
                    value
                })
            },
            onClose(index) {
                this.list.splice(index, 1)
            },
            getList() {
                return this.list
            }
        }
    }
</script>

<style scoped lang="less">
    #tagsForm {
        .tag-item {
            margin: 5px;
        }
    }
</style>
