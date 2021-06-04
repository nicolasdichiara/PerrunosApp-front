//  import { NavController, Platform } from "@ionic/angular";
//  import { Deeplinks } from "@ionic-native/deeplinks";
//  import { HomePage } from "./home/home.page";
// import { MascotaDetailPageModule } from "./mascota-detail/mascota-detail.module";


// export class PerrunosApp {
//   constructor(
//     protected platform: Platform
//     , protected navController: NavController
//     , protected deeplinks: Deeplinks
//     ) {
//     this.platform.ready().then(() => {
//       this.deeplinks.route({
//         '/home/mascota-detail/:id': MascotaDetailPageModule
//       }).subscribe((match) => {
//         // match.$route - the route we matched, which is the matched entry from the arguments to route()
//         // match.$args - the args passed in the link
//         // match.$link - the full link data
//         console.log('Successfully matched route', match);
//       },
//       (nomatch) => {
//         // nomatch.$link - the full link data
//         console.error('Got a deeplink that didn\'t match', nomatch);
//       });
//     });
//   }
// }