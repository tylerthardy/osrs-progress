import { Component, OnInit, Input } from '@angular/core';
import { HiscoreSkill } from '../hiscores/hiscore-skill';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  @Input() hiscoreSkill: HiscoreSkill;
  @Input() showPercent: HiscoreSkill;
  @Input() maxXp: number;

  constructor() {}

  ngOnInit() {
    console.log('init', this.hiscoreSkill.skill.Name);
  }
}
