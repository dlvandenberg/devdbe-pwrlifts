import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WeightService } from '@app-weight/services/weight.service';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.scss'],
  providers: [ DatePipe ]
})
export class WeightChartComponent implements OnInit {
  weightChartData: ChartDataSets[] = [];
  weightChartLabels: string[] = [];
  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: 'rgb(209, 222, 222)'
          }
        }
      ],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            fontColor: 'rgba(70, 129, 137)'
          }
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,255,255,0.3)',
          },
          ticks: {
            fontColor: 'rgb(253, 202, 64)',
          }
        }
      ]
    }
  };

  constructor(
    private readonly weightService: WeightService,
    private readonly datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.weightService.weights$.subscribe(weightList => {
      const chartData: ChartDataSets[] = [];
      const chartLabels: string[] = [];
      const weights: number[] = [];
      const calories: number[] = [];
      weightList.forEach((weight) => {
        chartLabels.push(
          this.datePipe.transform(weight.measuredOn, 'dd-MM-yyyy')
        );
        weights.push(weight.weight);
        calories.push(weight.calories);
      });

      chartData.push({
        data: calories.reverse(),
        label: 'Calories (kcal)',
        stack: 'a'
      });
      chartData.push({
        data: weights.reverse(),
        label: 'Weight (kg)',
        type: 'line',
        yAxisID: 'y-axis-1'
      });

      this.weightChartData = chartData;
      this.weightChartLabels = chartLabels.reverse();
    });
  }
}
