import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig>=[
	{
		path: "/",
		name: "Home",
		component: HomeView,
	},
	{
		path: "/pokemon-table",
		name: "PokemonTable",
		component: () =>
			import("@/components/PokemonsTable/PokemonsTable.vue"),
	},
];

const router=new VueRouter({
	routes,
});

export default router;
