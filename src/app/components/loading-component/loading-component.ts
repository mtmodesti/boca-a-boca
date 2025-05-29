import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-loading-component',
  imports: [CommonModule],
  templateUrl: './loading-component.html',
  styleUrl: './loading-component.scss'
})
export class LoadingComponent {
  private loadingService = inject(LoadingService);

  // Use a signal diretamente
  isLoading = this.loadingService.loading;


  constructor() {

  }
}
