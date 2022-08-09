import axiosClient from "../axios-client"


export const productApi = {
  getAllProduct() {
      return axiosClient.get('/products');
  }
}