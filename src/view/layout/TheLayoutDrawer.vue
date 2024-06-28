<template>
  <v-navigation-drawer
      dark
      fixed
      class="darken-4 navbar-background"
      app
      right
      :value="navbarShow"
      :width="250"
      @input="stateNavbarShow">


    <v-list>
      <!--            <v-list-item class="px-2">-->
      <!--                &lt;!&ndash; &ndash;&gt;-->
      <!--                &lt;!&ndash;        <v-list-item-action>&ndash;&gt;-->
      <!--                &lt;!&ndash;          <v-list-item-action-text class="text-h6">&ndash;&gt;-->
      <!--                &lt;!&ndash;            <v-btn&ndash;&gt;-->
      <!--                &lt;!&ndash;                @click="goToProfile"&ndash;&gt;-->
      <!--                &lt;!&ndash;                small&ndash;&gt;-->
      <!--                &lt;!&ndash;                class="darken-2"&ndash;&gt;-->
      <!--                &lt;!&ndash;                color="yellow">&ndash;&gt;-->
      <!--                &lt;!&ndash;              {{ $t('ui.profile') }}&ndash;&gt;-->
      <!--                &lt;!&ndash;            </v-btn>&ndash;&gt;-->
      <!--                &lt;!&ndash;          </v-list-item-action-text>&ndash;&gt;-->
      <!--                &lt;!&ndash;        </v-list-item-action>&ndash;&gt;-->
      <!--            </v-list-item>-->
      <v-list-item>
        <the-layout-drawer-app-profile>

        </the-layout-drawer-app-profile>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-app-bar
        v-if="navbarLogo"
        :dense="toolbarDense"
        dark
    >
      <v-toolbar-title class="text-center">
        <v-avatar
            size="32px"
            tile
        >
          <img
              src="img/icons/android-icon-36x36.png"
              alt="VVA"
          >
        </v-avatar>
        <span>{{ $t('toolbar.appname') }}</span>
      </v-toolbar-title>
    </v-app-bar>
    <the-layout-drawer-list
        v-if="drawerItemsVisible"
        :dense="navbarDense"
        :routes="navigationItems"
        :icon-show="true"
    />
    <template
        v-if="isLogin"
        v-slot:append>
      <div class="pa-2">
        <v-btn
            @click="logout"
            block
            class="darken-2"
            color="red">
          {{ $t('ui.logout') }}
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import {mapGetters} from 'vuex';
import TheLayoutDrawerList from './TheLayoutDrawerList.vue';
import TheLayoutDrawerAppProfile from "@/view/layout/TheLayoutDrawerAppProfile.vue";
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";

export default {
  name: 'TheLayoutDrawer',
  components: {
    BaseSelect,
    TheLayoutDrawerAppProfile,
    TheLayoutDrawerList,
  },
  async created() {
    this.refreshRoutes();
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'SET_USER_INFO') {
        this.permissions = mutation.payload.roles;
        this.refreshRoutes()
      }
    });
    if (this.permissions.length === 0) {
      // await this.$store.dispatch('initProfile');
    }
  },
  data() {
    return {
      drawerItemsVisible: false,
      permissions: [],
      routes: [],
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'userPermissions',
      'navbarDense',
      'navbarShow',
      'navbarLogo',
      'toolbarDense',
      'avatar',
      'roles',
      'companyTitle',
      'authenticationPageTitle',
    ]),
    navigationItems() {
      this.routes = this.routes.map((f) => {
        f.hasPermission = this.checkHasPermission(f);
        if (f.children) {
          f.children = f.children.map((f) => {
            f.hasPermission = this.checkHasPermission(f);
            return f;
          })
        }
        return f;
      });
      return this.routes;
    }
  },
  methods: {
    stateNavbarShow(state) {
      this.$store.dispatch('NavbarState', {state});
    },
    goToProfile() {
      this.$router.push('/Profile');
    },
    async logout() {
      // const [err, data] = await this.to(this.http.put(this.serverAddress + `/api/auth/logout`));
      // if (!err) {
      await this.$store.dispatch('logout');
      await this.$router.push('/login')
      // }
    },
    checkHasPermission(item) {
      if (typeof item.meta === 'object') {
        if (item.meta.permission) {
          const trueItems = []
          if (Array.isArray(item.meta.permission)) {
            item.meta.permission.map(x => {
              if (this.roles.includes(x) == true) {
                trueItems.push(1);
              }
            })

          } else {
            item.meta.permission.split(',').forEach(x => {
              if (this.roles.includes(x) == true) {
                trueItems.push(1);
              }
            })
          }
          return trueItems.length < 1;
          // return false;
        } else
          return false;
      }
      return false;
    },
    refreshRoutes() {
      this.drawerItemsVisible = false;
      this.routes = this.$router.options.routes;
      setTimeout(() => {
        if (this.routes.length > 0) {
          this.drawerItemsVisible = true;
        }
      }, 10);
    }
  },
};
</script>
