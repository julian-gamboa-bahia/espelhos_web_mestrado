function representar_definitivos()
{
//Para x
		for(i=0;i<definitivo_x.length;i++)	
		{

			if(definitivo_x[i] === undefined)
			{
				definitivo_x[i]="undefined";
			}			
		}

//Tiramos os VAZIOS

			var indexes = getAllIndexes(definitivo_x, "undefined");

			for (i=0; i<indexes.length; i++) 
			{
			    var index = definitivo_x.indexOf("undefined");
			    definitivo_x.splice(index, 1);
			}

//alert(definitivo_x);

//Para Y
		for(i=0;i<definitivo_y.length;i++)	
		{

			if(definitivo_y[i] === undefined)
			{
				definitivo_y[i]="undefined";
			}			
		}

//Tiramos os VAZIOS

			var indexes = getAllIndexes(definitivo_y, "undefined");

			for (i=0; i<indexes.length; i++) 
			{
			    var index = definitivo_y.indexOf("undefined");
			    definitivo_y.splice(index, 1);
			}

//alert(definitivo_y);
//ordenar_definitivo();
//vetorizar_definitivo();

//Para Y
		for(i=0;i<definitivo_y.length;i++)	
		{

			if(definitivo_y[i] === "null")
			{
				definitivo_x[i]="null";
			}			
			if(definitivo_x[i] === "null")
			{
				definitivo_y[i]="null";
			}	
		}

//Tiramos os VAZIOS

			var indexes = getAllIndexes(definitivo_x, "null");

			for (i=0; i<indexes.length; i++) 
			{
			    var index = definitivo_x.indexOf("null");
			    definitivo_x.splice(index, 1);
			}

			var indexes = getAllIndexes(definitivo_y, "null");

			for (i=0; i<indexes.length; i++) 
			{
			    var index = definitivo_y.indexOf("null");
			    definitivo_y.splice(index, 1);
			}

/* Marco20

Este vetor definitivo, apesar de conter os valores numericos exatos devem ser vetorizados com grande cuidado

*/
////Calculamos as distancias:
		var distancias=[];
		var anterior_x=definitivo_x[0];
		var anterior_y=definitivo_y[0];

		for(i=0;i<definitivo_x.length-1;i++)	
		{
			tempDISTANCIA=distancia(anterior_x,definitivo_x[i],anterior_y,definitivo_y[i]);
			distancias.push(tempDISTANCIA)
			anterior_x=definitivo_x[i];
			anterior_y=definitivo_y[i];
		}
//calculamos a media
		var soma=0;

		for(i=0;i<distancias.length;i++)	
		{
			soma=soma+distancias[i];
		}
//colocamos apenas aqueles que sejam proximos
		var media=(soma/distancias.length);

//Passamos as informações das distancias

		var text = "[";

		for(i=0;i<distancias.length-1;i++)	
		{
		    text = text+distancias[i]+",";
		}
		//fechando sem rabinho
		text = text+distancias[distancias.length-1]+' ]';

		var preJSON='{"series":   [   {"name": "superior","data":'+text+'}  ]   }';

		//alert(preJSON);

		var obj = JSON.parse(preJSON);

//alert(JSON.stringify(obj));

		var caminho_1_x=[];
		var caminho_1_y=[];
		var anterior=definitivo_x[0];

		for(i=0;i<distancias.length;i++)	
		{
			temp=definitivo_x[i];
			if(anterior<definitivo_x[i])
			{
				if(Math.abs(distancias[i]-media)<(media/1))
				{
					caminho_1_x.push(definitivo_x[i]);	
					caminho_1_y.push(definitivo_y[i]);		
				}
				else
				{
					caminho_1_x.push("");	
					caminho_1_y.push("");					
				}
				definitivo_x[i]="null";
			}
			anterior=temp;
		}
// Caminho restante
		var caminho_2_x=[];
		var caminho_2_y=[];


		for(i=0;i<distancias.length;i++)	
		{
			if(definitivo_x[i]!="null")
			{
				if(Math.abs(distancias[i]-media)<(media/1))
				{
					caminho_2_x.push(definitivo_x[i]);	
					caminho_2_y.push(definitivo_y[i]);		
				}
			}
		}


//Preparamos as informações para representar

		dados_GNU="";

		for(i=0;i<caminho_1_x.length;i++)	
		{

				dados_GNU=dados_GNU+caminho_1_x[i]+"  "+caminho_1_y[i]+"%5Cn"; //%5Cn
//				dados_GNU=dados_GNU+caminho_2_x[i]+"  "+caminho_2_y[i]+"%5Cn"; //%5Cn
//				dados_GNU=dados_GNU+"  "+"%5Cn"; //%5Cn
			
		}

		for(i=0;i<caminho_2_x.length;i++)	
		{

//				dados_GNU=dados_GNU+caminho_1_x[i]+"  "+caminho_1_y[i]+"%5Cn"; //%5Cn
				dados_GNU=dados_GNU+caminho_2_x[i]+"  "+caminho_2_y[i]+"%5Cn"; //%5Cn
//				dados_GNU=dados_GNU+"  "+"%5Cn"; //%5Cn
			
		}


//////////////////////////////////////////////////////////////////////
/////////////////////////////////// Agora colocamos no gráfico
//////////////////////////////////////////////////////////////////////



		var text = "";

		for(i=0;i<caminho_1_x.length-1;i++)	
		{
			if(caminho_1_x[i].length!=0)
			{
			    text = text+'{ "x":'+caminho_1_x[i]+' , "y":'+caminho_1_y[i]+' },';
			}
		}
		//fechando sem rabinho
		text = text+'{ "x":'+caminho_1_x[caminho_1_x.length-1]+' , "y":'+caminho_1_y[caminho_1_y.length-1]+' }';



		var text_arco = "";

		for(i=0;i<caminho_2_x.length-1;i++)	
		{
			if(caminho_2_x[i].length!=0)
			{
			    text_arco = text_arco+'{ "x":'+caminho_2_x[i]+' , "y":'+caminho_2_y[i]+' },';
			}
		}
		//fechando sem rabinho
		text_arco = text_arco+'{ "x":'+caminho_2_x[caminho_2_x.length-1]+' , "y":'+caminho_2_y[caminho_2_y.length-1]+' }';


//text = text+'{ "x":'+definitivo_x[1]+' , "y":'+definitivo_y[1]+' }';

//		var preJSON='{"series":   [   {"name": "superior","data":[ '+text+' ]}  ]   }';
		var preJSON='{"series":   [   {"name": "superior","data":[ '+text+' ]}, {"name": "inferior","data":[ '+text_arco+' ]}  ]   }';
//alert(preJSON);
		var obj1 = JSON.parse(preJSON);
//alert(JSON.stringify(obj1));

maximo_x=0.0;


/*

Detetando os minimos e máximos

*/

for(i=0;i<caminho_1_x.length;i++)	
{
	if(caminho_1_x[i]>maximo_x)
	{
		maximo_x=caminho_1_x[i];
	}
}

for(i=0;i<caminho_2_x.length;i++)	
{
	if(caminho_2_x[i]>maximo_x)
	{
		maximo_x=caminho_2_x[i];
	}
}

//alert(maximo_x);

maximo_y=0.0;


for(i=0;i<caminho_1_y.length;i++)	
{
	if(maximo_y<caminho_1_y[i])
	{
		maximo_y=caminho_1_y[i]; 
	}
}

for(i=0;i<caminho_2_y.length;i++)	
{
	if(maximo_y<caminho_2_y[i])
	{
		maximo_y=caminho_2_y[i]; 
	}
}

//alert(maximo_y);

minimo_x=0.0;

for(i=0;i<caminho_1_x.length;i++)	
{
	if(minimo_x>caminho_1_x[i])
	{
		minimo_x=caminho_1_x[i];
	}
}

for(i=0;i<caminho_2_x.length;i++)	
{
	if(minimo_x>caminho_2_x[i])
	{
		minimo_x=caminho_2_x[i];
	}
}

//alert(minimo_x);

minimo_y=0.0;

for(i=0;i<caminho_1_y.length;i++)	
{
	if(minimo_y>caminho_1_y[i])
	{
		minimo_y=caminho_1_y[i];
	}
}

for(i=0;i<caminho_2_y.length;i++)	
{
	if(minimo_y>caminho_2_y[i])
	{
		minimo_y=caminho_2_y[i];
	}
}

//alert(minimo_y);

var mainchart=new Chartist.Line('#chart1', obj1
//, {'superior': {	lineSmooth: Chartist.Interpolation.none(),        showPoint: false	}    }
,
{  
	showPoint: false,
	lineSmooth: Chartist.Interpolation.none(),
	fullWidth: true,  chartPadding: {    right: 40  },
  	axisX: {
    type: Chartist.AutoScaleAxis, 
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

/*
var mainchart=new Chartist.Line('#chart1', obj
,{
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
    type: Chartist.AutoScaleAxis, 
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
}
*/
//alert("marco");

}
