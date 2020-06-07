import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MascotaAddPage } from './mascota-add.page';

describe('MascotaAddPage', () => {
  let component: MascotaAddPage;
  let fixture: ComponentFixture<MascotaAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotaAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MascotaAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
