import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LandingServicesService } from '../services-http/landing-services.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  form!: UntypedFormGroup;
  submitted: boolean = false;
  headquarters = []
  isModalOpenYopal = false;
  isModalOpenFloridablanca = false;
  isModalOpenPatios = false;
  imagesYopal: any[] | undefined;
  imagesFlorida: any[] | undefined;
  imagesPatios: any[] | undefined;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly landingServicesService: LandingServicesService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      names: [ null, [ Validators.required, Validators.minLength(5), Validators.maxLength(50) ] ],
      surnames: [ null, [ Validators.required, Validators.minLength(5), Validators.maxLength(50) ] ],
      address: [ null, [ Validators.maxLength(100) ] ],
      cellphone: [ null, [ Validators.required, Validators.maxLength(20) ] ],
      email: [ null, [ Validators.required, Validators.email, Validators.maxLength(100), ContactComponent.emailValidator ] ],
      headquarters_id: [ null, [ Validators.required ] ],
      comments: [ null, [ Validators.maxLength(500) ] ],
    });
    this.getHeadquarters()
    this.landingServicesService.getImagesYopal().then((images: any) => (this.imagesYopal = images));
    this.landingServicesService.getImagesFlorida().then((images: any) => (this.imagesFlorida = images));
    this.landingServicesService.getImagesPatios().then((images: any) => (this.imagesPatios = images));

  }

  public getHeadquarters() {
    this.landingServicesService.getHeadquarters().subscribe((response: any) => {
      this.headquarters = response;
    });
  }

  private static emailValidator(control: AbstractControl): { [ key: string ]: any | null } {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.value && !emailRegexp.test(control.value)) {
      return { 'invalidEmail': true };
    }
    return null;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.landingServicesService.createContact(this.form.value).subscribe((response: any) => {
        console.log(response);
        this.submitted = false;
        this.form.reset();
      });
    }
  }

  openModal(modalType: string) {
    if (modalType === 'yopalMap') {
      this.isModalOpenYopal = true;
    } else if (modalType === 'floridablancaMap') {
      this.isModalOpenFloridablanca = true;
    } else if (modalType === 'patiosMap') {
      this.isModalOpenPatios = true;
    }
  }
  
  closeModal(modalType: string) {
    if (modalType === 'yopal') {
      this.isModalOpenYopal = false;
    } else if (modalType === 'floridablanca') {
      this.isModalOpenFloridablanca = false;
    } else if (modalType === 'patios') {
      this.isModalOpenPatios = false;
    }
  }
  
}