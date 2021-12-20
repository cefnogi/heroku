import { CustomerServices } from './../../services/customer-service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { BasicService } from '../../services/basic.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TransferMoney } from '../../services/transfermoney.service';
import { BankListModalComponent } from './../bank-list-modal/bank-list-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-connected-customers',
  templateUrl: './connected-customers.page.html',
  styleUrls: ['./connected-customers.page.scss'],
})
export class ConnectedCustomersPage implements OnInit {

  @ViewChild('deletable', {static: false,}) private deletableElement: ElementRef;

  constructor(private location: Location,
    private authService: AuthService,
    private customerServices: CustomerServices,
    private basicServices: BasicService,
    private transferMoneyService: TransferMoney,
    public modalController: ModalController,
    public router: Router) { }

  isAddCustomerClicked: boolean = false;
  user: any = {
    type: 'custom',
    country: 'US',
    business_type: 'individual',
    email: 'sdjfvsh@gmail.com',
    individuals: {
      gender: 'male',
      city: 'Belo',
      country: 'US',
      line1: '9006 Belo Gate drive Manassas Park VA 20111',
      line2: '9006 Belo Gate drive Manassas Park VA 20111',
      state: 'Minnesota',
      postal_code: '20111',
      email: 'jsdgfhjjh@gmail.com',
      first_name: 'hgdf',
      last_name: 'jhfghsd',
      maiden_name: 'jhfvjhdf',
      phone: '8956236589',
      ssn_last_4: '1278',
      id_number: '589231278'
    },
    externalAccount: {
      account_holder_type: 'individual',
      account_holder_name: 'wgfvw',
      account_number: '000123456789',
      routing_number: '054001725'
    },
    businessProfile: {
      url: 'creetnet.com',
      mcc: '7399',
      name: 'dfdf'
    },
    tosAcceptance: {
      ip: '127.0.0.1',
    }
  };
  userEdit: any = {
    individuals: {
    },
    externalAccount: {
    },
    businessProfile: {
    },
    tosAcceptance: {
    }
  };
  userDelete: any = {
    individuals: {
    },
    externalAccount: {
    },
    businessProfile: {
    },
    tosAcceptance: {
    }  
  };
  frontFileName: string = '';
  backFileName: string = '';
  allCustomers: any[] = [];
  frontFile: any = null;
  backFile: any = null;
  frontImageID: string = '';
  backImageID: string = ''
  showUpload: boolean = false;
  isFrontImageUploaded: boolean = false;
  isBackImageUploaded: boolean = false;
  single_customer: any = {};
  ngOnInit() {
    this.getAllCustomersNew();
  }

  getAllCustomers(): any {
    this.basicServices.showLoding();
    this.transferMoneyService.getAllCustomers().then(data => {
      console.log(data);
      if (data && data.response && data.response.data) {
        console.log(data);
        this.allCustomers = data.response.data;
        console.log(data.response.data[0].individual);
      }
    }).catch(e => {
      this.authService.Toast(e.message);
    }).finally(() => {
      this.basicServices.hideLoading();
    })
  }

  getAllCustomersNew(): any {
    this.basicServices.showLoding();
    this.transferMoneyService.getAllCustomers().then(data => {
      console.log(data);
      if (data && data.response) {
        console.log(data);
        this.allCustomers = data.response;
      }
    }).catch(e => {
      this.authService.Toast(e.message);
    }).finally(() => {
      this.basicServices.hideLoading();
    })
  }

  addCustomer(): any {
    /* this.showUpload = !this.showUpload;
    if (this.isFrontImageUploaded && this.isBackImageUploaded) {
      this.isAddCustomerClicked = !this.isAddCustomerClicked;
    } */
    this.router.navigateByUrl('/add-customer');
  }

  emailIsValid(val: any = null) {
    if (val) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.email);
  }


  submitCustomer(customer = null, type = null): any {
    let user;
    let customerId = null
    if (type) {
      user = this.userEdit;
      if (customer) {
        customerId = customer.id;
      }
    } else {
      user = this.user;
    }
    if (!user.type) {
      this.authService.Toast('Please enter the Type');
    } else if (!user.country) {
      this.authService.Toast('Please enter the country');
    } else if (!this.emailIsValid(user.email)) {
      this.authService.Toast('Please enter the email');
    } else if (!user.business_type) {
      this.authService.Toast('Please enter the business_type');
    } else if (!user.individuals.city) {
      this.authService.Toast('Please enter the city');
    } else if (!user.individuals.country) {
      this.authService.Toast('Please enter the countrys');
    } else if (!user.individuals.line1) {
      this.authService.Toast('Please enter the Address1');
    } else if (!user.individuals.line2) {
      this.authService.Toast('Please enter the Address2');
    } else if (!user.individuals.state) {
      this.authService.Toast('Please enter the state');
    } else if (!user.individuals.postal_code) {
      this.authService.Toast('Please enter the postalcode');
    } else if (!user.individuals.dob) {
      this.authService.Toast('Please enter the dob');
    } else if (!this.emailIsValid(user.individuals.email)) {
      this.authService.Toast('Please enter the individual email');
    } else if (!user.individuals.first_name) {
      this.authService.Toast('Please enter the first_name');
    } else if (!user.individuals.last_name) {
      this.authService.Toast('Please enter the last_name');
    } else if (!user.individuals.maiden_name) {
      this.authService.Toast('Please enter the maiden_name');
    } else if ((!user.individuals.ssn_last_4 || user.individuals.ssn_last_4.toString().length !== 4) && !type) {
      this.authService.Toast('Please enter the SSN last 4 Digit');
    } else if (!user.externalAccount.account_holder_name) {
      this.authService.Toast('Please enter the accountHoldername');
    } else if (!user.externalAccount.account_holder_type) {
      this.authService.Toast('Please enter the account Holder Type');
    } else if (!user.externalAccount.account_number && !type) {
      this.authService.Toast('Please enter the account number');
    } else if (!user.externalAccount.routing_number) {
      this.authService.Toast('Please enter the Routing Number');
    } else if (!user.businessProfile.mcc || user.businessProfile.mcc.toString().length !== 4) {
      this.authService.Toast('Please enter the 4 digit MCC');
    } else if (!user.businessProfile.url) {
      this.authService.Toast('Please enter the url');
    } else if (!user.businessProfile.name) {
      this.authService.Toast('Please enter the business Profile name');
    } else if (!user.tosAcceptance.date) {
      this.authService.Toast('Please enter the To Acceptance Date');
    } else if (!user.individuals.id_number && !type) {
      this.authService.Toast('Please enter the To Acceptance Full SSN Number');
    } else if ((!this.frontImageID || !this.backImageID) && !type) {
      this.authService.Toast(' Verification Photos has not been Uploaded');
    } else {
      const d = new Date(user.individuals.dob);
      const date = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear().toString();
      const timeStamp = (Math.floor(new Date(user.tosAcceptance.date).getTime() / 1000)).toString();
      const formData = new FormData();
      formData.append('capabilities[card_payments][requested]', 'true')
      formData.append('business_type', user.business_type)
      formData.append('individual[address][city]', user.individuals.city)
      formData.append('individual[address][line1]', user.individuals.line1)
      formData.append('individual[address][line2]', user.individuals.line2)
      formData.append('individual[address][postal_code]', user.individuals.postal_code)
      formData.append('individual[address][state]', user.individuals.state)
      formData.append('individual[dob][day]', date)
      formData.append('individual[dob][month]', month)
      formData.append('individual[dob][year]', year)
      formData.append('individual[email]', user.individuals.email)
      formData.append('individual[first_name]', user.individuals.first_name)
      formData.append('individual[gender]', user.individuals.gender)
      formData.append('individual[last_name]', user.individuals.last_name)
      formData.append('individual[maiden_name]', user.individuals.maiden_name)
      formData.append('individual[phone]', user.individuals.phone)
      formData.append('individual[political_exposure]', 'none')
      formData.append('tos_acceptance[user_agent]', 'chrome')
      formData.append('external_account[object]', 'bank_account')
      formData.append('external_account[country]', 'US')
      formData.append('external_account[currency]', 'USD')
      formData.append('external_account[account_holder_name]', user.externalAccount.account_holder_name)
      formData.append('external_account[account_holder_type]', user.externalAccount.account_holder_type)
      formData.append('external_account[routing_number]', user.externalAccount.routing_number)
      formData.append('business_profile[mcc]', user.businessProfile.mcc)
      formData.append('business_profile[url]', user.businessProfile.url)
      formData.append('business_profile[name]', user.businessProfile.name)
      formData.append('tos_acceptance[date]', timeStamp)
      formData.append('tos_acceptance[ip]', user.tosAcceptance.ip)
      formData.append('capabilities[transfers][requested]', 'true')
      formData.append('email', user.email)
      formData.append('external_account[account_number]', user.externalAccount.account_number)
      formData.append('individual[address][country]', user.individuals.country)
      
      if (!type) {
        formData.append('country', user.country)
        formData.append('type', user.type)
        formData.append('individual[verification][document][back]', this.backImageID)
        formData.append('individual[verification][ document][front]', this.frontImageID)
        formData.append('individual[id_number]', user.individuals.id_number)
        formData.append('individual[ssn_last_4]', user.individuals.ssn_last_4)
      }
      this.basicServices.showLoding('Loading..');

      this.customerServices.addConnectedCustomers(formData, type, customerId).then(data => {
        if (data && data.response) {
          if (data.response.hasOwnProperty('error')) {
            throw data.response.error;
          } else {
            this.authService.Toast('Success');
            if (!type) {
              this.isBackImageUploaded = false;
              this.isFrontImageUploaded = false;
              this.backImageID = '';
              this.frontImageID = '';
              this.user = {
                individuals: {},
                externalAccount: {},
                businessProfile: {},
                tosAcceptance: {}
              }
              this.isAddCustomerClicked = false;
            }
            this.getAllCustomers();
          }
        }
      }).catch(e => {
        this.authService.Toast(e.message);
      }).finally(() => {
        this.basicServices.hideLoading();
      });
    }
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  uploadingImage(event, type = null): any {
    const file = event.target.files[0];
    if (!type) {
      this.frontFileName = file.name || '';
      this.frontFile = file;
    } else {
      this.backFileName = file.name || '';
      this.backFile = file;
    }
  }

  sendingFrontImage(type = null) {
    if (!type) {
      if (this.frontFile) {
        const formData = new FormData();
        formData.append('file', this.frontFile);
        formData.append('purpose', 'identity_document')
        this.basicServices.showLoding();
        this.customerServices.sendingFrontFile(formData).then(data => {
          if (data && data.response) {
            if (data.response.hasOwnProperty('error')) {
              throw data.response.error;
            } else {
              this.frontImageID = data.response.id;
              this.isFrontImageUploaded = true;
              this.frontFile = null;
              this.frontFileName = '';
            }
          }
          this.authService.Toast('Success');
        }).catch(e => {
          this.authService.Toast(e.message);
        }).finally(() => {
          this.basicServices.hideLoading();
        });
      } else {
        this.authService.Toast('Please Select File');
      }
    } else {
      if (this.backFile) {
        const formData = new FormData();
        formData.append('file', this.backFile);
        formData.append('purpose', 'identity_document');
        this.basicServices.showLoding('Loading..')
        this.customerServices.sendingFrontFile(formData).then(data => {
          if (data && data.response) {
            if (data.response.hasOwnProperty('error')) {
              throw data.response.error;
            } else {
              this.backImageID = data.response.id;
              this.isBackImageUploaded = true;
              this.isAddCustomerClicked = true;
              this.backFile = null;
              this.backFileName = '';
            }
          }

          this.authService.Toast('Success');
        }).catch(e => {
          this.authService.Toast(e.message);
        }).finally(() => {
          this.basicServices.hideLoading();
        });
      } else {
        this.authService.Toast('Please Select File');
      }
    }
  }

  goBack(): any {
    this.location.back();
  }

  deleteCustomer(i: number): any {
    this.userDelete = {
      individuals: {
      },
      externalAccount: {
      },
      businessProfile: {
      },
      tosAcceptance: {
      }
    }
    const newAllCustomers = this.allCustomers.map((item: any, index: any) => {
      if (index === i) {
        return item;
      }
      return {
        ...item,
        delete: false
      };
    });
    this.allCustomers = newAllCustomers;
    if (this.allCustomers[i].delete) {
      this.allCustomers[i].delete = false;
      return;
    }

    for ( let k = 0 ; k < this.allCustomers.length; k++) {
        if (this.allCustomers[k] === this.allCustomers[i]){
          this.allCustomers.splice(k, 1);
        }
    }
  }

  delete(i: number) {
    const index = this.allCustomers.indexOf(i);
    this.allCustomers.splice(index, 1);
  }

  editCustomer(i: number, customer = null): any {
    this.userEdit = {
      individuals: {
      },
      externalAccount: {
      },
      businessProfile: {
      },
      tosAcceptance: {
      }
    }
    const newAllCustomers = this.allCustomers.map((item: any, index: any) => {
      if (index === i) {
        return item;
      }
      return {
        ...item,
        edit: false
      };
    });
    this.allCustomers = newAllCustomers;
    if (this.allCustomers[i].edit) {
      this.allCustomers[i].edit = false;
      return;
    }
    this.allCustomers[i].edit = true;
    const customerDetail = this.allCustomers[i];
    const dob = `${customerDetail.individual.dob.year}-${customerDetail.individual.dob.month}-${customerDetail.individual.dob.day}`
    console.log('allcustomers......',this.allCustomers[i]);
    this.userEdit = {
      type: customerDetail.type,
      country: customerDetail.country,
      business_type: customerDetail.business_type,
      email: customerDetail.email,
      individuals: {
        gender: customerDetail.individual.gender,
        city: customerDetail.individual.address.city,
        country: customerDetail.individual.address.country,
        line1: customerDetail.individual.address.line1,
        line2: customerDetail.individual.address.line1,
        state: customerDetail.individual.address.state,
        postal_code: customerDetail.individual.address.postal_code,
        email: customerDetail.individual.email,
        first_name: customerDetail.individual.first_name,
        last_name: customerDetail.individual.last_name,
        maiden_name: customerDetail.individual.maiden_name,
        phone: customerDetail.individual.phone.substring(2, customerDetail.individual.phone.length),
        dob: new Date(dob).toISOString()
      },
      externalAccount: {
        account_holder_type: customerDetail.external_accounts.data[0].account_holder_type,
        account_holder_name: customerDetail.external_accounts.data[0].account_holder_name,
        account_number: '000123456789',
        routing_number: customerDetail.external_accounts.data[0].routing_number,

      },
      businessProfile: {
        url: customerDetail.business_profile.url,
        mcc: customerDetail.business_profile.mcc,
        name: customerDetail.business_profile.name
      },
      tosAcceptance: {
        ip: customerDetail.tos_acceptance.ip,
        date: new Date((customerDetail.tos_acceptance.date) * 1000).toISOString()
      }
    }
  }  

  // Show Bank List
  async showBankList() {
    const modal = await this.modalController.create({
        component: BankListModalComponent
    });
    return await modal.present();
  }

  goHome(): any {
    this.router.navigateByUrl('/home', {
      replaceUrl: true,
    });
  }
}
