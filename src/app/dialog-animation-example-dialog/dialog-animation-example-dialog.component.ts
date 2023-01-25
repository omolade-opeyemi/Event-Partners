import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EndpointsService } from '../services/endpoints.service';
import { DeleteService } from 'src/app/models/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';




@Component({
  selector: 'app-dialog-animation-example-dialog',
  templateUrl: './dialog-animation-example-dialog.component.html',
  styleUrls: ['./dialog-animation-example-dialog.component.scss']
})
export class DialogAnimationExampleDialogComponent implements OnInit {

  deleteServices = new DeleteService(0,[])

  constructor(
    public dialogRef: MatDialogRef<DialogAnimationExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private endpoint: EndpointsService,
    private spinner: NgxSpinnerService,
    private notifyService: NotificationService,


  ) {}
  ngOnInit(): void {
    this.deleteServices.profileId = Number(localStorage.getItem('profileId'));
    this.deleteServices.serviceIds.push(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  response:any;
  onOkClick(){
    this.spinner.show();
    this.dialogRef.close();
    this.endpoint.deleteSupplierService(this.deleteServices).subscribe((data)=>{
      console.log(data);
      this.response = data;
      this.spinner.hide();
      if(this.response.responseCode == '00'){
        this.notifyService.showSuccess('Service successfully removed')
      }
      else{
        this.notifyService.showError('Error removing service')
      }
    },(error) => {      
      this.notifyService.showError(error.message);
    })
  }
}