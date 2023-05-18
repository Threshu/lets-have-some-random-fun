import { Generation } from "@/types/Generation";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		generations: [] as Array<Generation>,
	},
	getters: {
		getAllGenerations(state) {
			return state.generations;
		}
	},
	mutations: {
		setGenerations(state, generations: Array<Generation>) {
			state.generations=generations;
		},
	},
});
