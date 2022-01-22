import { createApp, resolveComponent, h } from "vue"
import createSlots from './slots'
// const replaceContainer = function (Component, options) {
//     const frag = document.createDocumentFragment();
//     const component = new Component(Object.assign({}, options, { target: frag }));

//     options.target.replaceWith(frag);

//     return component;
// };

function replaceTarget(Component, target, props, slots) {
    let text = document.createTextNode('data')
    const component = new Component({
        target: target.parentElement,
        props: {
            // $$slots: { default: slots },
            $$scope: {},
            ...props,
        },
        anchor: target,
        // $$slots: {
        //     default: target.innerHTML,
        //     // foo: someOtherDomNodeOrFragment
        // }
    })
    console.log(Component, target, props, slots)
    target.remove()
    return component
}
const app = createApp()

export default (Component, style = {}, tag = "span") => {
    app.component("vue-svelte-adaptor", {
        render() {
            console.log(Component)
            return h(tag, {
                ref: "container",
                props: this.$attrs,
                style
            }, this.$slots.default())
        },
        // template: `<span><slot></slot></span>`,
        // component: app.component('home'),
        data() {
            return {
                comp: null
            }
        },
        mounted() {
            this.comp = new Component({
                target: this.$refs.container,
                props: this.$attrs,
                $$slots: {
                    // default: [h(this.$slots.default()[0])],
                    // foo: someOtherDomNodeOrFragment
                }
            })
            console.log(this.$slots.default()[0].children, this.$refs.container, this.$attrs)
            // this.comp = replaceTarget(Component, this.$refs.container, this.$attrs, this)

            let watchers = []

            for (const key in this.$listeners) {
                this.comp.$on(key, this.$listeners[key])
                const watchRe = /watch:([^]+)/

                const watchMatch = key.match(watchRe)

                if (watchMatch && typeof this.$listeners[key] === "function") {
                    watchers.push([
                        `${watchMatch[1][0].toLowerCase()}${watchMatch[1].slice(1)}`,
                        this.$listeners[key]
                    ])
                }
            }

            if (watchers.length) {
                let comp = this.comp
                const update = this.comp.$$.update
                this.comp.$$.update = function () {
                    watchers.forEach(([name, callback]) => {
                        const index = comp.$$.props[name]
                        callback(comp.$$.ctx[index])
                    })
                    update.apply(null, arguments)
                }
            }
        },
        updated() {
            this.comp.$set(this.$attrs)
        },
        destroyed() {
            this.comp.$destroy()
        }
    })
    const VueComponent = app.component('vue-svelte-adaptor')
    return VueComponent
}