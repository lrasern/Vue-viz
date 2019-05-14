<template>
  <div id="country-selector">
    <h2>Select a country to see its haplogroup-portions:</h2>
        <select v-model="country">
          <option v-for="option in countries">
            {{ option }}
          </option>
        </select>
      <button type="submit" @click="selectCountry(country)">See chart</button>
    <pie-chart v-if="country"></pie-chart>
  </div>
</template>

<script>
import * as d3 from 'd3'
import PieChart from './PieChart'
export default {
  name: 'CountrySelector',
  data() {
    return {
      country: ''
    }
  },
  computed: {
    countries() {
      return this.$store.state.data.countries
    }
  },
  components: {
    'pie-chart': PieChart
  },
  methods: {
    selectCountry: function(country) {
      this.$store.commit("SELECT_COUNTRY", country)
      this.$store.commit("PARSE_COUNTRY_DATA", country)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#country-selector {
  margin-bottom: 1em;
}
</style>
