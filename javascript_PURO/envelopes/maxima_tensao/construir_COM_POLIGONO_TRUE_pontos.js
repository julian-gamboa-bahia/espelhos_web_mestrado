/*
Função para graficar, previo ordenamento
*/
function construir_COM_POLIGONO_TRUE_pontos(theta,tau_xy)
{

	//Ativamos o link para poder testar o IF

	link_vertices();

    //Aqui é onde ordenamos e contruimos o envelope, mais primeiramente é preciso ordenar
    //1)Obter o ponto mais na isquerda:
    var mais_esquerda=0.0;
    var mais_direita=0.0;

    var Ymais_esquerda=0;
    var Ymais_direita=0;

    //Apenas escolher o
    // mais_esquerda

    for(i=0;i<POLIGONO_TRUE_pontos_x.length;i++)
    {
        if(POLIGONO_TRUE_pontos_x[i]<mais_esquerda)
        {
            mais_esquerda=POLIGONO_TRUE_pontos_x[i];
            Ymais_esquerda=i;
        }
    }

    //Apenas escolher o
    // mais_direita

    for(i=0;i<POLIGONO_TRUE_pontos_x.length;i++)
    {
        if(POLIGONO_TRUE_pontos_x[i]>mais_direita)
        {
            mais_direita=POLIGONO_TRUE_pontos_x[i];
            Ymais_direita=i;
        }
    }

/*
Valores extremos
*/


//procuramos os valores extremos:

        var minimo_x=0.0;
        for( i=0;i<POLIGONO_TRUE_pontos_x.length;i++)
        {
            if(POLIGONO_TRUE_pontos_x[i]<minimo_x)
            {
                minimo_x=POLIGONO_TRUE_pontos_x[i];
            }
        }
        var maximo_x=0.0;
        for( i=0;i<POLIGONO_TRUE_pontos_x.length;i++)
        {
            if(POLIGONO_TRUE_pontos_x[i]>maximo_x)
            {
                maximo_x=POLIGONO_TRUE_pontos_x[i];
            }
        }
        var minimo_y = 0.0;

        for( i=0;i<POLIGONO_TRUE_pontos_y.length;i++)
        {
            if(POLIGONO_TRUE_pontos_y[i]<minimo_y)
            {
                minimo_y=POLIGONO_TRUE_pontos_y[i];
            }
        }
        var maximo_y = 0.0;
        for( i=0;i<POLIGONO_TRUE_pontos_y.length;i++)
        {
            if(POLIGONO_TRUE_pontos_y[i]>maximo_y)
            {
                maximo_y=POLIGONO_TRUE_pontos_y[i];
            }
        }
        var minimo_x = minimo_x*1.5;
        var maximo_x = maximo_x*1.5;

        var minimo_y = minimo_y*1.5;
        var maximo_y = maximo_y*1.5;

/*

alert("1.5 * maximos "+maximo_x+"  "+maximo_y);
alert("1.5 * minimos "+minimo_x+"  "+minimo_y);
*/


//aproveitando o fato que ele vai sequenciado é preciso ????

	var arco_1_x = [];
	var arco_1_y = [];
//arco 2
	var arco_2_x = [];
	var arco_2_y = [];

	var contadorNULL=0;

    if(Ymais_esquerda<Ymais_direita)
    {
    //Cuidado com os null
    // que fossem colocados
        for(j=Ymais_esquerda;j<=Ymais_direita;j++)
        {
            arco_2_x.push(POLIGONO_TRUE_pontos_x[j]);
            arco_2_y.push(POLIGONO_TRUE_pontos_y[j]);

            if(
                (j>Ymais_esquerda)
                        && (j<Ymais_direita)
            )
            {
                POLIGONO_TRUE_pontos_x[j]="null";
                POLIGONO_TRUE_pontos_y[j]="null";
                contadorNULL++;
            }
//end for
        }
    }
    else
    {
            for( j=Ymais_esquerda;j<POLIGONO_TRUE_pontos_y.length;j++)
            {
                arco_2_x.push(POLIGONO_TRUE_pontos_x[j]);
                arco_2_y.push(POLIGONO_TRUE_pontos_y[j]);

                if(j>Ymais_esquerda)
                {
                    POLIGONO_TRUE_pontos_x[j]="null";
                    POLIGONO_TRUE_pontos_y[j]="null";
                    contadorNULL++;
                }

            }
            for( j=0;j<=Ymais_direita;j++)
            {
                arco_2_x.push(POLIGONO_TRUE_pontos_x[j]);
                arco_2_y.push(POLIGONO_TRUE_pontos_y[j]);
                if(j<Ymais_direita) {
                    POLIGONO_TRUE_pontos_x[j]="null";
                    POLIGONO_TRUE_pontos_y[j]="null";
                    contadorNULL++;
                }

            }
    }

//Cuidado porque neste método ele deve eliminiar TODOS os null
//...por isso deve ser diferente do método de 4 pontos.

//Para x
	var indexes = getAllIndexes(POLIGONO_TRUE_pontos_x, "null");

	for (i=0; i<indexes.length; i++) 
	{
	    var index = POLIGONO_TRUE_pontos_x.indexOf("null");
	    POLIGONO_TRUE_pontos_x.splice(index, 1);
	}

//Para y

	var indexes = getAllIndexes(POLIGONO_TRUE_pontos_y, "null");

	for (i=0; i<indexes.length; i++) 
	{
	    var index = POLIGONO_TRUE_pontos_y.indexOf("null");
	    POLIGONO_TRUE_pontos_y.splice(index, 1);
	}

//-------
        for(i=(POLIGONO_TRUE_pontos_x.length-1);i>=0; i--)
        {
            arco_1_x.push(POLIGONO_TRUE_pontos_x[i]);
            arco_1_y.push(POLIGONO_TRUE_pontos_y[i]);
        }



//Um ordenamento ASCII se for preciso

        var series_0 =[];
        var series_1 =[];

        var ORDEM_ASCII="true";

        var minimo=arco_1_x[0];

        for ( i = 0; i < arco_1_x.length; i++)
        {
            if(arco_1_x[i]<minimo)
            {
                ORDEM_ASCII="false";
            }
            minimo=arco_1_x[i];
        }
        //Se for preciso ordenar, pazemos o ordenamento dos pares, ou seja uma troca dupla

        if(ORDEM_ASCII=="false")
        {
            var menor_arco_1_x;
            var menor_arco_1_y;
            var TEMP_arco_1_x;
            var TEMP_arco_1_y;
            for (i = 0; i < arco_1_x.length; i++)
            {
                menor_arco_1_x=arco_1_x[i];
                menor_arco_1_y=arco_1_y[i];
                for( j=i+1;j<arco_1_x.length;j++)
                {

                    if(arco_1_x[j]<menor_arco_1_x)
                    {
                        TEMP_arco_1_x=arco_1_x[j];
                        arco_1_x[j]=menor_arco_1_x;
                        arco_1_x[i]=TEMP_arco_1_x;
//O mesmo para Y para assim manter o sistema ordenado
                        TEMP_arco_1_y=arco_1_y[j];
                        arco_1_y[j]=menor_arco_1_y;
                        arco_1_y[i]=TEMP_arco_1_y;

                        break;
                    }
                }
            }
        }

/**************
Agora usamos a biblioteca para graficar
*/


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
		    {x: arco_1_x[0], y: arco_1_y[0]},
		    {x: arco_1_x[1], y: arco_1_y[1]},
		    {x: arco_1_x[2], y: arco_1_y[2]},
		    {x: arco_1_x[3], y: arco_1_y[3]}, //Truque do século, pode se deixarr assim sem que se paralize por index fora do rango
		  ]
	},
	{
		name: 'inferior',//caminho inferior
		data:[ 
		    {x: arco_2_x[0], y: arco_2_y[0]},
		    {x: arco_2_x[1], y: arco_2_y[1]},
		    {x: arco_2_x[2], y: arco_2_y[2]},
		    {x: arco_2_x[3], y: arco_2_y[3]},
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

//Enviamos as informações ao servidor

	for ( i = 0; i < arco_1_x.length; i++) {
		dados_GNU=dados_GNU+arco_1_x[i]+"  "+arco_1_y[i]+"%5Cn"; //%5Cn
	}
	for ( i = 0; i < arco_2_x.length; i++) {
		dados_GNU=dados_GNU+arco_2_x[i]+"  "+arco_2_y[i]+"%5Cn"; //%5Cn
	}
/*

Transformação de Coordenadas locais para Globais

	sigma_1=c2*sigma_x+s2*sigma_y+alpha*c*s*tau_xy;
	sigma_2=s2*sigma_x+c2*sigma_y-alpha*c*s*tau_xy;
	tau_12=-beta*s*c*sigma_x+beta*s*c*sigma_y+(c2-s2)*tau_xy;

*/
arco_1_x_local=[];
arco_1_y_local=[];
arco_2_x_local=[];
arco_2_y_local=[];

//alert("theta "+theta);

	theta_radianos=(Math.PI/180)*theta;

	c=Math.cos(theta_radianos);
	s=Math.sin(theta_radianos);
	c2=c*c;
	s2=s*s;

	alpha=2.0;

	for(i=0;i<arco_1_x.length;i++)
	{
		sigma_1=c2*arco_1_x[i]+s2*arco_1_y[i]+alpha*c*s*tau_xy;
		sigma_2=s2*arco_1_x[i]+c2*arco_1_y[i]-alpha*c*s*tau_xy;

		arco_1_x_local.push(sigma_1);
		arco_1_y_local.push(sigma_2);
	}

	for(i=0;i<arco_2_x.length;i++)
	{
		sigma_1=c2*arco_2_x[i]+s2*arco_2_y[i]+alpha*c*s*tau_xy;
		sigma_2=s2*arco_2_x[i]+c2*arco_2_y[i]-alpha*c*s*tau_xy;

		arco_2_x_local.push(sigma_1);
		arco_2_y_local.push(sigma_2);
	}


var mainchart=new Chartist.Line('#chart2', {
//caminho superior
  series: 
[
	{
		name: 'superior',//caminho superior
		data:[ 
		    {x: arco_1_x_local[0], y: arco_1_y_local[0]},
		    {x: arco_1_x_local[1], y: arco_1_y_local[1]},
		    {x: arco_1_x_local[2], y: arco_1_y_local[2]},
		    {x: arco_1_x_local[3], y: arco_1_y_local[3]}, //Truque do século, pode se deixarr assim sem que se paralize por index fora do rango
		  ]
	},
	{
		name: 'inferior',//caminho inferior
		data:[ 
		    {x: arco_2_x_local[0], y: arco_2_y_local[0]},
		    {x: arco_2_x_local[1], y: arco_2_y_local[1]},
		    {x: arco_2_x_local[2], y: arco_2_y_local[2]},
		    {x: arco_2_x_local[3], y: arco_2_y_local[3]},
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

//Enviamos as informações ao servidor

	for ( i = 0; i < arco_1_x.length; i++) {
		dados_GNU=dados_GNU+arco_1_x[i]+"  "+arco_1_y[i]+"%5Cn"; //%5Cn
	}
	for ( i = 0; i < arco_2_x.length; i++) {
		dados_GNU=dados_GNU+arco_2_x[i]+"  "+arco_2_y[i]+"%5Cn"; //%5Cn
	}

////////////////////////////////////////////////////////////////////////////////////////
}


function link_vertices()
{

/*
Para colocar os URL dos vértices é preciso lebrar que são usados dois arrays de saída:
1) Aquele de angulo n*90
2) Aquele de outros ângulos

alert(POLIGONO_TRUE_pontos_x.length);
alert(POLIGONO_TRUE_pontos_x[0]);

*/

	url_original=window.location.href;
	base_url= url_original.split("?");
//trocando para critérios
	url_criterios=base_url[0].replace("envelopes","criterios");	


	for(i=0;i<POLIGONO_TRUE_pontos_x.length;i++)
	{
		teste_sigma_x=POLIGONO_TRUE_pontos_x[i];
		teste_sigma_y=POLIGONO_TRUE_pontos_y[i];

		endereco=url_criterios+"?/"+angulo+"/"+laminaURL+"/00/"+teste_sigma_x+"/"+teste_sigma_y+"/"+tauXY
	$("#vertice_"+i).text("("+teste_sigma_x+","+teste_sigma_y+")");
		$("#vertice_"+i).attr("href",endereco);
	}
///////
}

