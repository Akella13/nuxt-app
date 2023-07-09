<template>
  <h2>Dice roller</h2>
  <fieldset>
    <legend>Select Modifier:</legend>
    <ul>
      <li v-for="stat in stats">
        <label>
          <input type="radio"
            :value="stat.value"
            name="stat"
            @change="StatSelectHandler(stat.value)"
          >
          {{ stat.value }}
          {{ stat.name }}
        </label>
      </li>
    </ul>
    <h3>Your modifier: {{ mod }}</h3>
  </fieldset>
</template>

<script setup lang="ts">
  import { calcMod } from '~/utils/index'

  /** Array of characteristics and their values */
  const stats = useState('stats', () => [
    {
      name: 'Strength',
      value: 18,
    },
    {
      name: 'Dexterity',
      value: 12,
    },
    {
      name: 'Constitution',
      value: 14,
    },
    {
      name: 'Intelligence',
      value: 8,
    },
    {
      name: 'Wisdom',
      value: 12,
    },
    {
      name: 'Charisma',
      value: 10,
    },
  ])

  /** Modifier selected by user */
  const mod = useState('mod', () => 0)

  // TODO: Emit aupdated value
  /** Stat selecting by user */
  const StatSelectHandler = (x: number) => {
    // change mod depending on a stat
    mod.value = calcMod(x)
  }
</script>