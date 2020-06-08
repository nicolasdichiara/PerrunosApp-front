import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Mascota } from 'src/domain/mascota';


@Component({
  selector: 'app-mascota-add',
  templateUrl: './mascota-add.page.html',
  styleUrls: ['./mascota-add.page.scss'],
})
export class MascotaAddPage implements OnInit {

  today: any;
  mascota: Mascota;
  edad = 0;

  get nombre() {
    return this.registrationForm.get('nombre');
  }

  get descripcion() {
    return this.registrationForm.get('descripcion');
  }

  get cuidadosEsp() {
    return this.registrationForm.get('cuidadosEsp');
  }

  get enfermedadesPrev() {
    return this.registrationForm.get('enfermedadesPrev');
  }

  get fechaNacimiento() {
    return this.registrationForm.get('fechaNacimiento');
  }

  get desparasitado() {
    return this.registrationForm.get('desparasitado');
  }

  get paseoAlgunaVez() {
    return this.registrationForm.get('paseoAlgunaVez');
  }

  get paseoConPaseadores() {
    return this.registrationForm.get('paseoConPaseadores');
  }

  get interactua() {
    return this.registrationForm.get('interactua');
  }

  public errorMessages = {
    nombre: [
      { type: 'required', message: 'Nombre es requerido'},
      { type: 'maxlength', message: 'Nombre no puede ser mayor que 50 caracteres'},
    ],
    descripcion: [
      { type: 'required', message: 'descripcion es requerido'},
      { type: 'maxlength', message: 'descripcion no puede ser mayor que 100 caracteres'},
    ],
    cuidadosEsp: [
      { type: 'maxlength', message: 'Cuidados Esp no puede ser mayor que 100 caracteres'},
    ],
    enfermedadesPrev: [
      { type: 'maxlength', message: 'Enfermedades Previas no puede ser mayor que 100 caracteres'},
    ],
    fechaNacimiento: [
      { type: 'required', message: 'Fecha de nacimiento es requerido'},
    ],
    desparasitado: [
      { type: 'required', message: 'desparasitado es requerido'},
    ],
    paseoAlgunaVez: [
      { type: 'required', message: 'paseoAlgunaVez es requerido'},
    ],
    paseoConPaseadores: [
      { type: 'required', message: 'paseoConPaseadores es requerido'},
    ],
    interactua: [
      { type: 'required', message: 'interactua es requerido'},
    ]
  };

  registrationForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    descripcion: ['', [Validators.required, Validators.maxLength(100)]],
    cuidadosEsp: ['', [Validators.maxLength(100)]],
    enfermedadesPrev: ['', [Validators.maxLength(100)]],
    fechaNacimiento: ['', [Validators.required]],
    desparasitado: ['', [Validators.required]],
    paseoAlgunaVez: ['', [Validators.required]],
    paseoConPaseadores: ['', [Validators.required]],
    interactua: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {
    this.today = new Date().toISOString();
  }

  public submit(){
    console.log(this.registrationForm.value);
    this.mascota = new Mascota();
    this.mascota.nombre = this.registrationForm.get('nombre').value;
    this.mascota.descripcion = this.registrationForm.get('descripcion').value;
    this.mascota.cuidadosEsp = this.registrationForm.get('cuidadosEsp').value;
    this.mascota.enfermedadesPrev = this.registrationForm.get('enfermedadesPrev').value;
    this.mascota.fechaNacimiento = this.registrationForm.get('fechaNacimiento').value;
    this.mascota.desparasitado = this.registrationForm.get('desparasitado').value;
    this.mascota.paseoAlgunaVez = this.registrationForm.get('paseoAlgunaVez').value;
    this.mascota.interactua = this.registrationForm.get('interactua').value;
    this.mascota.paseoConPaseadores = this.registrationForm.get('paseoConPaseadores').value;
  }

  ngOnInit() {
  }

  calcEdad(){
    let today: any = new Date();
    let selectedDate: any = new Date(this.registrationForm.get('fechaNacimiento').value);

    let edad = Math.round((Math.abs(selectedDate - today) / (24 * 60 * 60 * 1000)) / 365);

    this.edad = edad;
  }

}
