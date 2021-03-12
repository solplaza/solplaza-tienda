import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit, OnDestroy {
  client: any;
  accountDetailsForm: FormGroup;
  resetPasswordForm: FormGroup;
  addAddressForm: FormGroup;
  addAddressFormFlag = false;

  confirmResult = null;


  departments = [];
  provinces = [];
  districts = [];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    public ubigeoService: UbigeoService
  ) {}

  ngOnInit() {
    console.log('nginit de my account component');

    this.departments = this.ubigeoService.departments;
    this.clientService.getClient().subscribe(
      (res: any) => {
        console.log(res);
        this.client = res;
      },
      err => {
        if (err.error.status == 'client not found') {
          this.authService.signOut();
          this.router.navigate(['/login-register']);
        } else {
          console.log(err);
        }
      }
    );

    this.clientService.client$.subscribe(
      res => {
        this.client = res;
        this.generateForms();
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    console.log('destroy de my account')
  }

  updateAccountDetails(accoutnDetails: FormGroup) {
    this.clientService
      .updateAccountDetails(this.client._id, accoutnDetails.value)
      .subscribe(
        res => {
          this.clientService.updateClient(res);
        },
        err => {
          console.log(err);
        }
      );
  }
  resetPassword(resetForm: FormGroup) {
    const { currentPassword, newPassword } = resetForm.value;
    this.clientService.resetPassword(currentPassword, newPassword).subscribe(
      res => {
        console.log(res);
        this.resetPasswordForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  }


  createAddress(addAddressForm: FormGroup) {
    console.log(addAddressForm.value);
    const { department, province, district } = this.ubigeoService.getUbigeo(
      addAddressForm.value.department,
      addAddressForm.value.province,
      addAddressForm.value.district
    );
    addAddressForm.value.department = department;
    addAddressForm.value.province = province;
    addAddressForm.value.district = district;
    this.clientService
      .createAddress(addAddressForm.value, this.client.addresses.length)
      .subscribe(
        res => {
          console.log(res);
          this.clientService.refreshClientInfo();
          this.addAddressFormFlag = false;
        },
        err => {
          console.log(err);
        }
      );
  }

  showAddAddressForm() {
    this.addAddressFormFlag = !this.addAddressFormFlag;
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/home']);
  }


  generateForms() {
    this.accountDetailsForm = this.fb.group({
      firstName: [this.client.firstName, Validators.minLength(3)],
      lastName: [this.client.lastName],
      email: [this.client.email, Validators.email]
    });
    this.resetPasswordForm = this.fb.group({
      currentPassword: ['', Validators.minLength(3)],
      newPassword: [''],
      confirmNewPassword: ['']
    });
    this.addAddressForm = this.fb.group({
      firstName: [
        this.client.firstName,
        [Validators.required, Validators.minLength(3)]
      ],
      lastName: [
        this.client.lastName,
        [Validators.required, Validators.minLength(3)]
      ],
      DNI: ['', [Validators.required, Validators.minLength(8)]],
      cellPhone: ['', [Validators.required, Validators.minLength(9)]],
      department: ['', [Validators.required]],
      province: ['', [Validators.required]],
      district: ['', [Validators.required]],
      shippingAddress: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  changeDepartment(idDepartment) {
    this.districts = [];
    this.provinces = [];
    this.provinces = this.ubigeoService.getProvincesById(idDepartment);
    this.addAddressForm.value.province = '';
    this.addAddressForm.value.district = '';
    this.addAddressForm.reset(this.addAddressForm.value);
  }
  changeProvince(idProvince) {
    this.districts = [];
    this.districts = this.ubigeoService.getDistrictsById(idProvince);
    this.addAddressForm.value.district = '';
    this.addAddressForm.reset(this.addAddressForm.value);
  }
}
