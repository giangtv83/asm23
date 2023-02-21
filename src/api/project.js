import instance from "./config";

const TABLE_NAME = "project";

export const getProject = () => {
    const url = `/${TABLE_NAME}`;
    return instance.get(url);
};

export const postProject = (data) => {
    const url = `/${TABLE_NAME}`;
    return instance.post(url, {...data });
};

export const updateProject = (id, data) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.put(url, {...data });
};

export const deleteProject = (id) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.delete(url);
};