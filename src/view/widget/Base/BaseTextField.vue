<template>
  <v-text-field
      :value="value"
      @input="$emit('input', $event)"
      @keyup="$emit('keyup', model)"
      @keydown="$emit('keydown', $event)"
      @click:clear="$emit('click:clear')"
      @focusin="$emit('focusin')"
      @focusout="$emit('focusout')"
      :label="label"
      :type="type"
      :dir="dir"
      v-bind="vBind"
      v-on="vOn"
      :disabled="disabled"
      :readonly="readonly"
      :rules="rules"
      :suffix="suffix"
      :clearable="clearable"
      :prepend-icon="prependIcon"
      :append-icon="appendIcon"
      :append-outer-icon="appendOuterIcon"
      :prepend-inner-icon="prependInnerIcon"
      @click:append="$emit('click:append')"
      :hide-details="rules && rules.length > 0 ? 'auto': ''"
      v-model="model"
      outlined
      dense>
    <template v-slot:label>
      <div class="required--symbol">
        {{ label }}
        <small v-if="requiredSymbol">*</small>
      </div>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: "BaseTextField",
  emits: ['click:append', '@click:clear', 'focusin', 'focusout', 'keydown'],
  created() {
    if (this.value) {
      this.model = this.value;
    }
  },
  props: {
    value: undefined,
    vBind: undefined,
    vOn: undefined,
    label: String,
    dir: {
      type: String,
      default: 'rtl',
    },
    suffix: String,
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
  watch: {
    value: {
      handler(value) {
        this.model = value;
      }
    }
  }
}
</script>

<style scoped>

</style>