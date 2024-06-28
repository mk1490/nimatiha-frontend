<template>
  <v-card>
    <v-card-text class="text-center">
      <div class="d-block">
        <h1>{{ title }}</h1>
      </div>
      <div class="d-block mt-4">
        <h2>{{ indicator }}{{ value }}</h2>
      </div>

      <slot name="footer">
      </slot>
    </v-card-text>
  </v-card>
</template>


<script>
export default {
  name: 'cardView',
  props: {
    title: String,
    value: undefined,
    indicator: undefined,
  }
}


</script>

<style scoped>
.theme--dark h1, h2 {
  color: #fff !important;
}

.theme--light h1, .theme--light h2 {
  color: #000 !important;
}

h2 {
  font-family: Iransans;
}
</style>