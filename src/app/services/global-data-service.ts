import { Injectable, computed, signal } from '@angular/core';
import { loadEncryptedLocal } from '../utils/utils';



@Injectable({
    providedIn: 'root',
})
export class GlobalDataService {

    constructor() {
        const stored = loadEncryptedLocal<any>('app_user');
        if (stored) {
            this._user.set(stored);
        }
    }

    // Signal privado para controle interno
    private _user = signal<any | null>(null);

    // Signal público somente leitura
    readonly user = computed(() => this._user());

    // Método para atualizar o usuário
    setUser(userInfo: any): void {
        this._user.set(userInfo);
    }

    // Método para limpar o usuário (logout)
    clearUser(): void {
        this._user.set(null);
    }
}