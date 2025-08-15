import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// JWT token'ının son kullanma tarihini kontrol eden yardımcı fonksiyon
const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    // Token'ın payload kısmını (ortadaki kısım) alıyoruz
    const payloadBase64 = token.split('.')[1];
    // Base64'ten çözüp JSON'a çeviriyoruz
    const decodedPayload = JSON.parse(atob(payloadBase64));
    
    // 'exp' alanı, saniye cinsinden son kullanma tarihidir
    const expirationTime = decodedPayload.exp;
    
    // Şu anki zamanı saniye cinsinden alıyoruz
    const currentTime = Date.now() / 1000;
    
    // Eğer son kullanma tarihi geçmişse, true döndür
    return expirationTime < currentTime;

  } catch (error) {
    // Token çözümlenemezse geçersizdir
    console.error("Geçersiz token:", error);
    return true;
  }
};


export default function ProtectedRoute() {
  const token = localStorage.getItem('token');

  // Eğer token yoksa VEYA token'ın süresi dolmuşsa,
  // kullanıcıyı login sayfasına yönlendir.
  if (!token || isTokenExpired(token)) {
    // Güvenlik için geçersiz token'ı da temizleyelim
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  // Token varsa ve geçerliyse, iç içe geçmiş olan route'ların gösterilmesine izin ver.
  return <Outlet />;
}
