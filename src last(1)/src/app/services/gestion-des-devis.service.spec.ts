import { TestBed } from '@angular/core/testing';

import { GestionDesDevisService } from './gestion-des-devis.service';

describe('GestionDesDevisService', () => {
  let service: GestionDesDevisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionDesDevisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
