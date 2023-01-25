import { HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CommonResponse } from "../models/services";

@Injectable({
  providedIn: "root",
})
export class FileStorageService {
  public message!: string;
  public progress!: number;
  @Output() public onUploadFinished = new EventEmitter();
  private readonly baseUrl = environment.halobizUrl + "api/v1/FileStorage/";
  constructor(private http: HttpClient) {}
  ResetServiceStatus() {
    this.message = "";
    this.progress = 0;
    this.onUploadFinished = new EventEmitter();
  }
  GetFile(): Observable<CommonResponse> {
    return this.http.get<CommonResponse>(this.baseUrl + "GetFile");
  }
  // This method will be made private until it's ready, please make use of UploadFileFromDataUrl
  private UploadFile(file: File) {
    this.ResetServiceStatus();
    const formData = new FormData();
    const n = Date.now();
    const filename = n + "_" + file.name;
    formData.append("file", file, filename);
    this.http
      .post(this.baseUrl + "UploadFile", formData, {
        reportProgress: true,
        observe: "events",
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total!);
        } else if (event.type == HttpEventType.Response) {
          this.message = "Upload Successful";
          this.onUploadFinished.emit(event.body);
        }
      });
  }
  UploadFileFromDataUrl(file: File) {
    this.ResetServiceStatus();
    const reader = new FileReader();
    const n = Date.now();
    const filename = n + "_" + file.name;
    reader.readAsDataURL(file);
    reader.onload = () => {
      let result = reader.result as string;
      this.http
        .post(
          this.baseUrl + "UploadFileFromDataUrl",
          { content: result, fileName: filename },
          {
            reportProgress: true,
            observe: "events",
          }
        )
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total!);
          } else if (event.type == HttpEventType.Response) {
            this.message = "Upload Successful";
            this.onUploadFinished.emit(event.body);
          }
        });
    };
  }
  UploadMultipleFilesFromDataUrl(files: File[]) {
    this.ResetServiceStatus();
    let uploadBody: { content: string; fileName: string }[] = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      const n = Date.now();
      const filename = n + "_" + files[i].name;
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        let result = reader.result as string;
        uploadBody.push({ content: result, fileName: filename });
        if (i == files.length - 1) {
          this.http
            .post(
              this.baseUrl + "UploadMultipleFilesFromDataUrl",
              { files: uploadBody },
              {
                reportProgress: true,
                observe: "events",
              }
            )
            .subscribe((event) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total!);
              } else if (event.type == HttpEventType.Response) {
                this.message = "Upload Successful";
                this.onUploadFinished.emit(event.body);
              }
            });
        }
      };
    }
  }
}
