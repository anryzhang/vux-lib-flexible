
const Util = {
    getCookie(name){
        let self = this;
        let _cookie = document.cookie;
        let _name = encodeURIComponent(name) + "=";
        ;
        let _start = _cookie.indexOf(_name);
        let _value = null;
        if (_start > -1) {
            let _end = _cookie.indexOf(';', _start);
            if (_end > -1) {
                _value = decodeURIComponent(_cookie.substring(_start + _name.length, _end));
            } else {
                _value = decodeURIComponent(_cookie.substring(_start + _name.length, _cookie.length));
            }
        }
        return _value;

    }

}

export default Util;


