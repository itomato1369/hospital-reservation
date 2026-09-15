/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
// PrimeVue設定
// PrimeVueタグを利用できるように
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

import Button from "primevue/button";
import Card from "primevue/card";
import Sidebar from "primevue/sidebar";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Dropdown from "primevue/dropdown";
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";
import Menu from "primevue/menu";
import PanelMenu from "primevue/panelmenu";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { VueDatePicker } from "@vuepic/vue-datepicker";


import type { App } from "vue";

// app.use(PrimeVueをVueへ登録)
//　parameterはappでtypeof App
export const setupPrimeVue = (app: App) => {

    app.use(PrimeVue, {
        theme: {
            preset: Aura
        }
    });

    app.component("Button", Button);
    app.component("Card", Card);
    app.component("Sidebar", Sidebar);
    app.component("InputText", InputText);
    app.component("Password", Password);
    app.component("Dropdown", Dropdown);
    app.component("VueDatePicker", VueDatePicker);
    app.component("Textarea", Textarea);
    app.component("Dialog", Dialog);
    app.component("Menu", Menu);
    app.component("PanelMenu", PanelMenu);
    app.component("DataTable", DataTable);
    app.component("Column", Column);
};