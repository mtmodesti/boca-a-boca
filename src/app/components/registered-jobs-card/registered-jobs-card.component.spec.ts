import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredJobsCardComponent } from './registered-jobs-card.component';

describe('RegisteredJobsCardComponent', () => {
  let component: RegisteredJobsCardComponent;
  let fixture: ComponentFixture<RegisteredJobsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredJobsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredJobsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
