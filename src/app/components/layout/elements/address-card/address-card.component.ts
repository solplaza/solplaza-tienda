import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent implements OnInit {
  @Input() address: any = {};
  @Input() index: number;
  updateAddressForm: FormGroup;


  provinces = [];
  districts = [];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    public ubigeoService: UbigeoService
  ) {}

  ngOnInit() {
    this.provinces = this.ubigeoService.getProvincesById(
      this.address.department.id
    );
    this.districts = this.ubigeoService.getDistrictsById(
      this.address.province.id
    );
    this.updateAddressForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      DNI: ['', [Validators.required]],
      cellPhone: ['', [Validators.required]],
      department: [this.address.department.id, [Validators.required]],
      province: [this.address.province.id, [Validators.required]],
      district: [this.address.district.id, Validators.required],
      shippingAddress: ['', [Validators.required]]
    });
  }

  deleteAddress(idAddress) {
    this.clientService.deleteAddress(idAddress).subscribe(
      res => {
        this.clientService.refreshClientInfo();
      },
      err => {
        console.log(err);
      }
    );
  }

  setAddressAsDefault(idAddress) {
    this.clientService.setAddressAsDefault(idAddress).subscribe(
      res => {
        this.clientService.getClient();
        this.clientService.refreshClientInfo();

      },
      err => {
        console.log(err);
      }
    );
  }

  updateAddress(idAddress, updateAddressForm, btnClose: HTMLButtonElement) {
    const { department, province, district } = this.ubigeoService.getUbigeo(
      updateAddressForm.value.department,
      updateAddressForm.value.province,
      updateAddressForm.value.district
    );
    updateAddressForm.value.department = department;
    updateAddressForm.value.province = province;
    updateAddressForm.value.district = district;
    this.clientService
      .updateAddress(idAddress, updateAddressForm.value)
      .subscribe(
        res => {
          btnClose.click();
          this.clientService.refreshClientInfo();
        },
        err => {
          console.log(err);
        }
      );
  }


  changeDepartment(idDepartment) {
    this.provinces = [];
    this.districts = [];
    this.ubigeoService.provinces.forEach(e => {
      if (e.department_id == idDepartment) {
        this.provinces.push(e);
      }
    });
  }

  changeProvince(idProvince) {
    this.districts = [];
    this.ubigeoService.districts.forEach(e => {
      if (e.province_id == idProvince) {
        this.districts.push(e);
      }
    });
  }
}
