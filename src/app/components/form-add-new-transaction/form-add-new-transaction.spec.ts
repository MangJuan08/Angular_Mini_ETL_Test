import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddNewTransaction } from './form-add-new-transaction';

describe('FormAddNewTransaction', () => {
  let component: FormAddNewTransaction;
  let fixture: ComponentFixture<FormAddNewTransaction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddNewTransaction],
    }).compileComponents();

    fixture = TestBed.createComponent(FormAddNewTransaction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
