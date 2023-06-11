import { Component, OnInit, ViewChild } from "@angular/core";
import { GenerationConfig } from "../generation-config";
import { Person } from "../person";
import { PersonService } from "../person.service";
import { MyPipe } from "../../myPipe.pipe";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-person-list",
  templateUrl: "./person-list.component.html",
  styleUrls: ["./person-list.component.scss"],
})
export class PersonListComponent {
  displayedColumns: string[] = [
    "id",
    "firstName",
    "lastName",
    "gender",
    "email",
  ];

  DEFUALT_CONFIG: GenerationConfig = {
    count: 100,
    male: true,
    female: true,
  };
  dataSource = new MatTableDataSource<Person>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  myPipe = new MyPipe();

  constructor(private personService: PersonService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  generate(config: GenerationConfig) {
    this.personService.getPersons(config).subscribe((persons) => {
      const transformedPersons = persons.map((person) => {
        return {
          ...person,
          gender: this.myPipe.transform(person.gender),
        };
      });
      this.dataSource.data = transformedPersons;
    });
  }
}
