<template>
  <div class="v-application--wrap">
    <the-layout-drawer/>
    <the-layout-toolbar/>
    <the-layout-content/>
    <the-layout-fab/>
    <the-layout-to-top-fab/>
  </div>
</template>

<script>
import TheLayoutDrawer from './TheLayoutDrawer.vue';
import TheLayoutToolbar from './TheLayoutToolbar.vue';
import TheLayoutContent from './TheLayoutContent.vue';
import TheLayoutFab from './TheLayoutFab.vue';
import TheLayoutToTopFab from './TheLayoutToTopFab.vue';
import TheLayoutFooter from './TheLayoutFooter.vue';
import Vue from "vue";

export default {
  async created() {
    const [err, data] = await this.to(this.http.get(this.serverAddress + `/api/auth/initialize`));
    if (!err) {
      this.$store.commit('SET_USER_INFO', data);
    }
  },
  name: 'TheLayout',
  components: {
    TheLayoutDrawer,
    TheLayoutToolbar,
    TheLayoutContent,
    TheLayoutFab,
    TheLayoutToTopFab,
    TheLayoutFooter,
  }
};
</script>
