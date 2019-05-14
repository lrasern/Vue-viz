import Vue from 'vue'
import Vuex from 'vuex'
import Papa from 'papaparse'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    data: {
      countries: [],
      haplogroups: [],
      details: []
    },
    selectedCountry: '',
    countryData: []
  },
  mutations: {
    FETCH_DATA(state, data) {
      state.data.countries = data.map(el => el["Region"])
      state.data.haplogroups = Object.keys(data[1])
      state.data.haplogroups.shift()
      state.data.details = data
    },
    SELECT_COUNTRY(state, payload) {
      state.selectedCountry = payload
    },
    PARSE_COUNTRY_DATA(state, payload) {
      let filtered = state.data.details.filter(el => el["Region"] == payload)[0]
      filtered = Object.keys(filtered).map(function(k) { return filtered[k] });
      filtered.shift()
      state.countryData = filtered
    }
  },
  actions: {
    fetchData({commit}) {
      Papa.parse("/static/data.csv", {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: function(results) {
            commit("FETCH_DATA", results.data)
        }
      });
    }
  }
})
