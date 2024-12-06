import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate, query, group } from '@angular/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-animation',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './animation.component.html',
  animations: [
    trigger('routeAnimations', [
      transition('DocumentInputPage => SummaryPage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
        ]),
        query(':leave', [
          style({ transform: 'translateX(0)', opacity: 1 }),
        ]),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 })),
          ]),
          query(':enter', [
            animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
          ]),
        ]),
      ]),
      transition('SummaryPage => DocumentInputPage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [
          style({ transform: 'translateX(-100%)', opacity: 0 }),
        ]),
        query(':leave', [
          style({ transform: 'translateX(0)', opacity: 1 }),
        ]),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ transform: 'translateX(100%)', opacity: 0 })),
          ]),
          query(':enter', [
            animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
          ]),
        ]),
      ]),
    ]),
  ]
})
export class AnimationComponent {
  showForm = true;
  documentType = '';
  documentNumber = '';

  handleSearch(data: { documentType: string; documentNumber: string }): void {
    this.documentType = data.documentType;
    this.documentNumber = data.documentNumber;
    this.showForm = false;
  }

  getAnimationState(outlet: RouterOutlet): string | null {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  handleBack(): void {
    this.showForm = true;
  }
}
