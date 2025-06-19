import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-registered-jobs-card',
  imports: [],
  templateUrl: './registered-jobs-card.component.html',
  styleUrl: './registered-jobs-card.component.scss'
})
export class RegisteredJobsCardComponent {

  @Input() job: any;



}
