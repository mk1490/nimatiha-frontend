<script>
export default {
  name: "General",
  props: {
    initialize: Object,
  },
  data() {
    return {
      accessPermissionRuleItems: [],
      model: {
        name: null,
        family: null,
        roleId: null,
        username: null,
        password: null,
        selectedRules: [],
      },
      rules: {
        name: [v => !!v || 'ورود نام اجباری است.'],
        family: [v => !!v || 'ورود نام خانوادگی اجباری است.'],
        username: [v => !!v || 'ورود نام کاربری اجباری است.'],
        password: [v => !!v || 'ورود کلمۀ عبور اجباری است.'],
        selectedRules: [],
      },
    }
  }
}
</script>

<template>
  <v-container>
    <v-form
        ref="form"
        lazy-validation>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-12">
              <base-text-field
                  v-model="model.name"
                  :rules="rules.name"
                  required-symbol
                  dense
                  required
                  outlined
                  :label="$t('user.modal.form.name')">
              </base-text-field>
            </div>
            <div class="col-12">
              <base-text-field
                  v-model="model.family"
                  :rules="rules.family"
                  required-symbol
                  dense
                  required
                  outlined
                  :label="$t('user.modal.form.family')">
              </base-text-field>
            </div>
            <div class="col-12">
              <base-text-field
                  dir="ltr"
                  v-model="model.username"
                  :rules="rules.username"
                  required-symbol
                  dense
                  required
                  outlined
                  :label="$t('user.modal.form.username')">
              </base-text-field>
            </div>
            <div
                class="col-12">
              <base-text-field
                  dir="ltr"
                  v-model="model.password"
                  required-symbol
                  :rules="rules.password"
                  dense
                  required
                  outlined
                  :label="$t('user.modal.form.password')">
              </base-text-field>
            </div>
          </div>
        </div>
      </div>
    </v-form>
  </v-container>
</template>

<style scoped>

</style>