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
				vuetifyThemeContrast: "#000000", //white text (for example text in manager menu),
			},
			dark: {
				primary: "#ee1515",
				secondary: "#222224",
				vuetifyThemeContrast: "#ffffff", //white text (for example text in manager menu)
			}
		}
	}
};


export default new Vuetify(opts);
