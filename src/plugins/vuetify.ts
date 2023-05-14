import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

const opts={
	theme: {
		options: {
			customProperties: true
		},
		themes: {
			light: {
				primary: "#ee1515",
				secondary: "#222224",
				vuetifyText: "#727272", //grey
				vuetifyThemeContrast: "#000000", //white text (for example text in manager menu),
				vuetifyBlackText: "#000000",
				vuetifyMenuBgHover: "#D3D3D3", //hover bg for menu items
				vuetifyWorkstationBg: "#f2f2f2"
			},
			dark: {
				primary: "#ee1515",
				secondary: "#222224",
				vuetifyText: "#ffffff",
				vuetifyThemeContrast: "#ffffff", //white text (for example text in manager menu)
				vuetifyBlackText: "#000000",
				vuetifyMenuBg: "#363636", // menu bg item color
				vuetifyMenuBgHover: "#474645", //hover bg for menu items,
				vuetifyWorkstationBg: "#363636"
			}
		}
	}
};


export default new Vuetify(opts);
