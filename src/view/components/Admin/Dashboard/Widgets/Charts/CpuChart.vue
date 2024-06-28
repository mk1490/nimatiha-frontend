<template>
  <v-card>
    <v-card-title>
      میزان مصرف سی‌پی‌یو ({{ cpuLoad }}%)
    </v-card-title>
    <v-card-text>
      <highcharts
          id="cpuChart"
          :options="cpuChartOptions">
      </highcharts>
    </v-card-text>
  </v-card>
</template>


<script>
import Highcharts from "highcharts/highcharts";
import Vue from "vue";

export default {
  name: 'cpuChart',
  props: {
    data: undefined,
  },
  data() {
    return {
      cpuLoad: 0,
      cpuChartOptions: {
        chart: {
          type: 'area',
          height: '300px',
          fontSize: "1rem",
          style: {
            fontFamily: 'IranSans'
          },
          plotBackgroundColor: '#FFFFFF00',
          plotBorderWidth: 0,
          plotShadow: false,
          styledMode: false,
        },
        title: {
          text: '',
          style: {
            fontFamily: "IranSans",
          }
        },
        tooltip: {
          shared: true,
          useHTML: true,
          headerFormat: '',
          pointFormat: '{series.name}: ' + '<b>{point.y}%</b>',
          footerFormat: '',
          valueDecimals: 1
        },
        legend: {enabled: false},
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0.6).get('rgba')],
              ]
            },
            marker: {
              enabled: false,
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },
        yAxis: {
          max: 100,
          title: {
            enabled: false,
          },
          labels: {
            format: '{text}',
            style: {
              fontSize: '18px'
            }
          }
        },
        xAxis: {
          type: 'datetime',
          labels: {
            style: {
              fontSize: '18px'
            }
          }
        },
        series: [],
      },
      dataArray: [],
    }
  },
  methods: {
    update(data) {
      if (this.dataArray.length == 10) {
        this.dataArray.splice(0, 1);
      }

      this.cpuLoad = parseFloat((100 - data.free).toFixed(1));

      this.dataArray.push([
        new Date().getTime(),
        this.cpuLoad
      ])


      this.$set(this.cpuChartOptions, 'series', [{
        // dataLabels: {
        //   enabled: true
        // },
        name: 'Cpu',
        data: this.dataArray
      }])
    }
  },
}
</script>

<style scoped>

::v-deep .highcharts-credits {
  visibility: hidden !important;;
}

:deep .highcharts-background {
  fill: none !important;
}

.theme--dark :deep .highcharts-axis-labels text {
  fill: white !important;
}

</style>