function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
function getStorage(key) {
    return JSON.parse(localStorage.getItem(key));
};
function removeStorage(key) {
    localStorage.removeItem(key)
};

export {
    setStorage,
    getStorage,
    removeStorage
}