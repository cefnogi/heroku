import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FundingServices} from '../../../../services/funding-service';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../auth.service';

@Component({
    selector: 'app-funding-source',
    templateUrl: './funding-source.page.html',
    styleUrls: ['./funding-source.page.scss'],
})
export class FundingSourcePage implements OnInit {

    constructor(private location: Location,
                private fundingServices: FundingServices,
                private route: ActivatedRoute,
                private authServices: AuthService) {
    }

    addFundings = false;
    funding: any = {};
    allFundings: any[] = [];
    customerId: any;
    editedFunding: any[] = [];

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.customerId = params.id;
        });
        this.getFundings();
    }

    goBack(): any {
        this.location.back();
    }

    getFundings(): any {
        this.fundingServices.getFundings(this.customerId).then(data => {
            this.authServices.Toast('Success');
            this.allFundings = data.data;
            const newArray = this.allFundings.map(a => Object.assign({}, a));
            this.editedFunding = newArray;
        }).catch(e => {
            this.authServices.Toast('Error');
        });
    }

    retriveBalance(i, funding): any {
        const id = funding.id;
        this.fundingServices.retriveBalance(id).then(data => {
            this.authServices.Toast('Success');
        }).catch(e => {
            this.authServices.Toast('Error');
        });
    }

    addFunding(): any {
        this.addFundings = !this.addFundings;
    }

    submitFunding(): any {
        this.fundingServices.addFunding(this.funding, this.customerId).then(data => {
            if (data.data) {
                this.allFundings.push(data.data);
                this.editedFunding.push(data.data);
            }
            this.authServices.Toast('Success');
        }).catch(e => {
            this.authServices.Toast('Error');
        });
    }

    updateFunding(i: number, funding: any): any {
        this.allFundings.forEach((item, index: number) => {
            if (item.hasOwnProperty('edit')) {
                if (index !== i) {
                    if (item.edit) {
                        this.allFundings[index].edit = false;
                    }
                }
            }
        });
        if (!this.allFundings[i].hasOwnProperty('edit')) {
            this.allFundings[i].edit = true;

        } else {
            if (this.allFundings[i].edit === true) {
                this.allFundings[i].edit = false;
            } else {
                this.allFundings[i].edit = true;
            }
        }
    }

    submitFundingUpdate(i: number, funding: any): any {
        const id = funding.id;
        const fund = {
            bankName: this.editedFunding[i].bankName
        };
        this.fundingServices.updateFunding(id, fund).then(data => {
            this.getFundings();
            this.authServices.Toast('Success');
        }).catch(e => {
            this.authServices.Toast('Error');
        });
    }

    deleteFunding(i: number, funding: any): any {
        const id = funding.id;
        this.fundingServices.deleteFunding(id).then(data => {
            this.allFundings.splice(i, 1);
            this.authServices.Toast('Success');
        }).catch(e => {
            this.authServices.Toast('Error');
        });
    }
}
