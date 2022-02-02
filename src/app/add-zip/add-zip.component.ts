import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

import { ApiService } from "../api.service";
import { Validation } from "../validation.service";

@Component({
  selector: "app-add-zip",
  templateUrl: "./add-zip.component.html",
  styleUrls: ["./add-zip.component.scss"],
})
export class AddZipComponent {
  public isSumbitted: boolean;
  public zipCodeForm: FormGroup;
  public zipList: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService
  ) {
    this.isSumbitted = false;
    this.zipList = JSON.parse(localStorage.getItem("zips") || "[]");
    this.zipCodeForm = this.fb.group({
      zipCode: ["", [Validation.required, Validation.numberOnly]],
    });
  }

  get zf() {
    return this.zipCodeForm.get("zipCode");
  }

  handleSubmit() {
    this.isSumbitted = true;
    if (this.zipCodeForm.valid) {
      this.zipList = JSON.parse(localStorage.getItem("zips") || "[]");

      if (
        this.zipList
          .map((z: any) => z.zip)
          .indexOf(String(this.zipCodeForm.value.zipCode)) === -1
      ) {
        this.apiService
          .currentForCast(this.zipCodeForm.value.zipCode)
          .subscribe(
            (res: any) => {
              if (+res.cod === 200) {
                this.zipList.push({
                  ...res["main"],
                  ...res["weather"][0],
                  name: res["name"],
                  zip: this.zipCodeForm.value.zipCode,
                });
                localStorage.setItem("zips", JSON.stringify(this.zipList));
                this.zipCodeForm.reset();
                this.isSumbitted = false;
                this.toastr.success("Location added successfully", "", {
                  timeOut: 1000,
                });
              }
            },
            (err: any) => {
              this.toastr.error(err.error.message, "", {
                timeOut: 1000,
              });
            }
          );
      } else {
        this.toastr.error("Location already in list", "", {
          timeOut: 1000,
        });
      }
    }
  }

  deleteZip(index: number) {
    let zips = JSON.parse(localStorage.getItem("zips") || "[]");

    var result = confirm("Want to remove ?");
    if (result) {
      zips.splice(index, 1);
      localStorage.setItem("zips", JSON.stringify(zips));
      this.zipList = zips;
      this.toastr.success("Location Removed Successfully", "", {
        timeOut: 1000,
      });
    }
  }

  routeToForecast(zip: number) {
    this.router.navigate([`forecast/${zip}`]);
  }
}
