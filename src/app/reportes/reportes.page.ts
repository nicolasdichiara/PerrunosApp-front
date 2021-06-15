import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reporte } from 'src/domain/reporte';
import { ReportesService } from '../services/reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  reportes: Array<Reporte> = []

  constructor(
    private router: Router,
    private reportesService: ReportesService
  ) { }

  async ngOnInit() {
    this.reportes = await this.reportesService.getTodosLosReportes()
  }

}
