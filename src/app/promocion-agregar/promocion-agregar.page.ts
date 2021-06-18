import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Promocion } from 'src/domain/promocion';
import { PromocionesService } from '../services/promociones.service';
import { ToastService } from '../services/toast.service';
import { UsuariosService } from '../services/usuarios.service';
import { MyData } from '../subidaImagen/subidaImagen.page';
@Component({
  selector: 'app-promocion-agregar',
  templateUrl: './promocion-agregar.page.html',
  styleUrls: ['./promocion-agregar.page.scss'],
})
export class PromocionAgregarPage implements OnInit {

  public authUser: any;
  hoy: String
  task: AngularFireUploadTask;
  percentage: Observable<number>
  snapshot: Observable<any>
  UploadedFileURL: Observable<string>
  images: Observable<MyData[]>
  fileName: string;
  fileSize: number
  isUploading: boolean;
  isUploaded: boolean
  private imageCollection: AngularFirestoreCollection<MyData>
  linkImagen: string
  promocion: Promocion

  get cantidadPaseos() {
    return this.promocionForm.get('cantidadPaseos');
  }

  get detalle() {
    return this.promocionForm.get('detalle');
  }

  get fechaVigencia() {
    return this.promocionForm.get('fechaVigencia')
  }

  public errorMessages = {
    detalle: [
      { type: 'required', message: 'Detalle es requerido' },
      { type: 'maxlength', message: 'Descripcion no puede ser mayor que 250 caracteres' },
    ],
    cantidadPaseos: [
      { type: 'required', message: 'Cantidad de paseos es requerido' },
    ],
    fechaVigencia: [
      { type: 'required', message: 'Fecha de vigencia es requerido' }
    ]
  };

  promocionForm = this.formBuilder.group({
    detalle: ['', [Validators.required, Validators.maxLength(250)]],
    cantidadPaseos: ['', [Validators.required]],
    fechaVigencia: ['', [Validators.required]]
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private promocionesService: PromocionesService,
    private auth: UsuariosService,
    private toastService: ToastService,
    private storage: AngularFireStorage,
    private database: AngularFirestore) {

    this.isUploading = false;
    this.isUploaded = false
    this.imageCollection = database.collection<MyData>('freakyImages');
    this.images = this.imageCollection.valueChanges()
  }

  ngOnInit() {
    this.hoy = new Date().toISOString()
    console.log(this.hoy)
  }

  async submit() {
    this.promocion = new Promocion
    this.promocion.detalle = this.promocionForm.get('detalle').value
    this.promocion.cantidadPaseos = this.promocionForm.get('cantidadPaseos').value
    this.promocion.fechaVigencia = this.promocionForm.get('fechaVigencia').value
    this.promocion.imagenPromo = this.linkImagen
    
    try {
      await this.promocionesService.postPromocion(this.promocion);
      this.router.navigate(['home']);
    } catch (error) {
      this.toastService.presentToast('Ha ocurrido un error, reintente.' + error);
    }
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
    const path = `imagenesDePromociones/${new Date().getTime()}_${file.name}`;

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
          this.linkImagen = resp
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

}
