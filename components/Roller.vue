<template>
  <article>
    <h3>Choose your dice:</h3>
    <Vector style="display: none" />
    <svg class="svg">
      <use href="#d4" />
    </svg> 
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
</template>

<script lang="ts" setup>
  import type {
    die,
    rollMultiNat,
  } from '~~/types'
  import { rollResult } from '~/utils/index'
  import Vector from '~~/assets/icons/Die.svg'

  const emit = defineEmits<{
    roll: [rollObj: rollMultiNat],
  }>()

  /** Pull of all possible dice */
  const diceArr: Set<die> = new Set([4, 6, 8, 10, 12, 20])
  /** All die picked by hand */
  const hand = useState<die[]>('hand', () => [])
  /** User has advantage/disadvantage on a d20 rolls */
  const oneFromMulti = reactive({
    adv: false,
    dis: false,
  })

  /** Roll all die picked by hand */
  const RollHand = () => {
    const payload = rollResult(hand.value, oneFromMulti)
    emit('roll', payload)
  }
</script>

<style>
  .svg {
    width: 100px;
    height: 100px;
    stroke: red;
    fill: transparent;
  }
</style>