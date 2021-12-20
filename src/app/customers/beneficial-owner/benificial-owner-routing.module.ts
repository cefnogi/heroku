import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {BeneficialOwnerPage} from './beneficial-owner.page'
import {FundingSourcePage} from './funding-source/funding-source.page';

const routes: Routes = [
    {
        path: '',
        component: BeneficialOwnerPage,
    },
    {
        path: 'funding/:id',
        component: FundingSourcePage
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BenificialOwnerRoutingModule {
}
