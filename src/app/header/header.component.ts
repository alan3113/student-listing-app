import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule,MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router:Router) {}
  onHome(){
    this.router.navigate(["/home"])
  }
  onUser(){
    this.router.navigate(["/users"])
  }
  onLogin(){
    this.router.navigate(["/login"])
  }
}
