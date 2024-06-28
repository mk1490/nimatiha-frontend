<template>
    <v-app-bar
            app
            class="darken-3 toolbar-background"
            dark
            fixed
            flat
            :dense="false"
    >
        <v-app-bar-nav-icon @click.stop="toggleNavbar">
            <v-icon>{{ toggleNavbarIcon }}</v-icon>
        </v-app-bar-nav-icon>
        <div class="d-inline-block">
            <app-date-time></app-date-time>
        </div>
        <v-spacer/>
        <!--        <app-help-button/>-->
        <app-toggle-night-mode/>
        <app-full-screen/>

    </v-app-bar>
</template>

<script>
import {mapGetters} from 'vuex';
import Breadcrumbs from '../widget/AppBreadcrumbs.vue';
import ErrorLog from '../widget/AppErrorLog.vue';
import FullScreen from '../widget/AppFullScreen.vue';
import Localization from '../widget/AppLocalization.vue';
import Notification from '../widget/AppNotification.vue';
import AppDateTime from "@/view/widget/AppDateTime";
import AppSoundAlarmPlay from "@/view/widget/AppSoundAlarmPlay.vue";
import AppToggleNightMode from "@/view/widget/AppToggleNightMode.vue";
import AppFullScreen from "@/view/widget/AppFullScreen.vue";
import AppHelpButton from "@/view/widget/AppHelpButton.vue";

export default {
    name: 'TheLayoutToolbar',
    components: {
        AppHelpButton,
        AppFullScreen,
        AppToggleNightMode,
        AppSoundAlarmPlay,
        AppDateTime,
        FullScreen,
    },
    data: () => ({}),
    computed: {
        ...mapGetters([
            'toolbarDense',
            'navbarShow',
            'panelTitle',
        ]),
        toggleNavbarIcon() {
            return this.navbarShow ? 'mdi-format-indent-decrease' : 'mdi-format-indent-increase';
        },
    },
    methods: {
        toggleNavbar() {
            this.$store.dispatch('NavbarToggle');
        },
    },
};
</script>
<style scoped>
span {
    font-family: IranYekanRegular, serif !important;
}
</style>
