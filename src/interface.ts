type Base=boolean|string|number
type Order={
    field:string,
    asc:boolean
}
type Data=Object[]
type Column={
    title:string,
    dataIndex:string,
    render:(record:Object,index:number,data:Data)=>{}
    filters:Base[],
    filterMultiple:boolean,
    sorter:()=>{}|boolean,
    fixed:boolean|['left','right'],//是否固定表头
}
interface Table {
    theme:string,
    caption:string,
    loading?: boolean;//是否显示loading
    columns: Array<Column>; //表头
    data: Data; //表格数据
    onRender?: Function; //表格渲染完成执行
    order?: string|Order|Array<Order>; //排序
    locale:{
        emptyText:string
    }
}
