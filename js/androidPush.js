// JavaScript Document
// Esta es la version para Android, aun que el mismo formato es aplicable a todas las plataformas
 var pushNotification;
 window.regId=0000;
document.addEventListener("deviceready", onDeviceReadyPush, false);
function onDeviceReadyPush() {
	 var pushNotification = window.plugins.pushNotification;
//$("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
alert('<li>registering ' + device.platform + '</li>');
if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
    window.pushNotification.register(
    successHandler,
    errorHandler,
    {
        "senderID":"miclubhouse-1097",
        "ecb":"onNotification"
    });
}
}
// Android and Amazon Fire OS
function onNotification(e) {
    //$("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
	alert('<li>EVENT -> RECEIVED:' + e.event + '</li>');

    switch( e.event )
    {
    case 'registered':
        if ( e.regid.length > 0 )
        {
            //$("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
			alert('<li>REGISTERED -> REGID:' + e.regid + "</li>");
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
			window.regId=e.regid;
            //console.log("regID = " + e.regid);
        }
    break;

    case 'message':
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if ( e.foreground )
        {
           // $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
			alert('<li>--INLINE NOTIFICATION--' + '</li>');
            // on Android soundname is outside the payload.
            // On Amazon FireOS all custom attributes are contained within payload
            var soundfile = e.soundname || e.payload.sound;
            // if the notification contains a soundname, play it.
            var my_media = new Media("/android_asset/www/"+ soundfile);
            my_media.play();
        }
        else
        {  // otherwise we were launched because the user touched a notification in the notification tray.
            if ( e.coldstart )
            {
                //$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
				alert('<li>--COLDSTART NOTIFICATION--' + '</li>');
            }
            else
            {
                //$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
				alert('<li>--BACKGROUND NOTIFICATION--' + '</li>');
            }
        }

       //$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
	   alert('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
           //Only works for GCM
       //$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
	   alert('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
       //Only works on Amazon Fire OS
       //$status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
	   alert('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
    break;

    case 'error':
        //$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
		alert('<li>ERROR -> MSG:' + e.msg + '</li>');
    break;

    default:
        //$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
		alert('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
    break;
  }
}
// Handelers
function successHandler (result) {
    alert('result = ' + result);
}
// result contains any error description text returned from the plugin call
function errorHandler (error) {
    alert('error = ' + error);
}