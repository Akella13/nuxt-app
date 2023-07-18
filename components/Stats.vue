<template>
  <h2>Dice roller</h2>
  <fieldset>
    <legend>Select Modifier:</legend>
    <span v-if="pending">
      Loading ...
    </span>
    <ul v-else>
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
    <button v-show="mod !== 0"
      @click="mod = 0"
    >
      Reset modifier
    </button>
  </fieldset>
</template>

<script setup lang="ts">
  import { calcMod } from '~/utils/index'

  // Pull stats from localStorage
  // if there are none, fetch from api
  /** Array of characteristics and their values */
  const { pending, data: stats } = await useFetch('/api/stats', { lazy: true })
  // write them to localStorage

  /** Modifier selected by user */
  const mod = useState('mod', () => 0)

  /** Stat selecting by user */
  const StatSelectHandler = (x: number) => {
    // change mod depending on a stat
    mod.value = calcMod(x)
  }
</script>