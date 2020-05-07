const CryptoJS = require('crypto-js');  //引用AES源码js
const NodeRSA = require('node-rsa');  //引用RES源码js
function getAesString(data, key, iv) {
    var key = CryptoJS.enc.Utf8.parse(key);
    var iv = CryptoJS.enc.Utf8.parse(iv);
    var src = CryptoJS.enc.Utf8.parse(data);
    var encrypted = CryptoJS.AES.encrypt(src, key, {
        iv: iv,
        mode: CryptoJS.mode.OFB,
        padding: CryptoJS.pad.NoPadding
    });
    var hexStr = encrypted.toString();
    return hexStr
}

function aesDecrypt(data, key, iv) {
    var key = CryptoJS.enc.Utf8.parse(key);
    var iv = CryptoJS.enc.Utf8.parse(iv);
    var decrypt = CryptoJS.AES.decrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.OFB,
        padding: CryptoJS.pad.NoPadding
    });
    var decryptedStr = CryptoJS.enc.Utf8.stringify(decrypt).toString();   //decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr;
}

export const getAES = (data) =>{
    var key = 'bcbu-2019@com.cn';
    var iv = 'bcbu-2019@com.cn';
    var encrypted = getAesString(data, key, iv);
    return encrypted
}

export const getAESDecrypt = (data) => {
    var key = 'bcbu-2019@com.cn';
    var iv = 'bcbu-2019@com.cn';
    var encrypted = aesDecrypt(data, key, iv);
    return encrypted
}

export const getRSA = (data) =>{
    var encrypted = getRSAString(data);
    return encrypted
}

function getRSAString(data) {
    var key = new NodeRSA('-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIkkJwl4MM/916GRwdViZExN6Mbit/bnUzoUy7oHgreq/SdPAB+0rwcj\nHzzrU7x0p8aavWliWeOw2xa0Y6l+xnKDNndc5pI2gbVC28dcBt+tQrlJvNcNlbL6\nNfYvmHqCFf2QOxcBUyEkgR/eKG+gR9HOE7aby+i7vtF4DPzpfEplAgMBAAE=\n-----END RSA PUBLIC KEY-----\n');
    key.setOptions({encryptionScheme: 'pkcs1'})
    return key.encrypt(data,'base64');
}

