import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ShoppingCar } from '../models/shopping-car';
import { SaleService } from '../services/sale.service';
import { DetailSaleV } from '../models/detail-sale-v';
import { Report } from '../models/report';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-generate-pdf',
  templateUrl: './generate-pdf.component.html',
  styleUrls: ['./generate-pdf.component.css']
})
export class GeneratePdfComponent {
  dataTable:string[][]=[['item','precio','cantidad']];
  dataTableReport:string[][]=[['idVenta','empleado','fecha','total']];
  dataTableReportDetail:string[][]=[['idVenta','idProducto','Nombre Producto',
  'Unidades compradas','Precio unitario','Total']];
  constructor(private saleService:SaleService){}
  ngOnInit(){}

  createReport(data:Report[]){
    this.filldataTableReport(data);
    let pdfData = {
      content:[
        {
          text: 'Reporte Final',
          style: 'header'
        },
        {
              text:'\nFecha del reporte: '+new Date().toLocaleDateString()
        },
        {
          text: '\n',
        },
        {
          text: 'Ventas realizadas\n',
          style: 'header'
        },
        {
          table:{
            body:this.dataTableReport
          }
        },
        {
          text: '\n',
        },
        {
          text: 'Detalle de las ventas\n',
          style: 'header'
        },
        {
          table:{
            body:this.dataTableReportDetail
          }
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subHeader: {
          fontSize: 12,
          bold: true
        }
      }
    }
    pdfMake.createPdf(pdfData).open();
  }

  createTicket(idEmployee:number,total:number,data:ShoppingCar[]){
    this.orderDataTicket(data);
    let pdfData ={
      content:[
        {
          text: 'Factura de compra',
          style: 'header'
        },
        {
          columns:[
            {
              text:'\nidentificacion del empleado: '+String(idEmployee)
            },
            {
              text:'\nfecha de venta: '+new Date().toLocaleDateString()
            },
          ]
        },
        {
          text: '\nDetalle de compra \n',
          style: 'subHeader'
        },
        {
          table:{
            body:this.dataTable
          }
        },
        {
          text:'\nTotal pagado: '+String(total)+" COP"
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subHeader: {
          fontSize: 12,
          bold: true
        }
      }
    }
    pdfMake.createPdf(pdfData).download('factura-de-venta-equitel.pdf');
  }
  orderDataTicket(data:ShoppingCar[]){
    data.map((item)=>{
      this.dataTable.push([String(item.fkProduct.name),"$"+String(item.price),String(item.amount)])
    })
  }
  filldataTableReport(data:Report[]){
  //dataTableReportDetail:string[][]=[['idProducto','Nombre Producto',
  //'Unidades compradas','Precio unitario','Total']];

    for (const sale of data) {
      this.dataTableReport.push([sale.sale.id.toString(),sale.sale.fk_employee.name,
        new Date(sale.sale.nowDate).toLocaleDateString(),sale.sale.totalPrice.toString()])
      for (const detail of sale.detailList) {
        this.dataTableReportDetail.push([sale.sale.id.toString(),detail.fkProduct.id.toString(),detail.fkProduct.name,
        detail.amount.toString(),detail.fkProduct.price.toString(),detail.price.toString()])
      }
    }
    console.log(this.dataTableReport);
    console.log(this.dataTableReportDetail);
    
  }
}
