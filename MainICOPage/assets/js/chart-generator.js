//First chart, Token distribution
function makeDoughnutChart1() {
    new Chart(document.getElementById("ICOPieChart1"), {
        type: 'doughnut',
        data: chartData1,
        options: pieOptions,
        plugins: chart1Plugin
    });
}

function makeDoughnutChart2() {
    new Chart(document.getElementById("ICOPieChart2"), {
        type: 'doughnut',
        data: chartData2,
        options: pieOptions,
        plugins: chart2Plugin
    });
}

chartData1 = {
    labels: ["Crowd Fund", "Bounty", "Team"],
    datasets: [{
        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
        data: [85, 5, 10]
    }]
};

chartData2 = {
    labels: ["Development", "Marketing", "Team Growth", "Legal", "Infrastructure","R&D"],
    datasets: [{
        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f","#FE8651","#C98170","#FED751"],
        data: [35, 20, 15,10,10,10]
    }]
};



var pieOptions = {
    elements: {
        arc: {
            borderWidth: 0
        }
    },
    title: {
        display: false
    },
    legend: {
        display: false
    },
    tooltips: {
        enabled: false
    },
    pieceLabel: {
        render: 'label',
        fontSize: 22,
        // fontStyle: 'strong',
        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        position: 'outside',
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 2000,
        easing: "easeOutQuart",

        onProgress: function () {
            var width = this.chart.width,
                height = this.chart.height;
            var ctx = this.chart.ctx;
            var fontSize = (height / 300).toFixed(2);
            ctx.font = fontSize + "em Helvetica";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset) {

                for (var i = 0; i < dataset.data.length; i++) {
                    var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                        total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                        mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2,
                        start_angle = model.startAngle,
                        end_angle = model.endAngle,
                        mid_angle = start_angle + (end_angle - start_angle) / 2;

                    var x = mid_radius * Math.cos(mid_angle);
                    var y = mid_radius * Math.sin(mid_angle);

                    ctx.fillStyle = '#fff';
                    var percent = String(Math.round(dataset.data[i] / total * 100)) + "%";
                    // Display percent in another line, line break doesn't work for fillText
                    ctx.fillText(percent, model.x + x, model.y + y + 15);
                }
            });
        }
    }
};

//Put text in middle of charts. each chart needs its own plugin to do this so the text differs
var chart1Plugin={
    beforeDraw: function(chart) {
        var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;

        ctx.restore();
        var fontSize = (height / 200).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";

        var text = "Token Sale",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();
    }
};
var chart2Plugin={
    beforeDraw: function(chart) {
        var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;

        ctx.restore();
        var fontSize = (height / 200).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";

        var text = "Distribution",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();
    }
};



//only animate the chart on scroll
var inView1 = false;
var inView2 = false;

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    // the offsets here are to ensure animation only occure on scroll past the graph points
    var elemTop = $(elem).offset().top + 200;
    var elemBottom = elemTop + $(elem).height()-200;

    return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
}

$(window).scroll(function () {
    if (isScrolledIntoView('#ICOPieChart1')) {
        if (!inView1){
            inView1 = true;
            makeDoughnutChart1();
        }
    }
    if (isScrolledIntoView('#ICOPieChart2')) {
        if (inView2) {
            return;
        }
        inView2 = true;
        makeDoughnutChart2();
    }
});