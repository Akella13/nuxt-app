<template>
  <article>
    <h3 class="heading">Choose your dice:</h3>

    <ul>
      <li v-for="dice in diceSet">
        <button @click="AddDice(dice)">
          d{{ dice }}
        </button>
      </li>
    </ul>

    <h4 class="heading">Choose their color:</h4>
    <input type="color" v-model="diceColor">

    <div>
      <h4 class="heading">With this roll, do you have</h4>
      <label>
        Advantage
        <input type="checkbox"
          v-model="oneFromMulti.adv"
          :value="advBook.adv"
        >
      </label>
      <label>
        Disadvantage
        <input type="checkbox"
          v-model="oneFromMulti.dis"
          :value="advBook.dis"
        >
      </label>
    </div>

    <div v-if="hand.length > 0">
      <h4 class="heading">Hand:</h4>
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

<script setup lang="ts">
  import type {
    die,
    rollMultiNat,
    diceMap,
  } from '~~/types'

  const emit = defineEmits(['firstRoll'])

  /** Last roll grouped by dice type */
  const useLastRoll = useState<diceMap<rollMultiNat>>('lastRoll')

  /** Pull of all possible dice */
  const diceSet = new Set(diceArr)
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

  /** Color picked by user */
  const diceColor = useState('diceColor', () => defaultColor)

  /** Roll all die picked by hand */
  const RollHand = () => {
    useLastRoll.value = rollResult(handFormatted.value, oneFromMulti)
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
