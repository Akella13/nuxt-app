<template>
  <article>
    <h3>Choose your dice:</h3>

    <ul>
      <li v-for="dice in diceArr">
        <button @click="AddDice(dice)">
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
				<!-- TODO: render only picked die -->
        <li v-for="(dice, index) in dicePull">
          {{ dice }}d{{ index }}
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

  const emit = defineEmits<{
    roll: [
      rollObj: rollMultiNat,
    ],
  }>()

  /** Pull of all possible dice */
  const diceArr: Set<die> = new Set([4, 6, 8, 10, 12, 20])
	// REFAC: create dicePull from diceArr
  /** All posible dice and their quantities */
	const dicePull = ref({
		4: 0,
		6: 0,
		8: 0,
		10: 0,
		12: 0,
		20: 0,
	})
	/** All die picked by hand */
  const hand = ref<die[]>([])
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

	/** AddDice */
	const AddDice = (dice: die) => {
		// REFAC combine hand and dicePull into one entity
		hand.value.push(dice)
		dicePull.value[dice] += 1
	}
</script>
