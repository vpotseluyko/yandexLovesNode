module.exports.send = (url, data) => {
    return fetch(url, {method: 'post', credentials: 'include', body: data}).then(r => r.json());
};