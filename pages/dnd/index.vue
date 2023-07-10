<template>
  <section>
    <Stats />

    <article>
      <h3>Choose your dice:</h3>
      <ul>
        <li v-for="dice in diceArr">
          <button @click="hand.push(dice)">
            d{{ dice }}
          </button>
        </li>
      </ul>
      <div>
        <h4>With this roll, do you have</h4>
        <label>
          Advantage
          <input type="checkbox" v-model="oneFromMulti.adv" value="adv">
        </label>
        <label>
          Disadvantage
          <input type="checkbox" v-model="oneFromMulti.dis" value="dis">
        </label>
      </div>
      <div v-if="hand.length > 0">
        <h4>Hand:</h4>
        <ul>
          <li v-for="dice in hand">
            d{{ dice }}
          </li>
        </ul>
        <button @click="RollHand">Roll it!</button>
        <button @click="hand = []">Clear hand</button>
      </div>
    </article>

    <History v-if="rollHistory.length"
      :roll-history="rollHistory"
    />
  </section>
</template>

<script setup lang="ts">
  import type {
    die,
    crit,
    roll ,
    rollMulti,
  } from '~~/types'
  import type {
    dieSet,
  } from './types'
  import { rollDie, whatAdv, selectRoll } from '~/utils/index'

  definePageMeta({
    title: 'Dice roller'
  })

  /** Pull of all possible dice */
  const diceArr: dieSet = new Set([4, 6, 8, 10, 12, 20])
  /** Array of dice roll results */
  const rollHistory = useState<rollMulti[]>('rollHistory', () => [])
  /** All die picked by hand */
  const hand = useState<die[]>('hand', () => [])
  // TODO: it should be 0 by default
  /** Modifier selected by user */
  const mod = useState<number>('mod')
  /** User has advantage/disadvantage on a d20 rolls */
  const oneFromMulti = reactive({
    adv: false,
    dis: false,
  })

  /** Roll all die picked by hand */
  const RollHand = () => {
    /** What kind of d20 roll is this */
    const haveAdv = whatAdv(oneFromMulti)

    /** All d20s picked by hand */
    let d20s: number[] = []
    /** Sum of natural rolls by hand */
    let totalNat = 0
    /** Result of rolling all die */
    const rolls: roll[] = hand.value.map(dice => {
      /** Natural result of a single roll */
      const natural = rollDie(dice)
      // REFAC: purify
      totalNat += natural
      /** Critical result of a single d20 roll */
      let critical: crit
      if (dice === 20) {
        // REFAC: purify
        d20s.push(natural)
        if (natural === 1 || natural === 20) {
          // mutate roll: add crit
          critical = natural === 1 ? 'fail' : 'success'
        }
      }
      return {
        dice,
        natural,
        ...(critical && { critical }),
      }
    })

    const d20Result = selectRoll(d20s, haveAdv)

    // push roll object to history
    rollHistory.value.push({
      rolls,
      mod: mod.value,
      totalNat,
      totalDirty: totalNat + mod.value,
      haveAdv,
      d20Result,
    })
  }
</script>