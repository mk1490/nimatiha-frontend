import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import themes from './vuetifyThemes';
import i18n from '@/locale/index';
import locales from '@/locale/vuetify';
import {settings} from '@/config';

Vue.use(Vuetify);
const vuetify = new Vuetify({
    rtl: true,
    theme: {
        options: {
            customProperties: true,
        },
        themes: themes[0],
    },
    icons: {
        iconfont: 'mdi',
    },
    lang: {
        locales,
        current: settings.locale,
        t: (key, ...params) => i18n.t(key, params),
    },
})

export async function setVuetifyTheme(index) {
    if (vuetify.framework.theme.themes !== themes[index]) {
        console.log(`[Vuetify] Change theme to "${index}"`);
        vuetify.framework.theme.themes.light = themes[index].light || themes[0].light;
        // vuetify.framework.theme.themes.dark = themes[index].dark || themes[0].dark;
    } else {
        console.warn(`[Vuetify] "${index}" is current theme `);
    }
}

/**
 * Set the mode to dark/light for the Vuetify class object.
 *
 * @param {Boolean} dark new value
 */
export async function setVuetifyThemeDark(dark) {
    console.log(`[Vuetify] Change theme to "${dark ? 'dark' : 'light'}"`);
    vuetify.framework.theme.dark = dark;
}


export default vuetify;
