<template>
  <detail-panel>
    <!-- vue 2.6.x -->
    <template v-slot="{ status }">
      <group-panel :status="status">
        <detail-form type="group"/>
      </group-panel>
      <multi-panel :status="status"/>
      <canvas-panel :status="status"/>
    </template>
  </detail-panel>
</template>

<script>
import { GroupPanel, MultiPanel, CanvasPanel, DetailPanel } from 'vg-editor'
import DetailForm from './DetailForm'

export default {
  name: 'FlowDetailPanel',
  components: {
    GroupPanel,
    MultiPanel,
    CanvasPanel,
    DetailPanel,
    DetailForm
  }
}
</script>
