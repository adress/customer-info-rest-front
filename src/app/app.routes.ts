import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/animation/animation.component').then((c) => c.AnimationComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/document-input/document-input.component').then((c) => c.DocumentInputComponent),
        data: { animation: 'DocumentInputPage' },
      },
      {
        path: 'summary',
        loadComponent: () => import('./components/summary/summary.component').then((c) => c.SummaryComponent),
        data: { animation: 'SummaryPage' },
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
