import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GenerationConfig } from "./generation-config";
import { Person } from "./person";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getPersons(config: GenerationConfig): Observable<Person[]> {
    let params = new HttpParams();

    // Ajouter les propriétés de config comme paramètres
    if (config.male) {
      params = params.set("male", "true");
    }
    if (config.female) {
      params = params.set("female", "true");
    }
    console.log(config);
    return this.http.get<Person[]>("/assets/data/persons.json").pipe(
      map((persons: Person[]) => {
        let filteredPersons = persons;

        if (!config.male) {
          filteredPersons = filteredPersons.filter(
            (person) => person.gender !== "Male"
          );
        }
        if (!config.female) {
          filteredPersons = filteredPersons.filter(
            (person) => person.gender !== "Female"
          );
        }

        return filteredPersons.slice(0, config.count);
      })
    );
  }
}
