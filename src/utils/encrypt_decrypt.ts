function encrypt(text: string, secret: string): string {
    const encryptsc = btoa(secret);
    return btoa(text + encryptsc);
}

function decrypt(text: string, secret: string): string {
    const decryptsc = btoa(secret);
    return atob(text).replace(decryptsc, '');
}

export { encrypt, decrypt };