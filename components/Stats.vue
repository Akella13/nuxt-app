<template>
  <h2>Dice roller</h2>
  <fieldset>
    <legend>Select Modifier:</legend>
    <span v-if="status === 'pending'">
      Loading ...
    </span>
    <ul v-else>
      <li v-for="{ name, value } in stats">
        <label>
          <input type="radio"
            :value="value"
            name="stat"
            @change="StatSelectHandler(value)"
          >
          {{ value }}
          {{ name }}
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
  /** Character stats pulled from localStorage */
  const statsLocal = localStorage.getItem('stats')

  /** Client-only request to api */
  const {
    data,
    execute,
    status,
   } = useFetch('/api/stats', {
    lazy: true,
    server: false,
    immediate: false,
  })
  
  /** If stats are not found in localStorage => launch request */
  if (!statsLocal) execute()

  /** Render value of stats */
  const stats = ref(statsLocal ? JSON.parse(statsLocal) : [])
  /** Response received => assign payload both to state & localStorage */
  watch(data, newValue => {
    stats.value = newValue
    localStorage.setItem('stats', JSON.stringify(newValue))
  })

  /** Modifier selected by user */
  const mod = useState('mod', () => 0)

  /** Stat selecting by user */
  const StatSelectHandler = (x: number) => {
    // change mod depending on a stat
    mod.value = calcMod(x)
  }
</script>