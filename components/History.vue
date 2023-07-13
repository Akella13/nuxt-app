<template>
  <div>
    <h3>Your last roll:</h3>
    <ul>
      <li v-for="(roll, index) in lastRoll.rolls" :key="index">
        <i>d{{ roll.dice }}</i>:
        {{ RollAnimated(index) }}
        <b v-if="roll.critical">
          Critical {{ roll.critical }}!
        </b>
      </li>
    </ul>
    <p>
      <span>{{ lastRoll.mod >= 0 ? '+' : '' }}</span>
      <span>{{ lastRoll.mod }}</span>
      <span> = {{ lastRoll.totalDirty }}</span>
    </p>
    <p v-if="lastRoll.d20Result && lastRoll.haveAdv">
      {{ lastRoll.haveAdv }} on d20:
      {{ lastRoll.d20Result }}
    </p>
  </div>
  <details>
    <summary>Roll log</summary>
    <table>
      <thead>
        <th>Die</th>
        <th>Naturals</th>
        <th>Modifier</th>
        <th>Total</th>
      </thead>
      <tbody>
        <tr v-for="(rollMulti, index) in [...rollHistory].reverse()" :key="index">
          <td colspan="2">
            <tr v-for="roll in rollMulti.rolls">
              <td>d{{ roll.dice }}</td>
              <td>{{ roll.natural }}</td>
            </tr>
          </td>
          <td>{{ rollMulti.mod }}</td>
          <td>{{ rollMulti.totalDirty }}</td>
        </tr>
      </tbody>
    </table>
  </details>
</template>

<script lang="ts" setup>
  import type {
    rollMultiDirty,
  } from '~~/types'

  const props = defineProps<{
    rollHistory: rollMultiDirty[],
  }>()

  /** Last roll result */
  const lastRoll = computed(() => props.rollHistory.at(-1))
  /** Array of tweened natural last roll numbers */
  const tweened = useTweened(lastRoll)

  /** Polished number of a single roll for render */
  const RollAnimated = (index: number) => {
    return tweened[index]?.number?.toFixed(0)
  }
</script>