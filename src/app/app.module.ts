import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// imported modules
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatStepperModule} from '@angular/material/stepper';
// import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatExpansionModule} from '@angular/material/expansion';
import { Angular4PaystackModule } from 'angular4-paystack';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Side2Component } from './components/side2/side2.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { AccreditationComponent } from './components/accreditation/accreditation.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { InterceptorService } from './services/interceptor.service';
import { InteractionService } from './services/interaction.service';
import { SplitPipe } from './pipes/split.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthenticationComponent,
    SidenavComponent,
    DashboardComponent,
    Side2Component,
    InvoiceComponent,
    AccreditationComponent,
    PricingComponent,
    SplitPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    NgxDropzoneModule,
    MatStepperModule,
    NgxSpinnerModule,
    // MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    HttpClientModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    NgxPaginationModule,
    MatExpansionModule,
    ToastrModule.forRoot(), // ToastrModule 
    Angular4PaystackModule.forRoot('pk_test_xxxxxxxxxxxxxxxxxxxxxxxx'),

    
  
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:  InterceptorService,
    multi: true
  }, InteractionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
