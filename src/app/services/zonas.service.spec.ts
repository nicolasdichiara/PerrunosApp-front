/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ZonasService } from './zonas.service';

describe('Service: Zonas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZonasService]
    });
  });

  it('should ...', inject([ZonasService], (service: ZonasService) => {
    expect(service).toBeTruthy();
  }));
});
