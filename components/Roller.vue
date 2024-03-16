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
        <li v-for="[type, group] in handFormatted">
          {{ group.length }}d{{ type }}
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

  const emit = defineEmits(['firstRoll'])

  /** Last roll grouped by dice type */
  const useLastRoll = useState<rollMultiNat>('lastRoll')

  /** Pull of all possible dice */
  const diceArr: Set<die> = new Set([4, 6, 8, 10, 12, 20])
	/** All die picked by hand by descending order */
  const hand = ref<die[]>([])
  /** Hand die grouped by descending order */
  const handFormatted = computed<Map<die, die[]>>(() => {
    // NOTE: vscode highlights .groupBy()
    return Map.groupBy(hand.value, (val: die) => val)
  })
  /** User has advantage/disadvantage on a d20 rolls */
  const oneFromMulti = reactive({
    adv: false,
    dis: false,
  })

  /** Roll all die picked by hand */
  const RollHand = () => {
    const result = rollResult(handFormatted.value, oneFromMulti)
    useLastRoll.value = result
    emit('firstRoll')
  }

  /** Add dice to hand in descending order */
	const AddDice = (dice: die) => {
    /** Last element that is greater than dice to be added */
    const lastIndex = hand.value.findLastIndex(pickedDice => pickedDice > dice)
    /** Insert dice right after last greater picked dice */
    hand.value.splice(lastIndex + 1, 0, dice)
	}
</script>
