import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {CustomerServices} from '../../services/customer-service';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.page.html',
    styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

    constructor(private location: Location,
                private authService: AuthService,
                private customerServices: CustomerServices,
                private router: Router) {
    }

    user: any = {};
    userUnverified: any = {};
    customerType = 'verified';
    userVbcc: any = {
        controller: {
            address: {}
        }
    };
    userVbcs: any = {};
    addCustomer = false;
    customers: any[] = [];
    editCustomer: any[] = [];
    typeCustomer = 'verified';

    ngOnInit() {
        this.getCustomersList();
    }

    getCustomersList(): any {
        this.customerServices.getCustomersList().then(data => {
            if (data.data) {
                this.customers = data.data;
                const newArray = this.customers.map(a => Object.assign({}, a));
                this.editCustomer = newArray;
            }
        });
    }

    goBack(): any {
        this.location.back();
    }

    updateCustomer(i: number, owner: any): any {
        this.customers.forEach((item: any, index: number) => {
            if (item.hasOwnProperty('edit')) {
                if (index !== i) {
                    if (item.edit) {
                        this.customers[index].edit = false;
                    }
                }
            }
        });
        if (!this.customers[i].hasOwnProperty('edit')) {
            this.customers[i].edit = true;
        } else {
            if (this.customers[i].edit === true) {
                this.customers[i].edit = false;
            } else {
                this.customers[i].edit = true;
            }
        }
    }

    submitCustomerUpdate(i: number): any {
        const id = this.editCustomer[i].id;
        const edited = this.editCustomer[i];
        let user;
        if (this.customerType === 'verified') {
            user = {
                firstName: edited.firstName,
                lastName: edited.lastName,
                email: edited.email,
                ipAddress: edited.ipAddress,
                type: edited.type,
                address1: edited.address1,
                city: edited.city,
                state: edited.state,
                postalCode: edited.postalCode,
                dateOfBirth: edited.dateOfBirth,
                ssn: edited.ssn
            };
        } else if (this.customerType === 'unVerified') {
            user = {
                firstName: edited.firstName,
                lastName: edited.lastName,
                email: edited.email,
                ipAddress: edited.ipAddress,
                businessName: edited.businessName,
                status: 'unverified'
            };

        } else if (this.customerType === 'VBCS') {
            user = {
                firstName: edited.firstName,
                lastName: edited.lastName,
                email: edited.email,
                ipAddress: edited.ipAddress,
                type: edited.type,
                address1: edited.address1,
                city: edited.city,
                state: edited.state,
                postalCode: edited.postalCode,
                dateOfBirth: edited.dateOfBirth,
                ssn: edited.ssn,
                businessClassification: edited.businessClassification,
                businessType: edited.businessType,
                businessName: edited.businessName,
                ein: edited.ein
            };
        } else if (this.customerType === 'VBCC') {
            user = {
                firstName: edited.firstName,
                lastName: edited.lastName,
                email: edited.email,
                ipAddress: edited.ipAddress,
                type: edited.type,
                address1: edited.address1,
                city: edited.city,
                state: edited.state,
                postalCode: edited.postalCode,
                controller: {
                    firstName: edited.controller.firstName,
                    lastName: edited.controller.lastName,
                    dateOfBirth: edited.controller.dateOfBirth,
                    ssn: edited.controller.ssn,
                    title: edited.controller.title,
                    address: {
                        address1: edited.controller.address.address1,
                        address2: edited.controller.address.address2,
                        city: edited.controller.address.city,
                        stateProvinceRegion: edited.controller.address.stateProvinceRegion,
                        postalCode: edited.controller.address.postalCode,
                        country: edited.controller.address.country
                    }
                },
                businessClassification: edited.businessClassification,
                businessType: edited.businessType,
                businessName: edited.businessName,
                ein: edited.ein
            };
        }


        this.customerServices.updateCustomer(user, id).then(data => {
            this.getCustomersList();
        }).catch(e => {
            this.authService.Toast('Error');
        });
    }

    deleteCustomer(index: number, owner): any {
        const id = owner.id;
        this.customerServices.deleteCustomer(id).then(data => {
            this.customers.splice(index, 1);
            this.editCustomer.splice(index, 1);
            this.authService.Toast('Success');
        }).catch(e => {
            this.authService.Toast('Error');
        });
    }

    addCustomerOwner(): any {
        console.log(this.typeCustomer);
        this.addCustomer = !this.addCustomer;
    }

    emailIsValid(val: any = null) {
        if (val) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        }
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.email);
    }

    checkUser(val: string, customer: any) {
        if (val === 'verified') {
            if (customer.hasOwnProperty('address1')) {
                if (customer.address1) {
                    if (customer.type === 'personal') {
                        if (customer.controller.toString() === '0' || customer.controller === '') {
                            this.customerType = 'verified';
                            return true;
                        }
                    }
                }
            }
            return false;
        } else if (val === 'unVerified') {
            if (customer.hasOwnProperty('address1')) {
                if (!customer.address1 || customer.address1.toString() === '0') {
                    if (!customer.type || customer.type.toString() === '0') {
                        if (customer.controller.toString() === '0' || customer.controller === '') {
                            this.customerType = 'unVerified';
                            return true;
                        }
                    }
                }
            }
            return false;
        } else if (val === 'VBCS') {
            if (customer.type === 'business') {
                if (customer.hasOwnProperty('address1')) {
                    if (customer.address1) {
                        if (customer.controller.toString() === '0' || customer.controller === '') {
                            this.customerType = 'VBCS';
                            return true;
                        }
                    }
                }
            }
            return false;
        } else if (val === 'VBCC') {
            if (customer.type.toString() === '1' || customer.type.toString() === 'business') {
                if (customer.controller) {
                    this.customerType = 'VBCC';
                    return true;
                }
            }
            return false;
        }
    }

    openCustomerDetail(customer): any {
        const id = customer.id;
        this.router.navigate([`/customers/benificial/${id}`]);
    }

    submitCustomer(): any {
        if (this.typeCustomer === 'verified') {
            if (this.user.first_name == null || this.user.first_name === '') {
                this.authService.Toast('Please enter first name');
            } else if (this.user.last_name == null || this.user.last_name === '') {
                this.authService.Toast('Please enter last name');
            } else if (this.user.address == null || this.user.address === '') {
                this.authService.Toast('Please enter address');
            } else if (this.user.city == null || this.user.city === '') {
                this.authService.Toast('Please enter city');
            } else if (this.user.state == null || this.user.state === '') {
                this.authService.Toast('Please enter state');
            } else if (this.user.zipcode == null || this.user.zipcode === '') {
                this.authService.Toast('Please enter zipcode');
            } else if (this.user.dob == null || this.user.dob === '') {
                this.authService.Toast('Please enter last dob');
            } else if (this.user.ssn == null || this.user.ssn === '') {
                this.authService.Toast('Please enter ssn');
            } else if (!this.user.ip) {
                this.authService.Toast('Please enter IP Address');
            } else if (!this.user.type) {
                this.authService.Toast('Please enter the type');
            } else if (!this.emailIsValid()) {
                this.authService.Toast('Please enter the Email');
            } else {
                const user = {
                    firstName: this.user.first_name,
                    lastName: this.user.last_name,
                    ssn: this.user.ssn,
                    dateOfBirth: this.user.dob,
                    email: this.user.email,
                    type: this.user.type,
                    address1: this.user.address,
                    city: this.user.city,
                    state: this.user.state,
                    postalCode: this.user.zipcode,
                    ipAddress: this.user.ip
                };
                this.customerServices.addVerifiedCustomer(user).then(data => {
                    this.getCustomersList();
                    this.authService.Toast('Success');
                }).catch(e => {
                    this.authService.Toast('Error');
                });
            }
        } else if (this.typeCustomer === 'unVerified') {
            if (this.userUnverified.firstName == null || this.userUnverified.firstName === '') {
                this.authService.Toast('Please enter first name');
            } else if (this.userUnverified.lastName == null || this.userUnverified.lastName === '') {
                this.authService.Toast('Please enter last name');
            } else if (!this.userUnverified.ipAddress) {
                this.authService.Toast('Please enter IP Address');
            } else if (!this.emailIsValid(this.userUnverified.email)) {
                this.authService.Toast('Please enter the Email');
            } else if (!this.userUnverified.businessName) {
                this.authService.Toast('Please enter the businessname');
            } else {
                this.customerServices.addUnVerifiedCustomer(this.userUnverified).then(data => {
                    this.getCustomersList();
                    this.authService.Toast('Success');
                }).catch(e => {
                    this.authService.Toast('Error');
                });
            }
        } else if (this.typeCustomer === 'VBCS') {
            if (this.userVbcs.firstName == null || this.userVbcs.lastName === '') {
                this.authService.Toast('Please enter first name');
            } else if (!this.userVbcs.lastName) {
                this.authService.Toast('Please enter last name');
            } else if (this.userVbcs.address1 == null || this.userVbcs.address1 === '') {
                this.authService.Toast('Please enter address');
            } else if (this.userVbcs.city == null || this.userVbcs.city === '') {
                this.authService.Toast('Please enter city');
            } else if (this.userVbcs.state == null || this.userVbcs.state === '') {
                this.authService.Toast('Please enter state');
            } else if (this.userVbcs.postalCode == null || this.userVbcs.postalCode === '') {
                this.authService.Toast('Please enter zipcode');
            } else if (this.userVbcs.dateOfBirth == null || this.userVbcs.dateOfBirth === '') {
                this.authService.Toast('Please enter last dob');
            } else if (this.userVbcs.ssn == null || this.userVbcs.ssn === '') {
                this.authService.Toast('Please enter ssn');
            } else if (!this.userVbcs.ipAddress) {
                this.authService.Toast('Please enter IP Address');
            } else if (!this.userVbcs.type) {
                this.authService.Toast('Please enter the type');
            } else if (!this.emailIsValid(this.userVbcs.email)) {
                this.authService.Toast('Please enter the Email');
            } else if (!this.userVbcs.businessClassification) {
                this.authService.Toast('Please enter the businessClassification');
            } else if (!this.userVbcs.businessType) {
                this.authService.Toast('Please enter the businessType');
            } else if (!this.userVbcs.businessName) {
                this.authService.Toast('Please enter the businessName');
            } else if (!this.userVbcs.ein) {
                this.authService.Toast('Please enter the ein');
            } else {
                this.customerServices.addVerifiedCustomer(this.userVbcs).then(data => {
                    this.getCustomersList();
                    this.authService.Toast('Success');
                }).catch(e => {
                    this.authService.Toast('Error');
                });
            }

        } else {
            if (this.userVbcc.firstName == null || this.userVbcc.lastName === '') {
                this.authService.Toast('Please enter first name');
            } else if (!this.userVbcc.lastName) {
                this.authService.Toast('Please enter last name');
            } else if (this.userVbcc.address1 == null || this.userVbcc.address1 === '') {
                this.authService.Toast('Please enter address');
            } else if (this.userVbcc.city == null || this.userVbcc.city === '') {
                this.authService.Toast('Please enter city');
            } else if (this.userVbcc.state == null || this.userVbcc.state === '') {
                this.authService.Toast('Please enter state');
            } else if (this.userVbcc.postalCode == null || this.userVbcc.postalCode === '') {
                this.authService.Toast('Please enter zipcode');
            } else if (this.userVbcc.controller.dateOfBirth == null || this.userVbcc.controller.dateOfBirth === '') {
                this.authService.Toast('Please enter last dob');
            } else if (this.userVbcc.controller.ssn == null || this.userVbcc.controller.ssn === '') {
                this.authService.Toast('Please enter ssn');
            } else if (!this.userVbcc.ipAddress) {
                this.authService.Toast('Please enter IP Address');
            } else if (!this.userVbcc.type) {
                this.authService.Toast('Please enter the type');
            } else if (!this.emailIsValid(this.userVbcc.email)) {
                this.authService.Toast('Please enter the Email');
            } else if (!this.userVbcc.businessClassification) {
                this.authService.Toast('Please enter the businessClassification');
            } else if (!this.userVbcc.businessType) {
                this.authService.Toast('Please enter the businessType');
            } else if (!this.userVbcc.businessName) {
                this.authService.Toast('Please enter the businessName');
            } else if (!this.userVbcc.ein) {
                this.authService.Toast('Please enter the ein');
            } else if (!this.userVbcc.controller.address.address1) {
                this.authService.Toast('Please enter the address1');
            } else if (!this.userVbcc.controller.address.address2) {
                this.authService.Toast('Please enter the address2');
            } else if (!this.userVbcc.controller.address.city) {
                this.authService.Toast('Please enter the city');
            } else if (!this.userVbcc.controller.address.stateProvinceRegion) {
                this.authService.Toast('Please enter the stateProvinceRegion');
            } else if (!this.userVbcc.controller.address.postalCode) {
                this.authService.Toast('Please enter the postalCode');
            } else if (!this.userVbcc.controller.address.country) {
                this.authService.Toast('Please enter the country');
            } else {
                this.customerServices.addVerifiedCustomer(this.userVbcc).then(data => {
                    this.getCustomersList();
                    this.authService.Toast('Success');
                }).catch(e => {
                    this.authService.Toast('Error');
                });
            }
        }
    }

}
