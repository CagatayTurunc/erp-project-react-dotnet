# ERP Admin Paneli - Full-Stack Web Uygulaması

[![Lisans](https://img.shields.io/github/license/CagatayTurunc/erp-project-react-dotnet)](LICENSE)
![Repo Boyutu](https://img.shields.io/github/repo-size/CagatayTurunc/erp-project-react-dotnet)
![GitHub Stars](https://img.shields.io/github/stars/CagatayTurunc/erp-project-react-dotnet?style=social)

## 📌 Proje Hakkında
Bu proje, staj programı kapsamında geliştirilmiş, modern teknolojilerle inşa edilmiş bir **Kurumsal Kaynak Planlama (ERP)** yönetim panelidir.
Backend tarafı **C# (ASP.NET Core Web API)**, frontend tarafı ise **React** ile geliştirilmiştir.
**MS SQL Server** veritabanı kullanılmış olup, **N-Tier (Katmanlı Mimari)** prensiplerine uygun olarak tasarlanmıştır.

Projenin amacı; kullanıcı yönetimi, satış siparişleri ve tekliflerin yönetilebildiği, JWT ile güvenliği sağlanmış, modüler ve ölçeklenebilir bir web uygulaması sunmaktır.

---

## 🖼️ Ekran Görüntüleri
| Teklif Listesi | Sipariş Detay |
|---|---|
| ![Teklif Listesi](https://i.imgur.com/afa02b.jpg) | ![Sipariş Detay](https://i.imgur.com/b079eb.png) |

---

## ✨ Özellikler
- **Kullanıcı Yönetimi & Güvenlik**
  - JWT tabanlı kimlik doğrulama ve yetkilendirme.
  - `ProtectedRoute` ile korunan ve sadece yetkili kullanıcıların erişebildiği sayfalar.
  - FluentValidation ile sunucu taraflı veri doğrulama.

- **Satış Siparişleri Modülü**
  - Sıralanabilir, filtrelenebilir ve sayfalanabilir gelişmiş veri tablosu (DataGrid).
  - Sipariş ekleme, silme ve detay görüntüleme.
  - Detay sayfasında siparişe ait tüm bilgilerin ve ürün satırlarının gösterimi.

- **Teklifler Modülü**
  - Onay durumuna göre (`Onaylandı`, `Reddedildi` vb.) dinamik satır renklendirme.
  - Teklif ekleme, silme ve detay görüntüleme.
  - Müşteri bilgileri ve teklife ait ürün satırlarını içeren kapsamlı detay sayfası.

- **Veri Yönetimi**
  - **Bogus** kütüphanesi ile uygulama başlangıcında veritabanını dolduran (seed) otomatik test verisi mekanizması.
  - Gerçekçi Müşteri, Sipariş ve Teklif verileri ile hızlı başlangıç.

---

## 🛠️ Kullanılan Teknolojiler

### Backend
![C#](https://img.shields.io/badge/C%23-239120?logo=c-sharp&logoColor=white)
![.NET](https://img.shields.io/badge/.NET%208-512BD4?logo=dotnet&logoColor=white)
![MSSQL](https://img.shields.io/badge/MS%20SQL%20Server-CC2927?logo=microsoftsqlserver&logoColor=white)
![Entity Framework Core](https://img.shields.io/badge/EF%20Core-68217A?logo=.net&logoColor=white)
![FluentValidation](https://img.shields.io/badge/FluentValidation-512BD4?logo=dotnet&logoColor=white)

- **Mimari:** Katmanlı Mimari (N-Tier)
- **Kimlik Doğrulama:** JWT
- **Bağımlılık Yönetimi:** Autofac
- **Test Verisi:** Bogus

### Frontend
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?logo=mui&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?logo=react-router&logoColor=white)

- **UI Kütüphanesi:** Material UI, MUI X DataGrid
- **Rotalama:** React Router DOM
- **State Yönetimi:** React Hooks (`useState`, `useEffect`)

---

## 🚀 Kurulum

### Gereksinimler
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node.js (LTS)](https://nodejs.org/en)
- [MS SQL Server](https://www.microsoft.com/tr-tr/sql-server/sql-server-downloads) (Developer veya Express versiyonu)

### Backend Kurulumu
1.  **Repoyu Klonlayın:**
    ```bash
    git clone [https://github.com/CagatayTurunc/erp-project-react-dotnet.git](https://github.com/CagatayTurunc/erp-project-react-dotnet.git)
    ```
2.  **Projeyi Visual Studio'da Açın:**
    - `AdminPanel.sln` dosyasını Visual Studio 2022 ile açın.

3.  **Veritabanı Bağlantısını Ayarlayın:**
    - `WebApi` projesi içindeki `appsettings.json` dosyasını açın.
    - `ConnectionStrings` bölümündeki `DefaultConnection` değerini kendi MS SQL Server kurulumunuza göre güncelleyin.

4.  **Veritabanını Oluşturun:**
    - Visual Studio'da üst menüden `View > Other Windows > Package Manager Console`'u açın.
    - Açılan konsolda "Default project" olarak `DataAccess`'i seçin.
    - Aşağıdaki komutu çalıştırarak veritabanını ve tabloları oluşturun:
      ```powershell
      Update-Database
      ```
5.  **Uygulamayı Çalıştırın:**
    - `WebApi` projesini "Startup Project" olarak ayarlayın ve çalıştırın (F5).
    - Uygulama başladığında, `Seed.cs` dosyası veritabanını otomatik olarak sahte verilerle dolduracaktır.

### Frontend Kurulumu
1.  **Frontend Klasörüne Gidin:**
    ```bash
    cd erp-project-react-dotnet/adminpanel # Frontend klasörünüzün adı
    ```
2.  **Gerekli Paketleri Yükleyin:**
    ```bash
    npm install
    ```
3.  **Uygulamayı Başlatın:**
    ```bash
    npm start
    ```
    Uygulama `http://localhost:3000` adresinde açılacaktır.

---

## 👤 Yazar

**Çağatay Turunç**
- Bu proje, staj programı kapsamında geliştirilmiştir.
- **GitHub:** [@CagatayTurunc](https://github.com/CagatayTurunc)
- **LinkedIn:** [@cagatayturunc](https://www.linkedin.com/in/cagatayturunc/)
- **E-posta:** cagatayturunc@gmail.com
