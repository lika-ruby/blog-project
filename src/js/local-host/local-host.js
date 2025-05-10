export const setToLocalStorage = (key, data) => {
    const arhivData = JSON.stringify(data);
    localStorage.setItem(key, arhivData);
};

export const getFromLocalStorage = (key) => {
    if (Object.keys(localStorage).includes(key)) {
        const arhivData = localStorage.getItem(key);
        return JSON.parse(arhivData);
    }
};