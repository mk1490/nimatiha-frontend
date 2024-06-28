<template>
    <v-dialog
            persistent
            width="500"
            scrollable
            v-model="visible">
        <v-card>
            <v-card-title>
                {{ !data ? 'تعریف کاربر جدید' : 'ویرایش کاربر' }}
            </v-card-title>
            <v-card-text>

                <v-expansion-panels v-model="selectedTab">
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            مشخصات کلی
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container>
                                <v-form
                                        ref="form"
                                        lazy-validation>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-12">
                                                    <v-text-field
                                                            v-model="model.name"
                                                            hide-details="auto"
                                                            dense
                                                            required
                                                            outlined
                                                            :label="$t('user.modal.form.name')">
                                                    </v-text-field>
                                                </div>
                                                <div class="col-12">
                                                    <v-text-field
                                                            v-model="model.family"
                                                            hide-details="auto"
                                                            dense
                                                            required
                                                            outlined
                                                            :label="$t('user.modal.form.family')">
                                                    </v-text-field>
                                                </div>
                                                <div class="col-12">
                                                    <v-select
                                                            v-model="model.roleId"
                                                            hide-details="auto"
                                                            dense
                                                            :items="roleItems"
                                                            item-value="id"
                                                            item-text="title"
                                                            required
                                                            outlined
                                                            @change="getRules"
                                                            :label="$t('user.modal.form.role')">
                                                    </v-select>
                                                </div>
                                                <div class="col-12">
                                                    <v-text-field
                                                            :disabled="!!data"
                                                            dir="ltr"
                                                            v-model="model.username"
                                                            hide-details="auto"
                                                            dense
                                                            required
                                                            outlined
                                                            :label="$t('user.modal.form.username')">
                                                    </v-text-field>
                                                </div>
                                                <div
                                                        v-if="!data"
                                                        class="col-12">
                                                    <v-text-field
                                                            dir="ltr"
                                                            v-model="model.password"
                                                            hide-details="auto"
                                                            dense
                                                            required
                                                            outlined
                                                            :label="$t('user.modal.form.password')">
                                                    </v-text-field>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </v-form>
                            </v-container>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            سطوح دسترسی
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container>
                                <v-treeview
                                        v-model="model.selectedRules"
                                        :open-all="false"
                                        selectable
                                        item-text="title"
                                        item-key="providerKey"
                                        item-children="children"
                                        :items="accessPermissionRuleItems">
                                </v-treeview>
                            </v-container>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
            <v-card-actions>
                <v-btn
                        v-on:click="$emit('update:visible', false)"
                        text
                        color="error">
                    {{ $t('ui.cancel') }}
                </v-btn>
                <v-spacer/>
                <v-btn
                        v-if="selectedTab != 0"
                        v-on:click="back"
                        outlined
                        color="primary">
                    {{ $t('ui.back') }}
                </v-btn>
                <v-btn
                        width="130"
                        v-on:click="nextOrSubmitAndSendToServer"
                        color="primary">
                    {{ selectedTab == 2 ? $t('ui.submit') : $t('ui.continue') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";

export default {
    name: "DefineOrEditUserModal",
    components: {BaseSelect},
    emits: ['onAddItem', 'onUpdateItem'],
    async created() {
        const [err, data] = await this.to(this.http.get(`/user/initialize${!!this.data ? `?userId=${this.data.id}` : ``}`));
        if (!err) {
            this.roleItems = data['permissionGroupItems'];
            this.initializeRuleId = data['permissionGroupItems'][0]['id'];
            this.accessPermissionRuleItems = data['accessPermissionRuleItems'];
            this.model.selectedRules = data['currentUserRules'];
            this.deviceItems = data['availableDevices'];
        } else {
            this.$emit('update:visible', false);
        }
        if (!!this.data) {
            this.model.username = this.data.username;
            this.model.name = this.data.name;
            this.model.family = this.data.family;
            this.initializeRuleId = this.data.roleId;
            this.model.roleId = this.initializeRuleId;
            this.model.selectedDevices = this.data.devices;
        } else {
            this.model.roleId = this.initializeRuleId;
            await this.getRules();
        }


    },
    props: {
        visible: Boolean,
        data: Object,
    },
    methods: {
        back() {
            this.selectedTab -= 1;
        },
        async nextOrSubmitAndSendToServer() {
            if (this.selectedTab < 2) {
                this.selectedTab += 1;
                return
            }
            if (!this.$refs.form.validate()) {
                this.$swal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: 'در معتبر بودن فیلدهای ورودی اطمینان حاصل نمایید.'
                })
                return;
            }
            if (!this.data) {
                const [err, data] = await this.to(this.http.post(`/user`, this.model));
                if (!err) {
                    this.$emit('onAddItem', data);
                    this.addItemSuccessToast();
                } else {
                    this.addItemFailedToast();
                }
            } else {
                const [err, data] = await this.to(this.http.put(`/user/${this.data.id}`, this.model));
                if (!err) {
                    this.$emit('onUpdateItem', data);
                    this.updateItemSuccessToast();
                } else {
                    this.updateItemFailedToast();
                }
            }
        },
        async getRules() {
            const [err, data] = await this.to(this.http.get(`/user/initialize/role-items?roleGroupId=${this.model.roleId}`));
            if (!err) {
                this.model.selectedRules = data;
            }
        }
    },
    data() {
        return {
            selectedTab: 0,
            roleItems: [],
            accessPermissionRuleItems: [],
            deviceItems: [],
            initializeRuleId: null,
            model: {
                name: null,
                family: null,
                roleId: null,
                username: null,
                password: null,
                selectedRules: [],
                selectedDevices: [],
            },
        }
    },
}
</script>

<style scoped>

</style>