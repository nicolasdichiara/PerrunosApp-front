import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromocionAgregarPage } from './promocion-agregar.page';

describe('PromocionAgregarPage', () => {
  let component: PromocionAgregarPage;
  let fixture: ComponentFixture<PromocionAgregarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromocionAgregarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromocionAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
