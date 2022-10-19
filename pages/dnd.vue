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
    <h3 v-if="rollHistory.length > 0">
      Your last roll: {{ rollHistory[rollHistory.length - 1] }}
    </h3>
  </section>
</template>

<script setup lang="ts">
  definePageMeta({
    title: 'Dice roller'
  })

  /** Array of all possible dice */
  const diceArr = useState<number[]>('diceArr', () => [4, 6, 8, 10, 12, 20])
  /** Array of dice roll results */
  const rollHistory = useState<number[]>('rollHistory', () => [])

  /** Random result of a die roll */
  const rollDie = (sides: number) => Math.round(Math.random()*(sides - 1)) + 1

  /** Handle specific die roll button */
  const DieButtonHandler = (die: number) => {
    rollHistory.value.push(rollDie(die))
  }
</script>
