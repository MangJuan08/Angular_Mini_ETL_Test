import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTransazioniPerData } from './lista-transazioni-per-data';

describe('ListaTransazioniPerData', () => {
  let component: ListaTransazioniPerData;
  let fixture: ComponentFixture<ListaTransazioniPerData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTransazioniPerData],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaTransazioniPerData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
