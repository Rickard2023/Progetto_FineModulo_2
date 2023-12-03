/*
PARTE 1: 
Oggi analizzeremo un problema molto comune: realizzare algoritmi di ricerca.
Il tuo compito è creare una funzione che cercherà per posizione lavorativa E posizione geografica. Questi due valori verranno passati come parametri
Ti abbiamo fornito un array chiamato "jobs" in fondo al file, NON modificarlo in alcun modo.
L'algoritmo che devi realizzare cercherà SIA per posizione lavorativa che per posizione geografica.
Prendi queste tre inserzioni ad esempio:

      job1:  location: "NY, US",     title: "java dev"
      job2:  location: "Genoa, IT"   title: "web dev"
      job3:  location: "US"      title: "dev"

Cercando contemporaneamente come posizione lavorativa "dev" e posizione geografica "US", dovresti ottenere come risultato solamente job1 e job3,
in quanto job2 non soddisfa la condizione posta sulla posizione geografica.

REQUISITI:
- il tuo algoritmo deve tornare i risultati nella seguente forma:
{
  result: [], <-- inserisci qui le inserzioni che rispecchiano la posizione lavorativa e la posizione geografica richiesta
  count: 0 <-- inserisci qui il numero totale delle inserzioni trovate
}

- da ogni inserzione trovata, elimina i campi "description", "requirements", "benefits" e "company_profile" per semplificare il risultato

- la tua ricerca deve essere "case insensitive" (non deve essere influenzata da lettere maiuscole o minuscole nelle parole cercate). Questo e' possibile trasformando tutto in lettere minuscole con .toLowerCase()


PARTE 2: 
Nella pagina HTML, inserisci 2 input di tipo testo (uno per la location e uno per il titolo lavorativo, ricordati di diversificarli con un id) e un bottone con valore “cerca”

Al click del bottone, il codice deve raccogliere i valori dei due input e darli in pasto alla funzione che hai creato nella parte 1. 

Dopo aver raccolto ed elaborato i dati, e’ il momento di mostrare i risultati sulla pagina: 
    Puoi scegliere tu se utilizzare un semplice ul / li oppure una tabella 
    Vai passo per passo e usa molti console.log per capire eventualmente dove sbagli
    SUGGERIMENTO: ti servira’ un ciclo for!

*/

// NON MODIFICARE QUESTO ARRAY!
const jobs = [
  { title: "Marketing Intern", location: "US, NY, New York" },
  {
    title: "Customer Service - Cloud Video Production",
    location: "NZ, Auckland",
  },
  {
    title: "Commissioning Machinery Assistant (CMA)",
    location: "US, IA, Wever",
  },
  {
    title: "Account Executive - Washington DC",
    location: "US, DC, Washington",
  },
  { title: "Bill Review Manager", location: "US, FL, Fort Worth" },
  { title: "Accounting Clerk", location: "US, MD," },
  { title: "Head of Content (m/f)", location: "DE, BE, Berlin" },
  {
    title: "Lead Guest Service Specialist",
    location: "US, CA, San Francisco",
  },
  { title: "HP BSM SME", location: "US, FL, Pensacola" },
  {
    title: "Customer Service Associate - Part Time",
    location: "US, AZ, Phoenix",
  },
  {
    title: "ASP.net Developer Job opportunity at United States,New Jersey",
    location: "US, NJ, Jersey City",
  },
  {
    title: "Talent Sourcer (6 months fixed-term contract)",
    location: "GB, LND, London",
  },
  {
    title: "Applications Developer, Digital",
    location: "US, CT, Stamford",
  },
  { title: "Installers", location: "US, FL, Orlando" },
  { title: "Account Executive - Sydney", location: "AU, NSW, Sydney" },
  {
    title: "VP of Sales - Vault Dragon",
    location: "SG, 01, Singapore",
  },
  { title: "Hands-On QA Leader", location: "IL, Tel Aviv, Israel" },
  {
    title: "Southend-on-Sea Traineeships Under NAS 16-18 Year Olds Only",
    location: "GB, SOS, Southend-on-Sea",
  },
  { title: "Visual Designer", location: "US, NY, New York" },
  {
    title: "Process Controls Engineer - DCS PLC MS Office - PA",
    location: "US, PA, USA Northeast",
  },
  { title: "Marketing Assistant", location: "US, TX, Austin" },
  { title: "Front End Developer", location: "NZ, N, Auckland" },
  { title: "Engagement Manager", location: "AE," },
  {
    title: "Vice President, Sales and Sponsorship (Businessfriend.com)",
    location: "US, CA, Carlsbad",
  },
  { title: "Customer Service", location: "GB, LND, London" },
  { title: "H1B SPONSOR FOR L1/L2/OPT", location: "US, NY, New York" },
  { title: "Marketing Exec", location: "SG," },
  {
    title: "HAAD/DHA Licensed Doctors Opening in UAE",
    location: "AE, AZ, Abudhabi",
  },
  {
    title: "Talent Management Process Manager",
    location: "US, MO, St. Louis",
  },
  { title: "Customer Service Associate", location: "CA, ON, Toronto" },
  {
    title: "Customer Service Technical Specialist",
    location: "US, MA, Waltham",
  },
  { title: "Software Applications Specialist", location: "US, KS," },
  { title: "Craftsman Associate", location: "US, WA, Everett" },
  { title: "Completion Engineer", location: "US, CA, San Ramon" },
  { title: "I Want To Work At Karmarama", location: "GB, LND," },
  {
    title: "English Teacher Abroad",
    location: "US, NY, Saint Bonaventure",
  },
]


// global declarations
let input1 = "";
let input2 = "";
let table = document.getElementById("result_table");

let countries = [
  "US",
  "NZ",
  "DE",
  "GB",
  "AU",
  "SG",
  "IL",
  "AE",
  "CA"
];

let countryCol = [   // background / text
  "blue",         
  "blueviolet",   
  "yellow",  
  "red",         
  "burlywood",    
  "chocolate",    
  "darkkhaki",    
  "darkmagenta", 
  "darkslategrey"
];

let textCol = [
  "white",
  "white",
  "black",
  "white",
  "black",
  "white",
  "black",
  "white",
  "white"
]

function setCountryColor(node, string) 
{
  for(let i = 0; i < countries.length; i++)
  {  
    if(string.includes(countries[i])) {
      node.style.background = countryCol[i];   
      node.style.color = textCol[i];   
      console.log(node.style.background, node.style.color)
      break;
    }
  }

}


// reset table
function reset() {

  table = document.getElementById("result_table");
  document.getElementById("result").innerText = "";
  while(table.rows.length > 0) {
    table.deleteRow(0);
  }

}

function HandleInputs() {

  input1 = document.getElementById("input1").value;
  input2 = document.getElementById("input2").value;
  
  if(input1 === "" || input2 === ""){ // both the inputs must be valid for the code to proceed
    reset();
    return alert("inserisci entrambi i dati");
  }
  /* use this check instead of the previous to have
     a more flexible search method that doesn't force the user
     to insert a job name AND country 
  */
  /* 
  if(input1 === "" && input2 === ""){
    reset();
    return alert("inserisci entrabi i dati")
  }
 */
  reset(); //  call the reset function to clean the table, should it exist due to a previous search 

  let c = 0;
  for (let i of jobs)
  {
    // get the jobs name and location
    let title = i.title;
    let location = i.location;

     // only display matching elements
     if(!title.toLowerCase().includes(input1.toLowerCase()) || !location.toLowerCase().includes(input2.toLowerCase())){
      continue;
    }
    // create a new row for the job's name
    let oldRow = document.getElementById("tr");
    let newtitle = table.insertRow(0);
    newtitle.parentNode = table;
    newtitle.innerHTML = "<tr><td>" + i.title +"</td></tr>";

    table.appendChild(newtitle);
    table.insertBefore(newtitle, oldRow);

    // insert the job's country in the column adjacent to the job's name
    let newtitle2 = newtitle.insertCell(1);
    newtitle2.parentNode = table;
    newtitle2.innerHTML = "<tr>" + i.location +"</tr>";
   
    // embellish the location based on country
    let text = i.location;
    console.log(text);
    setCountryColor(newtitle2,text); 
    c++;
  }

  let counter = document.getElementById("count");
  counter.innerText = "Results: " + c;
  // old version of the code. Same exact effects through a standard for cycle.
  /*
  for(let i = 0; i < jobs.length; i++)
  {
    // get the jobs name and location
    let title = jobs[i].title;
    let location = jobs[i].location;
  
  
    // only display matching elements
    if(!title.toLowerCase().includes(input1.toLowerCase()) || !location.toLowerCase().includes(input2.toLowerCase())){
      continue;
    }

    // create a new row for the job's name
    let oldRow = document.getElementById("tr");
    let newtitle = table.insertRow(0);
    newtitle.parentNode = table;
    newtitle.innerHTML = "<tr><td>" + jobs[i].title +"</td></tr>";

    table.appendChild(newtitle);
    table.insertBefore(newtitle, oldRow);

    // insert the job's country in the column adjacent to the job's name
    let newtitle2 = newtitle.insertCell(1);
    newtitle2.parentNode = table;
    newtitle2.innerHTML = "<tr>" + jobs[i].location +"</tr>";
   
    // embellish the location based on country
    let text = jobs[i].location;
    console.log(text);
    setCountryColor(newtitle2,text); 
  }
  */
}