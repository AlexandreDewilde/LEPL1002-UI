const hour = document.getElementById("hour-span");
const ul_last_speed = document.getElementById("ul-last-speed");
const last_speed_span = document.getElementById("last-speed-span");
const fine_span = document.getElementById("income-text");

const getRecords = () => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/get_last_records", false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText).records;
}

const updateRecords = () => {
    ul_last_speed.innerHTML = '';
    let fine = 0;
    for (let i = 0; i < records.length; i++) {
        const li = document.createElement("li");
        const date = new Date(records[i][0]);
        const display_date = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}, ${date.getDay().toString().padStart(2, '0')}/${date.getMonth().toString().padStart(2, '0')}/${date.getFullYear()}`;
        li.appendChild(document.createTextNode(`${records[i][1]} km/h ${display_date}`));
        ul_last_speed.appendChild(li);
        
        addToChart(records[i]);
        // calculate fine
        if (records[i][1] > 15)
            fine += 10;
    }
    last_speed_span.innerText = records[0][1] + "km/h";
    fine_span.innerText = "+" + fine + "$";
}

const mod = 5;
let data = new Array(6).fill(0);
const labels = new Array(6);
for (let i = 0; i < 6; i++) {
    labels[i] = `${i*mod} - ${(i+1)*mod}`;
}

const addToChart = (record) => {
    data = new Array(6).fill(0);
    data[record[1] % mod] += 1;
}

let records = getRecords();

updateRecords();

setInterval(() => {
    current_date = new Date();
    hour.innerText = `${current_date.getHours().toString().padStart(2, '0')}:${current_date.getMinutes().toString().padStart(2, '0')}:${current_date.getSeconds().toString().padStart(2,'0')}`;
}, 1);

setInterval(() => {
    records = getRecords();
    updateRecords();
}, 10000);


const ctx = document.getElementById('chart-speed');
Chart.defaults.color = 'white';
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: '# of records with this speed',
            data: data,
            borderWidth: 1,
            backgroundColor: 'white',
            borderColor: 'white',
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                grid : {
                    color:'white',
                },
            },
            x: {
                grid : {
                    color: 'white',
                },
            }
        }
    }
});
