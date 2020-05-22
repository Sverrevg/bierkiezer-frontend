// ----------------Imports---------------- //
// Vue
import Vue from 'vue';
import App from './App.vue';

// Store
import store from './helpers/UserStorage';

// Bootstrap
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Ionic
import Ionic from "@ionic/vue";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
// import {add} from "ionicons/icons";
import {addIcons} from "ionicons";
import * as allIcons from 'ionicons/icons';
import AllIosIcon from 'vue-ionicons/dist/ionicons-ios.js'

// Router
import {IonicVueRouter} from "@ionic/vue";

// ----------------Usage stuff---------------- //
const currentIcons = Object.keys(allIcons).map(i => {
    return {
        ['ios-' + i]: allIcons[i].ios,
        ['md-' + i]: allIcons[i].md
    };
});
const iconsObject = Object.assign({}, ...currentIcons);
addIcons(iconsObject);
Vue.use(AllIosIcon);
Vue.use(IonicVueRouter);
Vue.config.productionTip = false;
Vue.use(Ionic);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
var infiniteScroll = require('vue-infinite-scroll');
Vue.use(infiniteScroll);

// ----------------Router---------------- //
const router = new IonicVueRouter({
    routes: [
        {path: "/", redirect: "/home"},
        {
            path: "/home",
            name: "home",
            component: () =>
                import("@/components/Home")
        },
        {
            path: "/contact",
            name: "contact",
            component: () =>
                import("@/components/Contact")
        },
        {
            path: "/over",
            name: "over",
            component: () =>
                import("@/components/Over")
        },
        //user paths
        {
            path: "/gebruikers/registeren",
            name: "register",
            component: () =>
                import("@/components/user/Register")
        },
        {
            path: "/gebruikers/inloggen",
            name: "login",
            component: () =>
                import("@/components/user/Login")
        },
        {
            path: "/gebruikers/uitloggen",
            name: "logout",
            component: () =>
                import("@/components/user/Logout"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/gebruikers/account",
            name: "account",
            component: () =>
                import("@/components/user/Account"),
            meta: {
                requiresAuth: true
            }
        },
        //beer paths
        {
            path: "/bieren",
            name: "beers",
            component: () =>
                import("@/components/beer/BeerParentComponent")
        },
        {
            path: "/bieren/details/:id",
            name: "beerDetails",
            component: () =>
                import("@/components/beer/BeerDetails")
        },
        {
            path: "/bieren/advies",
            name: "find",
            component: () =>
                import("@/components/beer/BeerFinder")
        },
        {
            path: "/bieren/willekeurig",
            name: "random",
            component: () =>
                import("@/components/beer/RandomBeer")
        }
    ]
});

/*
Source: https://www.digitalocean.com/community/tutorials/how-to-set-up-vue-js-authentication-and-route-handling-using-vue-router
 */

// Manage user permissions. If not logged in redirect to login page (not for every page).
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem("token") == null) {
            next({
                path: '/users/login',
                params: {nextUrl: to.fullPath}
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'));
            if (to.matched.some(record => record.meta.is_admin)) {
                if (user.is_admin === 1) {
                    next()
                } else {
                    next({name: 'userboard'})
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        } else {
            next({name: 'userboard'})
        }
    } else {
        next()
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
