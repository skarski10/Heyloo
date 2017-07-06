import { Component, OnInit, Input } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { HostService} from '../host.service';
import { StudentService } from '../student.service';
import { Question } from '../question.model';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css'],
  providers: [HostService, StudentService]
})
export class BarGraphComponent implements OnInit {
  @Input() thisQuestion;
  studentChoices = [];
  public barChartData:any[]

  constructor() { }

  ngOnInit() {
    this.studentChoices = this.thisQuestion.student_choices;
    this.barChartData = [
      {
        data: this.studentChoices,
        label: 'Answer Distribution'
      }
    ];
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
  };

  public barChartLabels:string[] = ['A', 'B', 'C', 'D'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartColor:Array<any> = [
    {
      backgroundColor: 'rgb(151, 195, 162)'
    }
  ]

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
