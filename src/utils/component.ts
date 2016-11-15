import * as Vue from 'vue'

export type VueClass = { new (options?): Vue } & typeof Vue

const internalHooks = [
    'data',
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'render'
]

export function componentFactory (
    Component: VueClass,
    options: Vue.ComponentOptions<any> = {}
): VueClass {
    options.name = options.name || (Component as any)._componentTag
    // prototype props.
    const proto = Component.prototype
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return
        }
        // hooks
        if (internalHooks.indexOf(key) > -1) {
            options[key] = proto[key]
            return
        }
        const descriptor = Object.getOwnPropertyDescriptor(proto, key)
        if (typeof descriptor.value === 'function') {
            // methods
            (options.methods || (options.methods = {}))[key] = descriptor.value
        } else if (descriptor.get || descriptor.set) {
            // computed properties
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            }
        }
    })
    // find super
    const superProto = Object.getPrototypeOf(Component.prototype)
    const Super: VueClass = superProto instanceof Vue
        ? superProto.constructor as VueClass
        : Vue
    return Super.extend(options)
}
export default function Component <U extends Vue>(options: Vue.ComponentOptions<U>): <V extends VueClass>(target: V) => V
export default function Component <V extends VueClass>(target: V): V
export default function Component <V extends VueClass>(options: Vue.ComponentOptions<any> | V): any {
    if (typeof options === 'function') {
        return componentFactory(options)
    }
    return function (Component: V) {
        return componentFactory(Component, options)
    }
}