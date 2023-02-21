import instance from "./config";

const TABLE_NAME = "skills";

export const getSkill = () => {
    const url = `/${TABLE_NAME}`;
    return instance.get(url);
};

export const postSkill = (data) => {
    const url = `/${TABLE_NAME}`;
    return instance.post(url, {...data });
};

export const updateSkill = (id, data) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.put(url, {...data });
};

export const deleteSkill = (id) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.delete(url);
};