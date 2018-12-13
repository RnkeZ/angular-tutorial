export function convertMillisToTime(milliseconds) {
    const date = new Date(milliseconds);
    const hours = date.getHours() / 10 >= 1 ? date.getHours().toString() : '0' + date.getHours().toString();
    const minutes = date.getMinutes() / 10 >= 1 ? date.getMinutes().toString() : '0' + date.getMinutes().toString();
    // let s = date.getSeconds();
    return hours + ':' + minutes;
}
