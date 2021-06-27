import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor(private http: HttpClient) { }
  selectedFile: File = null;
  validEmails: string[] = [];
  invalidEmails: string[] = [];
  onFileSelected(files: FileList) {

    this.validEmails.length = 0;
    this.invalidEmails.length = 0;

    if (files.length > 0) {
      this.selectedFile = <File>files[0];
      this.csvtoArray();
    }

  }

  onUpload() {

    console.log(this.validEmails)
    try {
      let data = this.http.post('http://localhost:5921/mails', this.validEmails).toPromise();
    }
    catch (e) {
      console.log(e);
    }

  }

  csvtoArray() {
    let reader: FileReader = new FileReader();
    reader.readAsText(this.selectedFile);
    reader.onload = (e) => {
      let csv: any = reader.result;

      let allTextLines = csv.replace(/[\r\n]+/gm, "");  //remove line breaks, replace them with a space
      allTextLines = allTextLines.replace(/ /g, ''); //remove whitespaces if any
      allTextLines = allTextLines.split("/\r?\n|\r/g");
      let headers = allTextLines[0].split(',');

      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      for (let i = 0; i < headers.length; i++) {
        if (re.test(String(headers[i]).toLowerCase()))
          this.validEmails.push(String(headers[i]).toLowerCase());
        else
          this.invalidEmails.push(String(headers[i]).toLowerCase());
      }

    }
  }

  removeMail(e) {
    this.validEmails = this.validEmails.filter(x => x != e);

  }
  ngOnInit(): void {
  }

}
