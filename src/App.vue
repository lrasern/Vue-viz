<template>
  <div id="app">
    <h1>Visualizing Y-DNA haplogroups of Europe</h1>
    <p>
      In human genetics, a human Y-chromosome DNA haplogroup is a haplogroup defined by mutations in the non-recombining portions of DNA from the Y-chromosome (called Y-DNA). Mutations that are shared by many people are called single-nucleotide polymorphisms (SNPs).

The human Y-chromosome accumulates roughly two mutations per generation. Y-DNA haplogroups represent major branches of the Y-chromosome phylogenetic tree that share hundreds or even thousands of mutations unique to each haplogroup.
    </p>
    <country-selector></country-selector>
  </div>
</template>

<script>

import CountrySelector from './components/CountrySelector.vue'
export default {
  name: 'App',
  components: {
    'country-selector': CountrySelector
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
