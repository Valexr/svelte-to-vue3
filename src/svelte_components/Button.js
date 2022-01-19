// import toVue from "svelte-adapter/vue";
import toVue from "../tovue";
import { Button } from "svelte-spectre";
export default toVue(Button, {}, "div");

console.log(Button);