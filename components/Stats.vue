<template>
  <h2>Dice roller</h2>
  <fieldset>
    <legend>Select Modifier:</legend>
    <span v-show="stats.length === 0">
      Loading ...
    </span>
    <ul>
      <li v-for="{ name, value } in stats">
        <label>
          <input type="radio"
            name="stat"
            :value="value"
            @change="mod = calcMod(value)"
          >
          <b>{{ value }}</b>
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
  const stats = useLocalStorageOrApi('stats')

  /** Modifier selected by user */
  const mod = useState('mod', () => 0)
</script>