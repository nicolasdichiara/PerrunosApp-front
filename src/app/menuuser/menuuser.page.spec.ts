import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuuserPage } from './menuuser.page';

describe('MenuuserPage', () => {
  let component: MenuuserPage;
  let fixture: ComponentFixture<MenuuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuuserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
