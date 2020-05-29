<template>
    <item-panel class="panel">
        <item v-for="(panel, index) in panels"
              :key="index"
              type='node'
              size='80*48'
              shape='flow-rect'
              :model="panel.model"
              :src="panel.src"/>
    </item-panel>
</template>

<script>
    import {ItemPanel, Item} from 'vg-editor'

    export default {
        name: 'FlowItemPanel',
        data() {
            return {
                panels: [
                    {
                        model: {
                            color: '',
                            name: 'application',
                            label: '应用',
                        },
                        src: require('./images/application.svg')
                    },
                    {
                        model: {
                            color: '',
                            name: 'service',
                            label: '服务',
                        },
                        src: require('./images/service.svg')
                    },
                    {
                        model: {
                            color: '',
                            name: 'component',
                            label: '组件',
                        },
                        src: require('./images/component.svg')
                    }
                ]
            }
        },
        components: {ItemPanel, Item}
    }
</script>
<style lang="less">
    .panel{
        padding-top: 15px;
    }
</style>
