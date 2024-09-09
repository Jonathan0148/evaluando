import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccordionTab } from 'primeng/accordion';

@Component({
  selector: 'app-institutional',
  templateUrl: './institutional.component.html',
  styleUrls: ['./institutional.component.scss']
})
export class InstitutionalComponent implements OnInit, AfterViewInit {
  isModalOpenYopal = false;
  isModalOpenFloridablanca = false;

  @ViewChildren(AccordionTab) accordionTabs!: QueryList<AccordionTab>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          this.scrollToSection(fragment);
        }, 100);
      }
    });
  }

  openModal(modalType: string) {
    if (modalType === 'yopalMap') {
      this.isModalOpenYopal = true;
    } else if (modalType === 'floridablancaMap') {
      this.isModalOpenFloridablanca = true;
    }
  }

  closeModal(modalType: string) {
    if (modalType === 'yopal') {
      this.isModalOpenYopal = false;
    } else if (modalType === 'floridablanca') {
      this.isModalOpenFloridablanca = false;
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (sectionId.includes('licencia')) {
        this.openAccordion(sectionId);
      }
    }
  }

  openAccordion(sectionId: string): void {
    let accordionToOpen: AccordionTab | undefined;
    
    if (sectionId === 'licencia-salud') {
      accordionToOpen = this.accordionTabs.find(tab => tab.header === 'Licencia Salud Ocupacional');
    } else if (sectionId === 'licencia-transporte') {
      accordionToOpen = this.accordionTabs.find(tab => tab.header === 'Licencia Min. Transporte');
    } else if (sectionId === 'licencia-defensa') {
      accordionToOpen = this.accordionTabs.find(tab => tab.header === 'Licencia Min. Defensa');
    }

    if (accordionToOpen) {
      accordionToOpen.selected = true;
    }
  }
}
