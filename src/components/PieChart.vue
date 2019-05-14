<template>
  <div>
    <div class="container">
      <div class="flank">
      </div>
      <div class="middle">
        <h2>{{ country }}</h2>
      </div>
    </div>
    <div class="container">
      <table class="flank">
        <tr v-for="(item, index) in haplogroups_data">
          <td class="index_col">
            {{ haplogroups[index] }}
          </td>
          <transition-group name="list" tag="td">
          <td v-bind:key="item" class="list-item">
                {{ item }}
          </td>
        </transition-group>
        </tr>
      </transition-group>
      </table>
      <div id="chart" class="middle">
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'PieChart',
  data() {
    return {
      width: 360,
      height: 360,
      radius: 180,
      viz: {
        svg: undefined,
        path: undefined,
        pie: undefined,
        arc: undefined,
        scale: undefined,
        tooltip: undefined
      }
    }
  },
  created() {
    this.generate_Scale()
  },
  mounted() {
    this.generate_Pie_layout()
    this.create_Arc()
    this.generate_Svg()
  },
  updated() {
    if (this.viz.path == undefined) {
      this.create_Pie()
    } else {
      this.update_Pie()
    }
  },
  computed: {
      country() {
        return this.$store.state.selectedCountry
      },
      haplogroups_data() {
        return this.$store.state.countryData
      },
      haplogroups() {
        return this.$store.state.data.haplogroups
      }
  },
  methods: {
    generate_Scale: function() {
      this.viz.scale = d3.scaleOrdinal().range(['#42966A', '#0C3462', '#3D98C7', '#F39C39', '#C3271A', '#666666', '#44952A', '#2B6319', '#C16A3F', '#60350E', '#EC4968', '#8933F5']);
    },
    generate_Svg: function() {
      var vm = this
      this.viz.svg = d3.select('#chart')
        .append('svg')
        .attr('width', vm.width)
        .attr('height', vm.height)
        .append('g').classed('pie', true)
        .attr('transform', 'translate(' + (vm.width / 2) +
          ',' + (vm.height / 2) + ')');

      this.viz.tooltip = d3.select('#chart')
        .append('div')
        .classed('tooltip', true)
        .style('display', 'none')
        .style('background-color', 'grey')
    },
    generate_Pie_layout: function() {
      this.viz.pie = d3.pie()
        .value(function(d) { return d; })
        .sort(null);
    },
    create_Arc: function() {
      var vm = this
      this.viz.arc = d3.arc()
        .innerRadius(0)
        .outerRadius(vm.radius);
    },
    create_Pie: function() {
      var vm = this
      this.viz.path = vm.viz.svg.selectAll('path')
        .data(vm.viz.pie(vm.haplogroups_data))
        .enter()
        .append('path')
        .classed('slice', true)
        .attr('d', vm.viz.arc)
        .attr('fill', function(d, i) {
          return vm.viz.scale(i);
        })

    },
    update_Pie: function() {
      this.generate_Pie_layout()
      var vm = this
      console.log(vm.viz.pie(vm.haplogroups_data))
      vm.viz.svg.selectAll('.slice')
        .data(vm.viz.pie(vm.haplogroups_data))
        .transition()
        .duration(800)
        .attr('d', vm.viz.arc)
        .attr('fill', function(d, i) {
          return vm.viz.scale(i)
        })
    },
    destroy_Svg: function() {
      d3.select('#chart').select('svg').remove();
    }
  }
}

</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
.container h2 {
  text-align: center;
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

.container {
  display: flex;
  flex-direction: row;
}

.flank {
  width: 25%;
}

.index_col {
  font-weight: bold;
}

.middle {
  margin-top: 2em;
  width: 50%;
}
.list-item {
  margin:0;
  padding:0;
}
.list-enter-active, .list-leave-active {
  transition: all 0.8s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
