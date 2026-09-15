// index.htmlが読みこのファイルを読み取る
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
/**
 * ブラウザで最初に開かれる index.html が、
 * ビルドツール（Viteなど）を経由してこの JavaScript ファイルを読み込み、
 * アプリケーション全体を構築する役割を担っています。
 */
import "@/assets/styles/primevue.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
// ログイン維持
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./routers";
import { setupPrimeVue } from "@/plugins/primevue";
// 一番最初に実行されます
const app = createApp(App);
// piniaライブラリを生成
const pinia = createPinia();
// pinia persistを利用
// ブラウザを更新しても Piniaのデータを保持する
pinia.use(piniaPluginPersistedstate);

app.use(pinia);

app.use(router);
// PrimeVueの初期化設定を別ファイルへお願い
setupPrimeVue(app);

app.mount("#app");