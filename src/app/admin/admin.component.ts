import { Component }      from '@angular/core';
import { CityService } from '../shared/city.service';

@Component({
  selector: 'my-admin-main',
  templateUrl: './admin.component.html',
  styleUrls: [ './admin.component.sass' ],
  providers: [CityService],
})
export class AdminComponent {

}
