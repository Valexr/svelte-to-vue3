// import toVue from "svelte-adapter/vue";
import toVue from "../tovue"
import { Button } from "svelte-spectre"
const Component = toVue(Button, {}, "div")
export default toVue(Button, {}, "div")
console.log(Component)