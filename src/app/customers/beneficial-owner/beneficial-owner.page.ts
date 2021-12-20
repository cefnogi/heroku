import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../auth.service';
import {BeneficialServices} from '../../../services/beneficial-service';

@Component({
    selector: 'app-beneficial-owner',
    templateUrl: './beneficial-owner.page.html',
    styleUrls: ['./beneficial-owner.page.scss'],
})

export class BeneficialOwnerPage implements OnInit {

    constructor(private location: Location,
                private authService: AuthService,
                private benificialServices: BeneficialServices,
                private router: Router,
                private route: ActivatedRoute) {
    }

    user: any = {};
    addBenificial = false;
    typeCustomer: string = null;
    customerId: any;
    owners: any[] = [];
    editedBenificiary: any = [];

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params.id) {
                this.customerId = params.id;
            }
        });
        this.getBenficialLists();
    }

    getBenficialLists(): any {
        this.benificialServices.getBenificialLists(this.customerId).then(data => {
            if (data.data) {
                this.owners = data.data;
                const newArray = this.owners.map(a => Object.assign({}, a));
                this.editedBenificiary = newArray;
            }
        });
    }

    goBack(): any {
        this.location.back();
    }

    fundingSource(): any {
        this.router.navigate([`/customers/funding/${this.customerId}`]);
    }

    addBenificialOwner(): any {
        this.addBenificial = !this.addBenificial;
    }

    updateBenificial(i: number, owner: any): any {
        this.owners.forEach((item, index: number) => {
            if (item.hasOwnProperty('edit')) {
                if (index !== i) {
                    if (item.edit) {
                        this.owners[index].edit = false;
                    }
                }
            }
        });
        if (!this.owners[i].hasOwnProperty('edit')) {
            this.owners[i].edit = true;

        } else {
            if (this.owners[i].edit === true) {
                this.owners[i].edit = false;
            } else {
                this.owners[i].edit = true;
            }
        }
    }

    submitBenificialOwnerUpdate(i: number): any {
        const id = this.editedBenificiary[i].id;
        const edited = this.editedBenificiary[i];
        const user = {
            firstName: edited.firstName,
            lastName: edited.lastName,
            ssn: edited.ssn,
            dateOfBirth: edited.dateOfBirth,
            address: {
                address1: edited.address1,
                city: edited.city,
                stateProvinceRegion: edited.stateProvinceRegion,
                country: edited.country,
                postalCode: edited.postalCode
            }
        };
        this.benificialServices.updateBenificialOwner(user, id).then(data => {
            this.getBenficialLists();
        }).catch(e => {
            this.authService.Toast('Error');
        });
    }

    deleteBenificial(index: number, owner): any {
        const id = owner.id;
        this.benificialServices.deleteBenificialOwner(id).then(data => {
            this.owners.splice(index, 1);
            this.editedBenificiary.splice(index, 1);
            this.authService.Toast('Success');
        }).catch(e => {
            this.authService.Toast('Error');
        });
    }

    checkStatus(i: number, user: any): any {
        this.benificialServices.checkStatus(user.id).then(data => {
            if (data.data[0].status === 'Active') {
                this.owners[i].status = 'active';
            }
            this.authService.Toast('Success');
            console.log('status', data);
        }).catch(e => {
            this.authService.Toast('Error');
        });
    }

    checkCertify(i: number, user: any): any {
        this.benificialServices.checkCertify(this.customerId).then(data => {
            this.owners[i].certified = true;
            this.authService.Toast('Success');
            console.log('status', data);
        })
    }

    submitBenificialOwner(): any {
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
        } else if (!this.user.countries) {
            this.authService.Toast('Please enter country name');
        } else {
            const user = {
                firstName: this.user.first_name,
                lastName: this.user.last_name,
                ssn: this.user.ssn,
                dateOfBirth: this.user.dob,
                address: {
                    address1: this.user.address,
                    city: this.user.city,
                    stateProvinceRegion: this.user.state,
                    country: this.user.countries,
                    postalCode: this.user.zipcode
                }
            };
            this.benificialServices.addBenificialOwner(user, this.customerId).then(data => {
                this.authService.Toast('Success');
                this.getBenficialLists();
            }).catch(e => {
                this.authService.Toast('Error');
            });
        }
    }

}
