import {Component, Input, OnInit} from '@angular/core';
import {interval} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input() public orderLifeTime: number = 600

  public minute: number = 5
  public second: number = 0
  public timerId: any

  constructor(
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    this.timerId = setInterval(() => {
      this.timerUpdate()
    }, 1000)
  }

  timerUpdate() {
    this.orderLifeTime = this.orderLifeTime - 1
    this.minute = Math.floor(this.orderLifeTime / 60)
    this.second = this.orderLifeTime - this.minute * 60
    if (this.orderLifeTime <= 0) {
      clearInterval(this.timerId)
      // this.router.navigate(['/'])
    }
  }

}
