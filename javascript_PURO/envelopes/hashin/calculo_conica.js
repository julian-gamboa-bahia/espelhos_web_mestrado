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
//vemos a tolerancia:

	tolerancia=coletar_tolerancia(0.01)/1.0;
//tolerancia=(0.5)/1.0;

/*
* Numerico Puro
* Sistema de 4 cuadrantes
* */

	numeroPontos=coletar_numero_pontos(55);
//usamos o TAU XY que por default será um zero.
        tauXY=tau_xy+0.0;

        // COORDENADAS globais:

        // os efeitos da rotação da lamina:
        // daqui pa frente COORDENADAS GLOBAIS
        theta_radianos=(Math.PI/180)*angulo;

        cos=Math.cos(theta_radianos);
        sin=Math.sin(theta_radianos);

// indicação do valor de saída:

	saida_unitario="";

//TRACAO_FIBRA

	gerador_TRACAO_FIBRA(cos,sin,tau_xy);

	numero_pontos_if_unitario=0;

	for(i=0;i<pares_pontos_x.length;i++)
	{
		indice_temp=criterio_puro(pares_pontos_x[i],pares_pontos_y[i],tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);

//		pares_pontos_x.sort();			alert("pares_pontos_x[0]  "+pares_pontos_x[0]);

		if((indice_temp<(1+tolerancia)) &&(indice_temp>(1-tolerancia)))
		{
			pares_pontos_temp_x.push(pares_pontos_x[i]);
			pares_pontos_temp_y.push(pares_pontos_y[i]);
			saida_unitario=saida_unitario+"("+pares_pontos_x[i]+","+pares_pontos_y[i]+")   "+indice_temp+"<br>";
			numero_pontos_if_unitario=numero_pontos_if_unitario+1;
		}

	}

//	alert("pares_pontos_temp_x.length //TRACAO_FIBRA "+pares_pontos_temp_x.length);

	var texto_saida="";
	for(i=0;i<pares_pontos_temp_x.length;i++)
	{
		texto_saida=texto_saida+pares_pontos_temp_x[i]+"  "+pares_pontos_temp_y[i]+"\n";
	}
//	alert(texto_saida);


	if(numero_pontos_if_unitario>0)
	{
		pares_pontos_temp_x.push(null); 	pares_pontos_temp_y.push(null);
	}

//	alert("pares_pontos_temp_x.length //TRACAO_FIBRA NULL "+pares_pontos_temp_x.length);

//////
//TRACAO_MATRIZ

	gerador_TRACAO_MATRIZ(cos,sin,tau_xy);
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

	if(numero_pontos_if_unitario>0)
	{
		pares_pontos_temp_x.push(null); 	pares_pontos_temp_y.push(null);
	}

//	alert("pares_pontos_temp_x.length //TRACAO MATRIZ NULL"+pares_pontos_temp_x.length);

//COMPRESSAO_MATRIZ

	gerador_COMPRESSAO_MATRIZ(cos,sin,tau_xy);

	numero_pontos_if_unitario=0;

	for(i=0;i<pares_pontos_x.length;i++)
	{
		indice_temp=criterio_puro(pares_pontos_x[i],pares_pontos_y[i],tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);

//junho19		
//junho19				if((indice_temp<1.01) &&(indice_temp>0.99))
		if((indice_temp<(1+tolerancia)) &&(indice_temp>(1-tolerancia)))
		{
			pares_pontos_temp_x.push(pares_pontos_x[i]);
			pares_pontos_temp_y.push(pares_pontos_y[i]);
			saida_unitario=saida_unitario+"--("+pares_pontos_x[i]+","+pares_pontos_y[i]+")   "+indice_temp+"<br>";
			numero_pontos_if_unitario=numero_pontos_if_unitario+1;
		}

	}

	if(numero_pontos_if_unitario>0)
	{
		pares_pontos_temp_x.push(null); 	pares_pontos_temp_y.push(null);
	}

//	alert("pares_pontos_temp_x.length //COMPRESSAO_MATRIZ NULL"+pares_pontos_temp_x.length);

///COMPRESSAO_FIBRA, coloca de ultima

	gerador_COMPRESSAO_FIBRA(cos,sin,tau_xy);
	numero_pontos_if_unitario=0;

	for(i=0;i<pares_pontos_x.length;i++)
	{
		indice_temp=criterio_puro(pares_pontos_x[i],pares_pontos_y[i],tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);

//junho19		
		if((indice_temp<(1+tolerancia)) &&(indice_temp>(1-tolerancia)))
		{
			pares_pontos_temp_x.push(pares_pontos_x[i]);
			pares_pontos_temp_y.push(pares_pontos_y[i]);
			saida_unitario=saida_unitario+"("+pares_pontos_x[i]+","+pares_pontos_y[i]+")   "+indice_temp+"<br>";
			numero_pontos_if_unitario=numero_pontos_if_unitario+1;
		}

	}

	if(numero_pontos_if_unitario>0)
	{
		pares_pontos_temp_x.push(null); 	pares_pontos_temp_y.push(null);
	}

//	alert(pares_pontos_temp_x.length);

//final

	pares_pontos_x=[];	pares_pontos_y=[];

	for(i=0;i<pares_pontos_temp_x.length;i++)
	{
		pares_pontos_x.push(pares_pontos_temp_x[i]);
		pares_pontos_y.push(pares_pontos_temp_y[i]);
	}

//vemos todo:

	var texto_saida="";

	for(i=0;i<pares_pontos_temp_x.length;i++)
	{
		texto_saida=texto_saida+pares_pontos_temp_x[i]+"  "+pares_pontos_temp_y[i]+"\n";
	}
//	alert(texto_saida);


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


for(i=0;i<pares_pontos_x.length;i++)	
{
    text = text+'{ "x":'+pares_pontos_x[i]+' , "y":'+pares_pontos_y[i]+' },';
}

/*
Criandos eixos
*/

// 1) Primeiramente calculamos o centro

//Usamos cramer para um sistema de 2x2
x_centro=0.0;
y_centro=0.0;

if(angulo % 45 !=0)  // sendo diferente de 45 pode calcular
{
	determinante_denominador=Math.pow(cos,4)-Math.pow(sin,4);

	determinante_x=-2*tau_xy*(Math.pow(cos,3)*sin-cos*Math.pow(sin,2));

	determinante_y=2*tau_xy*(Math.pow(cos,3)+2*cos*Math.pow(sin,3));

	x_centro=determinante_x/determinante_denominador;

	y_centro=determinante_y/determinante_denominador;

}
else
{

}

// 2) Toda linha deve pasar pelo centro

eixo_sigma_x = '{ "x":'+x_centro+' , "y":'+y_centro+' },';

for(i=0;i<pares_pontos_x.length;i++)	
{
	calculado=-Math.pow((cos/sin),2)*pares_pontos_x[i]-2*(cos/sin)*tau_xy;
	eixo_sigma_x = eixo_sigma_x+'{ "x":'+pares_pontos_x[i]+' , "y":'+calculado+' },';
}
    eixo_sigma_x = eixo_sigma_x+'{ "x":'+null+' , "y":'+null+' }';

//

eixo_sigma_x_negativo = '{ "x":'+x_centro+' , "y":'+y_centro+' },';

for(i=0;i<pares_pontos_x.length;i++)	
{
	calculado=-Math.pow((cos/sin),2)*(-pares_pontos_x[i])-2*(cos/sin)*tau_xy;
    eixo_sigma_x_negativo = eixo_sigma_x_negativo+'{ "x":'+-pares_pontos_x[i]+' , "y":'+calculado+' },';
}
    eixo_sigma_x_negativo = eixo_sigma_x_negativo+'{ "x":'+null+' , "y":'+null+' }';

//

eixo_sigma_y = '{ "x":'+x_centro+' , "y":'+y_centro+' },';

for(i=0;i<pares_pontos_x.length;i++)	
{
	calculado=-Math.pow((sin/cos),2)*pares_pontos_x[i]+2*(sin/cos)*tau_xy;
	eixo_sigma_y = eixo_sigma_y+'{ "x":'+pares_pontos_x[i]+' , "y":'+calculado+' },';
}
    eixo_sigma_y = eixo_sigma_y+'{ "x":'+null+' , "y":'+null+' }';

//

eixo_sigma_y_negativo = '{ "x":'+x_centro+' , "y":'+y_centro+' },';

for(i=0;i<pares_pontos_x.length;i++)	
{
	calculado=-Math.pow((sin/cos),2)*(-pares_pontos_x[i])+2*(sin/cos)*tau_xy;
	eixo_sigma_y_negativo = eixo_sigma_y_negativo+'{ "x":'+(-pares_pontos_x[i])+' , "y":'+calculado+' },';
}
    eixo_sigma_y_negativo = eixo_sigma_y_negativo+'{ "x":'+null+' , "y":'+null+' }';


//fechando sem rabinho
//    text = text+'{ "x":'+pares_pontos_x[0]+' , "y":'+pares_pontos_y[0]+' }';
    text = text+'{ "x":'+null+' , "y":'+null+' }';

var preJSON='{"series":   [  {"name": "eixo","data":[ '+eixo_sigma_y+' ]},{"name": "eixo","data":[ '+eixo_sigma_y_negativo+' ]}, {"name": "eixo","data":[ '+eixo_sigma_x_negativo+' ]},{"name": "eixo","data":[ '+eixo_sigma_x+' ]},{"name": "superior","data":[ '+text+' ]}, {"name": "ponto","data":[{"x":"'+x_centro+'","y":"'+y_centro+'"}]} ]   }';

var obj = JSON.parse(preJSON);


//alert(JSON.stringify(obj));

var mainchart=new Chartist.Line('#chart1', obj
,{
  series: {
      'superior': {
	lineSmooth: Chartist.Interpolation.none(),
      showPoint: true
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
        document.getElementById("saida_unitario").innerHTML =saida_unitario;

	envio_gnu();
}


/*

*/
function gerar_pontos()
{
	B=2*b_f;
	A=a_f;
	C=c_f;
//B^{2}-4AC<0  represents an ellipse;
	if((B*B-4*A*C)>=0)
	{
		return "nao_elipse";
	}


// no caso isotropico Poupamos calculo e fazemos apenas o estudo polar:

        var rotacionado;
        var x;

	a_f=a;
	b_f=b;
	c_f=c;
	d_f=d;
	f_f=f;
	g_f=g;

//Sendo preciso agora usar a formulação mais explicita
	
if(b!=0)
{
	B=2*b_f;
	D=2*d_f;
	E=2*f_f;

	A=a_f;
	C=c_f;

numerador=(C-A-Math.sqrt(Math.pow(A-C,2)+B*B));

	rotacionado=Math.atan(numerador/B);
}

/*
Informação dos coeficientes cônicos
*/

        // vemos os cumprimentos dos eixos principais desta elipse:
        // cumprimento dos eixos, usando todos os coeficientes:	try:
        raioMaior=Math.sqrt((2*(a*f*f+c*d*d+g*b*b-2*b*d*f-a*c*g))/((b*b-a*c)*(Math.sqrt(Math.pow((a-c),2)+4*b*b)-(a+c))));

        raioMenor=Math.sqrt((2*(a*f*f+c*d*d+g*b*b-2*b*d*f-a*c*g))/((b*b-a*c)*(-Math.sqrt(Math.pow((a-c),2)+4*b*b)-(a+c))));

eixo_menor_elipse=raioMenor;
eixo_maior_elipse=raioMaior;


//alert("30  "+a+"  "+b+"  "+c+"  "+d+"  "+f+"  "+g+"  "+raioMaior+"  "+raioMenor);
//1.3869007511151055e-17  -5.7351918267680336e-18  1.3869007511151055e-17  0  0  -1  350633039.5869733  350633039.5869733
//

        // Origem

origem_x=(c*d-b*f)/(b*b-a*c);
origem_y=(a*f-b*d)/(b*b-a*c);

    var ang=0;

    var passo=(2*Math.PI/numeroPontos);

//Fazemos a varredura de Izquerda para DIREITA , desde 0 para 2*Pi


    for(i=0;i<numeroPontos;i++)
    {
         cos=Math.cos(ang);
         sin=Math.sin(ang);
         r=(raioMaior*raioMenor)/(Math.sqrt(raioMaior*raioMaior*sin*sin+raioMenor*raioMenor*cos*cos));
         x=r*cos;
         y=r*sin;

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

*/
function gerador_TRACAO_FIBRA(cos,sin,tau_xy)
{
	pares_pontos_x=[];	pares_pontos_y=[];
	calcular_coeficientesTRACA_OFIBRA(cos,sin);
	conica=indicar_tipo_conica(a,b,c,d,f,g);
	if(conica=="elipse")
	{
		alert("No caso da TRACAO da FIBRA a curva é do tipo elipse");
		gerar_pontos();
	}
	if(conica=="hyperbola")
	{
		alert("No caso da TRACAO da FIBRA a curva é do tipo hyperbola");
		gerar_pontos_hyberpola();
	}

	filtro_calculo_conica_TRACA_OFIBRA(angulo,tau_xy);
}

function gerador_TRACAO_MATRIZ(cos,sin,tau_xy)
{
	pares_pontos_x=[];	pares_pontos_y=[];
	calcular_coeficientes_MATRIZ_TRACAO(cos,sin);
	conica=indicar_tipo_conica(a,b,c,d,f,g);
//	alert(" a "+a+" b "+b+" c "+c+" d "+d+"  f  "+f+"  g  "+g);

	if(conica=="elipse")
	{
		alert("No caso da TRACAO da Matriz a curva é do tipo elipse");
		gerar_pontos();
	}

	filtro_calculo_conica_TRACAO_MATRIZ(angulo,tau_xy);
}

/*

*/

function gerador_COMPRESSAO_MATRIZ(cos,sin,tau_xy)
{
	pares_pontos_x=[];	pares_pontos_y=[];
	
	calcular_coeficientesCOMPRESSAO_MATRIZ(cos,sin);

	conica=indicar_tipo_conica(a,b,c,d,f,g);

//	alert(" a "+a+" b "+b+" c "+c+" d "+d+"  f  "+f+"  g  "+g);

	if(conica=="elipse")
	{
		alert("No caso da COMPRESSAO da Matriz a curva é do tipo elipse");
		gerar_pontos();
	}

	gerar_pontos();
	filtro_calculo_conica_COMPRESSAO_MATRIZ(angulo,tau_xy);
}

/*
Faixa 
*/

function gerador_COMPRESSAO_FIBRA(cos,sin,tau_xy)
{

	pares_pontos_x=[];	pares_pontos_y=[];

alfa=1;	
	coeficienteANGULAR=-Math.pow((cos/sin),2);

//Para compressão da fibra não faz mal deixar esta forma
/*
	for(i=0; i<pares_pontos_temp_x.length;i++)
	{
		pares_pontos_x.push(pares_pontos_temp_x[i]*escala);
		pares_pontos_y.push(coeficienteANGULAR*pares_pontos_temp_x[i]-Math.pow((1/sin),2)*SIGMA_C_1*alfa);
	}
*/

	ORDENADOSpares_pontos_temp_x=pares_pontos_temp_x.slice();

//O uso de slice é obrigátorio para não alterar o arquivo original

	ORDENADOSpares_pontos_temp_x.sort();

	var saida="";

	escala=10;

	alert("coeficiente ângular da compressão da fibra  "+coeficienteANGULAR);

	for(i=0; i<ORDENADOSpares_pontos_temp_x.length;i++)
	{
		if(ORDENADOSpares_pontos_temp_x[i]!=null)
		{
			valor_x=ORDENADOSpares_pontos_temp_x[i]*escala;
			valor_y=coeficienteANGULAR*valor_x-Math.pow((1/sin),2)*SIGMA_C_1*alfa;
			saida=saida+valor_x+" "+valor_y+"\n";

			pares_pontos_x.push(valor_x);
			pares_pontos_y.push(valor_y);
		}
	}
//	alert(saida);


//Caso SEM DADOS

	if(pares_pontos_temp_x.length==0)
	{
		x=[-SIGMA_C_1,-SIGMA_C_2,SIGMA_T_1,SIGMA_T_2];

		for(i=0;i<x.length;i++)
		{
			pares_pontos_x.push(x[i]);
			pares_pontos_y.push(coeficienteANGULAR*x[i]-Math.pow((1/sin),2)*SIGMA_C_1*alfa);
		}
	}

//	alert("gerador_COMPRESSAO_FIBRA  "+pares_pontos_x.length);

/*
	pares_pontos_x=[];	pares_pontos_y=[];	
	calcular_coeficientesCOMPRESSAO_FIBRA(cos,sin);
	indicar_tipo_conica(a,b,c,d,f,g);
//	alert(" a "+a+" b "+b+" c "+c+" d "+d+"  f  "+f+"  g  "+g);
	gerar_pontos();
*/
	filtro_calculo_conica_COMPRESSAO_FIBRA(angulo,tau_xy);
}

/*
Apenas para angulos de 90 Degree
*/
function rotacao_pi_2(angulo,tau_xy)
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

/*
O caso fácil é quando TAU externo for nulo, 
Antes de escolher os vertices GLOBAIS é preciso OBTER os valores das resistências locais
*/

	TAU23=coletar_TAU23(TAU12);
	resolvente_quadratica_termo_a=Math.pow((1.0/(2.0*TAU23)),2);
	termoTAU23=Math.pow((SIGMA_C_2/(2.0*TAU23)),2);
	resolvente_quadratica_termo_b=(1.0/(SIGMA_C_2))*(termoTAU23-1);
	a=resolvente_quadratica_termo_a;
	b=resolvente_quadratica_termo_b;
	radicando=(Math.pow(b,2))-4*a*(-1.0);
	if(radicando=>0)
	{
		preROOT_1=+Math.sqrt(radicando);
		preROOT_2=-Math.sqrt(radicando);
		ROOT_1=(-b+preROOT_1)/(2.0*a);
		ROOT_2=(-b+preROOT_2)/(2.0*a);

	//A raíz negativa será considerada como a raíz de interesse
		if(ROOT_1<=0)
		{
			raiz_de_interesse=ROOT_1;
		}		

		if(ROOT_2<=0)
		{
			raiz_de_interesse=ROOT_2;
		}		


	}
	else
	{
		alert("raiz imaginaria  no caso de tração da fibra");		
	}

	SIGMA_C_2_raiz=raiz_de_interesse;

/*
Com apenas 
tau_xy NULO
*/
	if(tau_xy==0)
	{
		SIGMA_T_1_rotacionado=c2*SIGMA_T_1+s2*SIGMA_T_2;
		SIGMA_T_2_rotacionado=s2*SIGMA_T_1+c2*SIGMA_T_2;

		SIGMA_C_1_rotacionado=c2*(-SIGMA_C_1)+s2*(SIGMA_C_2_raiz);		
		SIGMA_C_2_rotacionado=s2*(-SIGMA_C_1)+c2*(SIGMA_C_2_raiz);

	}
	else
	{
/*
Com apenas 
tau_xy VIVO
Devem ser feitos mais calculos
*/

		resolvente_quadratica_termo_a=Math.pow((1.0/(SIGMA_T_1)),2);
		normalizado_tau12=(tau_xy/TAU12);
		resolvente_quadratica_termo_c=-1.0+Math.pow(normalizado_tau12,2);
		a=resolvente_quadratica_termo_a;
		b=0.0;
		c=resolvente_quadratica_termo_c;
		radicando=-4*a*c;

		if(radicando=>0)
		{
			preROOT_1=+Math.sqrt(radicando);
			preROOT_2=-Math.sqrt(radicando);
			ROOT_1=(preROOT_1)/(2.0*a);
			ROOT_2=(preROOT_2)/(2.0*a);
		//A raíz negativa será considerada como a raíz de interesse
			if(ROOT_1>=0)
			{
				raiz_de_interesse=ROOT_1;
			}		

			if(ROOT_2>=0)
			{
				raiz_de_interesse=ROOT_2;
			}		

		}
		else
		{
			alert("raiz imaginaria  no caso de tração da fibra");		
		}

		SIGMA_T_1_raiz=raiz_de_interesse;
	//Parte SIGMA_2 positivo

		resolvente_quadratica_termo_a=Math.pow((1.0/(SIGMA_T_2)),2);
		normalizado_tau12=(tau_xy/TAU12);
		resolvente_quadratica_termo_c=-1.0+Math.pow(normalizado_tau12,2);
		a=resolvente_quadratica_termo_a;
		b=0.0;
		c=resolvente_quadratica_termo_c;
		radicando=-4*a*c;

		if(radicando=>0)
		{
			preROOT_1=+Math.sqrt(radicando);
			preROOT_2=-Math.sqrt(radicando);
			ROOT_1=(preROOT_1)/(2.0*a);
			ROOT_2=(preROOT_2)/(2.0*a);
		//A raíz negativa será considerada como a raíz de interesse
			if(ROOT_1>=0)
			{
				raiz_de_interesse=ROOT_1;
			}		

			if(ROOT_2>=0)
			{
				raiz_de_interesse=ROOT_2;
			}		

		}
		else
		{
			alert("raiz imaginaria  no caso de tração da matriz");		
		}

		SIGMA_T_2_raiz=raiz_de_interesse;

		TAU23=coletar_TAU23(TAU12);
		resolvente_quadratica_termo_a=Math.pow((1.0/(2.0*TAU23)),2);
		termoTAU23=Math.pow((SIGMA_C_2/(2.0*TAU23)),2);
		resolvente_quadratica_termo_b=(1.0/(SIGMA_C_2))*(termoTAU23-1);
		a=resolvente_quadratica_termo_a;
		b=resolvente_quadratica_termo_b;
		radicando=(Math.pow(b,2))-4*a*(-1.0);
		if(radicando=>0)
		{
			preROOT_1=+Math.sqrt(radicando);
			preROOT_2=-Math.sqrt(radicando);
			ROOT_1=(-b+preROOT_1)/(2.0*a);
			ROOT_2=(-b+preROOT_2)/(2.0*a);

		//A raíz negativa será considerada como a raíz de interesse
			if(ROOT_1<=0)
			{
				raiz_de_interesse=ROOT_1;
			}		

			if(ROOT_2<=0)
			{
				raiz_de_interesse=ROOT_2;
			}		


		}
		else
		{
			alert("raiz imaginaria  no caso de tração da fibra");		
		}

		//Pelo efeito do convênio de sinal
		SIGMA_C_2_raiz=raiz_de_interesse;

		SIGMA_T_1_rotacionado=c2*SIGMA_T_1_raiz+s2*SIGMA_T_2_raiz;
		SIGMA_T_2_rotacionado=s2*SIGMA_T_1_raiz+c2*SIGMA_T_2_raiz;

		SIGMA_C_1_rotacionado=c2*(-SIGMA_C_1)+s2*(SIGMA_C_2_raiz);		
		SIGMA_C_2_rotacionado=s2*(-SIGMA_C_1)+c2*(SIGMA_C_2_raiz);

	/*
	Outubro25
	alert("SIGMA_T_1_rotacionado  "+SIGMA_T_1_rotacionado);
	alert("SIGMA_T_2_rotacionado  "+SIGMA_T_2_rotacionado);
	alert("SIGMA_T_1_rotacionado  "+SIGMA_T_1_rotacionado);
	alert("SIGMA_C_1_rotacionado  "+SIGMA_C_1_rotacionado);
	alert("SIGMA_C_2_rotacionado  "+SIGMA_C_2_rotacionado);
	*/
	}

	//Extremos:



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
		gerar_pontos
Hyberbole
*/

var saida_unitario_hyperbola="";

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

//alert("gerar_pontos_hyberpola  origem_x "+origem_x);

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


//Para melhorar o sistema

function coletar_tolerancia(tolerancia) {
    var entrada = prompt("Por favor indique a tolerancia", tolerancia);
    if (entrada != null) {
	return entrada;
    }
	else
	{
	 return numero_pontos;
	}
////		tolerancia=0.15;
}


//função para receber o TAU23

function coletar_TAU23(TAU12)
{

	var entrada = prompt("Por favor indique o valor de TAU23",TAU12);
	if (entrada == null) 
	{
		return TAU12;
	}
	else
	{
		return entrada;
	}
}
