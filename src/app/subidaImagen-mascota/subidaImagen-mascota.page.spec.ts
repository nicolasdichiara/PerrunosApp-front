/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubidaImagenMascotaPage } from './subidaImagenMascota.page';

describe('SubidaImagenMascotaPageSpect', () => {
  let component: SubidaImagenMascotaPage;
  let fixture: ComponentFixture<SubidaImagenMascotaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubidaImagenMascotaPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubidaImagenMascotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
