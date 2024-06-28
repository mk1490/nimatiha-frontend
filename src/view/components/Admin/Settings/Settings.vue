<template>
    <v-container fluid>
        <base-card-layout title="تنظیمات">
            <div class="row">
                <div class="col-auto">
                    <v-tabs
                            v-model="tab"
                            vertical>
                        <v-tab v-if="checkPermission('settings.general_update')">
                            تنظیمات عمومی
                        </v-tab>
                        <v-tab v-if="checkPermission('settings.influxdb_update')">
                            تنظیمات Broker
                        </v-tab>
                        <v-tab v-if="checkPermission('settings.broker_update')">
                            تنظیمات InfluxDb
                        </v-tab>

                    </v-tabs>
                </div>
                <div class="col">
                    <v-window
                            v-model="tab">
                        <v-window-item
                            v-if="checkPermission('settings.general_update')">
                            <general-settings v-model="model.general"/>
                        </v-window-item>
                        <v-window-item v-if="checkPermission('settings.influxdb_update')">
                            <broker-settings v-model="model.broker"/>
                        </v-window-item>
                        <v-window-item v-if="checkPermission('settings.broker_update')">
                            <influx-settings v-model="model.influxDbApiKey "/>
                        </v-window-item>
                    </v-window>
                </div>
            </div>
            <template v-slot:actions>
                <v-spacer/>
                <v-btn
                        @click="updateSettings"
                        color="primary">
                    ذخیره
                </v-btn>
            </template>
        </base-card-layout>
    </v-container>
</template>

<script>
import BaseCardLayout from "@/view/widget/Base/BaseCardLayout.vue";
import InfluxSettings from "@/view/components/Admin/Settings/Components/InfluxSettings.vue";
import BrokerSettings from "@/view/components/Admin/Settings/Components/BrokerSettings.vue";
import GeneralSettings from "@/view/components/Admin/Settings/Components/GeneralSettings.vue";

export default {
    name: "Settings",
    components: {GeneralSettings, BrokerSettings, InfluxSettings, BaseCardLayout},
    data() {
        return {
            tab: 0,
            model: {
                broker: {},
                influxDbApiKey: {},
                general: {
                    otpTimeout: 0,
                }
            }
        }
    },
    async created() {
        const [err, data] = await this.to(this.http.get(`/settings/initialize`));
        if (!err) {
            this.model.broker.emqxApiSecret = data.brokerApiSecret;
            this.model.broker.emqxApiKey = data.brokerApiKey;
            this.model.influxDbApiKey = data.influxDbApiKey;
            this.model.general.otpTimeout = data.otpTimeout;
            this.model.influxDbApiKey = data.influxDbApiKey;
        }
    },
    methods: {
        async updateSettings() {
            const [err, data] = await this.to(this.http.put(`/settings`, {
                influxDbApiKey: this.model.influxDbApiKey,
                brokerApiKey: this.model.broker.emqxApiKey,
                brokerApiSecret: this.model.broker.emqxApiSecret,
                otpTimeout: this.model.general.otpTimeout
            }));
            if (!err) {

            }
        }
    }
}
</script>

<style scoped>

</style>