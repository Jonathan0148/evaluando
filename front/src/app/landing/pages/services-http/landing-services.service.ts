import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LandingServicesService {

  constructor(
    private _restSvc: RestService,
  ) {
    this.setParams();
  }

  findAll(): Observable<any> {
    this._restSvc.endPoint = "landing/getServices";
    return this._restSvc.postPatient<any>();
  }

  getHeadquarters(): Observable<any> {
    this._restSvc.endPoint = "landing/getHeadquarters";
    return this._restSvc.getAll<any>();
  }

  createContact(data: any): Observable<any> {
    this._restSvc.endPoint = "landing/createContact";
    return this._restSvc.create<any>(data);
  }

  public setParams(): void {
    this._restSvc.port = environment.portsServices.api;
  }

  getData() {
    return [
      {
        itemImageSrc: 'assets/layout/images/carousel/10.jpeg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
        alt: 'Description for Image 10',
        title: 'Title 7'
      },
      {
        itemImageSrc: 'assets/layout/images/carousel/11.jpeg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
        alt: 'Description for Image 11',
        title: 'Title 7'
      },
      {
        itemImageSrc: 'assets/layout/images/carousel/12.jpeg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
        alt: 'Description for Image 12',
        title: 'Title 7'
      },
      {
        itemImageSrc: 'assets/layout/images/carousel/13.jpeg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
        alt: 'Description for Image 13',
        title: 'Title 7'
      },
      {
        itemImageSrc: 'assets/layout/images/carousel/14.jpeg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
        alt: 'Description for Image 14',
        title: 'Title 7'
      },
      {
        itemImageSrc: 'assets/layout/images/carousel/15.jpeg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
        alt: 'Description for Image 15',
        title: 'Title 7'
      },
    ];
  }

  getImages() {
    return Promise.resolve(this.getData());
  }

  getDataFlorida() {
    return [
      {
        itemImageSrc: 'assets/layout/images/florida/1.jpeg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/florida/1alleria7s.jpg',
        alt: 'Description for Image 9',
        title: 'Title 9'
      },
      {
        itemImageSrc: 'assets/layout/images/florida/2.jpeg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/florida/1alleria7s.jpg',
        alt: 'Description for Image 10',
        title: 'Title 7'
      },
    ];
  }
  
  getImagesFlorida() {
    return Promise.resolve(this.getDataFlorida());
  }

  getDataYopal() {
    return [
      {
        itemImageSrc: 'assets/layout/images/yopal/1.jpeg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
        alt: 'Description for Image 9',
        title: 'Title 9'
      },
      {
        itemImageSrc: 'assets/layout/images/yopal/2.jpeg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
        alt: 'Description for Image 10',
        title: 'Title 7'
      },
    ];
  }
  
  getImagesYopal() {
    return Promise.resolve(this.getDataYopal());
  }

  getDataPatios() {
    return [
      {
        itemImageSrc: 'assets/layout/images/patios/1.jpeg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
        alt: 'Description for Image 9',
        title: 'Title 9'
      },
      {
        itemImageSrc: 'assets/layout/images/patios/2.jpeg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
        alt: 'Description for Image 10',
        title: 'Title 7'
      },
      {
        itemImageSrc: 'assets/layout/images/patios/3.jpeg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
        alt: 'Description for Image 11',
        title: 'Title 7'
      },
    ];
  }
  
  getImagesPatios() {
    return Promise.resolve(this.getDataPatios());
  }
}