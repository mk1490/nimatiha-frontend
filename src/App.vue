<template>
    <v-app>
        <router-view/>
        <delete-dialog
                ref="deleteDialog">
        </delete-dialog>
        <ProgressDialog :showing="loading"></ProgressDialog>
    </v-app>
</template>
<script>
import {mapGetters} from "vuex";
import Vue from 'vue';
import DeleteDialog from "./view/widget/DeleteDialog";
import ProgressDialog from "@/view/widget/ProgressDialog";
import {Subject} from "rxjs";
import tus from "tus-js-client";
import vuex from "@/store";

export default {
    async created() {
        Vue.prototype.deleteModal = this.$refs.delete;

        Vue.prototype.changeTenantEvent = new Subject();

        this.changeTenantEvent.subscribe(async (data) => {
            this.tenantId = data;
            await this.initializeData();
        })

        await this.initializeData();

        this.$store.subscribe(async (mutation) => {
            switch (mutation.type) {
                case 'LOGOUT':
                    await this.logout();
                    break;
            }
        });



        this.updateTitle()



    },
    name: 'App',
    components: {ProgressDialog, DeleteDialog},
    async mounted() {
        Vue.prototype.deleteModal = this.$refs.deleteDialog;
    },
    computed: {
        ...mapGetters(['loading', 'isLogin', 'panelTitle', 'companyTitle']),
    },
    data: () => ({
        tenantId: null,
    }),
    watch: {
        'deleteDialog': {
            handler() {
            }
        },
        'isLogin': {
            async handler() {
                await this.checkLogin();
            }
        },
        '$route': {
            handler() {
                this.updateTitle()
            }
        }
    },
    methods: {
        async logout() {
        },
        async checkLogin() {
            return // TODO
        },
        async initializeData() {
            const [err, data] = await this.to(this.http.get(this.serverAddress + `/api/enduser/core/initialize/${this.tenantId}`, {
                tenantDomainName: null,
            }));
            if (!err) {
                await this.$store.dispatch('setInitializeData', data);
            }
        },
        updateTitle() {
            // document.title = this.panelTitle + (!!this.companyTitle ? (' | ' + this.companyTitle) : '') + (this.$route.meta.title ? (' - ' + this.$t(this.$route.meta.title)) : '');
        }
    },
};
</script>
