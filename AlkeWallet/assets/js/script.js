// obtener datos y validar el formulario de inicio de sesión

function obtenerDatosyValidar() {
    const emailIngresado = $("#email").val();
    const claveIngresada = $("#password").val();
    const usuarioValido = "usuario@gmail.com";
    const claveValida = "123456";
  
    if (emailIngresado === usuarioValido && claveIngresada === claveValida) {
      console.log("Ingreso exitoso");
      $("#msj-correcto").show();
      // Redireccionar al menú principal después del inicio de sesión exitoso
      window.location.href = 'menu.html';
    } else {
      console.log("Ingreso fallido");
      $("#msj-incorrecto").show();
    }
  }
  
//deposit

$(document).ready(function() {
  let balance = 0;

  function updateBalance() {
    $('#balance').text(balance.toFixed(2));
  }

  $('#depositBtn').click(function() {
    let amount = parseFloat($('#amount').val());
    if (!isNaN(amount) && amount > 0) {
      balance += amount;
      updateBalance();
      $('#amount').val('');
      $("#dep-correcto").show();
      setTimeout(function() {
        window.location.href = "menu.html";
      }, 2000); 
    } else {
      $("#dep-incorrecto").show();
    }
  });

  $('#withdrawBtn').click(function() {
    let amount = parseFloat($('#amount').val());
    if (!isNaN(amount) && amount > 0 && amount <= balance) {
      balance -= amount;
      updateBalance();
      $('#amount').val('');
      $("#retiro-ok").show();
    } else {
      $("#retiro-not").show();
    }
  });
});

//setTimeOut 
/*

$(document).ready(function(){
  $("#depositBtn").click(function(){
    setTimeout(function() {
      window.location.href = "menu.html";
    }, 2000); 
  });
});*/



//Botones con mensaje "redirigiendo"

$(document).ready(function() {
  $(".deposit-btn").click(function() {
    alert("Redirigiendo a Depositar");
  });
  
  $(".sendmoney-btn").click(function() {
    alert("Redirigiendo a Enviar Dinero");
  });
  
  $(".transactions-btn").click(function() {
    alert("Redirigiendo a Últimos Movimientos");
  });
});



  // envío del formulario de inicio de sesión
  $("#formulario-login").submit((event) => {
    event.preventDefault();
    obtenerDatosyValidar();
  });
  
  // mostrar y ocultar el formulario de agregar nuevo contacto
  $('#mostrarFormulario').click(function() {
    $('#addContactForm').toggle();
  });
  
  // cancelar y ocultar el formulario de agregar nuevo contacto
  $('#cancelAddContact').click(function() {
    $('#addContactForm').hide();
  });
  
  //  envío del formulario de agregar nuevo contacto
  $('#addContactForm').submit(function(event) {
    event.preventDefault();
    let name = $('#name').val();
    let cuenta = $('#cuenta').val();
    if (!name) {
      $('#nameError').show();
      return;
    } else {
      $('#nameError').hide();
    }
    
    // validar el formato del número de cuenta con cuentaRegex
    let cuentaRegex = /^[0-9]{9,22}$/; 
    if (!cuentaRegex.test(cuenta)) {
      $('#cuentaError').show();
      return;
    } else {
      $('#cuentaError').hide();
    }
    
   
    //para  agregar contactos
    var contactItem = $('<li>').addClass('list-group-item');
    var contactInfo = $('<div>').addClass('contact-info');
    var contactName = $('<span>').addClass('contact-name').text(name);
    var contactDetails = $('<span>').addClass('contact-details').text('Número de cuenta: ' + cuenta);
    contactInfo.append(contactName, $('<br>'), contactDetails);
    contactItem.append(contactInfo);
    
    // agregar el nuevo contacto a la lista de contactos
    $('#contactList').append(contactItem);
  
    // Limpiar el formulario
    $('#name').val('');
    $('#cuenta').val('');
  
    alert('¡Contacto agregado!');
    $('#addContactForm').hide();
  });
  
  // búsqueda en la lista de contactos al escribir en el buscador con keyUp
  $('#searchContact').on('keyup', function() {
    let value = $(this).val().toLowerCase();
    $('#contactList .contact-info').each(function() {
      let contactName = $(this).find('.contact-name').text().toLowerCase();
      let contactDetails = $(this).find('.contact-details').text().toLowerCase();
      if (contactName.includes(value) || contactDetails.includes(value)) {
        $(this).parent().show();
      } else {
        $(this).parent().hide();
      }
    });
    if (!found) {
        $('#contactList').append($('<li>').addClass('list-group-item').text('Contacto inexistente'));
    }
  });//chequear !found
  
  // Mostrar y ocultar el botón "Enviar dinero" al seleccionar un contact
  $('#contactList').on('click', '.list-group-item', function() {
    $('#contactList .list-group-item').removeClass('bg-primary text-white');
    $(this).addClass('bg-primary text-white');
    $('#enviarDineroBtn').show();
  });
  
  // mostar mensaje de confirmación después de enviar dinero
  $('#enviarDineroBtn').click(function() {
    $('#confirmacionEnvio').show().delay(2000).fadeOut();
  });
  

  // últimosMovimientos - historialTransacciones//

  $(document).ready(function() {
    // Función para mostrar los últimos movimientos según el tipo seleccionado en el filtro
    function mostrarUltimosMovimientos(filtro) {
      // Oculta todos los elementos de la lista de movimientos
      $('#movimientosList li').hide();

      // Muestra solo los movimientos que coinciden con el tipo seleccionado en el filtro
      if (filtro === 'todos') {
        $('#movimientosList li').show();
      } else {
        $('#movimientosList li').each(function() {
          let texto = $(this).text().toLowerCase();
          if (texto.includes(filtro.toLowerCase())) {
            $(this).show();
          }
        });
      }
    }

    // Evento para cambiar el filtro de tipo de transacción
    $('#filterSelect').change(function() {
      let filtro = $(this).val();
      mostrarUltimosMovimientos(filtro);
    });
  });
