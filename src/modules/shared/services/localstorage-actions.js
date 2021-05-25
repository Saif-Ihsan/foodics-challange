export default class LocalStorage {

     static setValue(key , value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

     static getValue(key) {
        return JSON.parse(localStorage.getItem(key));
    }

     static removeValue(key) {
        localStorage.removeItem(key);
    }
}
