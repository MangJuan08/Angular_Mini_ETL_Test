import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTransazioni } from './lista-transazioni';

describe('ListaTransazioni', () => {
  let component: ListaTransazioni;
  let fixture: ComponentFixture<ListaTransazioni>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTransazioni],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaTransazioni);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
