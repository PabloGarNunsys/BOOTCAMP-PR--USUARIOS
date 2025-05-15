import { FilterService } from './../../services/filter.service';
import { RolesResponse } from '../../interfaces/rolesResponse';
import { RoleService } from './../../services/roles.service';
import { Component, OnInit } from '@angular/core';
import { FilterParams } from '../../interfaces/FilterParams';
import { FilterOptions } from '../../enum/filter-options';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {

  public roleList: RolesResponse[] = [];

  private filterRecord: Record<string, FilterParams> = {
    name: {
      value: "",
      filter: FilterOptions.MATCH_START
    },
    email: {
      value: "",
      filter: FilterOptions.MATCH_START
    },
    rol_id: {
      value: "",
      filter: FilterOptions.EQUAL
    }
  };

  constructor(
    private filterService: FilterService,
    private roleService: RoleService
  ){}
  
  ngOnInit(): void {
    this.roleService.getRoles().subscribe({
      next: (roles) => this.roleList = roles
    })
  }

  filter({name, value}: any) {
    
    this.filterRecord[name].value = value;
    this.filterService.search(this.convertRecordToFilterString());
    
  }

  inputFilter({target}: Event) {
    const input = target as HTMLInputElement;
    this.filter({
      name: input.name,
      value: input.value
    })
  }

  selectFilter({target}: Event) {
    const select = target as HTMLSelectElement;
    this.filter({
      name: "rol_id",
      value: select.value
    })
  }

  convertRecordToFilterString() {
    var result = "";
    for(const key in this.filterRecord) {
      const recordKey = this.filterRecord[key];
      if(recordKey.value && recordKey.value.length > 0 && recordKey.value != '0') {
        result = result + `${key.replace("_", ".")}:${recordKey.filter}:${recordKey.value},`
      }
    }
    return result;
  }

}
