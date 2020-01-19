import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  //@ViewChild('pdfViewerAutoLoad', { static: false }) public pdfViewerAutoLoad: any;
  @ViewChild('bigPdfViewer', { static: true }) public bigPdfViewer: any;
  source: any;

  constructor(private quoteService: QuoteService, private http: HttpClient) {
    let url = "http://localhost:49937/pdf/export/1"; // Or your url
      this.downloadFile(url).subscribe(
          (res: any) => {
              console.log(res);
              this.bigPdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
              this.bigPdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
          }
      );
  }

  public testBeforePrint() {
    console.log('testBeforePrint() successfully called');
    console.log(this.bigPdfViewer.page);
    this.bigPdfViewer.page = 3;
    console.log(this.bigPdfViewer.page);
  }

  public testAfterPrint() {
    console.log('testAfterPrint() successfully called');
  }

  public testPagesLoaded(count: number) {
    console.log('testPagesLoaded() successfully called. Total pages # : ' + count);
  }

  public testPageChange(pageNumber: number) {
    console.log('testPageChange() successfully called. Current page # : ' + pageNumber);
  }

  ngOnInit() {
    this.isLoading = true;
    // this.quoteService
    //   .getRandomQuote({ category: 'dev' })
    //   .pipe(
    //     finalize(() => {
    //       this.isLoading = false;
    //     })
    //   )
    //   .subscribe((quote: string) => {
    //     this.quote = quote;
    //   });
  }

  private downloadFile(url: string): any {
    return this.http.get(url, { responseType: 'blob' })
        .pipe(
            map((result: any) => {
                return result;
            })
        );
}
}
