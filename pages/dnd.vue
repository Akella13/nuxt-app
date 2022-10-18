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
  </section>
</template>

<script setup lang="ts">
  definePageMeta({
    title: 'Dice roller'
  })

  /** Array of all possible dice */
  const diceArr = useState<number[]>('diceArr', () => [4, 6, 8, 10, 12, 20])

  /** Random result of a die roll */
  const RollDie = (sides: number) => Math.round(Math.random()*(sides - 1)) + 1

  const DieButtonHandler = (die: number) => {
    console.log(RollDie(die))
  }
</script>
