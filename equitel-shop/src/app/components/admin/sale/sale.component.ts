import { Component } from '@angular/core';
import { SaleService } from '../../shared/services/sale.service';
import { Sale } from '../../shared/models/sale';
import { GeneratePdfComponent } from '../../shared/generate-pdf/generate-pdf.component';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent {
  salesList:Sale[];
  pdfReport:GeneratePdfComponent = new GeneratePdfComponent(this.saleService);
  constructor(private saleService:SaleService) { }

  ngOnInit(){
    this.fillSales()
  }
  fillSales(){
    this.saleService.getAllSales().subscribe((res)=>{
      console.log(res);
      this.salesList=res;
    },(err)=>{
      console.error(err);
    })
  }
  generateReport(){
    this.saleService.reportSale().subscribe((res)=>{
      this.pdfReport.createReport(res)
    },(err)=>{
      console.error(err);
    })
  }
}
