import {Component, inject, OnInit} from '@angular/core';
import { ChartModule } from 'primeng/chart';
import {StatsUserService} from '../services/stats-user.service';



@Component({
  selector: 'app-stats',
  imports: [
    ChartModule
  ],
  templateUrl: './stats-user.component.html',
})
export class StatsUserComponent implements OnInit {
  private _statsService: StatsUserService = inject(StatsUserService);

  protected dataCategory: any;
  protected optionsCategory: any;

  ngOnInit() {
    // Caricamento dati solo per le categorie
    this._statsService.getCategoryStats().subscribe({
      next: (categories) => {
        this.dataCategory = {
          labels: categories.map((item: any) => item.name || item.target?.name),
          datasets: [{
            data: categories.map((item: any) => item.total),
            backgroundColor: [
              '#3b82f6',
              '#10b981',
              '#f59e0b',
              '#6366f1',
              '#f43f5e',
              '#8b5cf6'
            ],
            hoverOffset: 15,
            borderWidth: 0
          }]
        };
      }
    });


    this.optionsCategory = {
      cutout: '75%', // Effetto ciambella sottile
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20,
            color: '#64748b',
            font: { size: 14, weight: '500' }
          }
        },
        tooltip: {
          padding: 12,
          displayColors: true
        }
      },
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      }
    };
  }
}
