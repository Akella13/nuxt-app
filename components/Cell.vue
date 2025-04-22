<template>
  <td v-if="typeof value === 'number'">
    {{ value }}
  </td>
  <td v-else>
    <tr v-for="item in value">
      <td v-if="typeof item === 'number'">
        {{ item }}
      </td>
      <td v-else-if="label">
        {{ item[label] }}
      </td>
      <td v-else>
        Wrong label
      </td>
    </tr>
  </td>
</template>

<script setup lang="ts">
import type { Sign } from '~~/types'

defineProps<{
    value: number | number[] | Sign[],
    label?: string,
  }>()
</script>