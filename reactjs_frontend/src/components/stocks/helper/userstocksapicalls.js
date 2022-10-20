import { API } from "../../../backend";
export const get_stocks = (token) => {
    return fetch(`${API}stock_data/manage-stock/?token=${token}`, {
        method: "GET",
    }).then(data => {
        return data.json();
    });
}

export const add_stock = (token, symbol) => {
    return fetch(`${API}stock_data/manage-stock/?token=${token}&symbol=${symbol}`, {
        method: "POST",
    }).then(data => {
        return data.json();
    });
}

export const remove_stock = (token, symbol) => {
    return fetch(`${API}stock_data/manage-stock/?token=${token}&symbol=${symbol}`, {
        method: "DELETE",
    }).then(data => {
        return data.json();
    });
}