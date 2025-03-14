<script>
import SingleQuestionModal
    from "@/view/components/Admin/PublishedTests/QuestionsBank/Questions/SingleQuestionModal.vue";

export default {
    name: "DefineOrEditQuestionBankModal",
    components: {SingleQuestionModal},
    props: {
        visible: Boolean,
        data: Object,
        questionId: String,
    },
    emits: ['add'],
    created() {
        this.table.contents = this.data.questions.map(f => {
            return f;
        });
    },
    data() {
        return {
            model: {
                title: null,
            },
            formData: new FormData(),
            menuItems: [
                {title: 'دانلود فایل نمونه'},
                {title: 'بارگذاری سؤال'},

            ],
            table: {
                headers: [
                    {text: 'عنوان', value: 'questionTitle'},
                    {text: 'نوع سؤال', value: 'questionType'},
                    {text: 'امتیاز', value: 'questionScore'},
                ],
                contents: [],
                actions: [
                    {
                        title: 'ویرایش',
                        icon: 'mdi-pen',
                        click: (item) => {
                            this.httpGet(`/question-bank/${item.id}`, result => {
                                this.modal.initialize = result.initialize;
                                this.modal.index = this.table.contents.indexOf(item);
                                this.modal.data = result.data;
                                this.modal.visible = true;
                            })

                        }
                    },
                    {
                        title: 'حذف',
                        icon: 'mdi-delete',
                        color: 'red',
                        click: (item) => {
                            this.httpDelete(`/question-bank/${item.id}`, result => {
                                this.table.contents.splice(this.table.contents.indexOf(item), 1);
                            })

                        }
                    },
                ]
            },
            modal: {
                visible: false,
                data: null,
                index: -1,
                initialize: null,
            }
        }
    },
    methods: {
        define() {
            this.httpGet(`/question-bank/initialize`, result => {
                this.modal.data = null;
                this.modal.initialize = result;
                this.modal.visible = true;
            })
        },
        add(item) {
            this.modal.visible = false;
            this.table.contents.push(item)
        },
        update(item) {
            this.modal.visible = false;
            this.table.contents.splice(this.modal.index, 1, item);
        },
        importExcel() {
            this.$refs.filePicker.click();
        },
        onFileSelected(event) {
            const reader = new FileReader();
            const file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                this.data = reader.result;
                this.formData.append('file', file)
                this.httpPost(`/test/insert-many/${this.questionId}`, this.formData, result => {
                    this.table.contents = result.items;
                    this.$emit('add', result);
                })
            }
        },
        getQuestionTypeTitle(questionType) {
            if (questionType == 1) {
                return 'چهار گزینه‌ای';
            } else {
                return 'تشریحی';
            }
        },
        save() {
            this.httpPost(`/question-bank/`, {
                id: this.questionId,
                title: this.model.title,
            }, result => {
                this.$emit('add', result);
            })
        }
    }
}
</script>

<template>
    <base-modal
            title="تعریف بانک سؤال جدید"
            :visible="visible"
            @close="$emit('update:visible', false)"
            full-screen>

        <template v-slot:toolbar-action>
            <div class="d-inline-flex">
                <base-text-field
                        class="mx-2"
                        label="عنوان بانک"
                        v-model="model.title"
                />

                <base-button
                        label="بارگذاری از اکسل"
                        :menu-items="menuItems"
                />
                <base-button
                        label="تعریف پرسش تکی"
                        @click="define"
                        class="mx-1"
                />
                <base-button
                        label="ذخیره و بستن"
                        @click="save"
                />
            </div>

        </template>
        <base-table
                :headers="table.headers"
                :items="table.contents"
                :actions="table.actions">
            <template v-slot:item.questionType="{item}">
                {{ getQuestionTypeTitle(item.questionType) }}
            </template>
        </base-table>

        <single-question-modal
                v-if="modal.visible"
                :visible.sync="modal.visible"
                :data="modal.data"
                :questionId="questionId"
                :initialize="modal.initialize"
                @add="add"
                @update="update"
        />


        <form ref="fileFormPicker">
            <input
                    @change="onFileSelected"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    hidden="hidden"
                    ref="filePicker"
                    type="file"/>
        </form>
    </base-modal>
</template>

<style scoped>

</style>
