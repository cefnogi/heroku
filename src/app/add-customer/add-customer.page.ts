import { BasicService } from 'src/services/basic.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.page.html',
  styleUrls: ['./add-customer.page.scss'],
})
export class AddCustomerPage implements OnInit {
  addCustomerForm: FormGroup;
  submitted = false;
  customer_email: string = '';
  customer_business_type: string = '';
  customer_type: string = '';
  customer_city: string = '';
  customer_individual_country: string = '';
  customer_address_1: string = '';
  customer_address_2: string = '';
  customer_state: string = '';
  customer_postal_code: string = '';
  customer_dob: string = '';
  customer_first_name: string = '';
  customer_last_name: string = '';
  customer_maiden_name: string = '';
  customer_phone_number: string = '';
  customer_gender: string = '';
  customer_account_holder_name: string = '';
  customer_account_routing_number: number = 12345;
  customer_mcc: number = 12345;
  customer_url: string = '';
  customer_business_name: string = '';
  customer_tos: string = '';
  customer_ip: string = '';
  customer: any = {};
  add_customer_url: string = environment.baseApi + '/' + 'add-customers';
  description: string = 'A New Customer';
  headers: any = {
    Authorization: 'Bearer ' + localStorage.getItem('token') || ''
  };

  constructor(private location: Location,
    private router: Router,
    private http: HttpClient,
    private basicService: BasicService,
    private route: ActivatedRoute,
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
    if (this.customer){
      this.fillCustomerDetails()
    }
  }

  fillCustomerDetails() {
    this.addCustomerForm.controls.customer_email.setValue(this.customer.from_email);
    this.addCustomerForm.controls.customer_first_name.setValue(this.customer.from_name);
    this.addCustomerForm.controls.customer_last_name.setValue(this.customer.from_name);
  }

  validateForm() {
    this.addCustomerForm = this.formBuilder.group({
      customer_email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      customer_first_name: ['', [Validators.required, Validators.minLength(3)]],
      customer_last_name: ['', [Validators.required, Validators.minLength(3)]],
      customer_type: ['', [Validators.required]],
      // customer_business_type: ['', [Validators.required]],
      // customer_city: ['', [Validators.required]],
      // customer_individual_country: ['', [Validators.required]],
      // customer_address_1: ['', [Validators.required]],
      // customer_address_2: ['', [Validators.required]],
      // customer_state: ['', [Validators.required]],
      // customer_postal_code: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // customer_dob: ['', [Validators.required]],
      // customer_maiden_name: ['', [Validators.required, Validators.minLength(3)]],
      // customer_phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // customer_account_holder_name: ['', [Validators.required]],
      // customer_account_routing_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // customer_mcc: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // customer_url: [''],
      // customer_business_name: ['', [Validators.required, Validators.minLength(3)]],
      // customer_tos: ['', [Validators.required]],
      // customer_ip: [''],
      // customer_gender: [''],
    });
  }

  goBack(): any {
    this.location.back();
  }

  goHome(): any {
    this.router.navigateByUrl('/home', {
      replaceUrl: true,
    });
  }

  onAddCustomer() {
    this.submitted = true;
    console.log(this.addCustomerForm.valid);
    if (this.addCustomerForm.valid) {
      this.basicService.showLoding('Adding Customer');

      let params: any = {
        'description': this.addCustomerForm.controls.customer_type.value,
        'email': this.addCustomerForm.controls.customer_email.value,
        'name': this.addCustomerForm.controls.customer_first_name.value + ' ' + this.addCustomerForm.controls.customer_last_name.value,
        'user_id': localStorage.getItem('user_id'),
      };

      console.log(params);

      let option: any = {
        headers: this.headers,
        params
      }

      this.http.post(this.add_customer_url, null, option).subscribe(data => {
        console.log(data);
        this.basicService.hideLoading();
        if (data['status'] === 'success' && data['response'] !== null) {
          const customer_id = data['response'].id;
          const successMessage = 'Customer added successfully. The next step will allow you to add more details of the customer.';
          const successButtons = [
            {
              text: 'OK',
              handler: () => {
                //this.router.navigateByUrl("/create-customer-account");
                this.goToCreateCustomerAccount(customer_id);
              }
            }
          ];
          this.showSuccessMessage('Success!', successMessage, successButtons);
        }
      });
    }
  }

  goToCreateCustomerAccount(cust_id: string) {
    const customer = {
      first_name: this.addCustomerForm.controls.customer_first_name.value,
      last_name: this.addCustomerForm.controls.customer_last_name.value,
      name: this.addCustomerForm.controls.customer_first_name.value + ' ' + this.addCustomerForm.controls.customer_last_name.value,
      email: this.addCustomerForm.controls.customer_email.value,
      customer_id: cust_id,

    }

    let navigationExtras: NavigationExtras = {
      queryParams: {
        customerParams: JSON.stringify(customer),
      }
    }
    //this.router.navigateByUrl("/create-customer-account", navigationExtras);
    this.router.navigate(["create-customer-account"], navigationExtras);
  }

  showSuccessMessage(header, message, buttons) {
    this.alertController.create({
      header: header,
      message: message,
      buttons: buttons,
    }).then(res => {
      res.present();
    });
  }

  get errorCtr() {
    return this.addCustomerForm.controls;
  }

}
