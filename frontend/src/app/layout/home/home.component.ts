import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private intervalId: any;
  private textList = ['Welcome to our site', 'We are happy to see you here', 'We hope you enjoy your stay'];
  currentText = this.textList[0];
  constructor() {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      const currentIndex = this.textList.indexOf(this.currentText);
      if (currentIndex < this.textList.length - 1) {
        this.currentText = this.textList[currentIndex + 1];
      } else {
        this.currentText = this.textList[0];
      }
    }, 6000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log('Interval cleared');
    }
  }
}
