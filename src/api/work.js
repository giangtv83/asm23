import instance from "./config";

const TABLE_NAME = "work";

export const getWork = () => {
    const url = `/${TABLE_NAME}`;
    return instance.get(url);
};

export const postWork = (data) => {
    const url = `/${TABLE_NAME}`;
    return instance.post(url, {...data });
};

export const updateWork = (id, data) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.put(url, {...data });
};

export const deleteWork = (id) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.delete(url);
};