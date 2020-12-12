import { Component, OnInit, Input } from '@angular/core';
import { HiscoreSkill } from '../hiscores/hiscore-skill';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  @Input() hiscoreSkill: HiscoreSkill;

  public Width = 70;

  constructor() { }

  ngOnInit() {
  }
}
