import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { ColorSchemeService } from './color-scheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('menuSelect') menuSelect: MatSelect;

  title = 'osrs-progress';
  public isProduction = environment.production;

  constructor(public colorScheme: ColorSchemeService, public router: Router) {
    colorScheme.load();
  }

  ngOnInit(): void {}

  public isCurrentlyDark(): boolean {
    return this.colorScheme.currentActive() === 'dark';
  }

  public toggleColorScheme() {
    this.colorScheme.update(this.isCurrentlyDark() ? 'light' : 'dark');
  }

  public navigateTo(routerLink: string): void {
    this.router.navigate([routerLink]);
  }
}
