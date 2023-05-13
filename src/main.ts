import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axiosInstance from "./axios.config";
import VueAxios from 'vue-axios';
import Snotify from 'vue-snotify';
import "@mdi/font/css/materialdesignicons.css";
import "vue-snotify/styles/material.css";
import "../styles/main.scss";

Vue.use(Snotify);
Vue.use(VueAxios, axiosInstance);
Vue.config.productionTip=false;

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App)
}).$mount("#app");
