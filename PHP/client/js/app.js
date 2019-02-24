


class EventsManager {
    constructor() {
        this.obtenerDataInicial()
        this.poblarCalendario()
    }


    obtenerDataInicial() {
        let url = '../server/getEvents.php'
        $.ajax({
          url: url,
          dataType: "json",
          cache: false,
          processData: false,
          contentType: false,
          type: 'GET',
          success: (data) =>{
            let eventos = this.darFormato(data.eventos);
            if (data.msg=="OK") {
              $('.calendario').fullCalendar('addEventSource',eventos);
            }else {
              alert(data.msg)
              window.location.href = 'index.html';
            }
          },
          error: function(){
            alert("error en la comunicación con el servidor ");
          }
        })

    }

    darFormato(data){
      let eventos = [];
      for (let i=0;i<data.length;i++){
      //for (let i=0;i<2;i++){
        eventos[i] = {
          title:data[i].titulo,
          start:data[i].tDia == 0 ? data[i].fInicio+" "+data[i].hInicio : data[i].fInicio,
          end:data[i].fFin+" "+data[i].hFin,
          eventID:data[i].id,
          //start: data[i].fInicio+""+data[i].hInicio,
          allDay:data[i].tDia == 0 ? false:true
        };
      };
      return eventos;
    }

    poblarCalendario(eventos) {
        $('.calendario').fullCalendar({
            header: {
        		left: 'prev,next today',
        		center: 'title',
        		right: 'month,agendaWeek,basicDay'
        	},
        	//defaultDate: '2016-11-01',
        	navLinks: true,
        	editable: true,
        	eventLimit: true,
          droppable: true,
          id:"",
          dragRevertDuration: 0,
          timeFormat: 'H:mm',
          eventDrop: (event) => {
            this.actualizarEvento(event,this.id);
          },
          events: eventos,
          eventDragStart: (event,jsEvent) => {
            $('.delete-btn').find('img').attr('src', "img/trash-open.png");
            $('.delete-btn').css('background-color', '#a70f19');
            //this.obtenerId(event);
            console.log(event);
          },
          eventDragStop: (event,jsEvent) =>{
            var trashEl = $('.delete-btn');
            var ofs = trashEl.offset();
            var x1 = ofs.left;
            var x2 = ofs.left + trashEl.outerWidth(true);
            var y1 = ofs.top;
            var y2 = ofs.top + trashEl.outerHeight(true);
            if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                  this.eliminarEvento(event, jsEvent)
                  $('.calendario').fullCalendar('removeEvents', event._id);
            }

          }
        })
    }

    anadirEvento(){
      var form_data = new FormData();
      let ida = new Date();
      let id = ida.getTime();
      form_data.append('id', id)
      form_data.append('titulo', $('#titulo').val())
      form_data.append('start_date', $('#start_date').val())
      form_data.append('allDay', document.getElementById('allDay').checked)
      if (!document.getElementById('allDay').checked) {
        form_data.append('end_date', $('#end_date').val())
        form_data.append('end_hour', $('#end_hour').val())
        form_data.append('start_hour', $('#start_hour').val())
      }else {
        form_data.append('end_date', "")
        form_data.append('end_hour', "")
        form_data.append('start_hour', "")
      }
      $.ajax({
        url: '../server/new_event.php',
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        data: form_data,
        type: 'POST',
        success: (data) =>{
          if (data.msg=="OK") {
            alert('Se ha añadido el evento exitosamente')
            if (document.getElementById('allDay').checked) {
              $('.calendario').fullCalendar('renderEvent', {
                title: $('#titulo').val(),
                start: $('#start_date').val(),
                allDay: true,
                eventID:id
              })
            }else {
              $('.calendario').fullCalendar('renderEvent', {
                title: $('#titulo').val(),
                start: $('#start_date').val()+" "+$('#start_hour').val(),
                allDay: false,
                end: $('#end_date').val()+" "+$('#end_hour').val(),
                eventID:id
              })
            }
          }else {
            alert(data.msg)
          }
        },
        error: function(){
          alert("error en la comunicación con el servidor");
        }
      })

    }

    eliminarEvento(event, jsEvent){

      let start = moment(event.start).format('YYYY-MM-DD HH:mm'),
          form_data = new FormData(),
          start_date,
          end_date="",
          start_hour,
          end_hour=""

      start_date = start.substr(0,10)
      start_hour = start.substr(11,8)
      form_data.append('start_date', start_date)
      form_data.append('start_hour', start_hour)
      form_data.append('all_day', event.allDay)
      form_data.append('title', event.title)

      if (event.end != null){
        let end = moment(event.end).format('YYYY-MM-DD HH:mm')
        end_date = end.substr(0,10)
        end_hour = end.substr(11,8)
      }

      form_data.append('end_date', end_date)
      form_data.append('end_hour', end_hour)

      //console.log(form_data);
      $.ajax({
        url: '../server/delete_event.php',
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        data: form_data,
        type: 'POST',
        success: (data) =>{
          if (data.msg=="OK") {
            alert('Se ha eliminado el evento exitosamente')
          }else {
            alert(data.msg)
          }
        },
        error: function(){
          alert("error en la comunicación con el servidor");
        }
      })
      $('.delete-btn').find('img').attr('src', "img/trash.png");
      $('.delete-btn').css('background-color', '#8B0913')
    }

    actualizarEvento(evento) {
      let start = moment(evento.start).format('YYYY-MM-DD HH:mm'),
          form_data = new FormData(),
          start_date,
          end_date="",
          start_hour,
          end_hour=""

      start_date = start.substr(0,10)
      start_hour = start.substr(11,8)
      form_data.append('start_date', start_date)
      form_data.append('start_hour', start_hour)
      form_data.append('id', evento.eventID)
      form_data.append('all_day', evento.allDay)

      if (evento.end != null){
        let end = moment(evento.end).format('YYYY-MM-DD HH:mm')
        end_date = end.substr(0,10)
        end_hour = end.substr(11,8)
      }

      form_data.append('end_date', end_date)
      form_data.append('end_hour', end_hour)

        $.ajax({
          url: '../server/update_event.php',
          dataType: "json",
          cache: false,
          processData: false,
          contentType: false,
          data: form_data,
          type: 'POST',
          success: (data) =>{
            if (data.msg=="OK") {
              alert('Se ha actualizado el evento exitosamente')
            }else {
              alert(data.msg)
            }
          },
          error: function(){
            alert("error en la comunicación con el servidor");
          }
        })
    }

    logout(){
      $.ajax({
        url: '../server/logout.php',
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        type: 'GET',
        success: (data) =>{
          if (data.msg=="OK") {
            window.location.href = 'index.html';
          }else {
            alert(data.msg)
          }
        },
        error: function(){
          alert("error en la comunicación con el servidor");
        }
      })
    }

}


$(function(){
  initForm();
  var e = new EventsManager();
  $('form').submit(function(event){
    event.preventDefault()
    e.anadirEvento()
  })
});



function initForm(){
  $('#start_date, #titulo, #end_date').val('');
  $('#start_date, #end_date').datepicker({
    dateFormat: "yy-mm-dd"
  });
  $('.timepicker').timepicker({
    timeFormat: 'HH:mm',
    interval: 30,
    minTime: '5',
    maxTime: '23:30',
    defaultTime: '7',
    startTime: '5:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
  });
  $('#allDay').on('change', function(){
    if (this.checked) {
      $('.timepicker, #end_date').attr("disabled", "disabled")
    }else {
      $('.timepicker, #end_date').removeAttr("disabled")
    }
  })

}
