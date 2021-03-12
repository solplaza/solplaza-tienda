import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const hash = this.route.snapshot.queryParams['hash'];
    if (hash) {
      console.log(hash);
    } else {
      this.router.navigate(['/home']);
    }
    this.newPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  recoverPassword(newPasswordForm: FormGroup) {
    const email = this.route.snapshot.queryParams['email'];
    const hash = this.route.snapshot.queryParams['hash'];
    const newPassword = newPasswordForm.value.newPassword;
    this.clientService.recoverPassword({ email, hash, newPassword }).subscribe(
      res => {
        console.log(res);
        this.toastr.success('contraseña actualizada correctamente');
        this.router.navigate(['/login-register']);
      },
      error => {
        console.log(error);
        this.toastr.error('ocurri un error al cambiar la contraseña');
      }
    );
  }
}
