export function saveEncryptedLocal(key: string, data: any): void {
    const json = JSON.stringify(data);
    const encoded = btoa(json); // codifica em base64
    localStorage.setItem(key, encoded);
}

export function loadEncryptedLocal<T>(key: string): T | null {
    const encoded = localStorage.getItem(key);
    if (!encoded) return null;
    try {
        const decoded = atob(encoded);
        return JSON.parse(decoded) as T;
    } catch (e) {
        return null;
    }
}

export function clearEncryptedLocal(key: string): void {
    localStorage.removeItem(key);
}
