var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementById("trackerBtn");


Array.from(thumbUp).forEach(function (element) {
  element.addEventListener('click', function () {
    const book = this.parentNode.parentNode.childNodes[1].innerText
    const text = this.parentNode.parentNode.childNodes[3].innerText
    const stars = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('messages', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'book': book,
        'text': text,
        'stars': stars
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});

Array.from(thumbDown).forEach(function (element) {
  element.addEventListener('click', function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('messages/thumbDown', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        //this is the req.body what the browser sends to the server in the body 
        'name': name,
        'msg': msg,
        'thumbUp': thumbUp
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});


myEvents = [
  { 
    id: "required-id-1",
    name: "New Year", 
    date: "Wed Jan 01 2020 00:00:00 GMT-0800 (Pacific Standard Time)", 
    type: "holiday", 
    everyYear: true 
  },
  { 
    id: "required-id-2",
    name: "Valentine's Day", 
    date: "Fri Feb 14 2020 00:00:00 GMT-0800 (Pacific Standard Time)", 
    type: "holiday", 
    everyYear: true,
    color: "#222"
  },
  { 
    id: "required-id-3",
    name: "Custom Date", 
    badge: "08/03 - 08/05",
    date: ["August/03/2020", "August/05/2020"],
    description: "Description here",
    type: "event", 
  },
  // more events here
]

$('#evoCalendar').evoCalendar({
  calendarEvents: myEvents
});

// $('#evoCalendar').evoCalendar({
//   format: 'mm/dd/yyyy',
//   titleFormat: 'MM yyyy',
//   eventHeaderFormat: 'MM d, yyyy'
// });