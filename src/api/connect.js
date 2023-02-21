import instance from "./config";

const TABLE_NAME = "connect";

export const getConnect = () => {
    const url = `/${TABLE_NAME}`;
    return instance.get(url);
};

export const postConnect = (data) => {
    const url = `/${TABLE_NAME}`;
    return instance.post(url, {...data });
};

export const updateConnect = (id, data) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.put(url, {...data });
};

export const deleteConnect = (id) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.delete(url);
};