<script>
export default {
  name: "QuestionnaireModal",
  props: {
    visible: Boolean,
    data: Object,
  },
  emits: ['add', 'update'],
  created() {
    this.selectedItems.push(this.items[0].value)
    if (this.data) {
      this.model.title = this.data.title;
      this.model.slug = this.data.slug;
      this.disabledValues = this.data['disabledForm'];
      this.disabledValues.map(f => {
        if (!this.disabledValues.includes(f)) {
          this.selectedChildItem.push(f)
        }
      })

    }

  },
  methods: {
    toggleSelection(index) {
      const selectedItem = this.items[index].value;
      const findIndex = this.selectedItems.findIndex(x => x === selectedItem);
      if (findIndex !== -1) {
        this.selectedItems.splice(findIndex, 1);
      } else {
        this.selectedItems.push(selectedItem);
      }
    },
    toggleChildSelection(parentIndex, childrenIndex) {
      const selectedItem = this.items[parentIndex].children[childrenIndex].value;
      const findIndex = this.selectedChildItem.findIndex(x => x === selectedItem);
      if (findIndex !== -1) {
        this.selectedChildItem.splice(findIndex, 1);
      } else {
        this.selectedChildItem.push(selectedItem);
      }
    },
    submit() {
      const disableItems = []
      this.items.map(f => {
        return f.children.map(f2 => {
          if (!this.selectedChildItem.includes(f2.value)) {
            disableItems.push(f2.value);
          }
        });
      });


      let payload = {
        title: this.model.title,
        slug: this.model.slug,
        keys: disableItems,
      }
      if (this.data) {
        this.httpPut(`/test-template/${this.data.id}`, payload, result => {
          this.$emit('update', result);
        })
      } else {
        this.httpPost(`/test-template`, payload, result => {
          this.$emit('add', result);
        })
      }

    }
  },
  data() {
    return {
      disabledValues: [],
      model: {
        title: null,
        slug: null,
      },
      selectedItems: [],
      selectedChildItem: [],
      items: [
        {
          title: 'مشخصات فردی',
          value: 'personalInfo',
          children: [
            {
              title: 'نام',
              value: 'name'
            },
            {
              title: 'نام خانوادگی',
              value: 'family'
            },
            {
              title: 'نام پدر',
              value: 'fatherName'
            },
            {
              title: 'کد ملّی',
              value: 'nationalCode'
            },
            {
              title: 'تاریخ تولد',
              value: 'birthDate'
            },
            {
              title: 'وضعیت معلولیت',
              value: 'disabilityStatus'
            },
            {
              title: 'مذهب',
              value: 'religion'
            },
            {
              title: 'سابقه بیماری',
              value: 'illnessHistory'
            },
            {
              title: 'شهرستان محل سکونت',
              value: 'city'
            },
            {
              title: 'نشانی محل سکونت',
              value: 'address'
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
      :title="data? 'ویرایش پرسش‌نامه ': 'تعریف پرسش‌نامه جدید'"
      @close="$emit('update:visible',false)"
      @submit="submit"
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
            dir="ltr"
            v-model="model.slug"
        />
      </div>

      <div
          v-for="(item, index) in items "
          class="col-12">
        <label>
          {{ item.title }}
        </label>

        <v-switch
            v-if="selectedItems.find(x=> x === item.value)"
            class="mr-4 mb-1"
            v-for="(childrenItem, childrenIndex) in item.children"
            inset
            hide-details
            :input-value="!!data? disabledValues.includes(childrenItem.value) ?0 : 1: 0"
            @change="toggleChildSelection(index, childrenIndex)"
            :label="childrenItem.title">
        </v-switch>
      </div>
    </div>
  </base-modal>
</template>

<style scoped>

</style>