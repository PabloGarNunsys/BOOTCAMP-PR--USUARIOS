import { FilterService } from './../../services/filter.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-button-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './button-dropdown.component.html',
  styleUrl: './button-dropdown.component.css'
})
export class ButtonDropdownComponent {
  @Input({ required: true}) id!: number;

  constructor(
    private usersService: UsersService,
    private filterService: FilterService,
    private toastr: ToastrService
  ){}
  public show = false;

  handleIsShow() {
    this.show = !this.show;
  }

  deleteById() {

    this.handleIsShow();
    if(window.confirm("¿Quieres eliminar este usuario?")) {
      this.usersService.deleteUserById(this.id).subscribe({
        next: () => {
          this.toastr.success("Eliminado", "Usuario eliminado con exito!")
          this.filterService.search("");
        }
      })
    }
  }
}
