
function change_notes_title(new_title){

    // change note title  (title in note page)

    let title = document.querySelector("#note_title")
    title.innerHTML = new_title


}


function add_notes_nav( name,action){

  let notes_nav          =   document.querySelector('#nav-in-notes');


  // here 5 is department + >> + course + >> 
  if  (notes_nav.childElementCount >= 5  ){
    notes_nav.removeChild(notes_nav.lastChild)
    notes_nav.removeChild(notes_nav.lastChild)
    notes_nav.removeChild(notes_nav.lastChild)
    notes_nav.removeChild(notes_nav.lastChild)      
  }
 if  (document.querySelector('#note_title').innerHTML != 'Subjects')
 {let new_nav           =   document.createElement('span');
  new_nav.innerHTML     =   name
  new_nav.setAttribute('onclick', action)
  

  let greaterthan           = document.createElement("span");
  greaterthan.innerHTML  = "  >>  "
  notes_nav.appendChild(greaterthan)
  notes_nav.appendChild(new_nav);

 }
}


function addClassToElement(element,classname) {
    // add a class to an element 
    element.classList.add(classname)
}


function removeClassToElement(element,classname) {
    // remove a class from  element 
    element.classList.remove(classname)
}

function emptyElement(element){
    
    while (element.childElementCount > 0)
    {
      element.firstChild.remove()
    }
  }



async function get_departments(){


   const response =  await fetch('https://kitsbrigade.herokuapp.com/api/departments/')
   const data = await response.json();
   console.log(data)
    change_notes_title("Departments")

    let main_area = document.querySelector('#main_area')
    removeClassToElement(main_area,'loader')

    for (let i = 0; i < data.length; i++) {
       
        let new_div =  document.createElement("div");

        new_div.innerHTML = data[i]['name']
        new_div.setAttribute('onclick','get_subjects(event)')
        
        
        

        main_area.appendChild(new_div)
      }

}


window.addEventListener('DOMContentLoaded', (event) => {
    get_departments()
    var script = document.createElement('script');
 
    script.src = "https://www.google-analytics.com/analytics.js"

  document.head.appendChild(script);
    
    
});


async function get_subjects(event){
    let main_area = document.querySelector('#main_area')
    emptyElement(main_area)
    addClassToElement(main_area,'loader')

    document.title  = event.target.innerHTML
    const response =  await fetch('https://kitsbrigade.herokuapp.com/api/departments/'.concat(event.target.innerHTML))
    const data = await response.json();


    
    console.log(data)
    removeClassToElement(main_area,'loader')
    add_notes_nav(event.target.innerHTML,'get_subjects(event)')
    change_notes_title("Subjects")
    
    ga('send', 'pageview', document.title);
      for (let i = 0; i < data.length; i++) {
          let new_div =  document.createElement("div");
                 


          new_div.innerHTML = data[i]['name']
          new_div.setAttribute('onclick','get_units(event)')
          main_area.appendChild(new_div)
        }
  
 }


  async function get_units(event){
      let main_area = document.querySelector('#main_area')
      emptyElement(main_area)
      addClassToElement(main_area,'loader')
    
      document.title  = event.target.innerHTML
      const response =  await fetch('https://kitsbrigade.herokuapp.com/api/courses/'.concat(event.target.innerHTML))
      const data = await response.json();
      console.log(data);
 
      // empty string is passed to  below function . Because last (subject nav should not call again)

      
      removeClassToElement(main_area,'loader')
      change_notes_title("units")
      add_notes_nav(event.target.innerHTML,'')
  
  
      for (let i = 0; i < data.length; i++) {
          let new_div =  document.createElement("div")
                 


          let file_link = document.createElement('a')
         
          new_div.setAttribute('onclick',"location.href=".concat("'").concat(data[i]['file_url']).concat("'"))
          file_link.innerHTML = data[i]['name']
          file_link.setAttribute('download',data[i]['name'])
          new_div.appendChild(file_link)
          
          main_area.appendChild(new_div)
        }
  
  }



