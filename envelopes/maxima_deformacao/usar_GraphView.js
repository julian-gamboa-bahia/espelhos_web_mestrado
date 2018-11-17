/*
Representamos os dados já ordenados
*/

function usar_GraphView()
{

	link_vertices_usar_GraphView();

//colocamos os valores extremos:
        var minimo_x = possiveis_pontos_x[0]*1.5;
//máximo X em ponto 3
        var maximo_x = possiveis_pontos_x[possiveis_pontos_x.length - 1-1]*1.5;


//Será preciso colocar obter o máximo em Y

	var temp_minimo_y = possiveis_pontos_y[0];
	for(i=0;i<possiveis_pontos_y.length;i++)
	{
		if(temp_minimo_y > possiveis_pontos_y[i])
		{
			temp_minimo_y = possiveis_pontos_y[i];
		}
	}

	var temp_maximo_y = possiveis_pontos_y[0];
	for(i=0;i<possiveis_pontos_y.length;i++)
	{
		if(temp_maximo_y < possiveis_pontos_y[i])
		{
			temp_maximo_y = possiveis_pontos_y[i];
		}
	}

        var minimo_y = temp_minimo_y*1.5;
        var maximo_y = temp_maximo_y*1.5;

Chartist.plugins = Chartist.plugins || {};
Chartist.plugins.ctHtmlLabels = function(options) {
  return function(chart) {
    chart.on('draw', function(context) {
      if (context.type === 'label') {
        // Best to combine with something like sanitize-html
        context.element.empty()._node.innerHTML = context.text;
      }
    });
  }
}

var mainchart=new Chartist.Line('#chart1', {
//caminho superior
  series: 
[
	{
		name: 'superior',//caminho superior
		data:[ 
		    {x: possiveis_pontos_x[0], y: possiveis_pontos_y[0]},
		    {x: possiveis_pontos_x[1], y: possiveis_pontos_y[1]},
		    {x: possiveis_pontos_x[2], y: possiveis_pontos_y[2]},
		  ]
	},
	{
		name: 'inferior',//caminho inferior
		data:[ 
		    {x: possiveis_pontos_x[0], y: possiveis_pontos_y[0]},
		    {x: possiveis_pontos_x[3], y: possiveis_pontos_y[3]},
		    {x: possiveis_pontos_x[2], y: possiveis_pontos_y[2]},
		  ],
	},	
	{
		name: 'ponto',//ponto a representar
		data:[ 
			    {x: 0, y: 0},
		  ]
	},
] 
}
,{
      //lineSmooth: Chartist.Interpolation.step(),
  //showPoint: false,  
  series: {
      'superior': {
	lineSmooth: Chartist.Interpolation.none(),
      showPoint: false
	},
      'inferior': {
	lineSmooth: Chartist.Interpolation.none(),
      showPoint: false
	}
    },
  axisX: {
    type: Chartist.AutoScaleAxis, //FixedScaleAxis //AutoScaleAxis
  high: maximo_x,
  low: minimo_x,
    labelInterpolationFnc: function(value, index) {
	var simplificar=value.toExponential();
	if((index % 2)==0)
	{
		      return ''
	}
	else
	{
	      return simplificar+' <strong>(Pa)</strong>'
	}

    },
    offset: 80
  },
  axisY: {
    type: Chartist.AutoScaleAxis, //FixedScaleAxis //AutoScaleAxis
  high: maximo_y,
  low: minimo_y,
    labelInterpolationFnc: function(value, index) {	
      return value.toExponential() +' <strong>(Pa)</strong>'
    },
    offset: 100,
  },
  plugins: [Chartist.plugins.ctHtmlLabels()]
});

    mainchart.on('draw', function() {
	style: 'stroke:blue'
    });


///////////////
}

function link_vertices_usar_GraphView()
{

/*
Para colocar os URL dos vértices é preciso lebrar que são usados dois arrays de saída:
1) Aquele de angulo n*90
2) Aquele de outros ângulos
*/

	url_original=window.location.href;
	base_url= url_original.split("?");
//trocando para critérios
	url_criterios=base_url[0].replace("envelopes","criterios");	

//alert("link_vertices_usar_GraphView");

	for(i=0;i<possiveis_pontos_x.length;i++)
	{
		teste_sigma_x=possiveis_pontos_x[i];
		teste_sigma_y=possiveis_pontos_y[i];
		tau_XY_vertice=possiveis_pontos_xy[i];

		endereco=url_criterios+"?/"+angulo+"/"+laminaURL+"/00/"+teste_sigma_x+"/"+teste_sigma_y+"/"+tau_XY_vertice;

		$("#vertice_"+i).text("("+teste_sigma_x+","+teste_sigma_y+")");
		$("#vertice_"+i).attr("href",endereco);

	}
///////
}




