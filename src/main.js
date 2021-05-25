import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import VueClickAway from 'vue3-click-away';
import 'primevue/resources/themes/saga-blue/theme.css';
import '../node_modules/primeicons/primeicons.css';
import './main.css';
import globalFilters from './modules/shared/mixins/global-filters';
const app=createApp(App).use(router);

//primeVue
app.config.globalProperties.$primevue = { ripple: true };
app.use(ToastService);
app.use(PrimeVue);
app.mixin(globalFilters);
app.use(VueClickAway);

app.mount('#app');