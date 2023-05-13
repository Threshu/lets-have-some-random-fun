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
				vuetifyWhiteText: "#ffffff", //white text (for example text in manager menu),
				vuetifyBlackText: "#000000", //black text
				vuetifyMenuBgHover: "#D3D3D3", //hover bg for menu items
				vuetifyWorkstationBg: "#f2f2f2"
			},
			dark: {
				primary: "#ee1515",
				secondary: "#222224",
				vuetifyText: "#ffffff",
				vuetifyWhiteText: "#ffffff", //white text (for example text in manager menu)
				vuetifyBlackText: "#000000", //black text
				vuetifyMenuBg: "#363636", // menu bg item color
				vuetifyMenuBgHover: "#474645", //hover bg for menu items,
				vuetifyWorkstationBg: "#363636"
			}
		}
	},
	breakpoint: {
		thresholds: {
			xs: 340,
			sm: 540,
			md: 800,
			lg: 992
		},
		scrollBarWidth: 24
	},
};


export default new Vuetify(opts);
