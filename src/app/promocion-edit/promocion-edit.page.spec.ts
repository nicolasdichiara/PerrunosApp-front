import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromocionEditPage } from './promocion-edit.page';

describe('PromocionEditPage', () => {
  let component: PromocionEditPage;
  let fixture: ComponentFixture<PromocionEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromocionEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromocionEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
