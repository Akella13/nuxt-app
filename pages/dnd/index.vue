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
      <h3>Your last roll: {{ tweened.number.toFixed(0) }}</h3>
      <h4 v-if="lastRoll.die === 20 && (lastRoll.result === 1 || lastRoll.result === 20)">
        Critical {{ lastRoll.result === 1 ? 'fail' : 'success' }}!
      </h4>
    </div>
  </section>
</template>

<script setup lang="ts">
  import type { die, dieSet, roll } from './types'
  import gsap from 'gsap'

  definePageMeta({
    title: 'Dice roller'
  })

  /** Pull of all possible dice */
  const diceArr = useState<dieSet>('diceArr', () => new Set([4, 6, 8, 10, 12, 20]))
  /** Array of dice roll results */
  const rollHistory = useState<roll[]>('rollHistory', () => [])
  /** Last roll object */
  const lastRoll = computed(() => {
    const obj = rollHistory.value[rollHistory.value.length - 1]
    // if die is d20 and the result is either 1 or 20
    if (obj?.die === 20 && (obj?.result === 1 || obj?.result === 20)) {
      return {
        ...obj,
        critical: obj?.result === 1 ? 'fail' : 'success',
      } 
    }
    return obj
  })

  // TODO: extract to composable
  const tweened = reactive({
    number: 0
  })

  watch(lastRoll, n => {
    gsap.to(tweened, { duration: 0.5, number: Number(n.result) || 0 })
  })

  /** Random result of a die roll */
  const rollDie = (sides: die) => Math.round(Math.random()*(sides - 1)) + 1

  /** Handle specific die roll button */
  const DieButtonHandler = (die: die) => {
    rollHistory.value.push({
      die,
      result: rollDie(die),
    })
  }
</script>
