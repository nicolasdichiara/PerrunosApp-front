import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiciosDetailPage } from './servicios-detail.page';

describe('ServiciosDetailPage', () => {
  let component: ServiciosDetailPage;
  let fixture: ComponentFixture<ServiciosDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiciosDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
