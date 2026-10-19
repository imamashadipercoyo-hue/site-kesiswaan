# PANDUAN INTEGRASI DATABASE GOOGLE SHEETS & GOOGLE APPS SCRIPT (GAS)
### Bidang Kesiswaan SMK Negeri 1 Jember (SMESA)

Dokumentasi ini menjelaskan integrasi database sekolah menggunakan **Google Sheets** dan **Google Apps Script Web App** sebagai backend database real-time.

---

## 1. Daftar 18 Tabel Database yang Didukung

| No | Nama Tabel Sheet | Deskripsi Konten | Jumlah Kolom Utama |
|---|---|---|---|
| 1 | `tbl_profil` | Data Profil Sekolah, Sambutan Waka Kesiswaan, Visi, Misi, Budaya 5S, & Ticker | 15 kolom |
| 2 | `tbl_agenda_proker` | Program Kerja Tahunan Kesiswaan (MPLS, LDKS, Peringatan Hari Besar, dll) | 8 kolom |
| 3 | `tbl_struktur_kesiswaan` | Susunan Fungsionaris, Pembina Kesiswaan & Staf Tata Tertib | 7 kolom |
| 4 | `tbl_unduhan_dokumen` | Berkas Resmi Publik (Tata Tertib, SOP Dispensasi, Formulir Izin) | 8 kolom |
| 5 | `tbl_berita` | Publikasi Warta, Berita Kegiatan, dan Pengumuman Kesiswaan | 15 kolom |
| 6 | `tbl_agenda_siswa` | Kalender Kegiatan Siswa, Waktu, Lokasi, dan Penyelenggara | 14 kolom |
| 7 | `tbl_prestasi` | Rekap Prestasi SMESA JUARA (Tingkat Kota, Provinsi, Nasional, Internasional) | 14 kolom |
| 8 | `tbl_ekstrakurikuler` | Data 22 Ekstrakurikuler SMESA, Pembina, Jadwal, & Anggota | 13 kolom |
| 9 | `tbl_galeri` | Dokumentasi Foto & Video Kegiatan Resmi Sekolah | 10 kolom |
| 10 | `tbl_osis_mpk` | Struktur Kepengurusan OSIS & MPK, Visi Misi, Kabinet & Ketua | 16 kolom |
| 11 | `tbl_osis_proker` | Program Kerja Divisi OSIS per Bulan & Status Pelaksanaan | 7 kolom |
| 12 | `tbl_osis_sekbid` | Seksi Bidang (Sekbid 1 - 10) OSIS SMESA beserta Koordinator | 6 kolom |
| 13 | `tbl_mpk_komisi` | Komisi-Komisi Majelis Perwakilan Kelas (MPK SMESA) | 5 kolom |
| 14 | `tbl_pilketos_stages` | Tahapan Pemilihan Ketua & Wakil Ketua OSIS (Pilketos) | 6 kolom |
| 15 | `tbl_aspirasi_siswa` | Pengaduan & Aspirasi Siswa Online (Tiket, Kategori, Respon Admin) | 13 kolom |
| 16 | `tbl_pesan_kontak` | Pesan Masuk Tamu / Wali Murid / Masyarakat | 12 kolom |
| 17 | `tbl_akun_pengguna` | Akun Pengelola Sistem (Administrator & Tim Kesiswaan) | 10 kolom |
| 18 | `tbl_log_audit` | Jejak Audit Log Keamanan & Aktivitas Perubahan Data | 6 kolom |

---

## 2. Langkah-Langkah Deploy Google Apps Script Web App

1. Buka browser dan kunjungi [https://sheets.new](https://sheets.new) untuk membuat Google Spreadsheet baru.
2. Beri nama spreadsheet, contoh: **`Database Kesiswaan SMESA 2026/2027`**.
3. Di bilah menu Google Sheets, klik **Ekstensi** (*Extensions*) -> **Apps Script**.
4. Hapus seluruh baris kode default yang ada di file `Code.gs`.
5. Buka file `src/backend/google-apps-script/Code.gs` dari aplikasi ini (atau klik tombol **Salin Script Code.gs** pada Panel Admin Kesiswaan).
6. Tempelkan seluruh kode tersebut ke editor Apps Script, lalu klik ikon **Simpan** (*Save* / `Ctrl+S`).
7. Klik tombol biru **Terapkan** (*Deploy*) di pojok kanan atas -> pilih **Penerapan baru** (*New deployment*).
8. Klik ikon roda gigi di samping *Select type*, lalu pilih **Aplikasi Web** (*Web App*).
9. Isi konfigurasi sebagai berikut:
   - **Deskripsi**: `Backend Database Kesiswaan SMESA`
   - **Jalankan sebagai** (*Execute as*): `Saya (akun Anda)`
   - **Siapa yang memiliki akses** (*Who has access*): **`Siapa saja` (*Anyone*)** *(Wajib dipilih agar aplikasi web sekolah dapat mengirim & membaca data)*
10. Klik **Terapkan** (*Deploy*).
11. Jika diminta izin akses Google (*Authorization Required*), klik **Tinjau Izin** (*Review Permissions*) -> pilih akun Google Anda -> klik *Advanced* -> klik *Go to (Unsafe)* -> klik **Izinkan** (*Allow*).
12. Salin **URL Aplikasi Web** yang berakhiran `/exec` (misal: `https://script.google.com/macros/s/AKfycb.../exec`).

---

## 3. URL Web App Produksi yang Tertanam (Aktif)

Aplikasi portal kesiswaan SMESA telah dikonfigurasi dengan URL Web App produksi bawaan:
```
https://script.google.com/macros/s/AKfycbzojlOs3z8KGgiHsCEHfnNVe2iriRVBWNVL5WwR3RwWuXwn9aAYI1rKKthao-Yvp9tr/exec
```

Dengan URL ini tertanam:
- Fitur **Auto-Sync Otomatis** aktif secara default.
- Setiap kali ada penambahan atau pengubahan data (berita, agenda, prestasi, aspirasi siswa, pesan buku tamu, dll), data akan otomatis disinkronkan secara mulus ke Google Sheets di latar belakang.
- Panel Admin menyediakan tombol **Tes Koneksi**, **Kirim ke Sheets (Push)**, **Tarik dari Sheets (Pull)**, dan **Inisialisasi Lembar Spreadsheet**.
