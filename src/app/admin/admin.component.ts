import { Component }      from '@angular/core';
import { SharedIdService } from '../shared/shared-id.service';
import { CityService } from '../shared/city.service';

@Component({
  selector: 'my-admin-main',
  templateUrl: './admin.component.html',
  styleUrls: [ './admin.component.sass' ],
  providers: [SharedIdService, CityService],
})
export class AdminComponent {

}
