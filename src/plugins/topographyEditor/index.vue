<!--
    拓扑图编辑器插件
-->
<template>
    <v-g-editor class="topology-editor-container" ref="vGEditor">
        <div class="topology-editor-chart">
            <div class="topology-editor-chart__header">
                <flow-toolbar/>
            </div>
            <div class="topology-editor-chart__container">
                <div class="topology-editor-chart__sidebar">
                    <flow-item-panel/>
                </div>
                <div class="topology-editor-chart__main">
                    <flow :data="flowChartData"
                          :onNodeDoubleClick="onNodeDoubleClick"
                          :graph="{ mode: 'readOnly' }"/>
                </div>
                <div class="topology-editor-chart__panel">
                    <flow-detail-panel/>
                    <editor-minimap/>
                </div>
            </div>
            <button @click="read">读取数据</button>
            <button @click="update">修改数据</button>
        </div>
    </v-g-editor>
</template>

<script>
    import { omit } from 'lodash'
    import './Icon/iconfont'
    import VGEditor, {Flow} from 'vg-editor'
    import {FlowToolbar} from './EditorToolbar'
    import {FlowItemPanel} from './EditorItemPanel'
    import {FlowDetailPanel} from './EditorDetailPanel'
    import EditorMinimap from './EditorMinimap'

    export default {
        name: "index",
        methods: {
            onNodeDoubleClick(e) {
               this.$emit('nodeDoubleClickEvent', e.item.model)
            },
            read() {
                console.log(this.$refs.vGEditor.propsAPI.save())
            },
            update() {
                setTimeout(() => {
                    let {propsAPI} = this.$refs.vGEditor
                    const { getSelected, executeCommand, update } = propsAPI
                    const item = getSelected()[0]
                    if (!item) return
                    let model = getSelected()[0].getModel()
                    model = Object.assign({}, { shape: 'flow-smooth'}, model, {label: 'xiexialing' })
                    executeCommand(() => {
                        update(item, { ...omit(model, 'children') })
                    })
                }, 0)
            }
        },
        data() {
            return {
                flowChartData: {
                    'nodes': []
                }
            }
        },
        components: {
            VGEditor,
            Flow,
            FlowToolbar,
            FlowItemPanel,
            FlowDetailPanel,
            EditorMinimap
        }
    }
</script>

<style scoped lang="less">
    .topology-editor-container {
        .topology-editor-chart {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;

            &__header {
                border: 1px solid #e6e9ed;
                padding: 8px;
            }

            &__container {
                height: 500px;
                display: flex;
            }

            &__sidebar {
                width: 150px;
                background-color: #fafafa;
                border-right: 1px solid #e6e9ed;
                display: flex;
                justify-content: center;
            }

            &__panel {
                width: 16.6666%;
                background-color: #fafafa;
                border-left: 1px solid #e6e9ed;
            }

            &__main {
                flex: 1;
                background:url("../../assets/canvas-bg.jpg") 100% 100%;
            }
        }
    }
</style>
