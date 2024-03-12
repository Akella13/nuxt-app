<template>
  <div>
    <h3>Your last roll:</h3>
    <Sprite style="display: none" />
    <ul>
      <li v-for="group in lastRollGrouped"
        :key="group[0]"
      >
        <ul>
          <li v-for="(roll, index) in group[1]"
            :key="`${roll.dice}-${index}`"
          >
            <i>d{{ roll.dice }}</i>:
            <!-- BUG: RollAnimated returns undefined -->
            <Vector :dice="roll.dice"
              :value="RollAnimated(roll.natural)" 
            />
            <b v-if="roll.critical">
              Critical {{ roll.critical }}!
            </b>
          </li>
        </ul>
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
        <tr v-for="(rollMulti, index) in rollHistory.toReversed()"
          :key="index"
        >
          <td colspan="2">
            <tr v-for="roll in rollMulti.rolls">
              <td>d{{ roll.dice }}</td>
              <td>{{ roll.natural }}</td>
            </tr>
          </td>
          <td>{{ rollMulti.mod }}</td>
          <!-- TODO: total should be represented as: total of d20s and a total of damage die -->
          <td>{{ rollMulti.totalDirty }}</td>
        </tr>
      </tbody>
    </table>
  </details>
</template>

<script lang="ts" setup>
  import type {
    roll,
    rollMultiDirty,
  } from '~~/types'
  import Sprite from '~~/assets/icons/Die.svg'
  import Vector from '~~/components/Vector.vue'

  const props = defineProps<{
    rollHistory: rollMultiDirty[],
  }>()

  // HACK: array.at() returns undefined if index < -array.length or index >= array.length
  /** Last roll result */
  const lastRoll = computed(() => props.rollHistory[props.rollHistory.length - 1])
  // TODO: lastRoll should be already grouped to omit extra computations
  /** lastRoll grouped by dice type */
  const lastRollGrouped = computed(() => {
    const rolls = lastRoll.value.rolls
    return Map.groupBy(rolls, (roll: roll) => roll.dice)
  })
  /** Array of tweened natural last roll numbers */
  const tweened = useTweened(lastRoll)

  /** Polished number of a single roll for render */
  const RollAnimated = (index: number) => {
    return tweened[index]?.number?.toFixed(0)
  }
</script>