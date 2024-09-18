import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ReportsService } from '../../services/reports.service';
import { RestService } from 'src/app/shared/services/rest.service';
import { Table } from 'primeng/table';
import { IParamsIndex } from 'src/app/shared/utils';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  form!: UntypedFormGroup;
  reports: any;
  loading: boolean = false;
  reportDialog: boolean = false;
  report: any = {};
  paramsData: IParamsIndex = { take: 10, page: 1 };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly _reportsSvc: ReportsService,
    private readonly _restSvc: RestService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      initDate: [ null ],
      endDate: [ new Date() ],
    });
    this.getParamsData();
  }

  public getParamsData(): void {
    this._reportsSvc.setParams();

    if (!this.form.get('initDate').value || !this.form.get('endDate').value) return;
    this.loading = true;

    this._restSvc.post(this.form.value, 'exams', this.paramsData).subscribe((res: any) => {
      const { meta } = res;

      this.reports = res.data;
      this.paramsData.take = meta.itemCount || 1;
      this.getReports();
    });
}

  public getReports() {
    this._reportsSvc.setParams();

    if (!this.form.get('initDate').value || !this.form.get('endDate').value) return;
    this.loading = true;

    this._restSvc.post(this.form.value, 'exams', this.paramsData).subscribe((res: any) => {
      this.reports = res.data;
      this.loading = false;
    });
  }

  seeItem(report: any) {
    this.reportDialog = true;
    this.report = { ...report };
  }

  hideDialog() {
    this.report = {};
    this.reportDialog = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
