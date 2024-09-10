import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  form!: UntypedFormGroup;
  public getInventoryReports() {
    // this._inventoryReportsSvc.setParams();

    // this._restSvc.methodPost(this.form.value, '').subscribe((res: any) => {
    //     this.inventoryReports = res.map(element => {
    //         if (element.date) {
    //             const dateParts = element.date.split('-');
    //             element.dateString = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
    //         } else {
    //             element.dateString = null;
    //         }
    //         return element;
    //     });
    //     this.loading = false;
    // });
}
}
