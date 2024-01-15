let count = 1;
const generateBtn = document.getElementById('generateData');

generateBtn.addEventListener('click', function() {
    const keyInput = document.getElementById('keyInput');
    const tableBody = document.querySelector('#data-table tbody');

    if (parseInt(keyInput.value) > 0) {
        for (let i = 0; i < parseInt(keyInput.value); i++) {
            // can also use inner loop but trying something diff :)
            // Create an HTML string for the row
            let temps = getRandomNumber(-30, -50);
            let rowHTML = `<tr>
                                <td>${count++}</td>
                                <td>${temps} C</td>
                                <td>${getRandomNumber(900, 1100)} hPa</td>
                                <td>${getRandomNumber(30, 70)} %</td>
                                <td>${getRandomNumber(0, 10)} mm</td>
                                <td>${getRandomNumber(10, 100)} km/h</td>
                                <td>${getWeather(temps)}</td>
                           </tr>`;

            // this adds html code at the end hence not messing up the count
            // can also use innerHTML/textContent but create problem for count
            tableBody.insertAdjacentHTML('beforeend', rowHTML);
        }
    }
});

const downloadBtn = document.getElementById('downloadCSV');
downloadBtn.addEventListener('click', () => {
    // alert('hello');
    // built in code for csv
    // csv content is seperated with comma
    let csvContent = "data:text/csv;charset=utf-8,";
    let rowHeadings = document.querySelectorAll('#data-table thead tr');
    let rows = document.querySelectorAll('#data-table tbody tr');


    rowHeadings.forEach((row) => {
        let rowHeadingData = [];
        let headingCells = row.getElementsByTagName("th");

        for(let i = 0; i < headingCells.length; i++) {
            rowHeadingData.push(headingCells[i].textContent);
        }
        csvContent += rowHeadingData.join(",") + "\n";
    });

    // for each row content
    rows.forEach((row) => {
        let rowData = [] //an array
        let cells = row.getElementsByTagName("td");

        for(let i = 0; i < cells.length; i++) {
            rowData.push(cells[i].textContent); //pushes string present at every cell of the respected row
        }
        // updating csvContent, which will contain the whole data seperated by comma
        // \n for next line after each row is done
        csvContent += rowData.join(",") + "\n";
    });

    csvContent += "\n\t\tFAHAD KHAN\n";
    // each row have been traversed by now
    let encodedUri = encodeURI(csvContent);
    // visually creating a "anchor tag"
    let link = document.createElement("a");
    // setting anchor tag attribute to href that points towards the encodedUri
    link.setAttribute("href", encodedUri);
    // setting attribute and name of file
    link.setAttribute("download", "WeatherReport.csv");
    // placing the visually created uri in html code 
    document.body.appendChild(link);
    // clicking by default
    link.click();
});

function getRandomNumber(min, max) {
    //let min = -30, max = -50
    // Math.random() * (-50 + 30 + 1) = Math.random() * (-19) = any random number between (-19 and 0)
    // Math.floor() = rounds the number to the nearest integer/ can also do parseInt();
    // then min value is added to it
    return parseInt(Math.random() * (max - min + 1)) + min;
}

function getWeather(temp) {
    if(temp < -35) {
        return `Snow Expected`;
    }
    else if(temp < -40) {
        return `Snowy`;
    }
    else {
        return `Extreme Snow`;
    }
}