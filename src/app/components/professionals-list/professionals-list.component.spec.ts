import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalsListComponent } from './professionals-list.component';

describe('ProfessionalsListComponent', () => {
  let component: ProfessionalsListComponent;
  let fixture: ComponentFixture<ProfessionalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
