<template>
  <article>
    <h3>Choose your dice:</h3>

    <ul>
      <li v-for="(amount, type) in diceTower">
        <button @click="AddDice(type)">
          d{{ type }}
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

    <div v-if="!handEmpty">
      <h4>Hand:</h4>
      <ul>
				<!-- TODO: render only picked die -->
        <li v-for="(dice, index) in diceTower">
          {{ dice }}d{{ index }}
        </li>
      </ul>
      <button @click="RollHand">Roll it!</button>
      <button @click="ClearHand">Clear hand</button>
    </div>

  </article>
</template>

<script lang="ts" setup>
  import type {
    die,
    rollMultiNat,
    diceTray,
  } from '~~/types'
  import { rollResult } from '~/utils/index'

  const emit = defineEmits<{
    roll: [
      rollObj: rollMultiNat,
    ],
  }>()

  /** All posible dice and their amounts */
	const diceTower = ref<diceTray>({
		4: 0,
		6: 0,
		8: 0,
		10: 0,
		12: 0,
		20: 0,
	})
  /** is hand empty of all die */
  const handEmpty = ref(true)
  /** User has advantage/disadvantage on a d20 rolls */
  const oneFromMulti = reactive({
    adv: false,
    dis: false,
  })

  /** Roll all die picked by hand */
  const RollHand = () => {
    const hand: die[] = []
    for (const type in diceTower.value) {
      const typeCast = Number(type) as die
      const amount = diceTower.value[typeCast]
      if (amount > 0) {
        for (let i = 0; i < amount; i++) {
          hand.push(typeCast)
        }
      }
    }
    const payload = rollResult(hand, oneFromMulti)
    emit('roll', payload)
  }

	/** Add dice to hand */
	const AddDice = (dice: die | string) => {
    // HACK: casting type because keys of and object are strings
    let diceCast = Number(dice) as die
		diceTower.value[diceCast] += 1
    handEmpty.value = handEmpty.value && false
	}

  /** Clear hand of all dice */
  const ClearHand = () => {
    handEmpty.value = true
    // reset all dice amounts
    for (const amount in diceTower.value) {
      const amountCast = Number(amount) as die
      diceTower.value[amountCast] = 0
    }
  }
</script>
