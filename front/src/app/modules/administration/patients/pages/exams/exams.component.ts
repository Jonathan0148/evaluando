import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IParamsIndex, IResponse } from 'src/app/shared/utils';
import { FilterModuleService } from 'src/app/shared/services/filter-module.service';
import { ExamPatient } from '../../models/exam-patient.model';
import { ExamsPatientsService } from '../../services/exams-patients.service';
import { Table } from 'primeng/table';
import { Headquarter } from '../../../headquarters/models/headquarter.model';
import { HeadquartersService } from '../../../headquarters/services/headquarters.service';
import { TypesExamsService } from '../../../types-exams/services/types-exams.service';
import { TypeExam } from '../../../types-exams/models/type-exam.model';
import { TypeResult } from '../../../types-results/models/type-result.model';
import { TypesResultsService } from '../../../types-results/services/types-results.service';
import { AddExamsComponent } from '../../components/add-exams/add-exams.component';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent implements OnInit {

  @ViewChild(AddExamsComponent) addExamsComponent!: AddExamsComponent;

  id: number;
  patientExams: ExamPatient[] = [];
  patientExamDialog: boolean = false;
  deletePatientExamDialog: boolean = false;
  paramsData: IParamsIndex = { take: 10, page: 1 };
  loading: boolean = false;
  patientExam: ExamPatient = {};
  submitted: boolean = false;
  isDetail: boolean = false;
  canSee: boolean = false;
  canCreate: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  headquarters: Headquarter[] = [];
  typesExams: TypeExam[] = [];
  typesResults: TypeResult[] = [];


  constructor(
    private readonly _filterModuleService: FilterModuleService,
    private readonly _headquartersSvc: HeadquartersService,
    private readonly _typesExamsSvc: TypesExamsService,
    private readonly _typesResultsSvc: TypesResultsService,
    private readonly examsPatientsSvc: ExamsPatientsService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getId();
    this.getHeadquarters({ page: 1, take: 50 });
    this.getTypeExams({ page: 1, take: 50 });
    this.getTypeResults({ page: 1, take: 50 });
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
    this.examsPatientsSvc.findAll( paramsData,{ patientId: id }).subscribe((response: any) => {
      const { meta } = response;
      this.paramsData.take = meta.itemCount || 1;
      this.getPatientsExams(id, this.paramsData);
    });
  }

  private getPatientsExams(id: number, paramsData?: IParamsIndex) {
    this.examsPatientsSvc.findAll( paramsData, { patientId: id }).subscribe((response: any) => {
      this.patientExams =  response.data.map(
        (element: any) => {
          element.date_exam = new Date(element.date_exam + 'T00:00:00');
          element.date_delivery = new Date(element.date_delivery + 'T00:00:00');
          return element;
        });
    });
    this.loading = false;
  }

  private getHeadquarters(paramsData?: IParamsIndex): void {
    this._headquartersSvc.findAll(paramsData).subscribe((response: any) => {
      const { data } = response;
      this.headquarters = data;
    })
  }

  private getTypeExams(paramsData?: IParamsIndex): void {
    this._typesExamsSvc.findAll(paramsData).subscribe((response: any) => {
      const { data } = response;
      this.typesExams = data;
    })
  }

  private getTypeResults(paramsData?: IParamsIndex): void {
    this._typesResultsSvc.findAll(paramsData).subscribe((response: any) => {
      const { data } = response;
      this.typesResults = data;
    })
  }

  openNew() {
    this.isDetail = false;
    this.patientExam = {};
    this.submitted = false;
    this.patientExamDialog = true;
  }

  onSubmit(patientExam: ExamPatient) {
    const { id } = patientExam;
    if (id) return this.update(patientExam);
    this.create();
    return
  }

  editItem(patientExam: ExamPatient) {
    this.isDetail = false;
    this.patientExamDialog = true;
    this.patientExam = { ...patientExam };
  }

  seeItem(patientExam: ExamPatient) {
    this.isDetail = true;
    this.patientExamDialog = true;
    this.patientExam = { ...patientExam };
  }

  update(patientExam: ExamPatient) {
    this.submitted = true;
    if (!this.addExamsComponent) return;
    const formData = this.addExamsComponent.getFormData();
    if (!formData) return;
    const updatedFormData: ExamPatient = { ...patientExam, ...formData };
    this.examsPatientsSvc.update(this.patientExam.id, updatedFormData).subscribe((data: IResponse) => {
      this.getParamsData(this.id);

    });
    this.patientExam = {};
    this.patientExamDialog = false;
  }

  deleteItem(patientExam: ExamPatient) {
    this.deletePatientExamDialog = true;
    this.patientExam = { ...patientExam };
  }

  confirmDelete() {
    this.deletePatientExamDialog = false;
    this.examsPatientsSvc.delete(this.patientExam.id).subscribe(response => {
      this.getParamsData(this.id);
    })
    this.patientExam = {};
  }

  hideDialog() {
    this.patientExam = {};
    this.patientExamDialog = false;
    this.submitted = false;
  }

  create() {
    this.submitted = true;
    if (!this.addExamsComponent) return;
    const formData = this.addExamsComponent.getFormData();
    if (!formData) return;
    this.examsPatientsSvc.create(formData).subscribe((data: IResponse) => {
      this.getParamsData(this.id);

    });
    this.patientExam = {};
    this.patientExamDialog = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  modulePermissions() {
    const permissions = this._filterModuleService.modulePermissions('06');

    this.canSee = permissions.canSee;
    this.canCreate = permissions.canCreate;
    this.canEdit = permissions.canEdit;
    this.canDelete = permissions.canDelete;
  }
}
