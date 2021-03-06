class EventManager {
    constructor() {
        this.urlBase = "/events"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
        this.cerrarSesion()
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all"
        //let url = "/events/all"
        let nombre = sessionStorage.getItem("usuario")
        let ev={nombre:nombre}
        $.post(url,ev,(response) => {
            //this.inicializarCalendario(response)
            $('.calendario').fullCalendar('renderEvents', response);
        })
    }

    eliminarEvento(evento) {
        let eventId = evento._id;
        $.post('/events/delete', {
            _id: eventId
        }, (response) => {
            alert(response);
        })
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let nombre = $('#titulo').val(),
                start = $('#start_date').val(),
                title = $('#titulo').val(),
                end = '',
                start_hour = '',
                end_hour = '';

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
            }
            let url = this.urlBase + "/new"
            if (title != "" && start != "") {
                let ev = {
                    title: title,
                    start: start,
                    end: end
                }
                let ev2 = {
                    usuario: sessionStorage.getItem("usuario"),
                    title: title,
                    start: start,
                    end: end
                }
                console.log(ev2)
                $.post(url, ev2, (response) => {
                    alert(response)
                })
                $('.calendario').fullCalendar('renderEvent', ev)
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function () {
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            } else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    actualizarEvento(event){
      let nuevaFecha=event.start.format();
      let nuevoFin="";
      if(event.end!=null){
        nuevoFin=event.end.format();
      };
      let ev={
        _id: event._id,
        newStart: nuevaFecha,
        newEnd: nuevoFin
      }
      console.log(ev);
      $.post('/events/update',ev);
    }

    inicializarCalendario(eventos) {
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
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
              console.log(event);
              this.actualizarEvento(event);
            },
            events: eventos,
            eventDragStart: (event, jsEvent) => {
                $('.delete').find('img').attr('src', "img/trash-open.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event, jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX <= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                    this.eliminarEvento(event)
                    $('.calendario').fullCalendar('removeEvents', event._id);
                }
            }
        })
    }

    cerrarSesion(){
      $('.logout-container').on('click', (ev) => {
        ev.preventDefault();
        sessionStorage.clear();
        window.location.href = "index.html";
      });
    }
}

const Manager = new EventManager()
Manager.inicializarCalendario()
