import axios from 'axios';

const API_URL = 'https://localhost:44320/api/'; // Kendi API adresinizle güncelleyin

/**
 * Teklifleri backend'den çeker.
 */
const getQuotes = (params) => {
  // Adres 'quotes/getall' olmalı
  return axios.get(API_URL + 'quotes/getall', { params });
};

/**
 * ID'ye göre tek bir teklif detayı çeker.
 */
const getQuoteById = (id) => {
  // Adres 'quotes/getbyid/{id}' olmalı
  return axios.get(API_URL + `quotes/getbyid/${id}`);
};

/**
 * ID'ye göre bir teklifi siler.
 */
const deleteQuote = (id) => {
  // Adres 'quotes/delete/{id}' olmalı
  return axios.delete(API_URL + `quotes/delete/${id}`);
};

// Fonksiyonları dışa aktarıyoruz
export {
  getQuotes,
  getQuoteById,
  deleteQuote
};