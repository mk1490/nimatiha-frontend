<template>
    <v-dialog
            scrollable
            v-model="visible"
            persistent
            :fullscreen="fullScreen"
            :width="width">
        <v-card>
            <v-card-title v-if="!!title">
                {{ title }}
            </v-card-title>
            <v-card-text>
                <v-container>
                    <slot></slot>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn
                        color="red"
                        text
                        @click="closeOrBack">
                    {{ backButtonText }}
                </v-btn>
                <v-spacer/>
                <v-btn
                        v-if="hideSubmitButton == false"
                        @click="submitOrNext()"
                        color="primary">
                    {{ nextButtonText }}
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
export default {
    name: "BaseModal",
    emits: ['submit', 'submitOrNext', 'close', 'closeOrBack'],
    mounted() {
        this.nextButtonText = this.submitButtonText || this.$t('ui.submit');
        this.backButtonText = this.$t('ui.cancel');
    },
    data() {
        return {
            nextButtonText: null,
            backButtonText: null,
        }
    },
    props: {
        title: String,
        fullScreen: Boolean,
        width: {
            type: Number,
            default: 500,
        },
        visible: Boolean,
        submitButtonText: String,
        hideSubmitButton: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        submitOrNext() {
            this.$emit('submit');
            this.$emit('submitOrNext');
        },
        closeOrBack() {
            this.$emit('update:visible', false)
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
    }
}
</script>

<style scoped>

</style>