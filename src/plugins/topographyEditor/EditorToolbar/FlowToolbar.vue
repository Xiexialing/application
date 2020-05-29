<template>
  <toolbar class='toolbar'>
    <toolbar-button command="undo" title="撤销"/>
    <toolbar-button command="redo" title="恢复"/>
    <toolbar-button command="copy" title="复制"/>
    <toolbar-button command="paste" title="粘贴"/>
    <toolbar-button command="delete" title="删除"/>
    <toolbar-button command="zoomIn" icon="zoom-in" title="放大" />
    <toolbar-button command="zoomOut" icon="zoom-out" title="缩小" />
    <toolbar-button command="resetZoom" icon="actual-size" title="大小重置" />
    <toolbar-button command="multiSelect" icon="multi-select" title="多选" />
    <toolbar-button command="addGroup" icon="group" title="分组" />
    <toolbar-button command="unGroup" icon="ungroup" title="取消分组" />
  </toolbar>
</template>

<script>
import { Toolbar } from 'vg-editor'
import ToolbarButton from './ToolbarButton'
import './style.less'

export default {
  name: 'FlowToolbar',

  components: {
    Toolbar,
    ToolbarButton
  }
}
</script>
