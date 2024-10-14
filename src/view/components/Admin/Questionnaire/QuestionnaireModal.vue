<script>
export default {
  name: "QuestionnaireModal",
  props: {
    visible: Boolean,
  },
  data() {
    return {
      model: {
        title: null,
        slug: null,
      },
      items: [
        {
          title: 'مشخصات فردی', children: [
            {
              title: 'نام',
            },
            {
              title: 'نام خانوادگی',
            },
            {
              title: 'نام پدر',
            },
            {
              title: 'کد ملّی',
            },
            {
              title: 'وضعیت معلولیت',
            },
            {
              title: 'مذهب',
            },
            {
              title: 'سابقه بیماری',
            },
            {
              title: 'شهرستان محل سکونت',
            },
            {
              title: 'نشانی محل سکونت',
            },
          ],
        }
      ],
    }
  }
}
</script>

<template>
  <base-modal
      title="تعریف پرسش نامه جدید"
      @close="$emit('update:visible',false)"
      :visible="visible">
    <div class="row">
      <div class="col-12">
        <base-text-field
            label="عنوان"
            v-model="model.title"
        />
      </div>
      <div class="col-12">
        <base-text-field
            label="اسلاگ"
            v-model="model.slug"
        />
      </div>

      <div
          v-for="(item, index) in items "
          class="col-12">
        <v-checkbox :label="item.title">

        </v-checkbox>
        <v-switch
            class="mr-4 mb-1"
            v-for="childrenItem in item.children"
            inset
            hide-details
            :label="childrenItem.title">
        </v-switch>
      </div>
    </div>
  </base-modal>
</template>

<style scoped>

</style>