<template>
  <section>
    <Stats />
    <!-- HACK: '?url' option enable nuxt to find correct path to asset -->
    <!-- <img src="@/assets/icons/Die.svg?url"> -->
    <!-- <SvgoDie :font-controlled="false" filled /> -->

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
  /** Modifier selected by user */
  const mod = useState<number>('mod')

  /** Add roll to roll history */
  const UpdateHistory = (payload: rollMultiNat) => {
    rollHistory.value.push({
      ...payload,
      mod: mod.value,
      totalDirty: payload.totalNat + mod.value,
    })
  }
</script>