import { Component } from '@angular/core';
import {Sidebar} from "../sidebar/sidebar";
import {Header} from '../header/header';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dasboard-admin',
  imports: [
    Sidebar,
    Header,
    RouterOutlet,
  ],
  templateUrl: './dasboard-admin.html',
  standalone: true,
  styleUrl: './dasboard-admin.css'
})
export class DasboardAdmin {


}
