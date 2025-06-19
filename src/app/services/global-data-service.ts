import { Injectable, signal } from '@angular/core';
import { loadEncryptedLocal } from '../utils/utils';

@Injectable({
    providedIn: 'root',
})
export class GlobalDataService {

    // Signal público e reativo diretamente
    user = signal<any | null>(null);

    constructor() {
        const stored = loadEncryptedLocal<any>('app_user');
        if (stored) {
            this.user.set(stored);
        }
    }

    // Método para atualizar o usuário (login)
    setUser(userInfo: any): void {
        this.user.set(userInfo);
    }

    // Método para limpar o usuário (logout)
    clearUser(): void {
        this.user.set(null);
    }
}
