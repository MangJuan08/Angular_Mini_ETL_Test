import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransazionePagina } from './transazione-pagina';

describe('TransazionePagina', () => {
  let component: TransazionePagina;
  let fixture: ComponentFixture<TransazionePagina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransazionePagina],
    }).compileComponents();

    fixture = TestBed.createComponent(TransazionePagina);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
