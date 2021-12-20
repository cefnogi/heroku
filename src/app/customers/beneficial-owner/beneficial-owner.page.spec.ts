import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeneficialOwnerPage } from './beneficial-owner.page';

describe('BeneficialOwnerPage', () => {
  let component: BeneficialOwnerPage;
  let fixture: ComponentFixture<BeneficialOwnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficialOwnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeneficialOwnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
