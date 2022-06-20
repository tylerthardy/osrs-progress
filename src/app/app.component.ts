import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { ColorSchemeService } from './color-scheme.service';

export interface IMenuItem {
  label: string;
  routerLink: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('menuSelect') menuSelect: MatSelect;

  title = 'osrs-progress';
  public isProduction = environment.production;
  public menuItems: IMenuItem[] = [
    {
      label: 'skills',
      routerLink: 'skills',
    },
    {
      label: 'magic-cast-calculator',
      routerLink: 'magic-cast-calculator',
    },
  ];

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

  public onChange(event: MatSelectChange): void {
    const menuItem: IMenuItem = event.value;
    console.log(menuItem.routerLink);
    this.router.navigate([menuItem.routerLink]);
  }

  public toggleMenu(): void {
    this.menuSelect.open();
  }
}
