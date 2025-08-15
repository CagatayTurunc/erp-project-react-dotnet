import axios from 'axios';

// API adresi artık .env dosyasından okunuyor.
// Eğer .env dosyasında bu değişken tanımlı değilse, varsayılan olarak
// yerel adresi kullanır (bu, geliştirme kolaylığı sağlar).
const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:44320/api/';

/**
 * İrsaliye satır detaylarını backend'den çeker.
 */
const getDispatches = () => {
  return axios.get(API_URL + 'dispatches/getall');
};

/**
 * ID'ye göre ana bir irsaliye belgesini siler.
 */
const deleteDispatch = (id) => {
  return axios.delete(API_URL + `dispatches/deletedispatch/${id}`);
};


const deleteDispatchLine = (lineId) => {
  return axios.delete(API_URL + `dispatches/deleteline/${lineId}`);
};

// Fonksiyonları dışa aktarıyoruz
export {
  getDispatches,
  deleteDispatch,
  deleteDispatchLine,
};
