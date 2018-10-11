import Vue from 'vue'
import { thorify } from "thorify";
import WebFont from 'webfontloader';
import Web3 from 'web3';
import VueI18n from 'vue-i18n';
import { locale } from 'moment';

import Web3Plugin from './plugins/Web3';

import App from './App.vue'
import ContractJson from './build/contracts/exchange.json';

import transations from './translations';

import 'normalize.css';

const web3 = thorify(new Web3(), "http://localhost:8669");
const address = '0x534BD48d7CfB0602EA3708cfdDacFeb2242c843e';
const Contract = new web3.eth.Contract(ContractJson.abi, address);

Vue.use(Web3Plugin, web3);
Vue.use(VueI18n);

const getBalance = async () => {
  return {
    vet: await web3.eth.getBalance(address),
    vtho: await web3.eth.getEnergy(address),
  };
};

WebFont.load({
  google: {
    families: [
      'Poppins:300, 800, 900',
      'IBM Plex Sans:300,400',
    ]
  }
});

Vue.config.productionTip = false;



const i18n = new VueI18n({
  locale: locale(),
  messages: transations,
});

new Vue({
  i18n,
  render: h => h(App, {
    props: {
      Contract,
      getBalance: async () => getBalance(),
    },
  }),
}).$mount('#app')
