import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminControllsComponentComponent } from './admin-controlls-component.component';

describe('AdminControllsComponentComponent', () => {
  let component: AdminControllsComponentComponent;
  let fixture: ComponentFixture<AdminControllsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminControllsComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminControllsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
