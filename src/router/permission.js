import router from './index'
import Vue from 'vue';
import vuex from '../store/index'
import NProgress from 'nprogress';


let whiteList = ['/SignIn'];

async function isAuth() {
    return vuex.getters.isLogin;
}

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start();
    }
    next();
})
router.beforeEach(async (toRoute, from, next) => {
    Vue.prototype.showLoader();
    const isAuthenticated = await isAuth();
    if (isAuthenticated) {
        next();
    } else {
        next();
    }
    next();
});
router.afterEach((to, from) => {
    Vue.prototype.hideLoader()
    NProgress.done();
})