import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { AuthService as AuthSocialService } from 'angularx-social-login';
import { TemporaryCartService } from 'src/app/services/temporary-cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit, OnDestroy {
  client: any;
  loginForm: FormGroup;
  regiterForm: FormGroup;
  recoverPasswordForm: FormGroup;
  temporaryCart: any;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private socialAuthService: AuthSocialService,
    private temporaryCartService: TemporaryCartService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    console.log('nginit de login component');
    this.generateForms();
    this.temporaryCartService.temporaryCart$.subscribe(
      (res) => {
        this.temporaryCart = res;
      },
      (err) => {
        console.log(err);
      }
    );
    if (localStorage.getItem('token')) {
      this.router.navigate(['/my-account']);
    }
  }

  ngOnDestroy(): void {
    console.log('ondestroy de login');
  }

  signIn(loginForm: FormGroup) {
    this.clientService.signIn(loginForm.value).subscribe(
      (res: any) => {
        console.log('logueo valido');
        this.authService.setToken(res.token);
        if (localStorage.getItem('temporaryCart')) {
          console.log('hay carrito temporal');
          const filtered = this.temporaryCartService.filter(this.temporaryCart);
          this.clientService.addProductsFromTemporaryCart(filtered).subscribe(
            (res) => {
              console.log(
                'productos del carrito temporal añadidos correctamente'
              );
              console.log(res);
              this.temporaryCartService.drop();
              this.clientService.refreshClientInfo();
              console.log(this.route.snapshot.queryParams['toCheckout']);
              if (this.route.snapshot.queryParams['toCheckout']) {
                console.log('llendo a checkout');
                this.router.navigate(['/purchase-data']);
              } else {
                this.router.navigate(['/my-account']);
              }
            },
            (err) => {
              console.log(
                'ocurrio un error al momento de añadir el carrito temporal'
              );
              console.log(err);
            }
          );
        } else {
          console.log('no hay carrito temporal');
          this.clientService.refreshClientInfo();
          if (this.route.snapshot.queryParams['toCheckout']) {
            this.router.navigate(['/purchase-data']);
          } else {
            this.router.navigate(['/my-account']);
          }
        }
      },

      (err) => {
        console.log('ocurrio un error al loguearse');
        console.log(err);
        this.toastr.error(err.error.message, 'error');
      }
    );
  }

  googleSignIn(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((userData) => {
        console.log(userData);
        this.clientService.googleSignIn(userData.authToken).subscribe(
          (res: any) => {
            console.log('logueo valido');
            this.authService.setToken(res.token);
            if (localStorage.getItem('temporaryCart')) {
              console.log('hay carrito temporal');
              const filtered = this.temporaryCartService.filter(
                this.temporaryCart
              );
              this.clientService
                .addProductsFromTemporaryCart(filtered)
                .subscribe(
                  (res) => {
                    console.log(
                      'productos del carrito temporal añadidos correctamente'
                    );
                    console.log(res);
                    this.temporaryCartService.drop();
                    this.clientService.refreshClientInfo();
                    console.log(this.route.snapshot.queryParams['toCheckout']);
                    if (this.route.snapshot.queryParams['toCheckout']) {
                      console.log('llendo a checkout');
                      this.router.navigate(['/purchase-data']);
                    } else {
                      this.router.navigate(['/my-account']);
                    }
                  },
                  (err) => {
                    console.log(
                      'ocurrio un error al momento de añadir el carrito temporal'
                    );
                    console.log(err);
                  }
                );
            } else {
              console.log('no hay carrito temporal');
              this.clientService.refreshClientInfo();
              if (this.route.snapshot.queryParams['toCheckout']) {
                this.router.navigate(['/purchase-data']);
              } else {
                this.router.navigate(['/my-account']);
              }
            }
          },
          (err) => {
            console.log(err);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  facebookSignIn() {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((userData) => {
        this.clientService.facebookSignIn(userData.authToken).subscribe(
          (res: any) => {
            console.log('logueo valido');
            this.authService.setToken(res.token);
            if (localStorage.getItem('temporaryCart')) {
              console.log('hay carrito temporal');
              const filtered = this.temporaryCartService.filter(
                this.temporaryCart
              );
              this.clientService
                .addProductsFromTemporaryCart(filtered)
                .subscribe(
                  (res) => {
                    console.log(
                      'productos del carrito temporal añadidos correctamente'
                    );
                    console.log(res);
                    this.temporaryCartService.drop();
                    this.clientService.refreshClientInfo();
                    console.log(this.route.snapshot.queryParams['toCheckout']);
                    if (this.route.snapshot.queryParams['toCheckout']) {
                      console.log('llendo a checkout');
                      this.router.navigate(['/purchase-data']);
                    } else {
                      this.router.navigate(['/my-account']);
                    }
                  },
                  (err) => {
                    console.log(
                      'ocurrio un error al momento de añadir el carrito temporal'
                    );
                    console.log(err);
                  }
                );
            } else {
              console.log('no hay carrito temporal');
              this.clientService.refreshClientInfo();
              if (this.route.snapshot.queryParams['toCheckout']) {
                this.router.navigate(['/purchase-data']);
              } else {
                this.router.navigate(['/my-account']);
              }
            }
          },
          (error) => {
            console.log(error);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  register(registerForm: FormGroup) {
    console.log(registerForm);
    this.clientService.createClient(registerForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        if (localStorage.getItem('temporaryCart')) {
          const filtered = this.temporaryCartService.filter(this.temporaryCart);
          this.clientService.addProductsFromTemporaryCart(filtered).subscribe(
            (res) => {
              this.temporaryCartService.drop();
              this.clientService.refreshClientInfo();
              this.router.navigate(['/my-account']);
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          console.log('no hay carrito temporal');
          this.clientService.refreshClientInfo();
          this.router.navigate(['/my-account']);
        }
      },
      (err) => console.log(err)
    );
  }

  generateForms() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(3), Validators.required]],
      rememberMeCheckbox: [false],
    });
    this.regiterForm = this.fb.group(
      {
        firstName: ['', [Validators.minLength(3), Validators.required]],
        lastName: ['', [Validators.minLength(3), Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.minLength(3), Validators.required]],
        verifyPassword: ['', [Validators.minLength(3), Validators.required]],
        termsAndConditions: [false, [Validators.required]],
      },
      { validator: this.matchValidator }
    );
    this.recoverPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  matchValidator(group: FormGroup) {
    const password = group.controls['password'].value;
    const verifyPassword = group.controls['verifyPassword'].value;

    if (password === verifyPassword) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  recoverPassword(form: FormGroup, closeButton: HTMLButtonElement) {
    const email = form.value.email;
    console.log(email);
    this.clientService.recoverPassByMail(email).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success(
          `Te enviamos un correo a ${email} con las instrucciones de recuperacion`,
          'Revisa su correo'
        );
        closeButton.click();
      },
      (error) => {
        console.log(error), this.toastr.error(error.error);
      }
    );
  }
}
