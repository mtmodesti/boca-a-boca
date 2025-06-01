import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-professionals-list',
  imports: [CommonModule],
  templateUrl: './professionals-list.component.html',
  styleUrl: './professionals-list.component.scss'
})
export class ProfessionalsListComponent implements OnInit{

  @Input() selectedValue: string = ''

  constructor(private userService:UserService){}


  ngOnInit(): void {
    this.getProviders()
  }

  getProviders(){
    this.userService.getAllProviders().subscribe((res) => {
      console.log(res)
    })
  }

}
