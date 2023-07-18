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
    <button @click="mod = 0">Reset modifier</button>
  </fieldset>
</template>

<script setup lang="ts">
  import { calcMod } from '~/utils/index'

  /** Array of characteristics and their values */
  const { data: stats } = await useFetch('/api/stats')

  /** Modifier selected by user */
  const mod = useState('mod', () => 0)

  /** Stat selecting by user */
  const StatSelectHandler = (x: number) => {
    // change mod depending on a stat
    mod.value = calcMod(x)
  }
</script>