let inputValue = document.getElementById("input");
let source = $("#template").html();
let template = Handlebars.compile(source);
let el_html;
let context;
let CHART = document.getElementById("barChart");
Chart.defaults.global.animation.duration = 200;
let estinto;
let rischio;
let recupero;
let fpericolo;



$("#button").click(function () {

    $.getJSON("js/animalia.json", function (data) {
        console.log(data.animalia)
        for (let i = 0; i < data.animalia.length; i++) {
            //console.log(data.animalia[i].commonName)
            if (data.animalia[i].commonName.includes(inputValue.value)) {
                context = {
                    commonName: data.animalia[i].commonName,
                    latinName: data.animalia[i].latinName,
                    description: data.animalia[i].description,
                    alertStatus: data.animalia[i].alertStatus,
                    image: data.animalia[i].image,
                    readMore: data.animalia[i].readMore
                }

                if (data.animalia[i].alertStatus == "Estinto"){
                    estinto = 100;
                    rischio = 0;
                    recupero = 0;
                    fpericolo = 0;
                } else if (data.animalia[i].alertStatus == "A Rischio"){
                    estinto = 0;
                    rischio = 100;
                    recupero = 0;
                    fpericolo = 0;
                } else if (data.animalia[i].alertStatus == "In Recupero"){
                    estinto = 0;
                    rischio = 0;
                    recupero = 100;
                    fpericolo = 0;
                } else if (data.animalia[i].alertStatus == "Fuori Pericolo"){
                    estinto = 0;
                    rischio = 0;
                    recupero = 0;
                    fpericolo = 100;
                }


                //console.log(data.animalia[i])
                el_html = template(context);
                $("#animalCard").html(el_html);


                let barChart = new Chart(CHART, {
                    type: 'horizontalBar',
                    data: {
                        labels: [],
                        datasets: [
                            {
                                label: 'estinto',
                                data: [estinto, 0],
                                backgroundColor: "#444444"
                            },
                            {
                                label: 'a rischio',
                                data: [rischio, 0],
                                backgroundColor: "#f26868"
                            },
                            {
                                label: 'in recupero',
                                data: [recupero, 0],
                                backgroundColor: "#f1c867"
                            },
                            {
                                label: 'fuori pericolo',
                                data: [fpericolo, 0],
                                backgroundColor: "#428a3c"
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: true,
                            position: "bottom"
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    display: false
                                },
                                gridLines: {
                                    display: false,
                                    drawBorder: false
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    display: false
                                },
                                gridLines: {
                                    display: false,
                                    drawBorder: false
                                }
                            }]

                        },
                    }
                });

                barChart.update()

                barChart.canvas.parentNode.style.height = '200px';
            }
        }

    });
})

/*function updateChart() {
    barChart.data.datasets[0].data = [o, 0];
    barChart.update;
    console.log(barChart.data.datasets[0].data)
}*/