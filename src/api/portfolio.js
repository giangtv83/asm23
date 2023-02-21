import instance from "./config";

const TABLE_NAME = "portfolio";

export const getPortfolio = () => {
    const url = `/${TABLE_NAME}`;
    return instance.get(url);
};

export const postPortFolio = (data) => {
    const url = `/${TABLE_NAME}`;
    return instance.post(url, {...data });
};