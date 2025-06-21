import { Injectable, signal } from '@angular/core';
import { loadEncryptedLocal } from '../utils/utils';

@Injectable({
    providedIn: 'root',
})
export class GlobalDataService {
    user = signal<any | null>(null);

    // Novo signal para avisar atualizações genéricas
    private _dataUpdated = signal(false);
    dataUpdated = this._dataUpdated.asReadonly();

    constructor() {
        const stored = loadEncryptedLocal<any>('app_user');
        if (stored) {
            this.user.set(stored);
        }
    }

    setUser(userInfo: any): void {
        this.user.set(userInfo);
    }

    clearUser(): void {
        this.user.set(null);
    }

    // Método para notificar atualização de dados
    notifyDataUpdated(): void {
        this._dataUpdated.set(true);
        // Resetar para false rapidamente para que subscribers possam disparar novamente depois
        setTimeout(() => this._dataUpdated.set(false), 0);
    }
}
