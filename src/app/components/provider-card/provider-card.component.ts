import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-provider-card',
  imports: [],
  templateUrl: './provider-card.component.html',
  styleUrl: './provider-card.component.scss'
})
export class ProviderCardComponent {
  @Input() user: any;
  @Input() job: any;

}
