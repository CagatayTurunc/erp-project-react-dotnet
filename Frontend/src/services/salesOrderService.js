import axios from 'axios';

// Backend API'nizin temel URL'si. Bu adresi kendi API adresinizle güncelleyin.
// Genellikle bir .env dosyasında tutulur.
const API_URL = 'https://localhost:44320/api/'; // Örnek API adresi

/**
 * Satış siparişlerini backend'den çeken fonksiyon.
 * @param {object} params - Sayfalama, filtreleme gibi parametreleri içerir. Örn: { pageNumber: 1, pageSize: 10, filterText: 'abc' }
 * @returns 
 */
const getSalesOrders = (params) => {
  // axios, 'params' nesnesini otomatik olarak query st ring'e çevirir.
  // Örn: /api/salesorders/getall?pageNumber=1&pageSize=10
  return axios.get(API_URL + 'salesorders/getall', { params });
};
const getSalesOrderById = (id) => {
  return axios.get(API_URL + `salesorders/getbyid/${id}`);
};
const deleteSalesOrder = (id) => {
  // HTTP DELETE isteği gönderiyoruz.
  return axios.delete(API_URL + `salesorders/delete/${id}`);
};


// İleride ekleyeceğimiz diğer fonksiyonlar buraya gelecek
// const addSalesOrder = (orderData) => { ... };


// Fonksiyonları dışa aktarıyoruz ki başka dosyalardan import edilebilsin.
export {
  getSalesOrders,
  getSalesOrderById,
  deleteSalesOrder
};