import Vue from 'vue';
import {addCommas, digitsEnToFa, digitsFaToEn, removeCommas} from "@persian-tools/persian-tools";
import * as persianDate from 'persian-date';
import i18n from "@/locale";
import store from '@/store';
import {isNumber} from "persian-date/src/type-checking";


Vue.prototype.removeComma = (number) => {
    return removeCommas(number);
}
Vue.prototype.enToFa = (number) => {
    return digitsEnToFa(number);
}
Vue.prototype.faToEn = (number) => {
    return digitsFaToEn(number);
}
Vue.prototype.isNumber = (event) => {
    return isNumber(event);
}
Vue.prototype.showUpdateSuccessToast = () => {
    Vue.prototype.$toast.success(Vue.prototype.$t('ui.updateItemSuccess'))
}
Vue.prototype.setMaxLength = (event) => {
    if (isNaN(Number.parseInt(event.key))) {
        return;
    }
    if (event.target.value.replaceAll(',', '').length >= event.target.getAttribute('length')) event.preventDefault();
}
Vue.prototype.addCommas = (value) => {
    return addCommas(value)
}


Vue.prototype.checkPermission = (permissionKey) => {
    const roles = store.getters.roles;
    return roles.includes(permissionKey);
}
Vue.mixin({
        methods: {
            addCommas,
            convertAmountToPlainAmountValue: (irrAmountValue) => {
                return Number.parseFloat(irrAmountValue.toString().replaceAll(',', ''));
            },
            getPersianTime: (time, format) => {
                if (!format) {
                    format = 'dddd DD MMMM YYYY - HH:mm';
                }
                let date = new Date(time);
                date.setHours(date.getHours());
                date.setMinutes(date.getMinutes());
                return new persianDate(date).format(format);
            },
            convertAmount: (event, callback) => {
                let stringValue = event;
                if (typeof stringValue === 'string') {
                    stringValue = stringValue.replaceAll(',', '');
                } else {
                    stringValue = stringValue.toString();
                }
                let total = addCommas(removeCommas(stringValue))
                callback(total)
            },
            getSimpleTableKeyValueObject(title, value){
                return {
                    title,
                    value
                }
            },
            getComboBoxKeyValueObject(text, value){
                return {
                    text,
                    value
                }
            }
        }
    }
)