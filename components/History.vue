<template>
  <div>
    <h3>Your last roll:</h3>
    <Sprite style="display: none" />
    <div v-if="lastRoll">
      <ul>
        <li v-for="[dice, group] in lastRoll"
          :key="dice"
        >
        <h4>d{{ dice }}</h4>
        <ul>
          <li v-for="(roll, index) in group.rolls"
            :key="index"
          >
            <Vector :dice="dice"
              :value="roll.natural" 
            />
            <b v-if="roll.critical">
              Critical {{ roll.critical }}!
            </b>
          </li>
        </ul>
        <p>
          <span>{{ group.mod >= 0 ? '+' : '' }}</span>
          <span>{{ group.mod }}</span>
          <span> = {{ group.totalDirty }}</span>
        </p>
        <!-- <p v-if="group.d20Result && group.haveAdv">
          {{ group.haveAdv }} on d20:
          {{ group.d20Result }}
        </p> -->
        </li>
      </ul>
    </div>
  </div>
  
  <details>
    <summary>Roll log</summary>
    <table>
      <thead>
        <th>Roll order</th>
        <th>Roll group</th>
      </thead>
      <tbody>
        <tr v-for="(rolledHand, index) in rollHistory"
          :key="index"
        >
          <td>{{ rollHistory.length - index }}</td>
          <td>
            <thead>
              <th>Dice</th>
              <th>Naturals</th>
              <th>Modifier</th>
              <th>Total</th>
            </thead>
            <tbody>
              <tr v-for="[dice, group] in rolledHand">
                <td>d{{ dice }}</td>
                <td>
                  <tr v-for="roll in group.rolls">
                    <td>{{ roll.natural }}</td>
                  </tr>
                </td>
                <td>{{ group.mod }}</td>
                <td>{{ group.totalDirty }}</td>
              </tr>
            </tbody>
          </td>
        </tr>
      </tbody>
    </table>
  </details>
</template>

<script lang="ts" setup>
  import type {
    rollMultiNat,
    rollMultiDirty,
    diceMap,
  } from '~~/types'
  import Sprite from '~~/assets/icons/Die.svg'
  import Vector from '~~/components/Vector.vue'

  /** Last roll object */
  const useLastRoll = useState<diceMap<rollMultiNat>>('lastRoll')
  /** Modifier selected by user */
  const useMod = useState<number>('mod')

  /** Last roll object with fields for rendering */
  const lastRoll = ref<diceMap<rollMultiDirty>>()
  /** History of all rolls */
  const rollHistory = ref<diceMap<rollMultiDirty>[]>([])

  // computed will re-evaluate if mod changes => $watch only one dependency change
  watch(useLastRoll, newValue => {
    const writableMap: diceMap<rollMultiDirty> = new Map()
    /** Roll object mutated with fields for rendering */
    newValue.forEach((group, diceType) => {
      writableMap.set(diceType, {
        ...group,
        mod: useMod.value,
        totalDirty: group.totalNat + useMod.value,
      })
    })
    // update local state lastRoll
    lastRoll.value = writableMap
    rollHistory.value.unshift(writableMap)
  },
  // triggering $watch right after component mounts
  { immediate: true })
</script>

<style>
  table, th, td {
    border: 1px solid;
  }
</style>