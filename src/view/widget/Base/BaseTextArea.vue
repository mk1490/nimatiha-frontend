<template>
    <v-textarea
            :value="value"
            @input="$emit('input', $event)"
            :label="label"
            :type="type"
            :disabled="disabled"
            hide-details
            outlined
            dense>
    </v-textarea>
</template>

<script>
export default {
    name: "BaseTextArea",
    created() {
    },
    props: {
        value: undefined,
        label: String,
        disabled: Boolean,
        type: undefined,
    },
    data() {
        return {
            model: null,
        }
    }
}
</script>

<style scoped>

</style>