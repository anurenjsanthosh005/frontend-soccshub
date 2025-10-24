import api from "./axios/axiosInstance"


export const getProducts = async () => {
    const res = await api.get('/products/')
    return res.data
}

export const addProducts = async (data: FormData) => {

    for (let [key, value] of data.entries()) {
        console.log(key, value);
    }   
    // Make sure not to set 'Content-Type' to JSON
    const res = await api.post("/products/", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};

/**
 * Edit a product by ID
 * @param id - Product ID to edit
 * @param data - FormData containing updated product fields and images
 */
export const editProducts = async (id: number, data: FormData) => {
    for (let [key, value] of data.entries()) {
        console.log(key, value);
    }   
    const res = await api.put(`/products/${id}/`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};

/**
* Edit a product by ID
* @param id - Product ID to edit
*/
export const deleteProducts = async (id: number) => {
    const res = await api.delete(`/products/${id}/`);
    return res.data;
};