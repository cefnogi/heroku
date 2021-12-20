import { CustomerServices } from './../../services/customer-service';
import { BasicService } from 'src/services/basic.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-customer-account',
  templateUrl: './create-customer-account.page.html',
  styleUrls: ['./create-customer-account.page.scss'],
})
export class CreateCustomerAccountPage implements OnInit {
  createCustomerAccountForm: FormGroup;
  submitted = false;
  customer: any = {};
  imagePath: string = "C:\\Users\\Sohaib\\Downloads\\success_g.png";
  imgRes: any;
  imageOptions: any;
  frontFileName: string = '';
  backFileName: string = '';
  frontFile: any = {};
  backFile: any = {};
  isFrontFileNotBrowsed: boolean = true;
  isBackFileNotBrowsed: boolean = true;
  isFrontImageNotUploaded: boolean = true;
  isBackImageNotUploaded: boolean = true;
  frontImageID: string = '';
  backImageID: string = '';
  headers: any = {
    Authorization: 'Bearer ' + localStorage.getItem('token') || ''
  };
  create_customer_url: string = environment.baseApi + '/' + 'accounts';
  constructor(private location: Location,
    private route: ActivatedRoute,
    private authService: AuthService,
    private customerServices: CustomerServices,
    private router: Router,
    private http: HttpClient,
    private basicService: BasicService,
    private alertController: AlertController,
    public formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params && params.customerParams) {
        this.customer = JSON.parse(params.customerParams);
      }
    })
  }

  ngOnInit() {
    this.validateForm();
  }

  discardImage(){

  }

  validateForm() {
    this.createCustomerAccountForm = this.formBuilder.group({
      customer_business_name: ['', [Validators.required, Validators.minLength(3)]],
      customer_business_type: ['', [Validators.required]],
      customer_city: ['', [Validators.required]],
      customer_individual_country: ['', [Validators.required]],
      customer_address_1: ['', [Validators.required]],
      customer_address_2: ['', [Validators.required]],
      customer_state: ['', [Validators.required]],
      customer_postal_code: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      customer_dob: ['', [Validators.required]],
      customer_phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      customer_ssn: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      customer_account_holder_name: ['', [Validators.required]],
      customer_account_holder_type: ['', [Validators.required]],
      customer_account_routing_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      customer_account_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      customer_mcc: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      customer_url: [''],
      customer_tos_date: ['', [Validators.required]],
      customer_ip: [''],
      customer_gender: [''],
      frontFileName: [''],
      backFileName:[''],
    })
  }

  onCreateCustomerAccount() {
    this.submitted = true;
    console.log(this.createCustomerAccountForm.valid);

    if (this.createCustomerAccountForm.valid) {
      this.basicService.showLoding('Creating Customer Account...');
      this.createCustomerAccount()
    }
  }

  createCustomerAccount() {
    const dob_date = this.getDate(this.createCustomerAccountForm.controls.customer_dob.value);
    const dob_month = this.getMonth(this.createCustomerAccountForm.controls.customer_dob.value);
    const dob_year = this.getYear(this.createCustomerAccountForm.controls.customer_dob.value);
    const tos_acceptance_date = (Math.floor(new Date(this.createCustomerAccountForm.controls.customer_tos_date.value).getTime() / 1000)).toString();
    const formData = new FormData();
    formData.append('type', 'custom');
    formData.append('country', 'US');
    formData.append('email', this.customer.email)
    formData.append('user_id', localStorage.getItem('user_id'));
    formData.append('capabilities[card_payments][requested]', 'true')
    formData.append('capabilities[transfers][requested]', 'true')
    formData.append('business_type', this.createCustomerAccountForm.controls.customer_business_type.value);
    formData.append('individual[address][city]', this.createCustomerAccountForm.controls.customer_city.value)
    formData.append('individual[address][line1]', this.createCustomerAccountForm.controls.customer_address_1.value)
    formData.append('individual[address][line2]', this.createCustomerAccountForm.controls.customer_address_2.value)
    formData.append('individual[address][postal_code]', this.createCustomerAccountForm.controls.customer_postal_code.value)
    formData.append('individual[address][state]', this.createCustomerAccountForm.controls.customer_state.value)
    formData.append('individual[dob][day]', dob_date)
    formData.append('individual[dob][month]', dob_month)
    formData.append('individual[dob][year]', dob_year)
    formData.append('individual[email]', this.customer.email)
    formData.append('individual[first_name]', this.customer.first_name)
    formData.append('individual[last_name]', this.customer.last_name)
    formData.append('individual[maiden_name]', '')
    formData.append('individual[phone]', this.createCustomerAccountForm.controls.customer_phone_number.value)
    formData.append('individual[political_exposure]', 'none')
    formData.append('individual[gender]', this.createCustomerAccountForm.controls.customer_gender.value)
    formData.append('individual[ssn_last_4]', this.getSSNLast4Digits())
    formData.append('individual[verification][document][front]', this.frontImageID)
    formData.append('individual[verification][document][back]', this.backImageID)
    formData.append('tos_acceptance[user_agent]', 'chrome')
    formData.append('external_account[object]', 'bank_account')
    formData.append('external_account[country]', 'US')
    formData.append('external_account[currency]', 'USD')
    formData.append('external_account[account_holder_name]', this.createCustomerAccountForm.controls.customer_account_holder_name.value)
    formData.append('external_account[account_holder_type]', this.createCustomerAccountForm.controls.customer_account_holder_type.value)
    formData.append('external_account[routing_number]', this.createCustomerAccountForm.controls.customer_account_routing_number.value)
    formData.append('external_account[account_number]', this.createCustomerAccountForm.controls.customer_account_number.value)
    formData.append('business_profile[mcc]', this.createCustomerAccountForm.controls.customer_mcc.value)
    formData.append('business_profile[url]', this.createCustomerAccountForm.controls.customer_url.value)
    formData.append('business_profile[name]', this.createCustomerAccountForm.controls.customer_business_name.value)
    formData.append('tos_acceptance[date]', tos_acceptance_date)
    formData.append('tos_acceptance[ip]', this.createCustomerAccountForm.controls.customer_ip.value)
    formData.append('individual[id_number]', this.createCustomerAccountForm.controls.customer_ssn.value)
    formData.append('individual[address][country]', this.createCustomerAccountForm.controls.customer_individual_country.value)
    formData.append('company[name]', this.createCustomerAccountForm.controls.customer_business_name.value)

    this.parseFormData(formData);
    this.uploadCustomerToServer(formData, this.customer.customer_id);
    
  }

  createCustomerAccountNew() {
    const dob_date = this.getDate(this.createCustomerAccountForm.controls.customer_dob.value);
    const dob_month = this.getMonth(this.createCustomerAccountForm.controls.customer_dob.value);
    const dob_year = this.getYear(this.createCustomerAccountForm.controls.customer_dob.value);
    const tos_acceptance_date = (Math.floor(new Date(this.createCustomerAccountForm.controls.customer_tos_date.value).getTime() / 1000)).toString();
    let params: any = {
      'type': 'custom',
      'capabilities[card_payments][requested]': 'true',
      'business_type': this.createCustomerAccountForm.controls.customer_business_type.value,
      'individual[address][city]': this.createCustomerAccountForm.controls.customer_city.value,
      'individual[address][line1]': this.createCustomerAccountForm.controls.customer_address_1.value,
      'individual[address][line2]': this.createCustomerAccountForm.controls.customer_address_2.value,
      'individual[address][postal_code]': this.createCustomerAccountForm.controls.customer_postal_code.value,
      'individual[address][state]': this.createCustomerAccountForm.controls.customer_state.value,
      'individual[dob][day]': dob_date,
      'individual[dob][month]': dob_month,
      'individual[dob][year]': dob_year,
      'individual[email]': this.customer.email,
      'individual[first_name]': this.customer.first_name,
      'individual[gender]': this.createCustomerAccountForm.controls.customer_gender.value,
      'individual[last_name]': this.customer.last_name,
      'individual[maiden_name]': '',
      'individual[phone]': this.createCustomerAccountForm.controls.customer_phone_number.value,
      'individual[political_exposure]': 'none',
      'tos_acceptance[user_agent]': 'chrome',
      'external_account[object]': 'bank_account',
      'external_account[country]': 'US',
      'country': 'US',
      'external_account[currency]': 'USD',
      'external_account[account_holder_name]': this.createCustomerAccountForm.controls.customer_account_holder_name.value,
      'external_account[account_holder_type]': this.createCustomerAccountForm.controls.customer_account_holder_type.value,
      'external_account[routing_number]': this.createCustomerAccountForm.controls.customer_account_routing_number.value,
      'business_profile[mcc]': this.createCustomerAccountForm.controls.customer_mcc.value,
      'business_profile[url]': this.createCustomerAccountForm.controls.customer_url.value,
      'business_profile[name]': this.createCustomerAccountForm.controls.customer_business_name.value,
      'tos_acceptance[date]': tos_acceptance_date,
      'tos_acceptance[ip]': this.createCustomerAccountForm.controls.customer_ip.value,
      'capabilities[transfers][requested]': 'true',
      'email': this.customer.email,
      'external_account[account_number]': this.createCustomerAccountForm.controls.customer_account_number.value,
      'individual[address][country]': this.createCustomerAccountForm.controls.customer_individual_country.value,
      'individual[verification][document][back]': this.backImageID,
      'individual[verification][document][front]': this.frontImageID,
      'individual[id_number]': this.createCustomerAccountForm.controls.customer_ssn.value,
      'individual[ssn_last_4]': this.getSSNLast4Digits(),
    }

    let option: any = {
      headers: this.headers,
      params
    }

    console.log(params)

    this.http.post(this.create_customer_url, null, option).subscribe(data => {
        console.log(data);
        this.basicService.hideLoading();
    });
  }

  uploadCustomerToServer(formData: FormData, customer_id: string) {
    this.customerServices.addConnectedCustomers(formData, null, customer_id).then(data => {
      this.basicService.hideLoading();
      console.log(data);
      if (data && data.response) {
        if (data.response.hasOwnProperty('error')) {
          this.showFailureMessage(data.response.error['message'])
          throw data.response.error;
        } else {
          this.isBackImageNotUploaded = false;
          this.isFrontImageNotUploaded = false;
          this.backImageID = '';
          this.frontImageID = '';
          this.showSuccessMessage();
        }
      }
    })
  }

  showSuccessMessage() {
    const successMessage = 'Customer created successfully!';
    const successButtons = [
      {
        text: 'OK',
        handler: () => {
          this.router.navigateByUrl("/connected-customers");
        }
      }
    ];
    this.alertController.create({
      header: "Success",
      message: successMessage,
      buttons: successButtons,
    }).then(res => {
      res.present();
    });
  }

  showFailureMessage(message: string) {
    const failureMessage = message;
    const button = [
      {
        text: 'OK',
      }
    ];
    this.alertController.create({
      header: "Failure",
      message: failureMessage,
      buttons: button,
    }).then(res => {
      res.present();
    });
  }  


  populateFrontFileName(event) {
    const file = event.target.files[0];
    this.frontFileName = file.name || '';
    this.frontFile = file;

    // this.createCustomerAccountForm.controls.frontFileName.value = this.frontFileName;
    if (this.frontFileName.length >= 0) {
      this.isFrontFileNotBrowsed = false;
    }
    else {
      this.isFrontFileNotBrowsed = true;
    }
  }

  populateBackFileName(event) {
    const file = event.target.files[0];
    this.backFileName = file.name || '';
    this.backFile = file;

    // this.createCustomerAccountForm.controls.backFileName.value = this.backFileName;
    if (this.backFileName.length >= 0) {
      this.isBackFileNotBrowsed = false;
    }
    else {
      this.isBackFileNotBrowsed = true;
    }
  }

  uploadImageToServer() {
    // this.basicService.showLoding('Uploading Files...');
    if(this.frontFile) {
      const formData = new FormData();
      formData.append('file', this.frontFile);
      formData.append('purpose', 'identity_document')
      
      this.customerServices.sendingFrontFile(formData).then(data => {
        if (data && data.response) { 
          if (data.response.hasOwnProperty('error')) { 
            throw data.response.error;
          } else {
              console.log(`Front Image: ${data.response.id}`)
              this.frontImageID = data.response.id;
              console.log(`Front Image ID: ${this.frontImageID}`)
              this.isFrontImageNotUploaded = false;
              this.frontFile = null;
              this.frontFileName = '';
          }
        }
        this.authService.Toast('Success');
        
      }).catch(e => {
        this.authService.Toast(e.message);
      }).finally(() => {
        console.log(`Finally`);
      });
    } else {
      this.authService.Toast('Please Select Front File');
    }
    if (this.backFile) { 
      const formData = new FormData();
      formData.append('file', this.backFile);
      formData.append('purpose', 'identity_document');
      this.customerServices.sendingFrontFile(formData).then(data => { 
        if (data && data.response) {
          if (data.response.hasOwnProperty('error')) {
            throw data.response.error;
          } else {
              console.log(`Back Image: ${data.response.id}`)
              this.backImageID = data.response.id;
              console.log(`Back Image ID: ${this.backImageID}`)
              this.isBackImageNotUploaded = false;
              this.backFile = null;
              this.backFileName = '';
          }
        }
        this.authService.Toast('Success');
      }).catch(e => {
          this.authService.Toast(e.message);
      }).finally(() => {
          console.log(`Finally`);
      });
    } else {
      this.authService.Toast('Please Select Back File');
    }
    // this.basicService.hideLoading();
  }

  parseFormData(formData: FormData) {
    let object = {};
    formData.forEach((value, key) => object[key] = value);
    let json = JSON.stringify(object);
    console.log(json);
  }

  get errorCtr() {
    return this.createCustomerAccountForm.controls;
  }

  goBack(): any {
    this.location.back();
  }

  goHome(): any {
    this.router.navigateByUrl('/home', {
      replaceUrl: true,
    });
  }

  getDate(date: string) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    return day;
  }

  getMonth(date: string) {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return month;
  }

  getYear(date: string) {
    const d = new Date(date);
    const year = d.getFullYear().toString();
    return year;
  }

  getSSNLast4Digits(){
    let ssn = this.createCustomerAccountForm.controls.customer_ssn.value;
    console.log(ssn);
    let ssn_last_4 = ssn.toString().slice(-4)
    return ssn_last_4;
  }

}
