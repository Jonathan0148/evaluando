import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ReportsService } from '../../services/reports.service';
import { RestService } from 'src/app/shared/services/rest.service';
import { Table } from 'primeng/table';

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
    this.getReports();
  }

  public getReports() {
    this._reportsSvc.setParams();

    if (!this.form.get('initDate').value || !this.form.get('endDate').value) return;
    this.loading = true;

    this._restSvc.methodPost(this.form.value, 'exams').subscribe((res: any) => {
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
