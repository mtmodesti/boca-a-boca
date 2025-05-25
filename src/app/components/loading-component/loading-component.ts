import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-loading-component',
  imports: [CommonModule],
  templateUrl: './loading-component.html',
  styleUrl: './loading-component.scss'
})
export class LoadingComponent {

  isLoading: boolean = false

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe(status => {
      this.isLoading = status;
    });
  }
}
