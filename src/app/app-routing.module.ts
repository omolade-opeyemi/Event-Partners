import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { AccreditationComponent } from './components/accreditation/accreditation.component';
import { Side2Component } from './components/side2/side2.component';
import { PricingComponent } from './components/pricing/pricing.component';

const routes: Routes = [
{path:'',component:AuthenticationComponent},
{path:'dashboard',component:DashboardComponent},
{path: 'side2', component:Side2Component},
{path: 'invoice', component:InvoiceComponent},
{path: 'accreditation', component:AccreditationComponent},
{path: 'pricing', component:PricingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
