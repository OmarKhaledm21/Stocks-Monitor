import { API } from "../../../backend";

export const get_news = () => {
    return fetch(`${API}news/`, {
        method: "GET",
    }).then(data => data.json());
}