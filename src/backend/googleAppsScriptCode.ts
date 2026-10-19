/**
 * Kode Google Apps Script (Code.gs) untuk Backend Database Kesiswaan SMESA
 */
export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * =========================================================================
 * BACKEND GOOGLE APPS SCRIPT - DATABASE KESISWAAN SMK NEGERI 1 JEMBER (SMESA)
 * =========================================================================
 * 
 * Skrip ini bertindak sebagai backend REST API tanpa server (serverless) yang
 * menghubungkan aplikasi web Kesiswaan SMESA secara langsung ke Google Sheets.
 * Seluruh 18 tabel kesiswaan tersimpan sebagai lembar (sheet) terpisah dengan
 * struktur kolom yang telah terformat otomatis.
 * 
 * FITUR UTAMA:
 * 1. Otomatisasi Pembuatan 18 Tabel & Header Terformat (Navy/Gold SMESA)
 * 2. API Endpoint HTTP GET (Ping, Ambil Semua Data, Ambil Per Tabel)
 * 3. API Endpoint HTTP POST (Sinkronisasi Penuh, Tambah/Edit Data, Hapus Data)
 * 4. Menu Kustom "SMESA Kesiswaan" di bilah menu Google Sheets
 * 5. Dukungan CORS & Respon JSON Standar untuk Web App Frontend
 * 
 * PETUNJUK DEPLOY:
 * 1. Buat Google Spreadsheet baru di Google Drive (misal: "Database Kesiswaan SMESA")
 * 2. Klik menu 'Ekstensi' (Extensions) -> 'Apps Script'
 * 3. Hapus semua kode default, lalu tempelkan seluruh kode ini ke 'Code.gs'
 * 4. Klik tombol 'Terapkan' (Deploy) -> 'Penerapan baru' (New deployment)
 * 5. Pilih jenis: 'Aplikasi Web' (Web App)
 * 6. Konfigurasi:
 *    - Deskripsi: Backend Database Kesiswaan SMESA
 *    - Jalankan sebagai: Saya (email Anda)
 *    - Siapa yang memiliki akses: Siapa saja (Anyone)
 * 7. Klik 'Terapkan' (Deploy) dan salin URL Aplikasi Web (Web App URL)
 * 8. Tempelkan URL tersebut ke Panel Admin Kesiswaan pada menu "Database & Google Sheets"
 * =========================================================================
 */

// Konfigurasi Nama Tabel Database (18 Tabel)
var TABLES = {
  PROFIL: 'tbl_profil',
  AGENDA_PROKER: 'tbl_agenda_proker',
  STRUKTUR_KESISWAAN: 'tbl_struktur_kesiswaan',
  UNDUHAN_DOKUMEN: 'tbl_unduhan_dokumen',
  BERITA: 'tbl_berita',
  AGENDA_SISWA: 'tbl_agenda_siswa',
  PRESTASI: 'tbl_prestasi',
  EKSTRAKURIKULER: 'tbl_ekstrakurikuler',
  GALERI: 'tbl_galeri',
  OSIS_MPK: 'tbl_osis_mpk',
  OSIS_PROKER: 'tbl_osis_proker',
  OSIS_SEKBID: 'tbl_osis_sekbid',
  MPK_KOMISI: 'tbl_mpk_komisi',
  PILKETOS_STAGES: 'tbl_pilketos_stages',
  ASPIRASI_SISWA: 'tbl_aspirasi_siswa',
  PESAN_KONTAK: 'tbl_pesan_kontak',
  AKUN_PENGGUNA: 'tbl_akun_pengguna',
  LOG_AUDIT: 'tbl_log_audit'
};

// Skema Kolom untuk Masing-masing Tabel Database
var TABLE_SCHEMAS = {};

TABLE_SCHEMAS[TABLES.PROFIL] = [
  'id', 'schoolName', 'tagline', 'wakaName', 'wakaTitle', 'wakaGreeting', 
  'wakaPhoto', 'vision', 'missions', 'overview', 'rolesAndFunctions', 
  'disciplineTitle', 'disciplinePoints', 'runningAnnouncement', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.AGENDA_PROKER] = [
  'id', 'title', 'category', 'period', 'target', 'description', 'status', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.STRUKTUR_KESISWAAN] = [
  'id', 'title', 'name', 'role', 'desc', 'avatar', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.UNDUHAN_DOKUMEN] = [
  'id', 'title', 'category', 'format', 'size', 'updated', 'url', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.BERITA] = [
  'id', 'title', 'slug', 'excerpt', 'content', 'category', 'author', 
  'authorRole', 'date', 'readTime', 'imageUrl', 'status', 'tags', 'views', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.AGENDA_SISWA] = [
  'id', 'title', 'category', 'startDate', 'endDate', 'time', 'location', 
  'organizer', 'description', 'status', 'targetAudience', 'contactPerson', 'posterUrl', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.PRESTASI] = [
  'id', 'title', 'competitionName', 'award', 'category', 'level', 
  'year', 'date', 'students', 'gradeAndMajor', 'description', 'imageUrl', 'featured', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.EKSTRAKURIKULER] = [
  'id', 'name', 'shortName', 'category', 'description', 'purpose', 
  'mentorName', 'schedule', 'location', 'achievements', 'imageUrl', 'memberCount', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.GALERI] = [
  'id', 'title', 'description', 'category', 'type', 'url', 'date', 'year', 'photographer', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.OSIS_MPK] = [
  'id', 'period', 'cabinetName', 'chiefName', 'chiefClass', 'chiefAvatar', 
  'viceChiefName', 'viceChiefClass', 'viceChiefAvatar', 'osisVision', 'osisMissions', 
  'osisDescription', 'mpkChiefName', 'mpkChiefClass', 'mpkDescription', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.OSIS_PROKER] = [
  'id', 'name', 'division', 'month', 'status', 'desc', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.OSIS_SEKBID] = [
  'id', 'num', 'title', 'coordinator', 'desc', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.MPK_KOMISI] = [
  'id', 'name', 'focus', 'members', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.PILKETOS_STAGES] = [
  'id', 'stage', 'date', 'status', 'desc', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.ASPIRASI_SISWA] = [
  'id', 'ticketNumber', 'name', 'isAnonymous', 'studentClass', 'category', 
  'title', 'content', 'createdAt', 'status', 'adminResponse', 'respondedAt', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.PESAN_KONTAK] = [
  'id', 'ticketNumber', 'fullName', 'email', 'phone', 'topic', 
  'subject', 'message', 'createdAt', 'isRead', 'status', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.AKUN_PENGGUNA] = [
  'id', 'name', 'email', 'role', 'avatar', 'status', 'phone', 'createdAt', 'lastLogin', 'updatedAt'
];

TABLE_SCHEMAS[TABLES.LOG_AUDIT] = [
  'id', 'timestamp', 'performedBy', 'action', 'module', 'details'
];

/**
 * Menu Kustom saat spreadsheet dibuka oleh Pengelola Sekolah
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('🏛️ SMESA Kesiswaan')
    .addItem('⚙️ Inisialisasi Seluruh Tabel Database (18 Tabel)', 'initAllTables')
    .addItem('📊 Cek Status & Jumlah Baris Database', 'checkDatabaseSummary')
    .addSeparator()
    .addItem('📋 Buka Informasi Web App Deployment', 'showDeploymentInfo')
    .addToUi();
}

/**
 * Inisialisasi Seluruh 18 Lembar Tabel dengan Header Terformat
 */
function initAllTables() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tablesCreated = 0;

  for (var key in TABLES) {
    var tableName = TABLES[key];
    var sheet = ss.getSheetByName(tableName);
    var columns = TABLE_SCHEMAS[tableName];

    if (!sheet) {
      sheet = ss.insertSheet(tableName);
      tablesCreated++;
    }

    // Set Header
    if (columns && columns.length > 0) {
      sheet.getRange(1, 1, 1, columns.length).setValues([columns]);
      
      // Format Header Style: Dark Blue Navy & Gold Accent
      var headerRange = sheet.getRange(1, 1, 1, columns.length);
      headerRange.setBackground('#0b192c'); // Navy Kesiswaan SMESA
      headerRange.setFontColor('#f59e0b'); // Emas/Gold
      headerRange.setFontWeight('bold');
      headerRange.setFontFamily('Arial');
      headerRange.setHorizontalAlignment('center');
      sheet.setFrozenRows(1);

      // Auto resize columns
      for (var i = 1; i <= columns.length; i++) {
        sheet.setColumnWidth(i, 160);
      }
    }
  }

  // Hapus Sheet1 default jika ada
  var defaultSheet = ss.getSheetByName('Sheet1') || ss.getSheetByName('Lembar1');
  if (defaultSheet && ss.getSheets().length > 1) {
    try {
      ss.deleteSheet(defaultSheet);
    } catch (e) {}
  }

  return {
    status: 'success',
    message: 'Seluruh 18 tabel database kesiswaan berhasil diinisialisasi.',
    tablesCount: Object.keys(TABLES).length
  };
}

/**
 * Ringkasan Status Database
 */
function checkDatabaseSummary() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var summary = [];
  
  for (var key in TABLES) {
    var tableName = TABLES[key];
    var sheet = ss.getSheetByName(tableName);
    var rows = sheet ? Math.max(0, sheet.getLastRow() - 1) : 0;
    summary.push(tableName + ': ' + rows + ' baris');
  }

  var msg = '📊 STATUS DATABASE KESISWAAN SMESA:\\n\\n' + summary.join('\\n');
  SpreadsheetApp.getUi().alert('Ringkasan Database', msg, SpreadsheetApp.getUi().ButtonSet.OK);
}

function showDeploymentInfo() {
  var msg = 'Untuk menghubungkan ke aplikasi web:\\n\\n' +
    '1. Pastikan Anda sudah klik Deploy -> New Deployment -> Web App.\\n' +
    '2. Akses pilih "Anyone".\\n' +
    '3. Salin URL Web App dan tempelkan ke Panel Admin Kesiswaan SMESA menu Database & Google Sheets.';
  SpreadsheetApp.getUi().alert('Panduan Web App', msg, SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * HTTP GET Handler (CORS Friendly)
 */
function doGet(e) {
  var params = e ? e.parameter : {};
  var action = params.action || 'ping';
  var responseData = {};

  try {
    if (action === 'ping') {
      responseData = {
        status: 'success',
        message: 'Koneksi Google Apps Script Backend Kesiswaan SMESA Aktif & Siap Digunakan.',
        spreadsheetName: SpreadsheetApp.getActiveSpreadsheet().getName(),
        spreadsheetId: SpreadsheetApp.getActiveSpreadsheet().getId(),
        timestamp: new Date().toISOString(),
        tablesSupported: Object.keys(TABLES).length
      };
    } else if (action === 'init') {
      responseData = initAllTables();
    } else if (action === 'getAll') {
      responseData = {
        status: 'success',
        timestamp: new Date().toISOString(),
        data: fetchAllTablesData()
      };
    } else if (action === 'getTable') {
      var tableName = params.table;
      if (!tableName) {
        throw new Error('Parameter "table" wajib disertakan.');
      }
      responseData = {
        status: 'success',
        table: tableName,
        rows: fetchSingleTableData(tableName)
      };
    } else {
      responseData = {
        status: 'error',
        message: 'Aksi GET "' + action + '" tidak dikenali.'
      };
    }
  } catch (err) {
    responseData = {
      status: 'error',
      message: err.toString()
    };
  }

  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * HTTP POST Handler (CORS Friendly)
 */
function doPost(e) {
  var responseData = {};

  try {
    var rawContent = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var payload = JSON.parse(rawContent);
    var action = payload.action || 'ping';

    if (action === 'ping') {
      responseData = {
        status: 'success',
        message: 'PONG: Google Apps Script Backend SMESA merespon POST request dengan baik.',
        timestamp: new Date().toISOString()
      };
    } else if (action === 'initSpreadsheet') {
      responseData = initAllTables();
    } else if (action === 'syncAll') {
      // Sinkronisasi data seluruh tabel dari frontend
      var dataObj = payload.data || {};
      responseData = handleSyncAll(dataObj);
    } else if (action === 'saveItem') {
      // Simpan / update satu item pada tabel tertentu
      var targetTable = payload.table;
      var item = payload.item;
      responseData = handleSaveItem(targetTable, item);
    } else if (action === 'deleteItem') {
      // Hapus satu item berdasarkan ID
      var delTable = payload.table;
      var delId = payload.id;
      responseData = handleDeleteItem(delTable, delId);
    } else if (action === 'submitAspiration') {
      // Pengiriman aspirasi siswa
      responseData = handleSaveItem(TABLES.ASPIRASI_SISWA, payload.item);
    } else if (action === 'submitContact') {
      // Pengiriman pesan kontak publik
      responseData = handleSaveItem(TABLES.PESAN_KONTAK, payload.item);
    } else {
      responseData = {
        status: 'error',
        message: 'Aksi POST "' + action + '" tidak didukung.'
      };
    }
  } catch (err) {
    responseData = {
      status: 'error',
      message: err.toString()
    };
  }

  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Helper: Ambil seluruh data dari semua tabel
 */
function fetchAllTablesData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var allData = {};

  for (var key in TABLES) {
    var tableName = TABLES[key];
    allData[tableName] = fetchSingleTableData(tableName);
  }

  return allData;
}

/**
 * Helper: Ambil baris dari 1 tabel sebagai array of object
 */
function fetchSingleTableData(tableName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(tableName);
  if (!sheet) return [];

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow <= 1 || lastCol === 0) return [];

  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var values = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
  var results = [];

  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var obj = {};
    var hasContent = false;

    for (var j = 0; j < headers.length; j++) {
      var header = headers[j];
      var val = row[j];

      if (val !== '' && val !== null && val !== undefined) {
        hasContent = true;
      }

      // Parse JSON string jika nilai kolom diawali dengan [ atau {
      if (typeof val === 'string' && (val.charAt(0) === '[' || val.charAt(0) === '{')) {
        try {
          val = JSON.parse(val);
        } catch (e) {}
      }

      obj[header] = val;
    }

    if (hasContent) {
      results.push(obj);
    }
  }

  return results;
}

/**
 * Helper: Simpan atau Perbarui Seluruh Tabel (Sync All)
 */
function handleSyncAll(dataObj) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var updatedTables = [];

  for (var tableName in dataObj) {
    var items = dataObj[tableName];
    if (!Array.isArray(items)) {
      if (typeof items === 'object' && items !== null) {
        items = [items];
      } else {
        continue;
      }
    }

    var sheet = ss.getSheetByName(tableName);
    var schema = TABLE_SCHEMAS[tableName];

    if (!sheet) {
      sheet = ss.insertSheet(tableName);
    }

    if (!schema) {
      schema = items.length > 0 ? Object.keys(items[0]) : ['id', 'updatedAt'];
    }

    // Bersihkan isi lembar
    sheet.clear();

    // Buat Header
    sheet.getRange(1, 1, 1, schema.length).setValues([schema]);
    var headerRange = sheet.getRange(1, 1, 1, schema.length);
    headerRange.setBackground('#0b192c');
    headerRange.setFontColor('#f59e0b');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);

    // Tulis baris data
    if (items.length > 0) {
      var rowsToWrite = [];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var row = [];
        for (var j = 0; j < schema.length; j++) {
          var colName = schema[j];
          var cellVal = item[colName];

          if (colName === 'updatedAt' && !cellVal) {
            cellVal = new Date().toISOString();
          }

          if (typeof cellVal === 'object' && cellVal !== null) {
            cellVal = JSON.stringify(cellVal);
          } else if (cellVal === undefined || cellVal === null) {
            cellVal = '';
          }

          row.push(cellVal);
        }
        rowsToWrite.push(row);
      }

      sheet.getRange(2, 1, rowsToWrite.length, schema.length).setValues(rowsToWrite);
    }

    updatedTables.push({ table: tableName, rowsCount: items.length });
  }

  return {
    status: 'success',
    message: 'Sinkronisasi seluruh database kesiswaan ke Google Sheets berhasil diselesaikan.',
    syncedTables: updatedTables,
    timestamp: new Date().toISOString()
  };
}

/**
 * Helper: Simpan / Perbarui single item
 */
function handleSaveItem(tableName, item) {
  if (!tableName || !item) {
    throw new Error('Nama tabel dan data item wajib diberikan.');
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(tableName);
  var schema = TABLE_SCHEMAS[tableName];

  if (!sheet) {
    sheet = ss.insertSheet(tableName);
    if (schema) {
      sheet.getRange(1, 1, 1, schema.length).setValues([schema]);
      var hr = sheet.getRange(1, 1, 1, schema.length);
      hr.setBackground('#0b192c');
      hr.setFontColor('#f59e0b');
      hr.setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
  }

  if (!schema) {
    var headerValues = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    schema = headerValues.length > 0 ? headerValues : Object.keys(item);
  }

  item.updatedAt = new Date().toISOString();
  var itemId = item.id || ('smesa-' + new Date().getTime());
  item.id = itemId;

  var lastRow = sheet.getLastRow();
  var existingRowIndex = -1;

  if (lastRow > 1) {
    var idColValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var r = 0; r < idColValues.length; r++) {
      if (String(idColValues[r][0]) === String(itemId)) {
        existingRowIndex = r + 2;
        break;
      }
    }
  }

  var rowData = [];
  for (var k = 0; k < schema.length; k++) {
    var key = schema[k];
    var val = item[key];
    if (typeof val === 'object' && val !== null) {
      val = JSON.stringify(val);
    } else if (val === undefined || val === null) {
      val = '';
    }
    rowData.push(val);
  }

  if (existingRowIndex > 0) {
    sheet.getRange(existingRowIndex, 1, 1, schema.length).setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }

  return {
    status: 'success',
    message: 'Data berhasil disimpan ke lembar ' + tableName,
    id: itemId,
    timestamp: new Date().toISOString()
  };
}

/**
 * Helper: Hapus item berdasarkan ID
 */
function handleDeleteItem(tableName, itemId) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(tableName);
  if (!sheet) {
    throw new Error('Tabel ' + tableName + ' tidak ditemukan.');
  }

  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return { status: 'success', message: 'Tabel kosong, tidak ada baris yang dihapus.' };
  }

  var idColValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (var r = 0; r < idColValues.length; r++) {
    if (String(idColValues[r][0]) === String(itemId)) {
      sheet.deleteRow(r + 2);
      return {
        status: 'success',
        message: 'Baris dengan ID ' + itemId + ' berhasil dihapus dari ' + tableName
      };
    }
  }

  return {
    status: 'not_found',
    message: 'Data dengan ID ' + itemId + ' tidak ditemukan di ' + tableName
  };
}
`;
