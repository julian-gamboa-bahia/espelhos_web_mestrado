var vertices_x=[];
var vertices_y=[];

var origem_x;
var origem_y;

var a;
var b;
var c;
var d;
var f;
var g;

var a_f;
var b_f;
var c_f;
var d_f;
var f_f;
var g_f;

var raioMaior;
var raioMenor;

var	pares_pontos_temp_x=[];	
var	pares_pontos_temp_y=[];

var eixo_maior_elipse=0.0;
var eixo_menor_elipse=0.0;

function calculo_conica(angulo,tau_xy)
{

/*
* Numerico Puro

* Numerico Puro

* Numerico Puro

* Marco17
* */

	numeroPontos=coletar_numero_pontos(100);
	tolerancia=coletar_tolerancia(0.01)/1.0;
//usamos o TAU XY que por default será um zero.
        tauXY=(0.0+tau_xy)/1.0;

        // COORDENADAS globais:

        // os efeitos da rotação da lamina:
        // daqui pa frente COORDENADAS GLOBAIS
        theta_radianos=(Math.PI/180)*angulo;

        cos=Math.cos(theta_radianos);
        sin=Math.sin(theta_radianos);

// indicação do valor de saída:

	saida_unitario="";
	numero_pontos_if_unitario=0;

///Falha na matriz

	gerador_falha_matriz(cos,sin,tau_xy);
	numero_pontos_if_unitario=0;



	for(i=0;i<pares_pontos_x.length;i++)
	{
		indice_temp=criterio_puro(pares_pontos_x[i],pares_pontos_y[i],tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);
		
		if((indice_temp<(1+tolerancia)) &&(indice_temp>(1-tolerancia)))
		{
			pares_pontos_temp_x.push(pares_pontos_x[i]);
			pares_pontos_temp_y.push(pares_pontos_y[i]);
			saida_unitario=saida_unitario+"("+pares_pontos_x[i]+","+pares_pontos_y[i]+")   "+indice_temp+"<br>";
			numero_pontos_if_unitario=numero_pontos_if_unitario+1;
		}

	}


//Agosto12, ele não ganha nada colocando cada sequencia por separado
		//pares_pontos_temp_x.push(null); 	pares_pontos_temp_y.push(null);

//agosto	alert(pares_pontos_temp_x);

///Falha na fibra

	gerador_falha_fibra(cos,sin,tau_xy);
	numero_pontos_if_unitario=0;

	for(i=0;i<pares_pontos_x.length;i++)
	{
		indice_temp=criterio_puro(pares_pontos_x[i],pares_pontos_y[i],tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);

		if((indice_temp<(1+tolerancia)) &&(indice_temp>(1-tolerancia)))
		{
			pares_pontos_temp_x.push(pares_pontos_x[i]);
			pares_pontos_temp_y.push(pares_pontos_y[i]);
			saida_unitario=saida_unitario+"("+pares_pontos_x[i]+","+pares_pontos_y[i]+")   "+indice_temp+"<br>";
			numero_pontos_if_unitario=numero_pontos_if_unitario+1;
		}

	}

//Agosto12, ele não ganha nada colocando cada sequencia por separado
		//pares_pontos_temp_x.push(null); 	pares_pontos_temp_y.push(null);

//Agosto12, com o intuito de 

	pares_pontos_temp_x.push(pares_pontos_temp_x[0]);
	pares_pontos_temp_y.push(pares_pontos_temp_y[0]);

//final

	pares_pontos_x=[];	pares_pontos_y=[];

//consideramos a medida anterior como nula

/*
Agosto 12

Após gerar cada sequência de curvas
*/

	medido_anterior=0;

	condicao_fechamento=coletar_condicao_fechamento(10);

	for(i=0;i<pares_pontos_temp_x.length;i++)
	{
		medido=medidas(pares_pontos_temp_x[i],pares_pontos_temp_y[i],pares_pontos_temp_x[i-1],pares_pontos_temp_y[i-1]);

		if((medido/medido_anterior)>condicao_fechamento)
		{
			pares_pontos_x.push(null);
			pares_pontos_y.push(null);
		}

		pares_pontos_x.push(pares_pontos_temp_x[i]);
		pares_pontos_y.push(pares_pontos_temp_y[i]);

		medido_anterior=medido;
	}


//maximos

var maximo_x=10.0;
var maximo_y=10.0;
var minimo_x=-10.0;
var minimo_y=-10.0;

/*
X  Minimo
*/
var temp=0.0;
temp_i=0;
for(i=0;i<pares_pontos_x.length;i++)
{
	if(pares_pontos_x[i]<=temp)
	{
		temp=pares_pontos_x[i];
temp_i=i;
	}
}
minimo_x=temp;
vertices_x.push(pares_pontos_x[temp_i]);
vertices_y.push(pares_pontos_y[temp_i]);

/*
X  Maximo
*/
var temp=0.0;
temp_i=0;
for(i=0;i<pares_pontos_x.length;i++)
{
	if(pares_pontos_x[i]>=temp)
	{
		temp=pares_pontos_x[i];
temp_i=i;
	}
}
maximo_x=temp;
vertices_x.push(pares_pontos_x[temp_i]);
vertices_y.push(pares_pontos_y[temp_i]);

/*
Y  Minimo
*/
var temp=0.0;
temp_i=0;
for(i=0;i<pares_pontos_y.length;i++)
{
	if(pares_pontos_y[i]<=temp)
	{
		temp=pares_pontos_y[i];
temp_i=i;

	}
}
minimo_y=temp;
vertices_x.push(pares_pontos_x[temp_i]);
vertices_y.push(pares_pontos_y[temp_i]);

/*
Y  Maximo
*/
var temp=0.0;
temp_i=0;
for(i=0;i<pares_pontos_y.length;i++)
{
	if(pares_pontos_y[i]>=temp)
	{
		temp=pares_pontos_y[i];
temp_i=i;
	}
}
maximo_y=temp;
vertices_x.push(pares_pontos_x[temp_i]);
vertices_y.push(pares_pontos_y[temp_i]);

//Graficar Chartist
//Graficar Chartist
//Graficar Chartist
//Graficar Chartist
//Graficar Chartist
//Graficar Chartist
//Graficar Chartist

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

/*
Eliminas os null antes
*/

//Para x
	var indexes = getAllIndexes(pares_pontos_x, "null");

	for (i=0; i<indexes.length; i++) 
	{
	    var index = pares_pontos_x.indexOf("null");
	    pares_pontos_x.splice(index, 1);
	}
//Para y
	var indexes = getAllIndexes(pares_pontos_y, "null");

	for (i=0; i<indexes.length; i++) 
	{
	    var index = pares_pontos_y.indexOf("null");
	    pares_pontos_y.splice(index, 1);
	}

var text = "";

//agosto12

for(i=0;i<pares_pontos_x.length;i++)	
{
    text = text+'{ "x":'+pares_pontos_x[i]+' , "y":'+pares_pontos_y[i]+' },';
}

x_centro=0.0; //pares_pontos_x[pares_pontos_x.length-1];
y_centro=0.0; //pares_pontos_y[pares_pontos_x.length-1];

/*
Agosto12, 
Usando o critério do ponto médio, 
vemos se for preciso 
1) CONECTAR INICIO e fim
2) APENAS COLOCAR UM 		null    NO FINAL
*/

//Voltamos ao ponto inicial, para criar uma curva fechada
//    text = text+'{ "x":'+pares_pontos_x[0]+' , "y":'+pares_pontos_y[0]+' }';
    text = text+'{ "x":'+null+' , "y":'+null+' }';
/*
Maio20

*/

var preJSON='{"series":   [  {"name": "superior","data":[ '+text+' ]}, {"name": "ponto","data":[{"x":"'+x_centro+'","y":"'+y_centro+'"}]} ]   }';

var obj = JSON.parse(preJSON);


//alert(JSON.stringify(obj));

var mainchart=new Chartist.Line('#chart1', obj
,{
  series: {
      'superior': {
	lineSmooth: Chartist.Interpolation.none(),
      showPoint: false
	},
      'ponto': {
	lineSmooth: Chartist.Interpolation.none(),
      showPoint: true
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

	link_vertices_calculo_conica();
////////////////////////////////////////////////////////
}



/*
Links de PONTOS de verificação

*/

function link_vertices_calculo_conica()
{

	url_original=window.location.href;
	base_url= url_original.split("?");
//trocando para critérios
	url_criterios=base_url[0].replace("envelopes","criterios");	

	for(i=0;i<vertices_x.length;i++)
	{
		teste_sigma_x=vertices_x[i];
		teste_sigma_y=vertices_y[i];

		endereco=url_criterios+"?/"+angulo+"/"+laminaURL+"/00/"+teste_sigma_x+"/"+teste_sigma_y+"/"+tauXY
		$("#vertice_"+i).text("("+teste_sigma_x+","+teste_sigma_y+")");
		$("#vertice_"+i).attr("href",endereco);
	}

//alert(saida_unitario);
//        document.getElementById("saida_unitario").innerHTML =saida_unitario;

	envio_gnu();
}


/*
Maio20
*/
function gerar_pontos()
{

// no caso isotropico Poupamos calculo e fazemos apenas o estudo polar:

        var rotacionado;
        var x;

//Sendo preciso agora usar a formulação mais explicita
	
if(b!=0)
{
	B=2*b;
	D=2*d;
	E=2*f;

	A=a;
	C=c;

numerador=(C-A-Math.sqrt(Math.pow(A-C,2)+B*B));

	rotacionado=Math.atan(numerador/B);
}

/*
Informação dos coeficientes cônicos
*/

        // vemos os cumprimentos dos eixos principais desta elipse:
        // cumprimento dos eixos, usando todos os coeficientes:	try:

//alert(((b*b-a*c)*(Math.sqrt(Math.pow((a-c),2)+4*b*b)-(a+c))));

        raioMaior=Math.sqrt((2*(a*f*f+c*d*d+g*b*b-2*b*d*f-a*c*g))/((b*b-a*c)*(Math.sqrt(Math.pow((a-c),2)+4*b*b)-(a+c))));

        raioMenor=Math.sqrt((2*(a*f*f+c*d*d+g*b*b-2*b*d*f-a*c*g))/((b*b-a*c)*(-Math.sqrt(Math.pow((a-c),2)+4*b*b)-(a+c))));

eixo_menor_elipse=raioMenor;
eixo_maior_elipse=raioMaior;


//alert(a+"  "+b+"  "+c+"  "+d+"  "+f+"  "+g+"  "+raioMaior+"  "+raioMaior);

        // Origem

origem_x=(c*d-b*f)/(b*b-a*c);
origem_y=(a*f-b*d)/(b*b-a*c);

    var ang=0;

    var passo=(2*Math.PI/numeroPontos);

//Fazemos a varredura de Izquerda para DIREITA , desde 0 para 2*Pi


    for(i=0;i<numeroPontos;i++)
    {
         coseno=Math.cos(ang);
         seno=Math.sin(ang);
         r=(raioMaior*raioMenor)/(Math.sqrt(raioMaior*raioMaior*seno*seno+raioMenor*raioMenor*coseno*coseno));
         x=r*coseno;
         y=r*seno;

        // aplicamos uma rotação de euler:

        temporal_x=x*Math.cos(rotacionado)-y*Math.sin(rotacionado);
        temporal_y=x*Math.sin(rotacionado)+y*Math.cos(rotacionado);

        // Origem
        if (origem_x!=0){
            temporal_x=temporal_x+origem_x;
        }
        if (origem_y!=0){
            temporal_y=temporal_y+origem_y;
        }

        ang=ang+passo;

        pares_pontos_x.push(temporal_x);
        pares_pontos_y.push(temporal_y);

//	alert("numeroPontos  "+i);
    }
////////////////
}

/*

*/

//Usar os determinantes no link: http://mathworld.wolfram.com/QuadraticCurve.html
//indicar_tipo_conica(a,b,c,d,f,g);

function indicar_tipo_conica(a_f,b_f,c_f,d_f,f_f,g_f)
{
//Usamos um conjunto de funcoes para facilitar estas determinantes

// Para fibra

	delta_fibra=calcular_delta(a_f,b_f,c_f,d_f,f_f,g_f);

	I_fibra=a_f+c_f;

	J_fibra=calcular_J(a_f,b_f,c_f,d_f,f_f,g_f);

	K_fibra=calcular_K(a_f,b_f,c_f,d_f,f_f,g_f);

/*
alert(a_f+"  "+b_f+"  "+c_f+"  "+d_f+"  "+f_f+"  "+g_f);
alert("delta_fibra  "+delta_fibra+"  a_f  "+a_f);
*/

/*
// Para matriz

	delta_matriz=calcular_delta(a_m,b_m,c_m,d_m,f_m,g_m);

	I_matriz=a_m+c_m;

	J_matriz=calcular_J(a_m,b_m,c_m,d_m,f_m,g_m);
	
	K_matriz=calcular_K(a_m,b_m,c_m,d_m,f_m,g_m);
*/
//Estudo da cÃ´nica:

	tipo_if_fibra="nao_determinado";

	if((delta_fibra!=0) && (J_fibra>0) && ((delta_fibra/I_fibra)<0))
	{
		tipo_if_fibra="elipse";
	}

	if((delta_fibra!=0) && (J_fibra==0))
	{
		tipo_if_fibra="parabola";
	}

	if((delta_fibra!=0) && (J_fibra<0))
	{
		tipo_if_fibra="hyperbola";
	}

	if((delta_fibra==0) && (J_fibra==0))
	{
		tipo_if_fibra="paralelas_real";
	}

	if((delta_fibra==0) && (J_fibra>0) && (K_fibra>0))
	{
		tipo_if_fibra="linhas_intersection_imaginarias";
	}

	if((delta_fibra==0) && (J_fibra<0) && (K_fibra<0))
	{
		tipo_if_fibra="linhas_intersection_real";
	}

	if((delta_fibra==0) && (J_fibra<0) && (K_fibra==0))
	{
		tipo_if_fibra="linhas_concidentes";
	}
////////Domingo
	return tipo_if_fibra;
}

//matriz de 3x3

function calcular_delta(a,b,c,d,f,g)
{
/*	alert("calcular_delta  "+a);
	alert(a*c*g);
	alert(-a*Math.pow(f,2));
	alert(- Math.pow(b,2)*g);
	alert(2*b*d*f);
	alert(-c*Math.pow(d,2));
	alert("total  "+(a*c*g-a*Math.pow(f,2) - Math.pow(b,2)*g + 2*b*d*f - c*Math.pow(d,2)));
*/
	return 	(a*c*g-a*Math.pow(f,2) - Math.pow(b,2)*g + 2*b*d*f - c*Math.pow(d,2));
}

//Matriz de 2x2

function calcular_J(a,b,c,d,f,g)
{
	return 	(a*c - Math.pow(b,2));
}

//	(Matriz de 2x2)+(Matriz de 2x2)

function calcular_K(a,b,c,d,f,g)
{
	return 	(a*g + c*g - Math.pow(d,2) - Math.pow(f,2));
}

/*
Geração das curvas de cada fenomeno
Caso Matriz
*/
function gerador_falha_matriz(cos,sin,tau_xy)
{
	pares_pontos_x=[];	pares_pontos_y=[];
	calcular_coeficientes_falha_matriz(cos,sin);
	conica=indicar_tipo_conica(a,b,c,d,f,g);
	if(conica=="elipse")
	{
		alert("No caso da Falha da Matriz a curva é do tipo elipse");
		gerar_pontos();
	}
	if(conica=="hyperbola")
	{
		alert("No caso da TRACAO da FIBRA a curva é do tipo hyperbola");
		gerar_pontos_hyberpola();
	}

}

/*
Caso Fibra
*/
function gerador_falha_fibra(cos,sin,tau_xy)
{
	pares_pontos_x=[];	pares_pontos_y=[];
	calcular_coeficientes_falha_fibra(cos,sin);

//alert("fibra "+a+"  "+b+"  "+c+"  "+d+"  "+f+"  "+g+"  ");

	conica=indicar_tipo_conica(a,b,c,d,f,g);
//alert("conica fibra  "+conica);
	if(conica=="elipse")
	{
		alert("No caso da Falha da Fibra a curva é do tipo elipse");
		gerar_pontos();
	}
	if(conica=="hyperbola")
	{
		alert("No caso da TRACAO da FIBRA a curva é do tipo hyperbola");
		gerar_pontos_hyberpola();
	}

}



/*
Apenas para angulos de 90 Degree
*/
function rotacao_pi_2(angulo)
{
		alert("envelope de 4 vértices");

x_centro=0.0;
y_centro=0.0;

/////
var text = "";

//Graficar Chartist
//Graficar Chartist
//Graficar Chartist
//Graficar Chartist
//Graficar Chartist
//Graficar Chartist
//Graficar Chartist

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


pares_pontos_x=[];
pares_pontos_y=[];

        theta_radianos=(Math.PI/180)*angulo;

        cos=Math.cos(theta_radianos);
        sin=Math.sin(theta_radianos);

	c2=cos*cos;
	s2=sin*sin;

SIGMA_T_1_rotacionado=c2*SIGMA_T_1+s2*SIGMA_T_2;
SIGMA_C_1_rotacionado=c2*SIGMA_C_1+s2*SIGMA_C_2;
SIGMA_C_1_rotacionado=-SIGMA_C_1_rotacionado;

SIGMA_T_2_rotacionado=s2*SIGMA_T_1+c2*SIGMA_T_2;
SIGMA_C_2_rotacionado=s2*SIGMA_C_1+c2*SIGMA_C_2;
SIGMA_C_2_rotacionado=-SIGMA_C_2_rotacionado;

maximo_x=SIGMA_T_1_rotacionado*1.5;
maximo_y=SIGMA_T_2_rotacionado*1.5;

minimo_x=SIGMA_C_1_rotacionado*1.5;
minimo_y=SIGMA_C_2_rotacionado*1.5;

//vertice + +
pares_pontos_x.push(SIGMA_T_1_rotacionado);
pares_pontos_y.push(SIGMA_T_2_rotacionado);


//vertice - +
pares_pontos_x.push(SIGMA_C_1_rotacionado);
pares_pontos_y.push(SIGMA_T_2_rotacionado);

//vertice --
pares_pontos_x.push(SIGMA_C_1_rotacionado);
pares_pontos_y.push(SIGMA_C_2_rotacionado);

//vertice + -
pares_pontos_x.push(SIGMA_T_1_rotacionado);
pares_pontos_y.push(SIGMA_C_2_rotacionado);

////voltamos ao ponto inicial 

//vertice + +
pares_pontos_x.push(SIGMA_T_1_rotacionado);
pares_pontos_y.push(SIGMA_T_2_rotacionado);

//alert(pares_pontos_x);

for(i=0;i<pares_pontos_x.length;i++)	
{
    text = text+'{ "x":'+pares_pontos_x[i]+' , "y":'+pares_pontos_y[i]+' },';
}

//fechando sem rabinho
    text = text+'{ "x":'+null+' , "y":'+null+' }';

var preJSON='{"series":   [  {"name": "superior","data":[ '+text+' ]}, {"name": "ponto","data":[{"x":"'+x_centro+'","y":"'+y_centro+'"}]} ]   }';

var obj = JSON.parse(preJSON);

//alert(JSON.stringify(obj));

var mainchart=new Chartist.Line('#chart1', obj
,{
  series: {
      'superior': {
	lineSmooth: Chartist.Interpolation.none(),
      showPoint: false
	},
      'eixo': {
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

//////////
	url_original=window.location.href;
	base_url= url_original.split("?");
//trocando para critérios
	url_criterios=base_url[0].replace("envelopes","criterios");	

	pares_pontos_x.pop();
	pares_pontos_y.pop();

	for(i=0;i<pares_pontos_x.length;i++)
	{
		teste_sigma_x=pares_pontos_x[i];
		teste_sigma_y=pares_pontos_y[i];

		endereco=url_criterios+"?/"+angulo+"/"+laminaURL+"/00/"+teste_sigma_x+"/"+teste_sigma_y+"/"+tauXY
		$("#vertice_"+i).text("("+teste_sigma_x+","+teste_sigma_y+")");
		$("#vertice_"+i).attr("href",endereco);
	}

	envio_gnu();
//////////////
}

/*
Hyberbole
*/

var saida_unitario_hyperbola="";
var saida_unitario_medidas="";

function gerar_pontos_hyberpola()
{
	gerar_pontos_hyberpola_D=calcular_J(a,b,c,d,f,g);
//	alert(" a "+a+" b "+b+" c "+c+" d "+d+"  f  "+f+"  g  "+g);
	centro_hyper_x=-(1/gerar_pontos_hyberpola_D)*(d*c-f*b);
	centro_hyper_y=-(1/gerar_pontos_hyberpola_D)*(a*f-d*b);
//calculamos os lambda
	termo_b=a+c;

lambda_1=termo_b+Math.sqrt(Math.pow(termo_b,2)-4*gerar_pontos_hyberpola_D);
lambda_1=lambda_1/2;
lambda_2=termo_b-Math.sqrt(Math.pow(termo_b,2)-4*gerar_pontos_hyberpola_D);
lambda_2=lambda_2/2;
	//alert(lambda_1+","+lambda_2);

	gerar_pontos_hyberpola_Delta=calcular_delta(a,b,c,d,f,g);

	Quadrado_eixo_a=-(gerar_pontos_hyberpola_Delta/gerar_pontos_hyberpola_D)*(1/lambda_1);
	Quadrado_eixo_b=-(gerar_pontos_hyberpola_Delta/gerar_pontos_hyberpola_D)*(1/lambda_2);

//	alert(Quadrado_eixo_a+","+Quadrado_eixo_b);

	eixo_horizontal=0.0;
	eixo_vertical=0.0;

	if(Quadrado_eixo_a>0)
	{
		eixo_horizontal=Math.sqrt(Quadrado_eixo_a);
	}
	else
	{
		if(Quadrado_eixo_b>0)
		{
			eixo_horizontal=Math.sqrt(Quadrado_eixo_b);
		}
	}
//menor
	if(Quadrado_eixo_b<0)
	{
		eixo_vertical=Math.sqrt(-Quadrado_eixo_b);
	}
	else
	{
		if(Quadrado_eixo_a<0)
		{
			eixo_vertical=Math.sqrt(-Quadrado_eixo_a);
		}
	}

//Angulo de rotacao desta hyperbola

	anguloHYPERBOLA=0.5*Math.atan((2*b)/(a-c));

//geramos os pontos
    var ang=-Math.PI;

    var passo=(2*Math.PI/numeroPontos);

//Fazemos a varredura de Izquerda para DIREITA , desde 0 para 2*Pi

    for(i=0;i<numeroPontos;i++)
    {
//	alert("  i "+i+"  ang  "+ang+"  passo "+passo);
	if(ang!=(Math.PI/2))
	{
		 cos=Math.cos(ang);
		 sin=Math.sin(ang);

		 x=eixo_horizontal*(Math.cosh(ang));
		 y=eixo_vertical*Math.sinh(ang);

		// aplicamos uma rotação de euler:

		temporal_x=x*Math.cos(anguloHYPERBOLA)-y*Math.sin(anguloHYPERBOLA);
		temporal_y=x*Math.sin(anguloHYPERBOLA)+y*Math.cos(anguloHYPERBOLA);

		// Origem
		if (origem_x!=0){
		    temporal_x=temporal_x+centro_hyper_x;
		}
		if (origem_y!=0){
		    temporal_y=temporal_y+centro_hyper_y;
		}

		pares_pontos_x.push(temporal_x);
		pares_pontos_y.push(temporal_y);

		saida_unitario_hyperbola=saida_unitario_hyperbola+temporal_x+"   "+temporal_y+"<br>";
	}
	ang=ang+passo;
    }

//Outra rama

//geramos os pontos
    var ang=-Math.PI;

    var passo=(2*Math.PI/numeroPontos);

//Fazemos a varredura de Izquerda para DIREITA , desde 0 para 2*Pi

    for(i=0;i<numeroPontos;i++)
    {
//	alert("  i "+i+"  ang  "+ang+"  passo "+passo);
	if(ang!=(Math.PI/2))
	{
		 cos=Math.cos(ang);
		 sin=Math.sin(ang);

		 x=-eixo_horizontal*(Math.cosh(ang));
		 y=eixo_vertical*Math.sinh(ang);

		// aplicamos uma rotação de euler:

		temporal_x=x*Math.cos(anguloHYPERBOLA)-y*Math.sin(anguloHYPERBOLA);
		temporal_y=x*Math.sin(anguloHYPERBOLA)+y*Math.cos(anguloHYPERBOLA);

		// Origem
		if (origem_x!=0){
		    temporal_x=temporal_x+centro_hyper_x;
		}
		if (origem_y!=0){
		    temporal_y=temporal_y+centro_hyper_y;
		}

		pares_pontos_x.push(temporal_x);
		pares_pontos_y.push(temporal_y);

		saida_unitario_hyperbola=saida_unitario_hyperbola+temporal_x+"   "+temporal_y+"<br>";
	}
	ang=ang+passo;
    }


//	alert("relacao de eixos  "+(-eixo_vertical/eixo_horizontal));
//	alert(eixo_horizontal);
///////////////////////////////////////////////////////
}


function medidas(ponto_1_x,ponto_1_y,ponto_2_x,ponto_2_y)
{
	quadrados=Math.pow(ponto_1_x-ponto_2_x,2)+Math.pow(ponto_1_y-ponto_2_y,2);
	return Math.sqrt(quadrados);
}


//coletar_condicao_fechamento

function coletar_condicao_fechamento(condicao_fechamento) {
    var entrada = prompt("Por favor indique a condição de fechamento", condicao_fechamento);
	if (entrada != null) {
		return entrada;
	}
	else
	{
	 return condicao_fechamento;
	}
}


