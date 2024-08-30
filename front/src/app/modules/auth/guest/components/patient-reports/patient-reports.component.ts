import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportPatient } from 'src/app/modules/administration/patients/models/report-patient.model';
import { IParamsIndex } from 'src/app/shared/utils';
import { ReportsPatientsService } from '../../services/reports-patients.service';
import { AuthService } from '../../../services/auth.service';
import { Table } from 'primeng/table';
import { AddReportsComponent } from '../add-reports/add-reports.component';

@Component({
  selector: 'app-patient-reports',
  templateUrl: './patient-reports.component.html',
  styleUrl: './patient-reports.component.scss'
})
export class PatientReportsComponent implements OnInit {

  @ViewChild(AddReportsComponent) addReportsComponent!: AddReportsComponent;

  patientReports: ReportPatient[] = [];
  patientReportDialog: boolean = false;
  deletePatientReportDialog: boolean = false;
  paramsData: IParamsIndex = { take: 10, page: 1 };
  loading: boolean = false;
  patientReport: ReportPatient = {};
  isDetail: boolean = false;
  document: string | undefined;
  password: string | undefined;
  year = new Date().getFullYear();

  constructor(
    private readonly reportsPatientsSvc: ReportsPatientsService,
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getTokenData();
  }
  
  private getTokenData(): void {
    const tokenData = this.authService.getTokenPatient();
    if (tokenData) {
      this.document = tokenData.document;
      this.password = tokenData.password;
      this.getParamsData(this.document, this.password);
    } else {
      console.error('No se encontró el token del paciente en las cookies.');
    }
  }

  private getParamsData(document: string, password: string, paramsData?: IParamsIndex): void {
    this.loading = true;
    this.reportsPatientsSvc.findAll(paramsData, { document: document, password: password }).subscribe((response: any) => {
      const { meta } = response;
      this.paramsData.take = meta.itemCount || 1;
      this.getPatientsExams(document, password, this.paramsData);
    });
  }

  private getPatientsExams(document: string, password: string, paramsData?: IParamsIndex) {
    this.reportsPatientsSvc.findAll(paramsData, { document: document, password: password }).subscribe((response: any) => {
      this.patientReports =  response.data.map(
        (element: any) => {
          element.date_exam = new Date(element.date_exam + 'T00:00:00');
          element.date_delivery = new Date(element.date_delivery + 'T00:00:00');
          return element;
        });
      this.loading = false;
    });
  }

  seeItem(patientReport: ReportPatient) {
    this.isDetail = true;
    this.patientReportDialog = true;
    this.patientReport = { ...patientReport };
  }

  hideDialog() {
    this.patientReport = {};
    this.patientReportDialog = false;
  }

  onRowSelect(event: any){
    this.addReportsComponent.openWindow(event.file_location);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
