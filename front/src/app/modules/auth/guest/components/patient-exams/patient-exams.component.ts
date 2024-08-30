import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AddExamsComponent } from '../add-exams/add-exams.component';
import { Table } from 'primeng/table';
import { Headquarter } from 'src/app/modules/administration/headquarters/models/headquarter.model';
import { ExamPatient } from 'src/app/modules/administration/patients/models/exam-patient.model';
import { TypeExam } from 'src/app/modules/administration/types-exams/models/type-exam.model';
import { TypeResult } from 'src/app/modules/administration/types-results/models/type-result.model';
import { IParamsIndex } from 'src/app/shared/utils';
import { ExamsPatientsService } from '../../services/exams-patients.service';
import { AuthService } from '../../../services/auth.service';
import { MenuItem } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-patient-exams',
  templateUrl: './patient-exams.component.html',
  styles: [ `
    :host ::ng-deep .layout-topbar .layout-topbar-logo img {
      height: 7.5rem;
      margin-right: 0.5rem;
  }`]
})
export class PatientExamsComponent implements OnInit {
  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;

  user: any | null = this.authService.getTokenPatient();
  year = new Date().getFullYear();

  patientExams: ExamPatient[] = [];
  patientExamDialog: boolean = false;
  deletePatientExamDialog: boolean = false;
  paramsData: IParamsIndex = { take: 10, page: 1 };
  loading: boolean = false;
  patientExam: ExamPatient = {};
  isDetail: boolean = false;
  headquarters: Headquarter[] = [];
  typesExams: TypeExam[] = [];
  typesResults: TypeResult[] = [];
  document: string | undefined;
  password: string | undefined;

  constructor(
    private readonly examsPatientsSvc: ExamsPatientsService,
    public layoutService: LayoutService,
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
    this.examsPatientsSvc.findAll(paramsData, { document: document, password: password }).subscribe((response: any) => {
      const { meta } = response;
      this.paramsData.take = meta.itemCount || 1;
      this.getPatientsExams(document, password, this.paramsData);
    });
  }

  private getPatientsExams(document: string, password: string, paramsData?: IParamsIndex) {
    this.examsPatientsSvc.findAll(paramsData, { document: document, password: password }).subscribe((response: any) => {
      this.patientExams = response.data.map(
        (element: any) => {
          element.date_exam = new Date(element.date_exam + 'T00:00:00');
          element.date_delivery = new Date(element.date_delivery + 'T00:00:00');
          return element;
        });
      this.loading = false;
    });
  }

  seeItem(patientExam: ExamPatient) {
    this.isDetail = true;
    this.patientExamDialog = true;
    this.patientExam = { ...patientExam };
  }

  hideDialog() {
    this.patientExam = {};
    this.patientExamDialog = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  logout() {
    this.authService.clearCookiesPatient();
    setTimeout(() => {
      this.authService.isAuthenticatedPatient();
    }, 100);
  }
}
