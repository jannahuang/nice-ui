declare module '*.vue' {
    import { ComponentOptions } from "vue"
    const componentOptions: ComponentOptions
    export default componentOptions
}
// 同理下述代码可消除引入 md 文件时的红线
declare module '*.md' {
    const str: string
    export default str
}
