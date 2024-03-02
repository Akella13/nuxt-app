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

    <div v-if="hand.length > 0">
      <h4>Hand:</h4>
      <ul>
				<!-- TODO: render only picked die -->
        <li v-for="(dice, index) in diceTower">
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

	/** Add dice to hand */
	const AddDice = (dice: die | string) => {
    // HACK: casting type because keys of and object are strings
    let diceCast = dice
    if (typeof diceCast === 'string') {
      diceCast = Number(dice) as die
    }
		// REFAC combine hand and diceTower into one entity
		hand.value.push(diceCast)
		diceTower.value[diceCast] += 1
	}
</script>
