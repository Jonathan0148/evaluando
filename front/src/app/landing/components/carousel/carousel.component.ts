import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  images: any = [
    {
      itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
      thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1'
  },
  {
      itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
      thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
      alt: 'Description for Image 2',
      title: 'Title 2'
  },
  {
      itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
      thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
      alt: 'Description for Image 3',
      title: 'Title 3'
  },
  {
      itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
      thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg',
      alt: 'Description for Image 4',
      title: 'Title 4'
  },
  {
      itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg',
      thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5s.jpg',
      alt: 'Description for Image 5',
      title: 'Title 5'
  },
  ]

  responsiveOptions: any[] | undefined;

  constructor() { }

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
}
