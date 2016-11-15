import * as Vue from 'vue'
import Component from './utils/component'

@Component({})
export default class Table extends Vue {
    msg: number

    data() {
        return {
            msg: 123
        }
    }

    mounted() {
        this.greet()

    }

    get computedMsg() {
        return 'computed ' + this.msg
    }

    greet() {
    }

    render(h) {
        return <div>
            我是table
        </div>
    }
}