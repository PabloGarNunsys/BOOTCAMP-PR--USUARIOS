import { UsersService } from './../../services/users.service';

import { Component, OnInit } from '@angular/core';
import { ButtonDropdownComponent } from "../../components/button-dropdown/button-dropdown.component";
import { UserResponse } from '../../interfaces/usersResponse';
import { RouterModule } from '@angular/router';
import { FilterComponent } from "../../components/filter/filter.component";
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ButtonDropdownComponent, RouterModule, FilterComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  public userList!: UserResponse[];
  public currentPage = 0;
  public maxPage = 0;
  public numMaxOfUsers = 0;

  constructor(
    private usersService: UsersService,
    private filterService: FilterService
  ){}

  ngOnInit(): void {
    this.getUsersByPage(0);

    this.filterService.filterSearch.subscribe({
      next: (resp) => {
        this.userList = resp.content;
        this.currentPage = resp.pageable.pageNumber;
        this.maxPage = resp.totalPages;
        this.numMaxOfUsers = resp.totalElements;    
      }
    })
  }

  getUsersByPage(page = 0) {
    this.usersService.getUsers(page).subscribe({
      next: (resp) => {
        this.userList = resp.content;
        this.currentPage = resp.pageable.pageNumber;
        this.maxPage = resp.totalPages;
        this.numMaxOfUsers = resp.totalElements;       
      }
    })

    
  }

  getPrevPageOfUsers() {
    if (this.currentPage - 1 < 0) return;
    this.getUsersByPage(this.currentPage - 1);
  }

  getNextPageOfUsers() {
    if (this.currentPage + 1 == this.maxPage) return;

    this.getUsersByPage(this.currentPage + 1);
  }
}
