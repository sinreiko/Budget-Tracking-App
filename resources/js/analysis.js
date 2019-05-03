window.onload = function() {
             $("#piechartContainer").show();
             $("#linechartContainer").hide();

            $("#charts").on('click', function(){
                 $("#piechartContainer").show();
             });

            $("#line").on('click', function(){
                 $("#linechartContainer").show();
                $("#piechartContainer").hide();
             });
             
             
            var piechart = new CanvasJS.Chart("piechartContainer", {
                type: 'pie',
                data: {
                  labels: ["Income","Expenses","Savings"],
                  datasets: [{
                    label: "Amount (dollars)",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                    data: []
                  }]
                },
                options: {
                  title: {
                    display: true,
                    text: 'Summary'
                  }
                }
            });
            piechart.render();
             
             var linechart = new CanvasJS.Chart("linechartContainer", {
            animationEnabled: true,
            backgroundColor:"transparent",
            theme: "light2",
            title:{
                text: "Summary"
            },
            axisY:{
                includeZero: false
            },
            data: [{        
                type: "line",       
                dataPoints: [
                    { y: 450 },
                    { y: 414},
                    { y: 520, indexLabel: "highest",markerColor: "red", markerType: "triangle" },
                    { y: 460 },
                    { y: 450 },
                    { y: 500 },
                    { y: 480 },
                    { y: 480 },
                    { y: 410 , indexLabel: "lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
                    { y: 500 },
                    { y: 480 },
                    { y: 510 }
                ]
            }]
            });
             linechart.render();
             

}