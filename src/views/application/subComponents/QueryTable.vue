<template>
    <div>
        <el-table border
                  :data="dataSourceComputed"
                  :span-method="objectSpanMethod"
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
        <div class="text-right">
            <el-pagination :current-page.sync="page.currPageNum"
                           :page-size="page.pageSize"
                           :page-sizes="[10, 20, 30, 40]"
                           layout="total,prev, pager, next,sizes,jumper"
                           :total="total"
                           @current-change="onCurrentChange"
                           @size-change="onSizeChange"
                           size="small"/>
        </div>
    </div>
</template>

<script>
    import CustomRenderComp from '@/components/CustomRenderComp'

    export default {
        name: "QueryTable",
        props: ['dataSource', 'total'],
        data() {
            return {
                page: {
                    currPageNum: 1,
                    pageSize: 10
                },
                columns: [
                    {
                        label: '模板名称',
                        prop: 'tempName'
                    },
                    {
                        label: '应用名称',
                        prop: 'appName'
                    },
                    {
                        label: '服务名称',
                        prop: 'name'
                    },
                    {
                        label: '版本号',
                        prop: 'version',
                        render: (createElement, row) => {
                            let {version, versions} = row
                            return createElement('el-select', {
                                props: {
                                    value: version
                                },
                                on: {
                                    change: (value) => {
                                        row.version = value
                                    }
                                }
                            }, versions.map(item => {
                                return createElement('el-option', {
                                    props: {
                                        label: item,
                                        value: item
                                    }
                                })
                            }))
                        }
                    },
                    {
                        label: '描述',
                        prop: 'desc'
                    },
                    {
                        label: '操作',
                        prop: 'action',
                        render: (createElement, row) => {
                            return createElement('div', [
                                createElement('el-button', {
                                    props: {
                                        type: 'text'
                                    },
                                    on: {
                                        click: () => {
                                            this.$emit('publishEvent', row)
                                        }
                                    }
                                }, '发布'),
                                createElement('el-button', {
                                    props: {
                                        type: 'text'
                                    },
                                    on: {
                                        click: () => {
                                           this.$emit('updateEvent', row)
                                        }
                                    }
                                }, '修改'),
                                createElement('el-button', {
                                    props: {
                                        type: 'text'
                                    },
                                    on: {
                                        click: () => {
                                            this.$emit('deleteEvent', row)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ]
            }
        },
        computed: {
            dataSourceComputed() {
                let arr = []
                this.dataSource.forEach(item => {
                    let {tempName, appName, services, desc, actions} = item
                    let len = services.length
                    arr = arr.concat(
                        services.map((innerItem, index) => {
                            return {
                                ...innerItem,
                                tempName,
                                appName,
                                desc,
                                actions,
                                len: index === 0 ? len : 0 // 合并行的数量
                            }
                        })
                    )
                })
                return arr
            }
        },
        methods: {
            /**
             * 合并行
             * @param row
             * @param columnIndex
             * @returns {{colspan: number, rowspan: *}|{colspan: number, rowspan: number}}
             */
            objectSpanMethod({row, columnIndex}) {
                let {len} = row
                if ([2, 3].indexOf(columnIndex) === -1) {
                    if (len) {
                        return {
                            rowspan: len,
                            colspan: 1
                        }
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        }
                    }
                }
            },
            /**
             * 当前页变化事件
             * @param pageNum
             */
            onCurrentChange(pageNum) {
                this.page.currPageNum = pageNum
                this.$emit('pageChangeEvent', this.page)
            },
            /**
             * 每页数变化事件
             * @param pageSize
             */
            onSizeChange(pageSize) {
                this.page.pageSize = pageSize
                this.$emit('pageChangeEvent', this.page)
            }
        },
        components: {
            CustomRenderComp
        }
    }
</script>

<style scoped lang="less">
    .text-right {
        text-align: right;
    }
</style>
