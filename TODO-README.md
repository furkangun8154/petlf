## ✓ TodoApp - To-Do List with Local Storage

Modern ve mobil-optimized bir görev listesi uygulaması. Local Storage kullanarak verilerinizi tarayıcıda güvenli bir şekilde saklar.

---

## 🎯 Özellikler

### ✨ Temel İşlevler
- ✅ **Görev Ekleme** - Yeni görevler ekle
- ✅ **Görev Tamamlama** - Checkbox ile görevleri işaretle
- ✅ **Görev Düzenleme** - Mevcut görevleri düzenle (✏️)
- ✅ **Görev Silme** - Tek tek görev sil (🗑️)
- ✅ **Hızlı Filtre** - Tümü / Aktif / Tamamlanan

### 💾 Local Storage Özellikleri
- 📱 **Tarayıcı Belleğine Saklama** - Veriler kalıcı olarak kaydedilir
- 🔄 **Otomatik Kaydetme** - Her işlem anında kaydedilir
- 📤 **CSV Dışa Aktarma** - Görevleri indirilebilir dosya olarak indir
- 🔄 **Sıfırlama Seçeneği** - Tüm verileri temizle

### 📊 İstatistikler & Takip
- 📊 **Toplam Görev Sayacı**
- ✓ **Tamamlanan Görev Sayacı**
- 📈 **İlerleme Yüzdesi**
- 📊 **Görsel İlerleme Çubuğu**

### 🎨 Tasarım Özellikleri
- 📱 **Responsive Design** - Tüm cihazlarda mükemmel görünüm
- 🎨 **Modern UI** - Gradient ve smooth animasyonlar
- 🌙 **Smooth Transitions** - Akışkan geçişler
- 🎯 **Kullanıcı Dostu** - İntuitive arayüz

---

## 🚀 Nasıl Kullanılır?

### 1. Dosyaları İndir
```
todo-index.html
todo-app.js
todo-style.css
```

### 2. HTML Dosyasını Aç
Tarayıcıda `todo-index.html` dosyasını açın.

### 3. Görevleri Yönet
- Metin kutusuna görev yazın
- **+** butonuna tıklayın veya Enter tuşuna basın
- Checkbox ile görev tamamlayın
- ✏️ butonuyla düzenleyin
- 🗑️ butonuyla silin

---

## 💾 Local Storage Nasıl Çalışır?

TodoApp, tarayıcının Local Storage API'sini kullanarak görevlerinizi kaydeder.

### Depolanan Veriler
```json
{
  "id": 1622548800000,
  "text": "Görev metni",
  "completed": false,
  "createdAt": "01.06.2026, 15:20:00"
}
```

### Avantajları
- ✅ İnternet bağlantısı gerekmez
- ✅ Veriler tarayıcı kapatılsa bile kalır
- ✅ Güvenli ve özel
- ✅ Hızlı erişim

---

## 🎛️ İşlevler Detaylı

### Filtreleme
- **Tümü** - Tüm görevleri göster
- **Aktif** - Sadece tamamlanmamış görevleri göster
- **Tamamlanan** - Sadece tamamlanmış görevleri göster

### İşlemler
- **Tamamlanmışları Temizle** - Tüm tamamlanan görevleri sil
- **Dışa Aktar** - CSV dosyası olarak indir
- **Sıfırla** - Tüm görevleri sil (Geri alınamaz!)

---

## 📋 Teknik Detaylar

### Teknoloji Stack
- **HTML5** - Struktur
- **CSS3** - Tasarım ve animasyonlar
- **Vanilla JavaScript** - İşlevsellik
- **Local Storage API** - Veri saklama

### Tarayıcı Uyumluluğu
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobil tarayıcılar

### Dosya Boyutları
- `todo-index.html` - ~3.9 KB
- `todo-app.js` - ~7.4 KB
- `todo-style.css` - ~7.5 KB

---

## 🔒 Veri Güvenliği

TodoApp tamamen islim çalışır ve sunucuya veri göndermez.
- Veriler sadece tarayıcı belleğinde saklanır
- Başka siteler veya uygulamalar verilerinize erişemez
- Sadece siz silinceye kadar kalır

---

## 📝 Klavye Kısayolları

| Kısayol | İşlev |
|---------|-------|
| **Enter** | Görev ekle |
| **Click** ✏️ | Düzenle |
| **Click** 🗑️ | Sil |
| **Click** ✓ | Tamamla/Tamamlanmadı olarak işaretle |

---

## 🎨 Kustomizasyon

CSS dosyasındaki renkleri değiştirmek için:

```css
:root {
    --primary: #FF6B9D;        /* Ana renk */
    --secondary: #C06C84;      /* İkinci renk */
    --success: #6BCB77;        /* Başarı yeşili */
    --danger: #FF6B6B;         /* Silme kırmızısı */
    --warning: #FFA502;        /* Uyarı sarısı */
}
```

---

## 🐛 Bilinen Limitler

- **100 karakterlik görev sınırı** - Çok uzun metinler kısaltılır
- **Local Storage limiti** - ~5-10MB (tarayıcıya göre değişir)
- **Offline kullanım** - İnternet olmadan çalışır ama yeni veri yüklenemez

---

## 🔄 Gelecek Özellikler

- 🏷️ Etiketlendirme sistemi
- 📅 Tarih ve son tarih ekleme
- 🔔 Bildirimler
- 🌓 Koyu tema
- 💬 Notlar ekleme
- 🔍 Arama fonksiyonu
- 📊 Detaylı istatistikler

---

## 📄 Lisans

Bu proje açık kaynaktır ve herkes tarafından kullanılabilir.

---

## 💬 Geri Bildirim

Hata buldum veya önerim var mı? GitHub Issues'ta bana ulaş!

**Repo:** https://github.com/furkangun8154/petlf

---

**Keyifli görev yönetimine!** ✓