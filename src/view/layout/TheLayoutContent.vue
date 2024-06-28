<template>
    <v-content>
        <transition
                name="fade-transform"
                mode="out-in"
        >
            <keep-alive>
                <v-container fluid>
                    <v-container
                            v-if="errors.length > 0"
                            fluid>
                        <div class="row">
                            <div
                                    v-for="errorItem in errors"
                                    class="col-12">
                                <v-alert
                                        prominent
                                        color="red"
                                        type="error">
                                    <v-row align="center">
                                        <v-col class="grow">
                                            {{ errorItem.title }}
                                        </v-col>
                                        <v-col
                                                class="shrink">
                                            <v-btn
                                                    @click="goToAction(errorItem.action)"
                                                    color="red" class="darken-4">رفتن به تنظیمات
                                            </v-btn>
                                        </v-col>
                                    </v-row>

                                </v-alert>
                            </div>
                        </div>
                    </v-container>
                    <router-view/>
                </v-container>
            </keep-alive>
        </transition>
    </v-content>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: 'TheLayoutContent',
    data: () => ({}),
    computed: {
        ...mapGetters(['errors'])
    },
    methods: {
        async goToAction(action) {
            switch (action) {
                case 'emqx_settings':
                    await this.$router.push({
                        path: '/Settings',
                    })
                    break;
            }
        }
    }
};
</script>
