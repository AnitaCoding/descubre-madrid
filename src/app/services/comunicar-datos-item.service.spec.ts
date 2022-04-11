import { TestBed } from '@angular/core/testing';

import { ComunicarDatosItemService } from './comunicar-datos-item.service';

describe('ComunicarDatosItemService', () => {
  let service: ComunicarDatosItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicarDatosItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
