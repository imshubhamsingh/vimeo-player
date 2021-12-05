<script lang="ts">
import { defineComponent, PropType, onMounted, ref, watch } from 'vue-demi'
export default defineComponent({
  props: {},
  emits: ['ready'],
  setup(props, { emit }) {},
})
</script>

<template>
  <div ref="playerContainer" />
</template>
