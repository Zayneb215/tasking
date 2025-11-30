import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgisterForm } from './resgister-form';

describe('ResgisterForm', () => {
  let component: ResgisterForm;
  let fixture: ComponentFixture<ResgisterForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResgisterForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResgisterForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
