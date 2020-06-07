import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MascotaEditPage } from './mascota-edit.page';

describe('MascotaEditPage', () => {
  let component: MascotaEditPage;
  let fixture: ComponentFixture<MascotaEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotaEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MascotaEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
