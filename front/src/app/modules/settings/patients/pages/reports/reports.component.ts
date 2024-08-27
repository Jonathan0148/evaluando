import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsPatientsService } from '../../services/reports-patients.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  id: number;
  patientReports: any = [];

  ngOnInit(): void {
    this.getId();
  }

  constructor(
    private readonly reportsPatientsSvc: ReportsPatientsService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  private getId(): void {
    this.activatedRoute.params.subscribe(data => {
      const { id } = data;
      this.id = +id;
    });
    this.getPatientsReports(this.id);
  }

  private getPatientsReports(id: number) {
    this.reportsPatientsSvc.findAll({ patientId: id }).subscribe((response: any) => {
      this.patientReports = response.data;
    });
  }
}
