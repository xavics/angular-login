import {NgModule, Optional, SkipSelf} from '@angular/core';
import {fakeBackendProvider} from "./helper/fake-backend";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions} from "@angular/http";
import {StorageService} from "./services/storage.service";

@NgModule({
  declarations: [  ],
  imports: [],
  providers: [
    StorageService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: []
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
