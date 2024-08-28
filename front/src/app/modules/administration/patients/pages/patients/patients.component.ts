import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../../models/patient.model';
import { IParamsIndex, IResponse } from 'src/app/shared/utils';
import { PatientsService } from '../../services/patients.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { FilterModuleService } from 'src/app/shared/services/filter-module.service';
import { AddPatientsComponent } from '../../components/add-patients/add-patients.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent implements OnInit {
  @ViewChild(AddPatientsComponent) addPatientsComponent!: AddPatientsComponent;

  id: number;
  patientDialog: boolean = false;
  deletePatientDialog: boolean = false;
  patients: Patient[] = [];
  paramsData: IParamsIndex = { take: 10, page: 1 };
  loading: boolean = false;
  patient: Patient = {};
  submitted: boolean = false;
  isDetail: boolean = false;
  canSee: boolean = false;
  canCreate: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;

  constructor(
    private readonly _patientsSvc: PatientsService,
    public readonly router: Router,
    private readonly _filterModuleService: FilterModuleService
  ) { }

  ngOnInit() {
    this.getParamsData();
    this.modulePermissions();
  }

  private getParamsData(): void {
    this.loading = true;
    this._patientsSvc.findAll(this.paramsData).subscribe((response: any) => {
      const { meta } = response;
      this.paramsData.take = meta.itemCount || 1;
      this.getPatients();
    });
  }

  private getPatients(): void {
    this._patientsSvc.findAll(this.paramsData).subscribe((response: any) => {
      const { data } = response;
      this.patients = data;
      this.loading = false;
    });
  }

  openNew() {
    this.isDetail = false;
    this.patient = {};
    this.submitted = false;
    this.patientDialog = true;
  }

  onSubmit(patient: Patient) {
    const { id } = patient;
    if (id) return this.update(patient);
    this.create();
    return
  }

  editItem(patient: Patient) {
    this.isDetail = false;
    this.patientDialog = true;
    this.patient = { ...patient };
  }

  seeItem(patient: Patient) {
    this.isDetail = true;
    this.patientDialog = true;
    this.patient = { ...patient };
  }

  exams(patient: Patient) {
    this.router.navigate([ '/admin/pacientes/examenes', patient.id ])
    this.patient = { ...patient };
  }

  reports(patient: Patient) {
    this.router.navigate([ '/admin/pacientes/reportes', patient.id ])
    this.patient = { ...patient };
  }

  update(patient: Patient) {
    this.submitted = true;
    if (!this.addPatientsComponent) return;
    const formData = this.addPatientsComponent.getFormData();
    if (!formData) return;
    const updatedFormData: Patient = { ...patient, ...formData };
    this._patientsSvc.update(this.patient.id, updatedFormData).subscribe((data: IResponse) => {
      this.getParamsData();
    });
    this.patient = {};
    this.patientDialog = false;
  }

  deleteItem(patient: Patient) {
    this.deletePatientDialog = true;
    this.patient = { ...patient };
  }

  confirmDelete() {
    this.deletePatientDialog = false;
    this._patientsSvc.delete(this.patient.id).subscribe(response => {
      this.getParamsData();
    })
    this.patient = {};
  }

  hideDialog() {
    this.patient = {};
    this.patientDialog = false;
    this.submitted = false;
  }

  create() {
    this.submitted = true;
    if (!this.addPatientsComponent) return;
    const formData = this.addPatientsComponent.getFormData();
    if (!formData) return;
    this._patientsSvc.create(formData).subscribe((data: IResponse) => {
      this.getParamsData();
    });
    this.patient = {};
    this.patientDialog = false;
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
