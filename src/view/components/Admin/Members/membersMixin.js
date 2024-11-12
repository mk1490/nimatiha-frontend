import xlsx from "json-as-xlsx";

export default {
    data() {
        return {
            initialize: {}
        }
    }, methods: {
        downloadExcel() {
            const quraniKeys = this.getQuraniKeys();
            const _h = [{label: 'ردیف', value: 'row'}, {label: 'نام', value: 'name'}, {
                label: 'نام خانوادگی',
                value: 'family'
            }, {label: 'نام پدر', value: 'fatherName'}, {label: 'کد ملّی', value: 'nationalCode'}, {
                label: 'تاریخ تولد',
                value: 'birthDate'
            }, {label: 'شماره تلفن همراه', value: 'mobileNumber'}, {
                label: 'وضعیت معلولیت',
                value: 'disabilityStatus'
            }, {label: 'توضیحات معلولیت', value: 'disabilityDescription'}, {
                label: 'سابقه بیماری',
                value: 'diseaseBackground'
            }, {label: 'شرح سابقه بیماری', value: 'diseaseBackgroundDescription'}, {
                label: 'شهرستان محل سکونت',
                value: 'city'
            }, {label: 'نشانی محل سکونت', value: 'address'}, {
                label: 'وضعیت تک فرزندی',
                value: 'singleChild'
            }, {label: 'تعداد اعضای خانواده', value: 'familyMembers'}, {
                label: 'نام پدر',
                value: 'fatherName'
            }, {label: 'نام خانوادگی پدر', value: 'fatherFamily'}, {
                label: 'تحصیلات پدر',
                value: 'fatherEducationLevel'
            }, {label: 'وضعیت حیات پدر', value: 'fatherEducationLevelFifeSituation'}, {
                label: 'نام مادر',
                value: 'motherName'
            }, {label: 'نام خانوادگی مادر', value: 'motherFamily'}, {
                label: 'تحصیلات مادر',
                value: 'motherEducationLevel'
            }, {label: 'وضعیت حیات مادر', value: 'motherEducationLevelFifeSituation'}, {
                label: 'مقطع تحصیلی',
                value: 'educational.educationGrade'
            }, {label: 'پایه تحصیلی', value: 'educational.schoolGrade'}, {
                label: 'محل تحصیل (مشهد / شهرستان)',
                value: 'educational.educationLocation'
            }, {label: 'ناحیه / شهرستان محل تحصیل', value: 'educational.educationZone'}, {
                label: 'معدل',
                value: 'educational.average'
            }, {label: 'نام مدرسه', value: 'educational.schoolName'}, {
                label: 'نام مدیر',
                value: 'educational.managerName'
            }, {label: 'نام معاون پرورشی', value: 'educational.breedingAssistantName'},

                {label: 'سابقه اجرایی در بسیج', value: 'executiveHistory_has_basij'}, {
                    label: 'بسیج - سمت',
                    value: 'executiveHistory_post_basij'
                }, {label: 'بسیج - سابقه اجرایی', value: 'executiveHistory_history_basij'}, {
                    label: 'بسیج - توضیحات',
                    value: 'executiveHistory_description_basij'
                },

                {
                    label: 'سابقه اجرایی در انجمن اسلامی',
                    value: 'executiveHistory_has_anjoman'
                }, {
                    label: 'انجمن اسلامی - سمت',
                    value: 'executiveHistory_post_anjoman'
                }, {
                    label: 'انجمن اسلامی - سابقه اجرایی',
                    value: 'executiveHistory_history_anjoman'
                }, {label: 'انجمن اسلامی - توضیحات', value: 'executiveHistory_description_anjoman'},

                {label: 'سابقه اجرایی در هیأت مذهبی', value: 'executiveHistory_has_heyat'}, {
                    label: 'هیأت مذهبی - سمت',
                    value: 'executiveHistory_post_heyat'
                }, {
                    label: 'هیأت مذهبی - سابقه اجرایی',
                    value: 'executiveHistory_history_heyat'
                }, {label: 'هیأت مذهبی - توضیحات', value: 'executiveHistory_description_heyat'},

                {label: 'سابقه اجرایی در هلال احمر', value: 'executiveHistory_has_helal'}, {
                    label: 'هلال احمر - سمت',
                    value: 'executiveHistory_post_helal'
                }, {
                    label: 'هلال احمر - سابقه اجرایی',
                    value: 'executiveHistory_history_helal'
                }, {label: 'هلال احمر - توضیحات', value: 'executiveHistory_description_helal'},

                {
                    label: 'سابقه اجرایی در سازمان دانش‌آموزی',
                    value: 'executiveHistory_has_sazmanedaneshamoozi'
                }, {
                    label: 'سازمان دانش‌آموزی - سمت',
                    value: 'executiveHistory_post_sazmanedaneshamoozi'
                }, {
                    label: 'سازمان دانش‌آموزی - سابقه اجرایی',
                    value: 'executiveHistory_history_sazmanedaneshamoozi'
                }, {label: 'سازمان دانش‌آموزی - توضیحات', value: 'executiveHistory_description_sazmanedaneshamoozi'},

                {
                    label: 'سابقه اجرایی در خبرگزاری پانا',
                    value: 'executiveHistory_has_pana'
                }, {
                    label: 'خبرگزاری پانا - سمت',
                    value: 'executiveHistory_post_pana'
                }, {
                    label: 'خبرگزاری پانا - سابقه اجرایی',
                    value: 'executiveHistory_history_pana'
                }, {label: 'خبرگزاری پانا - توضیحات', value: 'executiveHistory_description_pana'},

                {label: 'سابقه اجرایی در سایر موارد', value: 'executiveHistory_has_other'}, {
                    label: 'سایر موارد - سمت',
                    value: 'executiveHistory_post_other'
                }, {
                    label: 'سایر موارد - سابقه اجرایی',
                    value: 'executiveHistory_history_other'
                }, {label: 'سایر موارد - توضیحات', value: 'executiveHistory_description_other'},


                {
                    label: 'شرکت در دوره طرح ولایت',
                    value: 'executiveHistory.breedingAssistantName'
                }, {
                    label: 'طرح ولایت استانی / حوزه‌ای',
                    value: 'executiveHistory.breedingAssistantName'
                }, {label: 'طرح ولایت استانی / حوزه‌ای', value: 'executiveHistory.breedingAssistantName'},

                {
                    label: 'شرکت در دوره آستان قدس',
                    value: 'executiveHistory.breedingAssistantName'
                }, {
                    label: 'آستان قدس - بی‌نهایت شو',
                    value: 'executiveHistory.breedingAssistantName'
                }, {
                    label: 'آستان قدس - برهان',
                    value: 'executiveHistory.breedingAssistantName'
                }, {label: 'آستان قدس - برهان', value: 'executiveHistory.breedingAssistantName'},

                {label: 'شرکت در دوره اوقاف', value: 'executiveHistory.breedingAssistantName'}, {
                    label: 'اوقاف - ترتیل',
                    value: 'executiveHistory.breedingAssistantName'
                }, {label: 'اوقاف - قرائت', value: 'executiveHistory.breedingAssistantName'}, {
                    label: 'اوقاف - حفظ',
                    value: 'executiveHistory.breedingAssistantName'
                },]


            for (let i = 0; i < quraniKeys.length; i++) {
                const quraniItem = quraniKeys[i];
                const baseTitle = 'رشته‌های قرآنی - ';
                const baseKey = `educationalAndHistorical_qurani_${quraniItem.key}`
                _h.push({
                    label: baseTitle + quraniItem.title + ' - ' + 'عنوان رشته', value: baseKey + 'title',
                })
                _h.push({
                    label: baseTitle + quraniItem.title + ' - ' + 'رتبه استانی یا کشوری', value: baseKey + 'rank',
                })
                _h.push({
                    label: baseTitle + quraniItem.title + ' - ' + 'سطح', value: baseKey + 'level',
                })
            }
            this.getVarzeshiKeys().map(varzeshiItem => {
                const baseTitle = 'رشته‌های ورزشی - ';
                const baseKey = `educationalAndHistorical_varzeshi_${varzeshiItem.key}`;
                _h.push({
                    label: baseTitle + varzeshiItem.title + ' - ' + 'عنوان رشته', value: baseKey + 'title',
                })
                _h.push({
                    label: baseTitle + varzeshiItem.title + ' - ' + 'رتبه استانی یا کشوری', value: baseKey + 'rank',
                })
                _h.push({
                    label: baseTitle + varzeshiItem.title + ' - ' + 'سطح', value: baseKey + 'level',
                })
            })


            this.getHonariKeys().map(honariItem => {
                const baseTitle = 'رشته‌های هنری - ';
                const baseKey = `educationalAndHistorical_honari_${honariItem.key}`
                _h.push({
                    label: baseTitle + honariItem.title + ' - ' + 'عنوان رشته', value: baseKey + 'title',
                })
                _h.push({
                    label: baseTitle + honariItem.title + ' - ' + 'رتبه استانی یا کشوری', value: baseKey + 'rank',
                })
                _h.push({
                    label: baseTitle + honariItem.title + ' - ' + 'سطح', value: baseKey + 'level',
                })
            })


            this.httpGet(`/member-request/download-excel-list`, result => {
                this.initialize = result.initialize;
                const items = [...result.items]
                if (items.length === 0) {
                    this.$swal.fire({
                        icon: 'warning', text: 'موردی جهت دانلود وجود ندارد!'
                    })
                    return;
                }


                const _c = items.map((f, i) => {
                    f.row = i + 1;

                    if (f.educational) {
                        f.educational.educationLocation = f.educational.educationLocation === 1 ? 'مشهد' : 'شهرستان';
                        if (f.educational.educationLocation !== 1) {
                            f.educational.educationZone = f.educational.educationCity;
                        }
                    }


                    let finalExecutiveKeys = {}
                    let honariObj = {};
                    let quraniObj = {};
                    let varzeshiObj = {};
                    if (f.executiveHistory) {
                        this.getExecutiveKeys().map(executiveItem => {
                            const item = f.executiveHistory.find(x => x.title === f.title);
                            finalExecutiveKeys[`executiveHistory_has_${executiveItem.key}`] = item ? 'بله' : 'خیر';
                            finalExecutiveKeys[`executiveHistory_post_${executiveItem.key}`] = item ? item.post : '';
                            finalExecutiveKeys[`executiveHistory_history_${executiveItem.key}`] = item ? item.postHistory : '';
                            finalExecutiveKeys[`executiveHistory_description_${executiveItem.key}`] = item ? item.description : '';
                        })
                    }


                    if (f.educationalAndHistorical) {

                        this.getHonariKeys().map(honari => {
                            const item = f.educationalAndHistorical.find(x => x.category === 'artistic' && x.title === honari.title);
                            const baseKey = `educationalAndHistorical_honari_${honari.key}`
                            honariObj[`${baseKey}title`] = item ? item.fieldTitle : '';
                            honariObj[`${baseKey}level`] = item ? item.level : '';
                            honariObj[`${baseKey}rank`] = item ? item.rank : '';
                        })


                        for (let i = 0; i < quraniKeys.length; i++) {

                            const item = f.educationalAndHistorical.find(x => x.category === 'qurani' && x.title === quraniKeys[i].title);
                            const baseKey = `educationalAndHistorical_qurani_${quraniKeys[i].key}`
                            quraniObj[`${baseKey}title`] = !!item ? item['fieldTitle'] : '';
                            quraniObj[`${baseKey}level`] = !!item ? item.level : '';
                            quraniObj[`${baseKey}rank`] = !!item ? item.rank : '';

                        }


                        this.getVarzeshiKeys().map(varzeshi => {
                            const item = f.educationalAndHistorical.find(x => x.category === 'sport' && x.title === varzeshi.title);
                            const baseKey = `educationalAndHistorical_varzeshi_${varzeshi.key}`
                            varzeshiObj[`${baseKey}title`] = item ? item.fieldTitle : '';
                            varzeshiObj[`${baseKey}level`] = item ? item.level : '';
                            varzeshiObj[`${baseKey}rank`] = item ? item.rank : '';
                        })
                    }


                    try {
                        Object.keys(f).map(objItem => {
                            let value = f[objItem];
                            switch (objItem) {
                                case 'diseaseBackground':
                                    value = this.getTitleFromInitialize('diseaseBackgroundItems', f[objItem])
                                    break;
                                case 'diseaseBackground':
                                    value = this.getTitleFromInitialize('diseaseBackgroundItems', f[objItem])
                                    break;
                                case 'fatherEducationLevel':
                                    value = this.getTitleFromInitialize('educationLevels', value);
                                    break;
                                case 'motherEducationLevel':
                                    value = this.getTitleFromInitialize('educationLevels', value);
                                    break;
                                case 'fatherEducationLevelFifeSituation':
                                    value = this.getTitleFromInitialize('lifeSituationItems', value);
                                    break;
                                case 'motherEducationLevelFifeSituation':
                                    value = this.getTitleFromInitialize('lifeSituationItems', value);
                                    break;
                                case 'educationGrade':
                                    value = this.getTitleFromInitialize('educationGrades', value);
                                    break;
                                case 'educational':
                                    console.log('educational', value, Object.keys(value))
                                    switch (Object.keys(value)) {
                                        case "schoolGrade":
                                            console.log("SCHOLL GRADE", value)
                                            value['schoolGrade'] = this.getTitleFromInitialize('schoolGrades', value.schoolGrade);
                                            break;
                                    }

                                    break;
                            }
                            f[objItem] = value;
                        })

                    } catch (e) {
                        console.error(e);
                    }

                    return {
                        ...f, ...finalExecutiveKeys, ...honariObj, ...quraniObj, ...varzeshiObj,
                    };
                })


                let settings = {
                    fileName: `Nimkatiha_DataExport_${this.faToEn(this.getPersianTime(new Date(), 'YYYY_MM_DD_HH_mm_ss'))}`,
                    writeMode: "writeFile",
                    RTL: true,
                    writeOptions: {},
                }
                xlsx([{
                    sheet: 'Main', content: _c, columns: _h,
                }], settings);

            })
        }, getExecutiveKeys() {
            return [{
                title: "بسیج", key: "basij"
            }, {
                title: "انجمن اسلامی", key: "anjoman"
            }, {
                title: "هیأت مذهبی", key: "heyat"
            }, {
                title: "هلال احمر", key: "helal"
            }, {
                title: "سازمان دانش‌آموزی", key: "sazmanedaneshamoozi"
            }, {
                title: "خبرگزاری پانا", key: "pana"
            }, {
                title: "سایر", key: "other"
            }]
        }, getQuraniKeys() {
            return [{
                title: "تجوید", key: "tajvid"
            }, {
                title: "مفاهیم", key: "mafahim"
            }, {
                title: "حفظ", key: "hefz"
            }, {
                title: "احکام", key: "ahkam"
            }, {
                title: "قرائت", key: "qeraat"
            }, {
                title: "نهج البلاغه", key: "nahjolbalaqe"
            }, {
                title: "مکبری", key: "mokaberi"
            }, {
                title: "صحیفه سجادیه", key: "sahifeh"
            }, {
                title: "سایر", key: "other"
            }]
        }, getHonariKeys() {
            return [{
                title: "سرود", key: "soroud"
            }, {
                title: "نمایش", key: "namayesh"
            }, {
                title: "نقاشی", key: "naqashi"
            }, {
                title: "سفال‌گری", key: "sofalgari"
            }, {
                title: "خوش‌نویسی", key: "khoshnevisi"
            }, {
                title: "عکاسی", key: "akkasi"
            }, {
                title: "فتوشاپ", key: "photoshop"
            }, {
                title: "تدوین", key: "tadvin"
            }, {
                title: "نشریه", key: "nashriyeh"
            }, {
                title: "مدّاحی", key: "maddahi"
            }, {
                title: "سایر", key: "other"
            }]
        }, getVarzeshiKeys() {
            return [{
                title: "والیبال", key: "volleyball"
            }, {
                title: "بسکتبال", key: "basketball"
            }, {
                title: "هندبال", key: "handball"
            }, {
                title: "تنیس", key: "tenis"
            }, {
                title: "فوتبال", key: "football"
            }, {
                title: "کاراته", key: "karateh"
            }, {
                title: "جودو", key: "joodo"
            }, {
                title: "اسکیت", key: "scate"
            }, {
                title: "شنا", key: "swim"
            }, {
                title: "دوچرخه‌سواری", key: "bicycle"
            }, {
                title: "کشتی", key: "koshti"
            }, {
                title: "زورخانه", key: "zoorkhaneh"
            }, {
                title: "کبدی", key: "kabedi"
            }, {
                title: "فوتسال", key: "footsall"
            }, {
                title: "تیراندازی", key: "tir"
            }, {
                title: "سایر", key: "other"
            }]
        }, getTitleFromInitialize(key, targetValue) {
            const item = this.initialize[key].find(x => x.value === targetValue)
            return item ? item.title : '';
        }
    },

}