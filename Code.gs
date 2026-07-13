const SHEET_NAME = 'Registros';

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('No existe una hoja llamada "' + SHEET_NAME + '".');

  const data = e.parameter || {};
  sheet.appendRow([
    new Date(),
    data.nombre || '',
    data.ubicacion || '',
    data.whatsapp || '',
    data.origen || 'Landing Pastoral Juvenil 2026',
    data.utm_source || '',
    data.utm_medium || '',
    data.utm_campaign || '',
    data.utm_content || '',
    data.dispositivo || '',
    data.pagina || '',
    data.referencia || '',
    data.navegador || '',
    'Nuevo'
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'Pastoral Juvenil Leads' }))
    .setMimeType(ContentService.MimeType.JSON);
}
