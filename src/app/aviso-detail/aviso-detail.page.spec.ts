import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvisoDetailPage } from './aviso-detail.page';

describe('AvisoDetailPage', () => {
  let component: AvisoDetailPage;
  let fixture: ComponentFixture<AvisoDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
