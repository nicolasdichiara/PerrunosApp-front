/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubidaImagenPage } from './subidaImagen.page';

describe('SubidaImagenComponent', () => {
  let component: SubidaImagenPage;
  
  let fixture: ComponentFixture<SubidaImagenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubidaImagenPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubidaImagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
