import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MascotaDetailPage } from './mascota-detail.page';

describe('MascotaDetailPage', () => {
  let component: MascotaDetailPage;
  let fixture: ComponentFixture<MascotaDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotaDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MascotaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
