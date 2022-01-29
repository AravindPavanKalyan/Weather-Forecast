import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ApiService } from "../api.service";

@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.scss"],
})
export class ForecastComponent implements OnInit {
  public zipCode: string;
  public response: { city: any; list: any[] };
  public daysList: any[] = [];
  public currentDate: number;
  public dataList: any[];

  constructor(
    private router: ActivatedRoute,
    private apiService: ApiService,
    private route: Router
  ) {
    this.dataList = [];
    this.zipCode = this.router.snapshot.params["zip"];
    this.response = { city: { name: "" }, list: [] };
    this.daysList = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    this.currentDate = new Date().getDay();
  }

  ngOnInit(): void {
    this.apiService.getFiveDaysForCast(this.zipCode).subscribe((res: any) => {
      if (+res.cod === 200) {
        res.list.map((lis: any, index: number) => {
          if (index % 8 === 0) {
            this.dataList.push(lis);
          } else {
            if (
              lis.main.temp_min <
              this.dataList[this.dataList.length - 1].main.temp_min
            ) {
              this.dataList[this.dataList.length - 1].main.temp_min =
                lis.main.temp_min;
            }

            if (
              lis.main.temp_max >
              this.dataList[this.dataList.length - 1].main.temp_max
            ) {
              this.dataList[this.dataList.length - 1].main.temp_max =
                lis.main.temp_max;
            }
          }
          this.response = res;
        });
      }
    });
  }

  getDate(date: string) {
    return this.daysList[new Date(date).getDay()];
  }

  backToHome() {
    this.route.navigate([""]);
  }
}
