import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-calculadorafit',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './calculadorafit.component.html',
  styleUrl: './calculadorafit.component.css'
})
export default class CalculadorafitComponent {
  private _form = inject(FormBuilder);
  formCal = this._form.nonNullable.group({
    genero:['hombre',Validators.required],
    altura:[0,Validators.required],
    peso:[0,Validators.required],
    edad:[0,Validators.required]
  });
  showMessage = false;
  showres = false;
  objFit = {
    imc:0,
    grado:'',
    calorias:0,
    deficit:0,
    message:''
  }
  changeGenres(id:string){
    this.formCal.get('genero')?.setValue(id);
  }
  changeVisivility(){
    this.showMessage = !this.showMessage;
  }
  consultarData(){
    if(this.formCal.invalid){
      this.changeVisivility();
      this.showres = false;
    }
    else{
      const obj:any = this.formCal.value;
      if(obj.genero== 'hombre')this.objFit.calorias = +(66 + (13.7 * obj.peso) + (5 * obj.altura) - (6.75 * obj.edad)).toFixed(2);
      else this.objFit.calorias = +(655 + (9.6 * obj.peso) + (1.8 * obj.altura) - (4.7 * obj.edad)).toFixed(2);
      this.objFit.deficit = +(this.objFit.calorias * 0.2).toFixed(2 );
      console.log(this.formCal);
      let alt = obj.altura/100;
      this.objFit.imc = +(obj.peso/(alt*alt)).toFixed(2);
      let resCal = this.objFit.calorias * 0.2;
      if(this.objFit.imc < 18.5){
        this.objFit.grado = 'Bajo Peso';
        this.objFit.message = `Pero debes Aumentar a ${this.objFit.calorias+resCal} diarias`;
      }
      else if(this.objFit.imc >= 18.5 && this.objFit.imc <= 24.9){
        this.objFit.grado = 'Peso Normal';
        this.objFit.message = 'No debes consumir mas o menos calorias estas muy bien';
      }
      else if(this.objFit.imc >= 25 && this.objFit.imc <= 29.9){
        this.objFit.grado = 'Sobrepeso';
        this.objFit.message = `Pero debes Bajar a ${this.objFit.calorias-resCal} diarias`;
      }
      else{
        this.objFit.grado = 'Obesidad';
        this.objFit.message = `Pero debes Bajar a ${this.objFit.calorias-resCal} diarias`;
      }
      console.log(this.objFit);
      this.showres = true;
    }
  }
  isNumber(event:any){
    const valor = event.target['getAttribute']('formcontrolname');
    !!valor && this.formCal.get(valor)?.setValue(event.target['value'].replace(/\D/g, ''));
  }
}
