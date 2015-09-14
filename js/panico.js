// JavaScript Document
//window.passestado; 0- apagado 1-prendido 2-simulado 
document.addEventListener('deviceready', function () {
    // cordova.plugins.backgroundMode is now available
	cordova.plugins.backgroundMode.enable();
}, false);
window.onload=verificarPanico();
function verificarPanico(){
	if (window.passestado==1){
		document.getElementById("img_panic").src="img/boton_parar.jpg";
		activarPanicoRevision();
		}else{
			if(window.passestado==2){
			activarPanicoRevision();
		}}
}
function apretoPanico(elemento){
	//alert(elemento.src);
	if(elemento.src.indexOf("boton_empezar")!=-1){
		elemento.src="img/boton_parar.jpg";
		tipoPanico();
		activarPanico();
		//setTimeout(function(){navigator.app.exitApp();},3000)
	}else{
		desactivarPanico();
	}
}
function desactivarPanico(){
	//document.getElementById("cartel").style.visibility="visible";
	//document.getElementById("fondo_negro").style.visibility="visible";
	// Lo anterior le pide la clave, etc
	detenerPanico();
}
function cerrarTodo(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("fondo_negro").style.visibility="hidden";
}

function detenerPanico(){
	document.getElementById("img_panic").src="img/boton_empezar.jpg";
	estadoDePanico(0);
	dejarDeTrasmitirGps();
	
}
function simularDetenerPanico(){
	//alert("Esto esta simulado");
	document.getElementById("img_panic").src="img/boton_empezar.jpg";
	estadoDePanico(2);
}
function activarPanico(){
	empezarATrasmitirGps();
	estadoDePanico(1);
	//enviarMensajes();
	//if(window.llamadaSecreta==1){startAudioRec();}
	if(cordova.plugins.backgroundMode.isEnabled()!=true){cordova.plugins.backgroundMode.enable();}
	//salidaMagica();
	//document.location.href = 'tel:+01148127101';
}
function activarPanicoRevision(){
	empezarATrasmitirGps();
	//estadoDePanico(1);
	if(window.llamadaSecreta==1){startAudioRec();}
	if(cordova.plugins.backgroundMode.isEnabled()!=true){cordova.plugins.backgroundMode.enable();}
	//document.location.href = 'tel:+01148127101';
}
function estadoDePanico(numero){
	window.passestado=numero;
	window.base.transaction(actualizarEstado, errorCB);
}
function actualizarEstado(tx) {
    tx.executeSql("UPDATE PASS SET pass_estado ='" +window.passestado+"'  WHERE rowid =1  ;", [],   updatePass, errorPass);
}
function updatePass(){
}
function errorPass(){
}
function tipoPanico(){
	document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
}
function activarAviso(tipo){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("fondo_negro").style.visibility="hidden";
}