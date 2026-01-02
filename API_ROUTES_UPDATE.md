# 📝 Ažuriranje API Ruta - Poslednje Izmene

**Datum:** $(date)  
**Status:** ✅ Sve izmene su pripremljene za Supabase integraciju

---

## 🆕 Nove API Rute

### 1. Upload Profilne Slike Kreatora
**Ruta:** `POST /api/creators/[id]/photo`  
**Fajl:** `src/app/api/creators/[id]/photo/route.ts`

**Opis:**
- Upload profilne slike za kreatora
- Validacija: samo slike, max 5MB
- U produkciji: upload na Supabase Storage ili AWS S3
- Vraća URL uploadovane slike

**Korišćenje:**
```typescript
const formData = new FormData();
formData.append('photo', file);

const response = await fetch(`/api/creators/${creatorId}/photo`, {
  method: 'POST',
  body: formData,
});
```

### 2. Brisanje Profila Kreatora
**Ruta:** `DELETE /api/creators/me/delete`  
**Fajl:** `src/app/api/creators/me/delete/route.ts`

**Opis:**
- Kreator briše svoj profil
- Soft delete: postavlja status na DEACTIVATED
- Hard delete opcija (komentarisana)

### 3. Brisanje Profila Biznisa
**Ruta:** `DELETE /api/businesses/me/delete`  
**Fajl:** `src/app/api/businesses/me/delete/route.ts`

**Opis:**
- Biznis briše svoj profil
- Otkazuje Stripe subscription ako postoji
- Soft delete opcija

---

## 🔄 Ažurirane Rute

### 1. Business Registration
**Ruta:** `POST /api/businesses`  
**Fajl:** `src/app/api/businesses/route.ts`

**Nova polja:**
- `description?: string` - Opis kompanije
- `website?: string` - Website kompanije
- `industry?: string` - Industrija

### 2. Creator Update
**Ruta:** `PUT /api/creators/[id]`  
**Fajl:** `src/app/api/creators/[id]/route.ts`

**Već podržava:**
- `photo?: string` - URL profilne slike

---

## 📋 Ažurirani Tipovi

### Business Interface
```typescript
export interface Business {
  // ... postojeća polja
  description?: string;  // ✅ NOVO
  website?: string;      // ✅ NOVO
  industry?: string;     // ✅ NOVO
}
```

### CreateBusinessInput
```typescript
export interface CreateBusinessInput {
  // ... postojeća polja
  description?: string;  // ✅ NOVO
  website?: string;      // ✅ NOVO
  industry?: string;     // ✅ NOVO
}
```

### UpdateBusinessInput
```typescript
export interface UpdateBusinessInput {
  // ... postojeća polja
  description?: string;  // ✅ NOVO
  website?: string;      // ✅ NOVO
  industry?: string;     // ✅ NOVO
}
```

---

## 🗃️ Ažurirana Prisma Schema

### Business Model
```prisma
model Business {
  // ... postojeća polja
  description  String?  // ✅ NOVO - Opis kompanije
  website      String?  // ✅ Već postoji
  industry     String?  // ✅ Već postoji
}
```

---

## 📝 Checklist za Supabase Integraciju

### Upload Profilne Slike
- [ ] Setup Supabase Storage bucket `creator-photos`
- [ ] Konfiguriši CORS za bucket
- [ ] Aktiviraj upload endpoint sa Supabase Storage
- [ ] Testiraj upload i validaciju

### Brisanje Profila
- [ ] Implementiraj soft delete logiku
- [ ] Integriši sa Stripe (za biznis - otkazivanje subscription)
- [ ] Dodaj cascade delete za povezane podatke (reviews, favorites, itd.)
- [ ] Testiraj brisanje profila

### Business Informacije
- [ ] Ažuriraj Prisma schema sa `description` poljem
- [ ] Pokreni migraciju
- [ ] Testiraj kreiranje i ažuriranje biznisa sa novim poljima

---

## 🔗 Povezane Funkcionalnosti

### Frontend
- ✅ Upload profilne slike u registraciji kreatora
- ✅ Promena profilne slike u dashboard-u kreatora
- ✅ Promena lozinke u dashboard-u kreatora
- ✅ Brisanje profila (kreator i biznis) u dashboard-u
- ✅ Informacije o kompaniji u dashboard-u biznisa
- ✅ Inline editing za sve sekcije

### Backend (Spremno za aktivaciju)
- ✅ API rute sa placeholder logikom
- ✅ Validacija i error handling
- ✅ Komentarisana Prisma implementacija
- ✅ Komentarisana Supabase Storage implementacija

---

## ⚠️ Napomene

1. **Upload Slika:** Trenutno vraća mock URL. U produkciji, upload na Supabase Storage i vraćanje public URL-a.

2. **Brisanje Profila:** Trenutno samo simulacija. U produkciji, soft delete (status = DEACTIVATED) ili hard delete sa cascade.

3. **Business Info:** Nova polja su opciona, ali su pripremljena za obavezna polja u budućnosti.

---

**Sve izmene su spremne za Supabase integraciju!** 🚀





