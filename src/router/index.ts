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
	{
		path: "/generations",
		name: "PokemonGenerations",
		component: () =>
			import("@/components/Generations/PokemonGenerations.vue"),
	},
	{
		path: "/generations-comparison",
		name: "PokemonGenerationsComparison",
		component: () =>
			import("@/components/Generations/PokemonGenerationsComparison.vue"),
	},
];

const router=new VueRouter({
	routes,
});

export default router;
