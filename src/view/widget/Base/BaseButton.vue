<script>
export default {
  name: "BaseButton",
  props: {
    label: String,
    icon: String,
    text: Boolean,
    small: Boolean,
    buttonIsIcon: Boolean,
    color: {
      default: 'primary',
      type: String,
    },
    block: {
      default: false,
      type: Boolean,
    },
    menuItems: Array,
  }
}
</script>

<template>
  <div>
    <v-menu
        v-if="menuItems && menuItems.length > 0"
        top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            v-bind="attrs"
            v-on="on"
            :icon="buttonIsIcon"
            :text="text"
            :small="small"
            :block="block"
            :color="color">
          <v-icon>
            mdi-chevron-down
          </v-icon>
          {{ label }}
          <slot>
          </slot>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
            @click="item.click(item)"
            v-for="item in menuItems">
          <v-list-item-icon v-if="item.icon">
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
        v-if="!menuItems"
        v-bind="$attrs"
        v-on="$listeners"
        :block="block"
        :text="text"
        :small="small"
        class="white--text"
        :color="color">
      <v-icon v-if="icon">
        {{ icon }}
      </v-icon>
      {{ label }}
      <slot>
      </slot>
    </v-btn>
  </div>
</template>

<style scoped>

</style>
