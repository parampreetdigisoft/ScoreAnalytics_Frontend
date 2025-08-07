import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCityComponent } from './add-update-city.component';

describe('AddUpdateCityComponent', () => {
  let component: AddUpdateCityComponent;
  let fixture: ComponentFixture<AddUpdateCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateCityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
