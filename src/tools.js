export default {

  fmtDate (obj) {
    var date = new Date(obj)
    var y = 1900 + date.getYear()
    var m = '0' + (date.getMonth() + 1)
    var d = '0' + date.getDate()
    var h = '0' + date.getHours()
    var ms = '0' + date.getMinutes()
    return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length) + ' ' + h.substring(h.length - 2, h.length) + ':' + ms.substring(ms.length - 2, ms.length)
  },
}
