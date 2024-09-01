import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [ `
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = [ 'remember' ];

    form!: UntypedFormGroup;
    loading!: boolean;

    constructor(public layoutService: LayoutService,
        private readonly formBuilder: FormBuilder,
        private readonly authSvc: AuthService,
        private readonly router: Router
    ) { }
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            userName: [ null, [ Validators.required, Validators.maxLength(80) ] ],
            password: [ null, [ Validators.required, Validators.maxLength(32), Validators.minLength(3) ] ],
        })
    }

    onSubmit(): void {
        this.loading = true;
        this.authSvc.loginAdmin(this.form.value).pipe((finalize(() => this.loading = false))).subscribe(res => {
            const { token, user } = res;
            this.authSvc.setToken(token);
            this.router.navigate([ '/admin/inicio' ])
        })
    }

    public isInvalid(name: string): boolean {
        return this.form.controls[ name ].invalid && this.form.controls[ name ].touched;
    }
}
