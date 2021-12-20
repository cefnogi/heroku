import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CustomersPage} from './customers.page';
import {BeneficialOwnerPage} from './beneficial-owner/beneficial-owner.page';


const routes: Routes = [
    {
        path: '',
        component: CustomersPage,
    },
    {
        path: 'benificial/:id',
        component: BeneficialOwnerPage
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomersPageRoutingModule {
}
