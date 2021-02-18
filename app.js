// ? Enter Key Press
function enterKeyPressed(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("search-btn").click();
    }
}

// ? Main process and It is start
function start() {

    const value = document.getElementById('value');
    //  console.log(value.value.toLowerCase());
    // ?  default value
    if (value.value.length === 0) {
        value.value = "Floccinaucinihilipilification";
    }

   // ? Main Part Clear
    const mainPart = document.getElementById('mainPart');
    mainPart.innerHTML = ``;

    //! don't need this
    fetch(`https://ws.detectlanguage.com/0.2/detect?q=${value.value}&key=065f14dae5dc4444753c1bca7dfb1c3d`)
        .then(response => response.json())
        .then(adata => change(adata))
    var code;//globally declare
    function change(data) {
        //console.log(data.data.detections[0].language);

        code = data.data.detections[0].language;


    }
    // https://ws.detectlanguage.com/0.2/detect?q=nostalgic&key=065f14dae5dc4444753c1bca7dfb1c3d

    //console.log(code);
   //! oveer

    // ? this is language code api
    
    // ! main word api
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${value.value.toLowerCase()}`)
        .then(response => response.json())
        .then(data => process(data))
    function process(data) {
        // console.log(data);
        // console.log(data.length);
        //console.log(data.title);
        //console.log(data.hasOwnProperty('title'));

        //? title means there's no word in here
        if (data.hasOwnProperty('title') == true) {
            // return true;
            // console.log('true');
            mainPart.innerHTML = `
                      <div>${data.title}</div>
                      <div>${data.message}</div>
                      <div>${data.resolution}</div>
            `

        }
        else {
            //console.log(data);

            for (let i = 0; i < data.length; i++) {
                //console.log(data[i]);
                for (let j = 0; j < data[i].phonetics.length; j++) {

                    mainPart.innerHTML += `
                         <div class="phonetics">
                         <h3 style="display: inline-block">${value.value.toUpperCase()}</h3>
                         <div  style="display: inline-block">
                             [${data[i].phonetics[i].text}]
                            &nbsp;
                            &nbsp;
                           <i class="fa fa-volume-up fa-2x" aria-hidden="true" onclick="hello('${i}')"><audio  src="${data[i].phonetics[i].audio}" id="${i}">hello</audio></i>
                        </div>
                         </div>

                      `
                    if (i == 0) {
                        break;
                    }
                }

                for (let k = 0; k < data[i].meanings.length; k++) {
                    const element = data[i].meanings[k];
                    //    console.log(element);
                    mainPart.innerHTML += `
                    <div class="meanings">
                        <h5 class="text-uppercase text-primary">${element.partOfSpeech}</h5>
                        <div class="def">
                        <p class="text-uppercase text-info">Definitions</p>
                            <p>${element.definitions[0].definition}</p>
                        <p class="text-uppercase text-info"> Example</p>
                            <p>"${element.definitions[0].example}"</p>
                        </div>
                    </div>`

                }
            }
        }
    }
}

//? audio player 
function hello(id) {
    let x = document.getElementById(id);
    // console.log(x);
    x.play();
    //alert('hello')
}
