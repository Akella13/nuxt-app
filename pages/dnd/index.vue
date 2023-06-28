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
              @change="CharSelectHandler(stat.value)"
            >
            {{ stat.value }}
            {{ stat.name }}
          </label>
        </li>
      </ul>
      <h3>Your modifier: {{ mod }}</h3>
    </fieldset>
    <h3>Choose your dice:</h3>
    <ul>
      <li v-for="dice in diceArr">
        <button @click="DiceButtonHandler(dice)">
          d{{ dice }}
        </button>
      </li>
    </ul>
    <article v-if="rollHistory.length > 0">
      <div>
        <h3>
          Your last roll:
          {{ tweenedNumber }} +
          {{ lastRoll.mod }} =
          {{ tweenedNumber + lastRoll.mod }}
        </h3>
        <h4 v-if="lastRoll.dice === 20 && (lastRoll.natural === 1 || lastRoll.natural === 20)">
          Critical {{ lastRoll.natural === 1 ? 'fail' : 'success' }}!
        </h4>
      </div>
      <details>
        <summary>Roll log</summary>
        <table>
          <thead>
            <th>Dice</th>
            <th>Natural</th>
            <th>Modifier</th>
            <th>Total</th>
          </thead>
          <tbody>
            <tr v-for="(roll, index) in [...rollHistory].reverse()" :key="index">
              <td>d{{ roll.dice }}</td>
              <td>{{ roll.natural }}</td>
              <td>{{ roll.mod }}</td>
              <td>{{ roll.dirty }}</td>
            </tr>
          </tbody>
        </table>
      </details>
    </article>
  </section>
</template>

<script setup lang="ts">
  import type { die, dieSet, roll } from './types'
  import { rollDie, calcMod } from '~/utils/index'

  definePageMeta({
    title: 'Dice roller'
  })

  /** Pull of all possible dice */
  const diceArr: dieSet = new Set([4, 6, 8, 10, 12, 20])
  /** Array of dice roll results */
  const rollHistory = useState<roll[]>('rollHistory', () => [])
  /** Last roll object */
  const lastRoll = computed(() => {
    const obj = rollHistory.value.at(-1)
    // if die is d20 and the result is either 1 or 20
    if (obj?.dice === 20 && (obj?.natural === 1 || obj?.natural === 20)) {
      return {
        ...obj,
        critical: obj?.natural === 1 ? 'fail' : 'success',
      } 
    }
    return obj
  })

  const tweened = useTweened(lastRoll)
  /** Tweened value to display */
  const tweenedNumber = computed(() => Math.round(tweened.number))

  /** Handle specific die roll button */
  const DiceButtonHandler = (dice: die) => {
    const natural = rollDie(dice)
    rollHistory.value.push({
      dice,
      natural,
      mod: mod.value,
      dirty: natural + mod.value,
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

  const mod = ref(0)

  const CharSelectHandler = (x: number) => {
    // change mod depending on stat
    mod.value = calcMod(x)
  }
</script>
