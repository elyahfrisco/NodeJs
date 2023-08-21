const path = require('path');
const QRCode = require('qrcode');

async function qrcode(libelle, description, photo){
    const qrCodeData = `Libellé: ${libelle}, Description: ${description}, Photo: ${photo}`;
    const qrCodeFileName = Date.now() + '-qrcode.png';
    await QRCode.toFile(path.join('qrcodes/', qrCodeFileName), qrCodeData);
    return qrCodeFileName;
}

module.exports = qrcode;