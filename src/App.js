import React from 'react';
import './App.css';
import boton from './icon-arrow.svg';
import { isValid,differenceInDays,differenceInMonths,differenceInYears } from 'date-fns';
function App() {
  return (
    <div style={{fontFamily:'Arial'}} className="App">
      <div className="Divi">
        <ul className="fecha">
          <li>
            <ul className="titu">
              <li className="titulos" id="td">
                DAY
              </li>
              <li className="titulos" id="tm">
                MONTH
              </li>
              <li className="titulos" id="ta">
                YEAR
              </li>
            </ul>
          </li>
          <li className="in">
            <ul className="inputs">
              <li className="in">
                <input type="text" placeholder="DD" id="dia" />
              </li>
              <li className="inp">
                <input type="text" placeholder="MM" id="mes" />
              </li>
              <li className="inpu">
                <input type="text" placeholder="YYYY" id="anio" />
              </li>
              <li className="int">
                <button className="circulo" id="miBoton">
                  <img src={boton} alt="Boton con flecha" />
                </button>
              </li>
            </ul>
          </li>
          <li>
            <ul className="validacion" id="validacion">
              <li id="validacionuno"></li>
              <li className="validacion2" id="validaciondos"></li>
              <li className="validacion3" id="validaciontres"></li>
            </ul>
          </li>
        </ul>
        <ul className="calculadora">
          <li>
            <span className="color" id="aniosNumero">
              --
            </span>{' '}
            years
          </li>
          <li>
            <span className="color" id="mesesNumero">
              --
            </span>{' '}
            months
          </li>
          <li>
            <span className="color" id="diasNumero">
              --
            </span>{' '}
            days
          </li>
        </ul>
      </div>
    </div>
  );
  
}
document.addEventListener("DOMContentLoaded", function () {
  var miBoton = document.getElementById("miBoton");
  miBoton.addEventListener("click", function () {
    var dia = document.getElementById("dia").value;
    var mes = document.getElementById("mes").value;
    var anio = document.getElementById("anio").value;
    
    var fechaActual=new Date();
    var year=fechaActual.getFullYear();

    var regex = /^[0-9]+$/;
    if(regex.test(dia)&&regex.test(mes)&&regex.test(anio)){

      if (dia === "") {
        mensajeError("dia","td","validacionuno","This field is required");
      } else if (dia > 31) {
        mensajeError("dia","td","validacionuno","Must be a valid day");
      }

      if (mes === "") {
        mensajeError("mes","tm","validaciondos","This field is required")
      } else if (mes > 12) {
        mensajeError("mes","tm","validaciondos","Must be a valid month");
      }

      if (anio === "") {
        mensajeError("anio","ta","validaciontres","This field is required");
      } else if (anio > year) {
        document.getElementById("validaciontres").style.padding="0 0 0 20px";
        mensajeError("anio","ta","validaciontres","Must be in the past");
      }
      
      if (1 <= dia && dia <= 31 && 1 <= mes && mes <= 12 && anio < year) {
        var fechaUsuario=new Date(anio,mes-1,dia);
        console.log('Fecha introducida:', fechaUsuario);
        console.log('¿Fecha válida?', isValid(fechaUsuario));
        if(isValid(fechaUsuario)){
          var diferenciaAnios = differenceInYears(fechaActual, fechaUsuario);
          var fechaConDiferenciaAnios = new Date(fechaActual);
          fechaConDiferenciaAnios.setFullYear(fechaConDiferenciaAnios.getFullYear() - diferenciaAnios);
    
          var diferenciaMeses = differenceInMonths(fechaConDiferenciaAnios, fechaUsuario);
          var fechaConDiferenciaMeses = new Date(fechaConDiferenciaAnios);
          fechaConDiferenciaMeses.setMonth(fechaConDiferenciaMeses.getMonth() + diferenciaMeses);
    
          var diferenciaDias = differenceInDays(fechaConDiferenciaMeses, fechaUsuario);
          var fechaConDiferenciaDias= new Date(fechaConDiferenciaMeses);
          fechaConDiferenciaDias.setDate(fechaConDiferenciaDias.getDate()-diferenciaDias); 


          document.getElementById("aniosNumero").textContent = diferenciaAnios;
          document.getElementById("mesesNumero").textContent = diferenciaMeses;
          document.getElementById("diasNumero").textContent = diferenciaDias;
        }
      }

    }else{
      if (dia === "") {
        mensajeError("dia","td","validacionuno","This field is required");
      }else if(dia<1){
        mensajeError("dia","td","validacionuno","Invalid number");
      }else if(!regex.test(dia)){
        mensajeError("dia","td","validacionuno","Must be a number");
      }else if (dia > 31) {
        mensajeError("dia","td","validacionuno","Must be a valid day");
      }

      if (mes === "") {
        mensajeError("mes","tm","validaciondos","This field is required")
      }else if(mes<1){
        mensajeError("mes","tm","validaciondos","Invalid number");
      }else if(!regex.test(mes)){
        mensajeError("mes","tm","validaciondos","Must be a number")
      }else if (mes > 12) {
        mensajeError("mes","tm","validaciondos","Must be a valid month");
      }

      if (anio === "") {
        mensajeError("anio","ta","validaciontres","This field is required");
      }else if(anio<1){
        mensajeError("anio","ta","validaciontres","Invalid number");}
      else if(!regex.test(anio)){
        mensajeError("anio","ta","validaciontres","Must be a number");
      }else if(anio>year){
        mensajeError("anio","ta","validaciontres","Must be in the past");
      }
        setTimeout(resetearEstilos, 3000);
        
    }
    function resetearEstilos() {
      document.getElementById("dia").style.border = "";
      document.getElementById("mes").style.border = "";
      document.getElementById("anio").style.border = "";
      document.getElementById("td").style.color = "";
      document.getElementById("tm").style.color = "";
      document.getElementById("ta").style.color = "";
      document.getElementById("validacion").style.color = "";
      document.getElementById("validacionuno").textContent = "";
      document.getElementById("validaciondos").textContent = "";
      document.getElementById("validaciontres").textContent = "";
    }
    function mensajeError(idCampo, idTextoEstilo, idMensajeValidacion,mensaje){
      document.getElementById(idCampo).style.border="1px solid red"
      document.getElementById(idTextoEstilo).style.color="red";
      document.getElementById("validacion").style.color="red";
      document.getElementById(idMensajeValidacion).textContent=mensaje;
      setTimeout(resetearEstilos,3000);
    }
  })
  
});
export default App;
