<template>
  <section>
    <h2>Dice roller</h2>
    <h3>Choose your die:</h3>
    <ul>
      <li v-for="die in diceArr">
        <button @click="DieButtonHandler(die)">
          d{{ die }}
        </button>
      </li>
    </ul>
    <div v-if="rollHistory.length > 0">
      <h3>Your last roll: {{ rollHistory[rollHistory.length - 1].result }}</h3>
    </div>
  </section>
</template>

<script setup lang="ts">
  import type { die, dieSet, roll } from './types';

  definePageMeta({
    title: 'Dice roller'
  })

  /** Pull of all possible dice */
  const diceArr = useState('diceArr', (): dieSet => new Set([4, 6, 8, 10, 12, 20]))
  /** Array of dice roll results */
  const rollHistory = useState<roll[]>('rollHistory', () => [])

  /** Random result of a die roll */
  const rollDie = (sides: die) => Math.round(Math.random()*(sides - 1)) + 1

  /** Handle specific die roll button */
  const DieButtonHandler = (die: die) => {
    const result = rollDie(die)
    rollHistory.value.push({
      die,
      result,
    })
  }
</script>
