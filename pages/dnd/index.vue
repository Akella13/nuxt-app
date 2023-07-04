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
        <p v-if="lastRoll.d20Result && lastRoll.haveAdv">
          {{ lastRoll.haveAdv }} on d20:
          {{ lastRoll.d20Result }}
        </p>
        <li v-for="tween in tweened">
          {{ tween.number }}
        </li>
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
  import type {
    crit,
    die,
    dieSet,
    roll ,
    rollMulti,
    adv,
  } from './types'
  import { rollDie } from '~/utils/index'

  definePageMeta({
    title: 'Dice roller'
  })

  /** Pull of all possible dice */
  const diceArr: dieSet = new Set([4, 6, 8, 10, 12, 20])
  /** Array of dice roll results */
  const rollHistory = useState<rollMulti[]>('rollHistory', () => [])
  /** Last roll result */
  const lastRoll = computed(() => rollHistory.value.at(-1))
  /** User has advantage/disadvantage on a d20 rolls */
  const oneFromMulti = useState('oneFromMulti', () => ({
    adv: false,
    dis: false,
  }))

  // const tweenedNumbers = lastRoll?.value?.rolls?.map(useTweened)
  const tweened = useTweened(lastRoll)
  // /** Tweened value to display */
  // const tweenedNumber = computed(() => Math.round(tweened.number))

  /** All die picked by hand */
  const hand = useState<die[]>('hand', () => [])

  /** Roll all die picked by hand */
  const RollHand = () => {
    // REFAC: extract haveAdv to a function
    /** What kind of d20 roll is this */
    let haveAdv: adv
    if (oneFromMulti.value.adv && oneFromMulti.value.dis) {
      haveAdv = 'straight'
    } else if (oneFromMulti.value.adv) {
      haveAdv = 'adv'
    } else if (oneFromMulti.value.dis) {
      haveAdv = 'dis'
    } else {
      haveAdv = 'straight'
    }

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

    // REFAC: extract d20Result to a function
    const d20Result = d20s.reduce((prev, cur, ind, arr) => {
      // first loop
      if (prev === undefined) {
        return cur
      }
      // next loops
      if (haveAdv === 'adv') {
        if (cur > prev) {
          return cur
        }
        return prev
      } else if (haveAdv === 'dis') {
        if (cur < prev) {
          return cur
        }
        return prev
      } else {
        return arr
      }
    }, undefined)

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

    /** Modifier selected by user */
    const mod = useState<number>('mod')
</script>
