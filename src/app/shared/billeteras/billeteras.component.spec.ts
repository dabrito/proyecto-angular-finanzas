import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleterasComponent } from './billeteras.component';

describe('BilleterasComponent', () => {
  let component: BilleterasComponent;
  let fixture: ComponentFixture<BilleterasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilleterasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BilleterasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
