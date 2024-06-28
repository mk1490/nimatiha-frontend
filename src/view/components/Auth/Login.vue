<template>
  <v-container class="container--fluid pa-0" style="height: 100%;">
    <div class="background"></div>
    <div class="content fill-height">
      <v-layout
          fill-height
          align-center justify-center>
        <div class="d-inline-block">

          <div class="d-flex justify-center mt-8">
            <v-card
                light
                class="elevation-3"
                :width="!!companyLogo ?800: 500">
              <v-card-title class="d-flex justify-center text-center">
                <div class="d-inline-block">
                  <h2>
                    پنل مدیریت سامانه نیمکتی‌ها
                  </h2>
                </div>
                <div class="justify-center text-center text-wrap mt-3">
                  <span>برای ورود به حساب کاربری، نام کاربری و کلمۀ عبور خود را وارد نمایید.</span>
                </div>
              </v-card-title>

              <v-card-text>
                <div class="row mt-1">
                  <div class="col">
                    <div class="d-block">
                      <v-form
                          dir="ltr"
                          ref="form"
                          lazy-validation>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                                clearable
                                class="text-center"
                                hide-details="auto"
                                dense
                                maxlength="50"
                                outlined
                                v-model="model.username"
                                :label="$t('authentication.username')"
                            />
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                                class="text-center"
                                dense
                                maxlength="50"
                                outlined
                                :type="passwordVisible? 'normal': 'password'"
                                :append-icon="passwordVisible? 'mdi-eye-off': 'mdi-eye'"
                                @click:append="passwordVisible =!passwordVisible"
                                hide-details="auto"
                                dir="ltr"
                                v-model="model.password"
                                :label="$t('authentication.password')"
                            />
                          </v-col>
                        </v-row>
                      </v-form>
                    </div>

                    <div class="d-block mt-6">
                      <v-btn
                          @click="login"
                          color="green"
                          class="col-12 white--text"
                          block>
                        {{ $t('authentication.login') }}
                      </v-btn>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>

        </div>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Login",
  computed: {
    ...mapGetters(['companyLogo'])
  },
  async created() {
    if (await (this.$store.dispatch('isAuth'))) {
      await this.$router.push('/');
    }
  },
  data() {
    return {
      passwordVisible: false,
      changeTenantModal: {
        visible: false
      },
      model: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    async login() {
      const [err, data] = await this.to(this.http.post(this.serverAddress + `/api/auth/login`, this.model));
      if (!err) {
        localStorage.setItem('Authorization', data.access_token);
        await this.$store.dispatch('setSessionId', data.sessionId)
        await this.$router.push('/');
      } else {
        await this.$store.dispatch('setSessionId', null)
      }
    }
  }
}
</script>

<style scoped>
span {
  font-family: "IranSans";
  font-size: 1.3rem;;
}


.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
