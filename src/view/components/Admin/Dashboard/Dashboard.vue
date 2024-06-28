<template>
  <v-container fluid>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-4">
            <card-view
                title="تعداد کاربران"
                :value="totalUsers"
            />
          </div>
          <div class="col-4">
            <card-view
                title="تعداد سوپروایزرها"
                :value="totalSuperVisors"
            />
          </div>
          <div class="col-4">
            <card-view
                title="دستگاه‌های متصل"
                :value="totalOnlineDevices +' از ' + totalDevices"
            />
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="row">
          <div class="col-12">
            <card-view
                title="میزان رم"
                :value="loadUsages.ram"
                indicator="%">
              <template v-slot:footer>
                <div
                    class="d-block mt-2">
                  <v-progress-linear
                      :value="loadUsages.ram">
                  </v-progress-linear>
                </div>
              </template>
            </card-view>
          </div>
          <div class="col-12">
            <card-view
                title="فضای دیسک"
                :value="loadUsages.disk.percent"
                indicator="%">
              <template v-slot:footer>
                <div
                    class="d-block mt-2">
                  <v-progress-linear
                      :value="loadUsages.disk.percent">
                  </v-progress-linear>
                </div>
              </template>
            </card-view>
          </div>
        </div>
      </div>
      <div class="col-9">
        <cpu-chart
            ref="cpuChart">
        </cpu-chart>
      </div>
    </div>
  </v-container>
</template>

<style scoped>

</style>
<script>
import CardView from "@/view/components/Admin/Dashboard/Widgets/CardView.vue";
import CpuChart from "@/view/components/Admin/Dashboard/Widgets/Charts/CpuChart.vue";
import Vue from "vue";

export default {
  name: 'Dashboard',
  components: {CpuChart, CardView},
  data() {
    return {
      loadUsages: {
        ram: 0,
        disk: {
          percent: 0,
          total: 0,
          free: 0,
        },
      },
      totalUsers: 0,
      totalSuperVisors: 0,
      totalDevices: 0,
      totalOnlineDevices: 0,
    }
  },
  async created() {
    this.socketIO.on('DASHBOARD_UPDATE', ({
                                            drive,
                                            cpu,
                                            memory,
                                            totalUsers,
                                            totalSupervisors,
                                            totalDevices,
                                            totalOnlineDevices
                                          }) => {
      this.$refs.cpuChart.update(cpu);
      this.loadUsages.ram = memory.usedPercent
      this.loadUsages.disk.total = drive.totalUsedAllDrives;
      this.loadUsages.disk.free = drive.freeAllDrives;
      this.loadUsages.disk.percent = drive.usedPercent;
      this.totalUsers = totalUsers;
      this.totalDevices = totalDevices;
      this.totalOnlineDevices = totalOnlineDevices;
      this.totalSuperVisors = totalSupervisors;
    })
  },
  destroyed() {
    this.socketIO.off('DASHBOARD_UPDATE')
  }
}

</script>