/**
 * Created by xavi on 5/16/17.
 */
import {Component} from "@angular/core";
import {StorageService} from "../core/services/storage.service";
import {User} from "../core/models/user.model";
@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})

export class HomeComponent {
  public user: User;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.user = this.storageService.getCurrentUser();
  }

}
