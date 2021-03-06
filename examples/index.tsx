import * as Vue from 'vue'
import Component from '../src/utils/component'
import Table from '../src'

@Component
class App extends Vue {
    msg: number

    data() {
        return {
            msg: 123
        }
    }

    mounted() {

    }

    get computedMsg() {
        return 'computed ' + this.msg
    }

    render(h) {
        return <div>
            <Table></Table>
        </div>
    }
}
new App({
    el: '#app'
})
