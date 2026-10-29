import { Component } from '@angular/core';
import { ProductivityTrackerComponent } from './productivity-tracker/productivity-tracker';

@Component({
  selector: 'app-root',
  imports: [ProductivityTrackerComponent],
  template: '<app-productivity-tracker />',
})
export class App {}
