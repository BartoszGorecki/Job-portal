
class LocalStorage {
  get(key) {
    return localStorage.getItem(JSON.parse(key))
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}
const Store = new LocalStorage()

export default Store