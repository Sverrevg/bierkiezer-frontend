// ----------------Persistence---------------- //
/**
 * Source: https://medium.com/front-end-weekly/persisting-user-authentication-with-vuex-in-vue-b1514d5d3278
 */

import Vue from 'vue';
import Vuex from 'vuex';
import SecureLS from "secure-ls";

const ls = new SecureLS({encodingType: 'aes', isCompression: false});

Vue.use(Vuex);

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const store = new Vuex.Store({
    state: {
        isLoggedIn: ls.get('isLoggedIn').data,
        username: ls.get('username').data,
        token: ls.get('token').data,
        refresh_token: ls.get('refresh_token').data
    },
    mutations: {
        [LOGIN](state, authRequest) { // Add user data to state.
            state.isLoggedIn = true;
            state.username = authRequest.username;
            state.token = authRequest.token;
            state.refresh_token = authRequest.refresh_token;
            // Persist data to ls.
            ls.set('isLoggedIn', {data: state.isLoggedIn});
            ls.set('username', {data: state.username});
            ls.set('token', {data: state.token});
            ls.set('refresh_token', {data: state.refresh_token});
        },
        [LOGOUT](state) { // Remove all data from state and clear ls.
            state.isLoggedIn = false;
            state.username = null;
            state.token = null;
            state.refresh_token = null;
            ls.clear();
        }
    },
    actions: {
        login({commit}, authRequest) {
            return new Promise(resolve => {
                setTimeout(() => {
                    commit(LOGIN, authRequest);
                    resolve();
                }, 1000);
            });
        },
        logout({commit}) {
            commit(LOGOUT);
        }
    },
    getters: {
        isLoggedIn: state => {
            return state.isLoggedIn;
        },
        username: state => {
            return state.username;
        },
        token: state => {
            return state.token;
        },
        refresh_token: state => {
            return state.refresh_token;
        }
    }
});

export default store