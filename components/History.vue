<template>
  <div>
    <h3>Your last roll:</h3>
    <Sprite style="display: none" />
    <div v-if="lastRoll">
      <ul>
        <li v-for="(roll, index) in lastRoll.rolls"
          :key="index"
        >
          <i>d{{ roll.dice }}</i>:
          <Vector :dice="roll.dice"
            :value="roll.natural" 
          />
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
        <tr v-for="(rollMulti, index) in rollHistory"
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
    rollMultiDirty,
    rollMultiNat,
  } from '~~/types'
  import Sprite from '~~/assets/icons/Die.svg'
  import Vector from '~~/components/Vector.vue'

  /** Last roll object */
  const useLastRoll = useState<rollMultiNat>('lastRoll')
  /** Modifier selected by user */
  const useMod = useState<number>('mod')

  /** Last roll object with fields for rendering */
  const lastRoll = ref<rollMultiDirty>()
  /** History of all rolls */
  const rollHistory = ref<rollMultiDirty[]>([])

  // computed will re-evaluate if mod changes => $watch only one dependency change
  watch(useLastRoll, newValue => {
    /** Roll object mutated with fields for rendering */
    const rollToAdd: rollMultiDirty = {
      ...newValue,
      mod: useMod.value,
      totalDirty: newValue.totalNat + useMod.value,
    }
    // update local state lastRoll
    lastRoll.value = rollToAdd
    rollHistory.value.unshift(rollToAdd)
  },
  // triggering $watch right after component mounts
  { immediate: true })
</script>