import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsPatientsService } from '../../services/reports-patients.service';
import { ReportPatient } from '../../models/report-patient.model';
import { IParamsIndex, IResponse } from 'src/app/shared/utils';
import { FilterModuleService } from 'src/app/shared/services/filter-module.service';
import { Patient } from '../../models/patient.model';
import { PatientsService } from '../../services/patients.service';
import { Table } from 'primeng/table';
import { AddReportsComponent } from '../../components/add-reports/add-reports.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  @ViewChild(AddReportsComponent) addReportsComponent!: AddReportsComponent;

  id: number;
  patientReports: ReportPatient[] = [];
  patientReportDialog: boolean = false;
  deletePatientReportDialog: boolean = false;
  paramsData: IParamsIndex = { take: 10, page: 1 };
  loading: boolean = false;
  patientReport: ReportPatient = {};
  submitted: boolean = false;
  isDetail: boolean = false;
  canSee: boolean = false;
  canCreate: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  patients: Patient[] = [];

  constructor(
    private readonly _filterModuleService: FilterModuleService,
    private readonly _patientsSvc: PatientsService,
    private readonly reportsPatientsSvc: ReportsPatientsService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getId();
    this.getPatients({ page: 1, take: 50 });
    this.modulePermissions();
  }
  
  private getId(): void {
    this.activatedRoute.params.subscribe(data => {
      const { id } = data;
      this.id = +id;
    });
    this.getParamsData(this.id, this.paramsData );
  }

  private getParamsData(id: number, paramsData?: IParamsIndex): void {
    this.loading = true;
    this.reportsPatientsSvc.findAll( paramsData,{ patientId: id }).subscribe((response: any) => {
      const { meta } = response;
      this.paramsData.take = meta.itemCount || 1;
      this.getPatientsExams(id, this.paramsData);
    });
  }

  private getPatientsExams(id: number, paramsData?: IParamsIndex) {
    this.reportsPatientsSvc.findAll( paramsData, { patientId: id }).subscribe((response: any) => {
      this.patientReports =  response.data;
    });
    this.loading = false;
  }

  private getPatients(paramsData?: IParamsIndex): void {
    this._patientsSvc.findAll(paramsData).subscribe((response: any) => {
      const { data } = response;
      this.patients = data;
    })
  }

  openNew() {
    this.isDetail = false;
    this.patientReport = {};
    this.submitted = false;
    this.patientReportDialog = true;
  }

  onSubmit(patientReport: ReportPatient) {
    const { id } = patientReport;
    if (id) return this.update(patientReport);
    this.create();
    return
  }

  editItem(patientReport: ReportPatient) {
    this.isDetail = false;
    this.patientReportDialog = true;
    this.patientReport = { ...patientReport };
  }

  seeItem(patientReport: ReportPatient) {
    this.isDetail = true;
    this.patientReportDialog = true;
    this.patientReport = { ...patientReport };
  }

  update(patientReport: ReportPatient) {
    this.submitted = true;
    if (!this.addReportsComponent) return;
    const formData = this.addReportsComponent.getFormData();
    if (!formData) return;
    const updatedFormData: ReportPatient = { ...patientReport, ...formData };
    this.reportsPatientsSvc.update(this.patientReport.id, updatedFormData).subscribe((data: IResponse) => {
      this.getParamsData(this.id);

    });
    this.patientReport = {};
    this.patientReportDialog = false;
  }

  deleteItem(patientReport: ReportPatient) {
    this.deletePatientReportDialog = true;
    this.patientReport = { ...patientReport };
  }

  confirmDelete() {
    this.deletePatientReportDialog = false;
    this.reportsPatientsSvc.delete(this.patientReport.id).subscribe(response => {
      this.getParamsData(this.id);
    })
    this.patientReport = {};
  }

  hideDialog() {
    this.patientReport = {};
    this.patientReportDialog = false;
    this.submitted = false;
  }

  create() {
    this.submitted = true;
    if (!this.addReportsComponent) return;
    const formData = this.addReportsComponent.getFormData();
    if (!formData) return;
    this.reportsPatientsSvc.create(formData).subscribe((data: IResponse) => {
      this.getParamsData(this.id);

    });
    this.patientReport = {};
    this.patientReportDialog = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onRowSelect(event: any){
    this.addReportsComponent.openWindow(event.file_location);
  }

  modulePermissions() {
    const permissions = this._filterModuleService.modulePermissions('06');

    this.canSee = permissions.canSee;
    this.canCreate = permissions.canCreate;
    this.canEdit = permissions.canEdit;
    this.canDelete = permissions.canDelete;
  }
}
