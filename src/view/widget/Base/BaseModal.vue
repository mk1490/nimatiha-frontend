<template>
  <v-dialog
      scrollable
      v-model="visible"
      persistent
      :fullscreen="fullScreen"
      :width="width">
    <v-card>
      <v-card-title v-if="!!title">
        <div class="row">
          <div class="col">

            <v-btn
                large
                class="ml-2"
                icon
                @click="closeOrBack"
                v-if="fullScreen">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
            <div class="d-inline-block">
              {{ title }}
              <div
                  v-if="subTitle"
                  class="d-block">
                <h6 class="v-card__subtitle pa-0">
                  {{ subTitle }}
                </h6>
              </div>

            </div>
          </div>

          <div class="col-auto">
            <slot name="toolbar-action"></slot>
          </div>
        </div>
      </v-card-title>

      <v-card-text>
        <slot name="container-outside"></slot>
        <v-container fluid>
          <slot></slot>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <slot name="footerAboveActionsArea"></slot>
      </v-card-actions>
      <v-card-actions v-if="fullScreen === false">
        <div class="d-inline-flex" :style="{'width': blockCloseButton ? '100%' : ''}">
          <v-btn
              :block="blockCloseButton"
              color="red"
              text
              @click="closeOrBack">
            {{ backButtonText }}
          </v-btn>
          <slot name="footer-cancel-area">
          </slot>
        </div>
        <v-spacer/>
        <div class="d-inline-flex">
          <slot name="footer-submit-area-prepend">

          </slot>
          <v-btn
              v-if="hideSubmitButton === false"
              @click="submitOrNext()"
              :disabled="submitDisabled"
              :width="submitWidth"
              color="primary">
            {{ nextButtonText }}
          </v-btn>
          <slot name="footer-submit-area">

          </slot>
        </div>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
export default {
  name: "BaseModal",
  emits: ['submit', 'submitOrNext', 'close', 'closeOrBack'],
  mounted() {
    this.nextButtonText = this.submitText || this.$t('ui.submit');
    this.backButtonText = this.backText || this.$t('ui.cancel');
  },
  data() {
    return {
      nextButtonText: null,
      backButtonText: null,
    }
  },
  props: {
    title: String,
    subTitle: String,
    fullScreen: {
      type: Boolean,
      default: false,
    },
    width: {
      type: undefined,
      default: 500,
    },
    submitText: String,
    backText: String,
    visible: Boolean,
    hideSubmitButton: {
      type: Boolean,
      default: false
    },
    blockCloseButton: {
      type: Boolean,
      default: false
    },
    submitDisabled: {
      type: Boolean,
      default: false
    },
    submitWidth: {
      type: Number,
      default: undefined,
    },
  },
  methods: {
    submitOrNext() {
      this.$emit('submit');
      this.$emit('submitOrNext');
    },
    closeOrBack() {
      this.$emit('close')
      this.$emit('closeOrBack')
    },
    setNextButtonText(text) {
      if (!text) {
        this.nextButtonText = this.$t('ui.submit');
      } else {
        this.nextButtonText = text;
      }
    },
    setBackButtonText(text) {
      if (!text) {
        this.backButtonText = this.$t('ui.cancel');
      } else {
        this.backButtonText = text;
      }
    }
  },
  watch: {
    'submitText': {
      handler(value) {
        this.setNextButtonText(value);
      }
    },
    'backText': {
      handler(value) {
        this.setBackButtonText(value);
      }
    }
  }
}
</script>

<style scoped>

</style>
