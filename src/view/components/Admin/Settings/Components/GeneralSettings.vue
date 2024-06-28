<template>
    <v-container>
        <div class="row">
            <div class="col-12">
                <base-text-field
                        v-model="model.otpTimeout"
                        label="زمان احراز هویت (ثانیه)"
                />
            </div>
        </div>
    </v-container>
</template>

<script>
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";

export default {
    name: "GeneralSettings",
    components: {BaseTextField},
    props: {
        value: undefined,
    },
    mounted() {
        if (this.value) {
            this.model.otpTimeout = this.value.otpTimeout;
        }
    },
    data() {
        return {
            model: {
                otpTimeout: 0,
            },
        }
    },
    watch: {
        'value': {
            handler() {
                this.model.otpTimeout = this.value.otpTimeout;
            },
            deep: true,
        },
        'model.otpTimeout': {
            handler(val) {
                if (val) {
                    this.$emit('input', {
                        otpTimeout: parseInt(val)
                    })
                }

            }
        }
    }
}
</script>

<style scoped>

</style>