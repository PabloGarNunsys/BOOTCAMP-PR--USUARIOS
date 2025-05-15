import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RolesResponse } from '../../interfaces/rolesResponse';
import { RoleService } from './../../services/roles.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-form-users',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './form-users.component.html',
  styleUrl: './form-users.component.css'
})
export class FormUsersComponent implements OnInit {
  public id: string | null = null;
  public roleList: RolesResponse[] = [];
  public userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
    surname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    rol_id: [0, [Validators.required, Validators.min(1)]],
    version: [0]
  });

  constructor(
    private roleService: RoleService,
    private userService: UsersService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  

  ngOnInit(): void {
    this.roleService.getRoles().subscribe({
      next: (roleList) => {
        this.roleList = roleList;
      } 
    })

    if(this.activeRoute.snapshot.paramMap.get('id') != null ) {
      this.id = this.activeRoute.snapshot.paramMap.get('id');
      
      this.userService.getUserById(this.id!).subscribe({
        next: (user) => {
          
          this.userForm.controls['name'].setValue(user.name);
          this.userForm.controls['surname'].setValue(user.surname);
          this.userForm.controls['email'].setValue(user.email);
          this.userForm.controls['rol_id'].setValue(user.rol_id);
          this.userForm.controls['version'].setValue(user.version);
        },
        error: () => {
          this.toastr.error("Error al cargar el usuario.");
          this.router.navigate(['/users']);
        }
      })
    }
    
  }

  isFormValid() {
    return this.userForm.touched && this.userForm.valid;
  }

  updateUser() {
    if(!this.isFormValid()) return;

    this.userService.updateUserById(this.userForm.value, this.id!).subscribe({
      next: () => this.toastr.success("Usuario actualizado con exito", "Actualizacion realizada" ),
      error: () => {
        this.toastr.error("Error al actualizar el usuario.");
        console.error("Error");
      },
      complete: () => {
        this.router.navigate(['/users'])
      }
    })
  }

  createUser() {
    if(!this.isFormValid()) return;

    this.userService.createUser(this.userForm.value).subscribe({
      next: () => this.toastr.success("Usuario creado con exito", "Creación realizada"),
      error: () => {

        this.toastr.error("Error al crear el usuario.");
      },
      complete: () => {
        this.router.navigate(['/users'])
      }
    })
  }

}
