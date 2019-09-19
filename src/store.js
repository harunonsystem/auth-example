import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-authServer'
import storage from './storage'

Vue.use(Vuex)
const authToken = 'token';

export default new Vuex.Store({
    state: {
        status: '',
        token: storage.get(authToken),
        user: {}
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, payload){
            const{ token, user} = payload
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = '';
            state.token = '';
        }
    },
    actions: {
        login({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios
                    .post('./login', {...user})
                    .then(response => response.data)
                    .then(({token, user}) => {
                        storage.set(authToken, token);
                        commit('auth_success', {token, user});
                        resolve({ token, user});
                    })
                    .catch(err => {
                        commit('auth_error');
                        storage.remove(authToken);
                        reject(err);
                    });
            });
        },
        register({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios
                .post('./register', {...user})
                .then(({ token, user}) => {
                    storage.set(authToken, token);
                    commit('auth_success', token, user);
                    resolve({ token, user});
                })
                .catch(err => {
                    commit('auth_error', err);
                    storage.remove(authToken);
                    reject(err);
                });
            })
        },
        logout({commit}){
            return new Promise((resolve, reject) => {
                commit('logout')
                storage.remove(authToken)
                delete axios.defaults.headers.common['Authorization']
                resolve();
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStates: state => state.status
    }
})