import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
    {
        path: 'welcome',
        loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: 'forgotpassword',
        loadChildren: () => import('./forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordPageModule)
    },
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
    },
    {
        path: 'newpayee',
        loadChildren: () => import('./newpayee/newpayee.module').then(m => m.NewpayeePageModule)
    },
    {
        path: 'moneytransfer',
        loadChildren: () => import('./moneytransfer/moneytransfer.module').then(m => m.MoneytransferPageModule)
    },
    {
        path: 'chequedeposit',
        loadChildren: () => import('./chequedeposit/chequedeposit.module').then(m => m.ChequedepositPageModule)
    },
    {
        path: 'paybill',
        loadChildren: () => import('./paybill/paybill.module').then(m => m.PaybillPageModule)
    },
    {
        path: 'electricitybill',
        loadChildren: () => import('./electricitybill/electricitybill.module').then(m => m.ElectricitybillPageModule)
    },
    {
        path: 'broadbandbill',
        loadChildren: () => import('./broadbandbill/broadbandbill.module').then(m => m.BroadbandbillPageModule)
    },
    {
        path: 'gasconnectionbill',
        loadChildren: () => import('./gasconnectionbill/gasconnectionbill.module').then(m => m.GasconnectionbillPageModule)
    },
    {
        path: 'dthdashboard',
        loadChildren: () => import('./dthdashboard/dthdashboard.module').then(m => m.DthdashboardPageModule)
    },
    {
        path: 'dthbill',
        loadChildren: () => import('./dthbill/dthbill.module').then(m => m.DthbillPageModule)
    },
    {
        path: 'transactionsuccess',
        loadChildren: () => import('./transactionsuccess/transactionsuccess.module').then(m => m.TransactionsuccessPageModule)
    },
    {
        path: 'register-contact',
        loadChildren: () => import('./register-contact/register-contact.module').then(m => m.RegisterContactPageModule)
    },
    {
        path: 'generateinvoice',
        loadChildren: () => import('./generateinvoice/generateinvoice.module').then(m => m.GenerateinvoicePageModule)
    },
    {
        path: 'add-payee',
        loadChildren: () => import('./add-payee/add-payee.module').then(m => m.AddPayeePageModule)
    },
    {
        path: 'my-wallet',
        loadChildren: () => import('./my-wallet/my-wallet.module').then(m => m.MyWalletPageModule)
    },
    {
        path: 'people',
        loadChildren: () => import('./people/people.module').then(m => m.PeoplePageModule)
    },
    {
        path: 'transaction-history',
        loadChildren: () => import('./transaction-history/transaction-history.module').then(m => m.TransactionHistoryPageModule)
    },
    {
        path: 'complete-profile',
        loadChildren: () => import('./complete-profile/complete-profile.module').then(m => m.CompleteProfilePageModule)
    },
    {
        path: 'connected-account',
        loadChildren: () => import('./connected-account/connected-account.module').then(m => m.ConnectedAccountPageModule)
    },
    {
        path: 'bank-activity',
        loadChildren: () => import('./bank-activity/bank-activity.module').then(m => m.BankActivityPageModule)
    },
    {
        path: 'bank-activity-details',
        loadChildren: () => import('./bank-activity-details/bank-activity-details.module').then(m => m.BankActivityDetailsPageModule)
    },
    {
        path: 'terms-of-use',
        loadChildren: () => import('./terms-of-use/terms-of-use.module').then(m => m.TermsOfUsePageModule)
    },
    {
        path: 'privacy-policy',
        loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
    },
    {
        path: 'find-user',
        loadChildren: () => import('./find-user/find-user.module').then(m => m.FindUserPageModule)
    },
    {
        path: 'test-page',
        loadChildren: () => import('./test-page/test-page.module').then(m => m.TestPagePageModule)
    },
    {
        path: 'invoice-list',
        loadChildren: () => import('./invoice-list/invoice-list.module').then(m => m.InvoiceListPageModule)
    },
    {
        path: 'customers',
        loadChildren: () => import('./customers/customers.module').then(m => m.CustomersPageModule)
    },
    {
        path: 'transfermoney',
        loadChildren: () => import('./transfermoney/transfermoney.module').then(m => m.TransfermoneyPageModule)
    },
    {
        path: 'connected-customers',
        loadChildren: () => import('./connected-customers/connected-customers.module').then(m => m.ConnectedCustomersPageModule)
    },
    {
        path: 'select-payment',
        loadChildren: () => import('./select-payment/select-payment.module').then(m => m.SelectPaymentPageModule)
    },
  {
    path: 'select-bank-modal',
    loadChildren: () => import('./select-bank-modal/select-bank-modal.module').then( m => m.SelectBankModalPageModule)
  },
  {
    path: 'invoice-dashboard',
    loadChildren: () => import('./invoice-dashboard/invoice-dashboard.module').then( m => m.InvoiceDashboardPageModule)
  },
  {
    path: 'raise-invoice',
    loadChildren: () => import('./raise-invoice/raise-invoice.module').then( m => m.RaiseInvoicePageModule)
  },
  {
    path: 'add-customer',
    loadChildren: () => import('./add-customer/add-customer.module').then( m => m.AddCustomerPageModule)
  },
  {
    path: 'pay-employees-and-services',
    loadChildren: () => import('./pay-employees-and-services/pay-employees-and-services.module').then( m => m.PayEmployeesAndServicesPageModule)
  },
  {
    path: 'transfer-to-bank-account',
    loadChildren: () => import('./transfer-to-bank-account/transfer-to-bank-account.module').then( m => m.TransferToBankAccountPageModule)
  },
  {
    path: 'my-linked-accounts',
    loadChildren: () => import('./my-linked-accounts/my-linked-accounts.module').then( m => m.MyLinkedAccountsPageModule)
  },
  {
    path: 'create-customer-account',
    loadChildren: () => import('./create-customer-account/create-customer-account.module').then( m => m.CreateCustomerAccountPageModule)
  },
  {
    path: 'invoices-sent-to-users',
    loadChildren: () => import('./invoices-sent-to-users/invoices-sent-to-users.module').then( m => m.InvoicesSentToUsersPageModule)
  },
  {
    path: 'invoices-sent-to-you',
    loadChildren: () => import('./invoices-sent-to-you/invoices-sent-to-you.module').then( m => m.InvoicesSentToYouPageModule)
  },
  {
    path: 'single-invoice',
    loadChildren: () => import('./single-invoice/single-invoice.module').then( m => m.SingleInvoicePageModule)
  },
  {
    path: 'single-transaction-history',
    loadChildren: () => import('./single-transaction-history/single-transaction-history.module').then( m => m.SingleTransactionHistoryPageModule)
  },
  {
    path: 'add-money-to-uwallet',
    loadChildren: () => import('./add-money-to-uwallet/add-money-to-uwallet.module').then( m => m.AddMoneyToUwalletPageModule)
  },
  {
    path: 'pay-transfer-money',
    loadChildren: () => import('./pay-transfer-money/pay-transfer-money.module').then( m => m.PayTransferMoneyPageModule)
  },
  {
    path: 'bank-list',
    loadChildren: () => import('./bank-list/bank-list.module').then( m => m.BankListPageModule)
  },  {
    path: 'plaid',
    loadChildren: () => import('./plaid/plaid.module').then( m => m.PlaidPageModule)
  },
  {
    path: 'pay-invoice',
    loadChildren: () => import('./pay-invoice/pay-invoice.module').then( m => m.PayInvoicePageModule)
  },






];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
