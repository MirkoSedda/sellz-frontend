import axios from "axios"
import { API_URL } from "../costants"

export const getProduct = async slug =>
  await axios.get(`${API_URL}/products/${slug}`)

export const newProduct = async (product, accessToken) =>
  await axios.post(`${API_URL}/products`, product, {
    headers: {
      authorization: accessToken,
    },
  })

export const getProductsByLimit = async limit =>
  await axios.get(`${API_URL}/products/limit/${limit}`)

export const updateProduct = async (slug, product, accessToken) =>
  await axios.put(`${API_URL}/products/${slug}`, product, {
    headers: {
      authorization: accessToken,
    },
  })

export const removeProduct = async (slug, accessToken) =>
  await axios.delete(`${API_URL}/products/${slug}`, {
    headers: {
      authorization: accessToken,
    },
  })
