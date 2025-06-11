import { mount } from "svelte";

import "@fontsource-variable/epilogue";

import App from "./App.svelte";

import "./styles/reset.css";
import "./styles/base.css";

const app = mount(App, { target: document.getElementById("app")! });

export default app;
