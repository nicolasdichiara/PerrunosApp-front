import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromocionDetailPage } from './promocion-detail.page';

describe('PromocionDetailPage', () => {
  let component: PromocionDetailPage;
  let fixture: ComponentFixture<PromocionDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromocionDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromocionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
