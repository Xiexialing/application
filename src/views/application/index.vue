<template>
  <el-card>
    <div slot="header" class="clearfix">
      <QueryForm @addEvent="onAdd"
                 @submitEvent="onSubmit"/>
    </div>
    <QueryTable :dataSource="list" :total="0"/>
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
            desc: '这里是一段描述这里是一段描述',
            actions: [
              {
                label: '发布',
                click: (row) => {
                  console.log('发布' + JSON.stringify(row))
                }
              },
              {
                label: '修改',
                click: (row) => {
                  console.log('修改' + JSON.stringify(row))
                }
              },
              {
                label: '删除',
                click: (row) => {
                  console.log('删除' + JSON.stringify(row))
                }
              }
            ]
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
            desc: '这里是一段描述这里是一段描述',
            actions: [
              {
                label: '发布',
                click: (row) => {
                  console.log('发布' + JSON.stringify(row))
                }
              },
              {
                label: '修改',
                click: (row) => {
                  console.log('修改' + JSON.stringify(row))
                }
              },
              {
                label: '删除',
                click: (row) => {
                  console.log('删除' + JSON.stringify(row))
                }
              }
            ]
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
            desc: '这里是一段描述这里是一段描述',
            actions: [
              {
                label: '发布',
                click: (row) => {
                  console.log('发布' + JSON.stringify(row))
                }
              },
              {
                label: '修改',
                click: (row) => {
                  console.log('修改' + JSON.stringify(row))
                }
              },
              {
                label: '删除',
                click: (row) => {
                  console.log('删除' + JSON.stringify(row))
                }
              }
            ]
          }
        ]
      }
    },
    methods: {
      onAdd() {
        this.$router.push('/addStepOne')
      },
      onSubmit(query) {
        console.log(query)
      }
    },
    components: {
      QueryForm,
      QueryTable
    }
  }
</script>

<style scoped>

</style>
