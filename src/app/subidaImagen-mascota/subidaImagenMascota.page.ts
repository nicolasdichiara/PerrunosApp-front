import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { MascotasService } from '../services/mascotas.service';
import { ActivatedRoute } from '@angular/router';

export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-subidaImagenMascota',
  templateUrl: './subidaImagen-mascota.page.html',
  styleUrls: ['./subidaImagen-mascota.page.css']
})
export class SubidaImagenMascotaPage {
  public authUser: any;
  idMascota: number;
  

  // Upload Task 
  task: AngularFireUploadTask;

  // Progress in percentage
  percentage: Observable<number>;

  // Snapshot of uploading file
  snapshot: Observable<any>;

  // Uploaded File URL
  UploadedFileURL: Observable<string>;

  //Uploaded Image List
  images: Observable<MyData[]>;

  //File details  
  fileName: string;
  fileSize: number;

  //Status check 
  isUploading: boolean;
  isUploaded: boolean;



  private imageCollection: AngularFirestoreCollection<MyData>;


  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private formBuilder: FormBuilder,
  //   private mascotasService: MascotasService,
  //   private auth: UsuariosService,
  //   private toastService: ToastService) {
  //   this.today = new Date().toISOString();
  //   this.auth.userData$.subscribe((res: any) => {
  //     this.authUser = res;
  //     console.log(res);
  //   });
  // }



  constructor(private storage: AngularFireStorage, private database: AngularFirestore, private auth: MascotasService,
    private route: ActivatedRoute,
  ) {

    this.isUploading = false;
    this.isUploaded = false;
    //Set collection where our documents/ images info will save
    this.imageCollection = database.collection<MyData>('freakyImages');
    this.images = this.imageCollection.valueChanges();

    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
    });

    

  }

  uploadFile(event: FileList) {


    // The File object
    const file = event.item(0)

    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    this.isUploading = true;
    this.isUploaded = false;


    this.fileName = file.name;

    // The storage path
    const path = `imagenesDeMascotas/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'Freaky Image Upload Demo' };

    //File reference
    const fileRef = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(

      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();

        //ACA ESTA EL LINK POSTA PARA LLEVAR AL BACK
        this.UploadedFileURL.subscribe(resp => {
          console.log('este capas es el link 2')
          console.log(resp)
          console.log('este seria el id')
          console.log(this.idMascota)
          console.log('aca paso')
          this.auth.subirImagenMascota(resp, this.idMascota);
          //this.authUser.imagen = resp;
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isUploading = false;
          this.isUploaded = true;
        }, error => {
          console.error(error);
        })
      }),
      tap(snap => {
        this.fileSize = snap.totalBytes;
      })
    )
  }

  addImagetoDB(image: MyData) {
    //Create an ID for document
    const id = this.database.createId();

    //Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
    }).catch(error => {
      console.log("error " + error);
    });
  }

  async ngOnInit() {  //cuando tenes que carga la vista se carga

    this.route.params.subscribe(async params => {
      this.idMascota = params['id'];  //toma la id del url del navegador 
      
    });



  }
}
