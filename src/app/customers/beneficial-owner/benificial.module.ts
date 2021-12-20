import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {BenificialOwnerRoutingModule} from './benificial-owner-routing.module';
import {BeneficialOwnerPage} from './beneficial-owner.page';
import {FundingSourcePage} from './funding-source/funding-source.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BenificialOwnerRoutingModule
    ],
    declarations: [BeneficialOwnerPage, FundingSourcePage]
})
export class BenificialModule {
}
