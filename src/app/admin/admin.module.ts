import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { AdminRoutingModule } from "./admin-routing.module";
import { ComponentsModule } from "src/app/shared/components/components.module"
import { MainComponent } from "./main/main.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { ViewComponent } from './view/view.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { WelcomeComponent } from './welcome/welcome.component';
@NgModule({
  declarations: [MainComponent, Dashboard2Component, ViewComponent,WelcomeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    chartjsModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    NgApexchartsModule,
    ComponentsModule,
  ],
})
export class AdminModule {}
