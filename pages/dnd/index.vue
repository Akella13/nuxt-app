<template>
  <section>
    <Stats />

    <Roller @roll="UpdateHistory" />

    <History v-if="rollHistory.length"
      :roll-history="rollHistory"
    />
  </section>
</template>

<script setup lang="ts">
  import type { rollMultiDirty, rollMultiNat } from '~~/types'

  definePageMeta({
    title: 'Dice roller'
  })

  /** Array of dice roll results */
  const rollHistory = useState<rollMultiDirty[]>('rollHistory', () => [])
  // TODO: it should be 0 by default
  /** Modifier selected by user */
  const mod = useState<number>('mod')

  const UpdateHistory = (payload: rollMultiNat) => {
    rollHistory.value.push({
      ...payload,
      mod: mod.value,
      totalDirty: payload.totalNat + mod.value,
    })
  }
</script>