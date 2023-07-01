<template>
  <section>
    <h2>Dice roller</h2>
    <fieldset>
      <legend>Select Modifier:</legend>
      <ul>
        <li v-for="stat in stats">
          <label>
            <input type="radio"
              :value="stat.value"
              name="stat"
              @change="StatSelectHandler(stat.value)"
            >
            {{ stat.value }}
            {{ stat.name }}
          </label>
        </li>
      </ul>
      <h3>Your modifier: {{ mod }}</h3>
    </fieldset>

    <article>
      <h3>Choose your dice:</h3>
      <ul>
        <li v-for="dice in diceArr">
          <button @click="hand.push(dice)">
            d{{ dice }}
          </button>
        </li>
      </ul>
      <div v-if="hand.length > 0">
        <h4>Hand:</h4>
        <ul>
          <li v-for="dice in hand">
            d{{ dice }}
          </li>
        </ul>
        <button @click="RollHand">Roll it!</button>
      </div>
    </article>

    <article v-if="rollHistory.length > 0">
      <div>
        <h3>Your last roll:</h3>
        <ul>
          <li v-for="roll in lastRoll.rolls">
            <i>d{{ roll.dice }}</i>:
            {{ roll.natural }}
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
    </article>
  </section>
</template>

<script setup lang="ts">
  import type { crit, die, dieSet, roll , rollMulti} from './types'
  import { rollDie, calcMod } from '~/utils/index'

  definePageMeta({
    title: 'Dice roller'
  })

  /** Pull of all possible dice */
  const diceArr: dieSet = new Set([4, 6, 8, 10, 12, 20])
  /** Array of dice roll results */
  const rollHistory = useState<rollMulti[]>('rollHistory', () => [])
  /** Last roll result */
  const lastRoll = computed(() => rollHistory.value.at(-1))

  // const tweened = useTweened(lastRoll)
  // /** Tweened value to display */
  // const tweenedNumber = computed(() => Math.round(tweened.number))

  /** All die picked by hand */
  const hand = useState<die[]>('hand', () => [])

  /** Roll all die picked by hand */
  const RollHand = () => {
    /** Sum of natural rolls by hand */
    let totalNat = 0
    /** Result of rolling all die */
    const rolls: roll[] = hand.value.map(dice => {
      /** Natural result of a single roll */
      const natural = rollDie(dice)
      // hack: side effecting to omit excessive cycle
      totalNat += natural
      /** Critical result of a single d20 roll */
      let critical: crit
      if (dice === 20 && (natural === 1 || natural === 20)) {
        // mutate roll: add crit
        critical = natural === 1 ? 'fail' : 'success'
      }
      return {
        dice,
        natural,
        ...(critical && { critical }),
      }
    }) 
    // push roll object to history
    rollHistory.value.push({
      rolls,
      mod: mod.value,
      totalNat,
      totalDirty: totalNat + mod.value,
    })
  }

  /** Array of characteristics and their values */
  const stats = useState('stats', () => [
    {
      name: 'Strength',
      value: 18,
    },
    {
      name: 'Dexterity',
      value: 12,
    },
    {
      name: 'Constitution',
      value: 14,
    },
    {
      name: 'Intelligence',
      value: 8,
    },
    {
      name: 'Wisdom',
      value: 12,
    },
    {
      name: 'Charisma',
      value: 10,
    },
  ])

  /** Modifier selected by user */
  const mod = ref(0)

  /** Stat selecting by user */
  const StatSelectHandler = (x: number) => {
    // change mod depending on stat
    mod.value = calcMod(x)
  }
</script>
