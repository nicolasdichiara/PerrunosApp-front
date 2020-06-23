import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilEditPage } from './perfil-edit.page';

describe('PerfilEditPage', () => {
  let component: PerfilEditPage;
  let fixture: ComponentFixture<PerfilEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
