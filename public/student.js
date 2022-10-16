function showData(){
    let Event_records = new Array();
    Event_records = JSON.parse(localStorage.getItem('define'))?JSON.parse(localStorage.getItem('define')):[]
    Event_records1 = JSON.parse(localStorage.getItem('bajrang'))?JSON.parse(localStorage.getItem('bajrang')):[]
    Event_records2 = JSON.parse(localStorage.getItem('enter'))?JSON.parse(localStorage.getItem('enter')):[]
    if(Event_records || Event_records1  || Event_records2){
      for(let i = 0;i<Event_records.length;i++){

        let add_div = document.createElement('tbody')
        add_div.className = "hiv"
        add_div.innerHTML = `<tr>
        <th scope="row"  style="background-color : rgb(255,192,203,0.65);">Define</th>
        <td>${Event_records[i].title}</td>
        <td>${Event_records[i].description}</td>
        <td>${Event_records[i].date}</td>
      </tr>`
          
          document.getElementById("showusers").appendChild(add_div)
      }
      for(let i = 0;i<Event_records1.length;i++){

        let add_div = document.createElement('tbody')
        add_div.className = "hiv"
        add_div.innerHTML = `<tr>
        <th scope="row" style="background-color: rgb(0,102,0,0.65);">Bajrang</th>
        <td>${Event_records1[i].title}</td>
        <td>${Event_records1[i].description}</td>
        <td>${Event_records1[i].date}</td>
      </tr>`
          
          document.getElementById("showusers").appendChild(add_div)
      }
      for(let i = 0;i<Event_records2.length;i++){

        let add_div = document.createElement('tbody')
        add_div.className = "hiv"
        add_div.innerHTML = `<tr>
        <th scope="row" style="background-color: rgb(102,0,0,0.65);">Enterpeneur</th>
        <td>${Event_records2[i].title}</td>
        <td>${Event_records2[i].description}</td>
        <td>${Event_records2[i].date}</td>
      </tr>`
          
          document.getElementById("showusers").appendChild(add_div)
      }
    }
}
showData(); 
