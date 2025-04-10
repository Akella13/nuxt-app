<template>
  <div>
    <h3>Your last roll:</h3>
    <Sprite style="display: none" />
    <div v-if="lastRoll">
      <ul>
        <li v-for="[dice, group] in lastRoll"
          :key="dice"
        >
          <h4>d{{ dice }}s</h4>
          <ul class="item__container">
            <li v-for="({ natural, critical }) in group.rolls"
              class="item"
            >
              <Vector :dice="dice"
                :value="natural" 
              />
              <p v-if="critical"
                class="item__caption"
              >
                Critical {{ critical }}!
              </p>
            </li>
          </ul>
          <p v-if="group.adv">
            {{ AdvRender(group.adv) }}
          </p>
          <p>
            <span>{{ group.mod >= 0 ? '+' : '' }}</span>
            <span>{{ group.mod }}</span>
            <span> = {{ group.totalDirty }}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
  
  <details>
    <summary>Roll log</summary>
    <table>
      <thead>
        <tr>
          <th>Roll order</th>
          <th>Roll group</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rolledHand, index) in rollHistory"
          :key="index"
        >
          <td>{{ rollHistory.length - index }}</td>
          <td>
            <table>
              <thead>
                <tr>
                  <th>Dice</th>
                  <th>Naturals</th>
                  <th>Modifier</th>
                  <th>Total</th>
                </tr>
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
                  <td v-if="typeof group.totalDirty === 'number'">
                    {{ group.totalDirty }}
                  </td>
                  <td v-else>
                    <tr v-for="dirtyRoll in group.totalDirty">
                      <td>{{ dirtyRoll }}</td>
                    </tr>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </details>
</template>

<script setup lang="ts">
  import type {
    rollMultiNat,
    rollMultiDirty,
    diceMap,
    adv,
    total,
  } from '~~/types'
  import Sprite from '~~/assets/icons/Die.svg'

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
      let totalDirty: total
      if (typeof group.totalNat === 'number') {
        totalDirty = group.totalNat + useMod.value
      } else {
        totalDirty = group.totalNat.map(x => x + useMod.value)
      }
      writableMap.set(diceType, {
        ...group,
        mod: useMod.value,
        totalDirty,
      })
    })
    // update local state lastRoll
    lastRoll.value = writableMap
    rollHistory.value.unshift(writableMap)
  },
  // triggering $watch right after component mounts
  { immediate: true })

  /** Render value of advantage message */
  const AdvRender = (adv: adv) => {
    switch (adv) {
      case advBook.adv:
        return 'Roll with advantage:'
      case advBook.dis:
        return 'Roll with disadvantage:'
      default:
        return 'Straight roll:'
    }
  }
</script>

<style lang="scss" scoped>
  table, th, td {
    border: 1px solid;
  }

  .item {
    display: inline-block;
    margin: 0 0 3em 0;
    position: relative;

    &__container {
      padding: unset;
    }

    &__caption {
      margin: unset;
      position: absolute;
      font-weight: map-get($font-weights, "bold");
      text-align: center;
    }
  }
</style>