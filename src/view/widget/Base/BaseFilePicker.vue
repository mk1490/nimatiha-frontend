<template>
  <div class="width-100">
    <div class="d-block">
      <v-file-input
          @change="$emit('input', $event)"
          @keyup="$emit('keyup', model)"
          @keydown="$emit('keydown', model)"
          @click:clear="$emit('click:clear')"
          @focusin="$emit('focusin')"
          @focusout="$emit('focusout')"
          :label="label"
          :type="type"
          v-bind="$attrs"
          v-on="$listeners"
          :disabled="disabled"
          :readonly="readonly"
          :rules="rules"
          :suffix="suffix"
          :prefix="prefix"
          :clearable="clearable"
          :prepend-icon="prependIcon"
          :append-icon="appendIcon"
          :append-outer-icon="appendOuterIcon"
          :prepend-inner-icon="prependInnerIcon"
          @click:append="$emit('click:append')"
          :hide-details="finalHideDetails"
          v-model="model"
          outlined
          dense>
        <template v-slot:label>
          <div class="required--symbol">
            {{ label }}
            <small v-if="requiredSymbol">*</small>
          </div>
        </template>

      </v-file-input>
    </div>
    <div
        v-if="description"
        dir="rtl"
        class="d-block description">
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseFilePicker",
  emits: ['click:append', '@click:clear', 'focusin', 'focusout'],
  created() {
    if (this.value) {
      this.model = new File([], this.value, {type: 'image/jpeg'})
    }
  },
  computed: {
    finalHideDetails() {
      if (!this.hideDetails) {
        return false
      } else if (this.rules && this.rules.length > 0) {
        return 'auto';
      }
      return true;
    }
  },
  props: {
    value: undefined,
    max: undefined,
    vBind: undefined,
    vOn: undefined,
    label: String,
    description: String,
    suffix: String,
    prefix: String,
    prependIcon: String,
    appendIcon: String,
    appendOuterIcon: String,
    prependInnerIcon: String,
    rules: Array,
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: true
    },
    hideDetails: {
      type: undefined,
      default: true,
    },
    requiredSymbol: {
      type: Boolean,
      default: false,
    },
    readonly: Boolean,
    type: undefined,
  },
  data() {
    return {
      model: null,
    }
  },
}
</script>

<style scoped>
.description {
  font-family: VazirmatnUIFD;
  margin-top: 3px;
  margin-inline: .5rem;
}
</style>
