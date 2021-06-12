import { Component, OnInit, OnChanges } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuariosService } from './services/usuarios.service';
import { Deeplinks } from '@ionic-native/deeplinks/ngx/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: UsuariosService,
    protected deeplinks: Deeplinks,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.deeplinks.route({       //ESTO ES EL DEEPLINKING, COMENTARLO EN DEV PARA QUE NO JODA Y DESCOMENTARLO AL COMPILAR LA APK
        ':id': '/home/mascota-detail/'
      }).subscribe((match) => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        const internalPath = `${match.$route}/${match.$args['id']}`;
        this.router.navigate([internalPath])
        console.log('Match ' + 'Successfully matched route', match);
      },
        (nomatch) => {
          // nomatch.$link - the full link data
          this.router.navigate(['home'])
          console.error('Got a deeplink that didn\'t match', nomatch);
          alert('El link no es correcto')
        });

    });
  }

}
