import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvisosGuardadosPage } from './avisos-guardados.page';

describe('AvisosGuardadosPage', () => {
  let component: AvisosGuardadosPage;
  let fixture: ComponentFixture<AvisosGuardadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisosGuardadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvisosGuardadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
