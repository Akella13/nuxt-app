<template>
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
        <li v-for="[amount, type] in handFormatted.reverse()">
          {{ type }}d{{ amount }}
        </li>
      </ul>
      <button @click="RollHand">Roll it!</button>
      <button @click="hand = []">Clear hand</button>
    </div>

  </article>
</template>

<script lang="ts" setup>
  import type {
    diceTray,
    die,
    rollMultiNat,
  } from '~~/types'
  import { rollResult } from '~/utils/index'

  const emit = defineEmits<{
    roll: [
      rollObj: rollMultiNat,
    ],
  }>()

  /** Pull of all possible dice */
  const diceArr: Set<die> = new Set([4, 6, 8, 10, 12, 20])
	/** All die picked by hand */
  const hand = ref<die[]>([])
  /** Hand die grouped & sorted by descending order */
  const handFormatted = computed(() => {
    /** Object of hand die grouped by type */
    const diceTray = hand.value.reduce((acc: diceTray, val) => {
      // add 1 to amount, else set it to 1
      acc[val] = (acc[val] || 0) + 1
      return acc
    }, {})
    // HACK: v-for renders object by Object.keys() => turn it to array and reverse it
    return Object.entries(diceTray).reverse()
  })
  /** User has advantage/disadvantage on a d20 rolls */
  const oneFromMulti = reactive({
    adv: false,
    dis: false,
  })

  /** Roll all die picked by hand */
  const RollHand = () => {
    /** Hand die sorted by descending order */
    const handSorted = hand.value.sort((i,j) => j - i)
    const payload = rollResult(handSorted, oneFromMulti)
    emit('roll', payload)
  }
</script>
