// 字符串处理函数，只显示前6位和后6位，中间...省略
export default function showStr(str:string) {
    return str.substring(0, 7) + '...' + str.substring(str.length - 7, str.length);
}