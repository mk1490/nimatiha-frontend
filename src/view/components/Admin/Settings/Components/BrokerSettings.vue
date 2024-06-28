<template>
    <v-container>
        <div class="row">
            <div class="col-12">
                <base-text-field
                        v-model="model.emqxApiKey"
                        label="Api key"
                        dir="ltr"
                />
            </div>
            <div class="col-12">
                <base-text-field
                        v-model="model.emqxApiSecret"
                        label="Api secret"
                        dir="ltr"
                />
            </div>
        </div>
    </v-container>
</template>

<script>
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";

export default {
    name: "BrokerSettings",
    components: {BaseTextField},
    props: {
        value: undefined,
    },
    data() {
        return {
            model: {
                emqxApiSecret: null,
                emqxApiKey: null,
            }
        }
    },
    created() {
        if (this.value) {
            this.model.emqxApiSecret = this.value.emqxApiSecret;
            this.model.emqxApiKey = this.value.emqxApiKey;
        }
    },
    watch: {
        'model': {
            handler() {
                this.$emit('input', this.model)
            },
            deep: true,
        },
    }
}
</script>

<style scoped>

</style>