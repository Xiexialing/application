<template>
    <el-card>
        <div slot="header" class="clearfix">
            <QueryForm @addEvent="onAdd"
                       @submitEvent="onSubmit"/>
        </div>
        <QueryTable :dataSource="list"
                    :total="total"
                    @publishEvent="onPublish"
                    @updateEvent="onUpdate"
                    @deleteEvent="onDelete"
                    @pageChangeEvent="onPageChange"/>
    </el-card>
</template>

<script>
    import QueryForm from './subComponents/QueryForm'
    import QueryTable from './subComponents/QueryTable'

    export default {
        name: "index",
        data() {
            return {
                list: [
                    {
                        tempName: '模板1',
                        appName: 'APP1',
                        services: [
                            {
                                name: 'aaa-213-test154852315',
                                version: 'v1',
                                versions: ['v1', 'v2', 'v3']
                            },
                            {
                                name: 'aaa-213-mmamamam',
                                version: 'v1',
                                versions: ['v1', 'v2', 'v3']
                            },
                            {
                                name: 'aaa-213-asd',
                                version: 'v1',
                                versions: ['v1', 'v2', 'v3']
                            },
                            {
                                name: 'aaa-213-ads',
                                version: 'v1',
                                versions: ['v1', 'v2', 'v3']
                            }
                        ],
                        desc: '这里是一段描述这里是一段描述'
                    },
                    {
                        tempName: '模板2',
                        appName: 'APP2',
                        services: [
                            {
                                name: 'aaa-213-test154852315',
                                version: 'v2',
                                versions: ['v1', 'v2', 'v3']
                            },
                            {
                                name: 'aaa-213-mmamamam',
                                version: 'v2',
                                versions: ['v1', 'v2', 'v3']
                            }
                        ],
                        desc: '这里是一段描述这里是一段描述'
                    },
                    {
                        tempName: '模板3',
                        appName: 'APP3',
                        services: [
                            {
                                name: 'aaa-213-test154852315',
                                version: 'v1',
                                versions: ['v1', 'v2', 'v3']
                            },
                            {
                                name: 'aaa-213-mmamamam',
                                version: 'v1',
                                versions: ['v1', 'v2', 'v3']
                            }
                        ],
                        desc: '这里是一段描述这里是一段描述'
                    }
                ],
                total: 100,
                conditions: null  // 查询的关键字
            }
        },
        methods: {
            onAdd() {
                this.$router.push('/addStepOne')
            },
            /**
             * 发布
             */
            onPublish(row) {
                console.log('onPublish', row)
            },
            onUpdate(row) {
                console.log('onUpdate', row)
            },
            onDelete(row) {
                console.log('onDelete', row)
            },
          /**
           *提交表单
           */
            onSubmit(conditions) {
                this.conditions = conditions
                this.getTemplateList({
                    ...conditions,
                    currPageNum: 1,
                    pageSize: 10
                })
            },
            /**
             * 监听分页变化
             * @param page
             */
            onPageChange(page) {
                this.getTemplateList({
                    ...this.conditions,
                    ...page
                })
            },
            /**
             * 查询列表
             * @param params
             */
            getTemplateList(params) {
                console.log(params)
            }
        },
        mounted() {
            this.onSubmit({templateName: ''})
        },
        components: {
            QueryForm,
            QueryTable
        }
    }
</script>

<style scoped>

</style>
