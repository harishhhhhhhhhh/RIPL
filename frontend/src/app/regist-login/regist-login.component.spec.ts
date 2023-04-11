import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistLoginComponent } from './regist-login.component';

describe('RegistLoginComponent', () => {
  let component: RegistLoginComponent;
  let fixture: ComponentFixture<RegistLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
