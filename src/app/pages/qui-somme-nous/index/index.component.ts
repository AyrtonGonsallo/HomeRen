import { Component } from '@angular/core';

import { faHammer } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  faHammer=faHammer;
}
