<template>
  <v-breadcrumbs
    class="hidden-sm-and-down"
    :items="levelList"
    divider="/"
  >
    <template v-slot:item="props">
      <a
          class="white--text"
          @click.prevent="handleLink(props.item)">
        {{ generateTitle(props.item.meta.title) }}
      </a>
    </template>
  </v-breadcrumbs>
</template>

<script>
const pathToRegexp = require('path');

export default {
  name: 'AppBreadcrumbs',
  data: () => ({
    levelList: null,
  }),
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    generateTitle(title) {
      const hasKey = this.$te(`${title}`);
      if (hasKey) {
        const translatedTitle = this.$t(`${title}`);
        return translatedTitle;
      }
      return title;
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name);

      const first = matched[0];
      if (first && first.name.trim().toLocaleLowerCase() !== 'dashboard') {
        matched = [{ path: '/dashboard', meta: { title: 'route.dashboard' } }].concat(matched);
      }

      this.levelList = matched.filter((item) => item.meta
        && item.meta.title && item.meta.breadcrumb !== false);
    },
    pathCompile(path) {
      const { params } = this.$route;
      const toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      console.groupCollapsed('handleLink');
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
      console.groupEnd();
    },
  },
};
</script>
