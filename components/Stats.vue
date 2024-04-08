<template>
  <fieldset>
    <legend>Select Modifier:</legend>
    <span v-show="stats.length === 0">
      Fetching stats ...
    </span>

    <form @submit.prevent="SaveStats">
      <ul>
        <li v-for="({ name, value }, index) in stats">
          <label>
            <!-- HACK: v-model cannot be used on v-for scope vars -->
            <input v-if="statsEditable"
              v-model="stats[index].value"
              type="number"
              min="0"
              max="20"
            >
            <template v-else>
              <input type="radio"
                name="stat"
                :value="value"
                @change="mod = calcMod(value)"
              >
              <b>{{ value }}</b>
            </template>
            {{ name }}
          </label>
        </li>
      </ul>
      <button v-if="statsEditable"
        type="submit"
      >
        Save
      </button>
      <button v-else
        @click="statsEditable = true"
      >
        Edit stats
      </button>
    </form>

    <h3>Your modifier: {{ mod }}</h3>
    <button v-show="mod !== 0"
      @click="ResetMod"
    >
      Reset modifier
    </button>
  </fieldset>
</template>

<script setup lang="ts">
  const stats = useLocalStorageOrApi<{
    name: string,
    value: number,
  }[]>('stats')

  /** Modifier selected by user */
  const mod = useState('mod', () => 0)
  
  /** Set mod equal to 0 */
  const ResetMod = () => {
    mod.value = 0
  }

  /** Allows of stats editing */
  const statsEditable = ref(false)

  /** Save current value of stats to localStorage */
  const SaveStats = () => {
    localStorage.setItem('stats', JSON.stringify(stats.value))
    ResetMod()
    statsEditable.value = false
  }
</script>