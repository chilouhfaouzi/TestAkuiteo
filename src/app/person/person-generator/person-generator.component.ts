import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { GenerationConfig } from "../generation-config";

@Component({
  selector: "app-person-generator",
  templateUrl: "./person-generator.component.html",
  styleUrls: ["./person-generator.component.scss"],
})
export class PersonGeneratorComponent implements OnInit {
  generator: FormGroup;
  rateControl = new FormControl("", [Validators.max(1000), Validators.min(0)]);

  @Output()
  private generateRequest = new EventEmitter<GenerationConfig>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.generator = this.formBuilder.group(
      {
        count: [
          50,
          [Validators.required, Validators.min(1), this.countValidator],
        ],
        male: [true],
        female: [true],
      },
      { validators: this.genderSelectionValidator }
    );
  }

  countValidator(control: AbstractControl) {
    const count = control.value;
    if (count > 1000) {
      console.log("countValidator");
      return { countExceeded: true };
    }
    return null;
  }
  genderSelectionValidator(form: FormGroup) {
    const male = form.get("male").value;
    const female = form.get("female").value;
    if (!male && !female) {
      // au moins un des deux doit être sélectionné
      return { genderRequired: true };
    }
    return null;
  }
  generate() {
    const value: GenerationConfig = this.generator.value;
    if (this.generator.valid) this.generateRequest.emit(value);
  }
}
