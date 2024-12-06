import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../interfaces/customer.interface';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SummaryComponent implements OnInit {
  clientData: Customer | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['documentType'] && params['documentNumber']) {
        this.customerService.getCustomer(params['documentType'], params['documentNumber']).subscribe(
          (response) => {
            this.clientData = response.data;
          }
        );
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/']);
  }
}
