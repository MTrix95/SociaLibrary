import {Component, inject, OnInit} from '@angular/core';
import { ChartModule } from 'primeng/chart';
import {StatsService} from '../services/stats.service';
import {forkJoin} from 'rxjs';
import {ChartOptions} from 'chart.js';


@Component({
  selector: 'app-stats',
  imports: [
    ChartModule
  ],
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit {
  private _statsService: StatsService = inject(StatsService);

  protected dataCategory: any;
  protected optionsCategory: any;

  protected dataTotal: any;
  protected dataDaily: any
  protected optionsDaily: any
  protected optionsTotal: any;


  ngOnInit() {
    forkJoin({
      category: this._statsService.getCategoryStats(),
      users: this._statsService.getUserStats()
    }).subscribe({
      next: (results) => {
        const categories = results.category;
        const users = results.users;

        this.dataCategory = {
          labels: categories.map((item: any) => item.name || item.target?.name),
          datasets: [{
            label: 'Quantità Libri',
            data: categories.map(item => item.total),
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26C6DA']
          }]
        }

        let accumulatore = 0;
        const labels = users.map(item => item.date);
        const giornalieri = users.map(item => item.count);
        const totali = users.map(item => {
          accumulatore += item.count;
          return accumulatore;
        });

        // 1. Dati per le BARRE (Nuovi Iscritti)
        this.dataDaily = {
          labels: labels,
          datasets: [{
            label: 'Nuovi Iscritti',
            data: giornalieri,
            backgroundColor: '#42A5F5',
            borderRadius: 5
          }]
        };

        // 2. Dati per la LINEA (Crescita Totale)
        this.dataTotal = {
          labels: labels,
          datasets: [{
            label: 'Volume Totale Utenti',
            data: totali,
            borderColor: '#66BB6A',
            backgroundColor: 'rgba(102, 187, 106, 0.1)',
            fill: true, // Riempie l'area sotto la linea
            tension: 0.4
          }]
        };
      }
    });

    this.optionsCategory = {
      animation: false,
      plugins: {
        title: { display: true, text: 'Distribuzione Libri per Categoria' }
      }
    };

    this.optionsTotal = {
      animation: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: { color: '#94a3b8' },
          grid: { display: false }
        },
        y: {
          ticks: { color: '#94a3b8' },
          grid: { color: '#f1f5f9' }
        }
      },
      elements: {
        line: {
          tension: 0.4,
          borderWidth: 3,
          borderColor: '#3b82f6',
          fill: true,
          backgroundColor: 'rgba(59, 130, 246, 0.05)'
        },
        point: { radius: 0 }
      }
    };

    this.dataDaily = {
      animation: false,
      labels: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
      datasets: [
        {
          label: 'Ricavi',
          backgroundColor: '#3b82f6',
          hoverBackgroundColor: '#2563eb',
          borderRadius: 6,
          data: [65, 59, 80, 81, 56, 55, 40],
          barThickness: 20
        }
      ]
    };
  }

}
