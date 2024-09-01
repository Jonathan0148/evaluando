import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  images: any = [
    {
      itemImageSrc: '././assets/layout/images/carousel/1.jpeg',
      alt: 'Description for Image 1',
      title: 'Title 1'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/2.jpeg',
      alt: 'Description for Image 2',
      title: 'Title 2'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/3.jpeg',
      alt: 'Description for Image 3',
      title: 'Title 3'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/4.jpeg',
      alt: 'Description for Image 4',
      title: 'Title 4'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/5.jpeg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/6.jpeg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/7.jpeg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/8.jpeg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/9.jpeg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/10.jpeg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/11.jpeg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/12.jpeg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/13.jpeg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/14.jpeg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/15.jpeg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/16.jpeg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/17.jpeg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/18.jpeg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/19.jpeg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/20.jpeg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    },
    {
      itemImageSrc: '././assets/layout/images/carousel/21.jpeg',
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
