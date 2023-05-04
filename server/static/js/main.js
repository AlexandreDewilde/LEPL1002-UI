const ctx = document.getElementById('chart-speed');
Chart.defaults.color = 'white';
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
