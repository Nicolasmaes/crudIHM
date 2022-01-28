import { createApp } from 'vue'
import App from './App.vue'
import ('primevue/resources/primevue.min.css'); 
import ('primevue/resources/themes/saga-blue/theme.css');    
import ('primeicons/primeicons.css');
import PrimeVue from 'primevue/config';
import InputText from "primevue/inputtext";
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';

const app = createApp(App)
app.use(PrimeVue);
app.component('InputText', InputText);
app.component('ColumnGroup', ColumnGroup);
app.component('Button', Button);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.mount('#app')