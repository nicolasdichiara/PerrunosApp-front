import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvisoEditPage } from './aviso-edit.page';

describe('AvisoEditPage', () => {
  let component: AvisoEditPage;
  let fixture: ComponentFixture<AvisoEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
