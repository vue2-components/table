import * as Vue from 'vue'
import Component from 'vue-class-component'
// import Table from ''

@Component({
    props: {
        propMessage: String
    },
    template: `
        <Table></Table>
    `
})
class App extends Vue {

    constructor (options:any) {
        super(options)
    }

    msg: ''

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
    render () {

    }
}
new App({
    el: '#app'
})