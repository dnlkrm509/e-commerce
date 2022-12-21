import axios from 'axios';

const BACKEND_URL = "https://react-a18ec-default-rtdb.firebaseio.com/";

export async function storeProduct(productData, whereToStore) {
    const response = await axios.post(
        BACKEND_URL + `/${whereToStore}/.json`,
        productData
    );

    const id = response.data.name;

    return id;
};

export async function fetchProducts(table) {
    const response = await axios.get(
        BACKEND_URL + `/${table}.json`
    );

    const loadedData = [];

    for (const key in response.data) {
        const productObj = {
            id: key,
            title: response.data[key].title,
            rating: response.data[key].rating,
            brand: response.data[key].brand,
            price: response.data[key].price,
            quantity: response.data[key].quantity,
            totalPrice: response.data[key].totalPrice
        }
        loadedData.push(productObj);
    }
    return loadedData;
}

export function updateProduct(id, productData, table) {
    return axios.put(BACKEND_URL + `/${table}/${id}.json`, productData);
}

export function deleteProduct(id, table) {
    return axios.delete(BACKEND_URL + `/${table}/${id}.json`);
}
