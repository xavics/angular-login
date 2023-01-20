import {NgModule, Optional, SkipSelf} from '@angular/core';
import {fakeBackendProvider} from "./helper/fake-backend";

@NgModule({
  declarations: [  ],
  imports: [],
  providers: [
    fakeBackendProvider
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
