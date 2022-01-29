import { AbstractControl } from "@angular/forms";

export class Validation {
  static required(control: AbstractControl): any {
    if (control.value) {
      return null;
    }
    return { required: true };
  }

  static numberOnly(control: AbstractControl) {
    var reg = new RegExp(/^\d+$/);

    if (reg.test(control.value)) {
      return null;
    }
    return { numberOnly: true };
  }
}
