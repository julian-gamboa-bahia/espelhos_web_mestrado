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

function calculo_conica(angulo,tau_xy,biaxial_experimental)
{

/*
* Numerico Puro

* Numerico Puro

* Numerico Puro

* Marco17
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
        // escrevemos com mais clareza, lembrar a forma

	calcular_coeficientes(cos,sin,biaxial_experimental);

	conica=indicar_tipo_conica(a,b,c,d,f,g);

	if(conica=="elipse")
	{
		alert("Forma cônica do tipo: "+conica);
	}
	else
	{
		alert("Cônica do tipo curva não fechada "+conica+" por tanto não pode se representar ");

	}
	B=2*b_f;
	A=a_f;
	C=c_f;
//B^{2}-4AC<0  represents an ellipse;
	if((B*B-4*A*C)>=0)
	{
		return "nao_elipse";
	}
	else
	{
//		alert("cônica sem forma de elipse")	
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

        // Origem

origem_x=(c*d-b*f)/(b*b-a*c);
origem_y=(a*f-b*d)/(b*b-a*c);

//alert(a+"  "+b+"  "+c+"  "+d+"  "+f+"  "+g+"  "+raioMaior+"  "+raioMenor+" rotacionado  "+rotacionado+"  origem_x "+origem_x+" origem_y "+origem_y);

//alert("rotacionado  "+rotacionado);

    var ang=-1e-2;
    var passo=1e-2; //(2*Math.PI/numeroPontos);

    var ang=0;
    var passo=(2*Math.PI/numeroPontos);

//Fazemos a varredura de Izquerda para DIREITA , desde 0 para 2*Pi

    for(i=0;i<numeroPontos;i++)
    {
        c=Math.cos(ang);
        s=Math.sin(ang);
         r=(raioMaior*raioMenor)/(Math.sqrt(raioMaior*raioMaior*s*s+raioMenor*raioMenor*c*c));
         x=r*c;
         y=r*s;

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

        pares_pontos_x[i]=temporal_x;
        pares_pontos_y[i]=temporal_y;
    }

/*

Vetorizamos para poder representar 

*/

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

//alert(pares_pontos_x.length);alert(pares_pontos_y.length);

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
//fechando sem rabinho
    text = text+'{ "x":'+pares_pontos_x[0]+' , "y":'+pares_pontos_y[0]+' }';

var preJSON='{"series":   [   {"name": "superior","data":[ '+text+' ]}, {"name": "ponto","data":[{"x":"0","y":"0"}]} ]   }';

var obj = JSON.parse(preJSON);

//alert(JSON.stringify(obj));

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

	link_vertices_calculo_conica(biaxial_experimental);
////////////////////////////////////////////////////////
}

/*
Calculamos os coeficientes desta elipse
*/

function calcular_coeficientes(cos,sin,biaxial_experimental)
{
        //  Coeficientes em função das resistências:

is1=((1/SIGMA_T_1)-(1/SIGMA_C_1));
is2=((1/SIGMA_T_2)-(1/SIGMA_C_2));

is1q=(1/SIGMA_T_1)*(1/SIGMA_T_1);
is2q=(1/SIGMA_T_2)*(1/SIGMA_T_2);
t12=(1/TAU12)*(1/TAU12);

F12_potencia_1=((1/SIGMA_T_1)-(1/SIGMA_C_1)+(1/SIGMA_T_2)-(1/SIGMA_C_2))*biaxial_experimental;

F12_potencia_2=((1/(SIGMA_T_1*SIGMA_C_1))+(1/(SIGMA_T_2*SIGMA_C_2)))*biaxial_experimental*biaxial_experimental;

F12_sem_normalizar=1-F12_potencia_1-F12_potencia_2;	

F12=(1/(2*biaxial_experimental*biaxial_experimental))*F12_sem_normalizar;

/*
a=
+ 2 F_{12} cos^{2} \sigma_{x}^{2} sin^{2} 
+ cos^{4} is1q \sigma_{x}^{2} 
+ cos^{2} \sigma_{x}^{2} sin^{2} t_{12} 
+ is2q \sigma_{x}^{2} sin^{4} 
\\
*/

fatorRotar_a=2*F12*Math.pow(cos,2)*Math.pow(sin,2) 
+ Math.pow(cos,4)*is1q 
+ Math.pow(cos,2)*Math.pow(sin,2)*t12
+ is2q*Math.pow(sin,4);

/*
+ 2 F_{12} cos^{2} \sigma_{y}^{2} sin^{2} 
+ cos^{4} is2q \sigma_{y}^{2} 
+ cos^{2} \sigma_{y}^{2} sin^{2} t_{12} 
+ is1q \sigma_{y}^{2} sin^{4}
*/

fatorRotar_c=+ 2*F12*Math.pow(cos,2)*Math.pow(sin,2) 
+ Math.pow(cos,4)*is2q  
+ Math.pow(cos,2)*Math.pow(sin,2)*t12 
+ is1q*Math.pow(sin,4);


/*
- 4 F_{12} cos^{3} \sigma_{x} sin \tau_{xy} 
+ 4 F_{12} cos \sigma_{x}sin^{3} \tau_{xy} 
+ 4 cos^{3} is1q \sigma_{x} sin \tau_{xy} 
- 2 cos^{3} \sigma_{x} sin t_{12} \tau_{xy} 
+ cos^{2} is_{1} \sigma_{x} 
- 4 cos is2q \sigma_{x} sin^{3} \tau_{xy} 
+ 2 cos \sigma_{x} sin^{3} t_{12} \tau_{xy} 
 + is_{2} \sigma_{x} sin^{2} 

*/

fatorRotar_d=-4*F12*Math.pow(cos,3)*sin*tauXY
+ 4*F12*cos*Math.pow(sin,3)*tauXY 
+ 4*Math.pow(cos,3)*is1q*sin*tauXY 
- 2*Math.pow(cos,3)*sin*t12*tauXY 
+ Math.pow(cos,2)*is1 
- 4*cos*is2q*Math.pow(sin,3)*tauXY 
+ 2*cos*Math.pow(sin,3)*t12*tauXY 
 + is2*Math.pow(sin,2);

/*
2f
- 4 F_{12} cos \sigma_{y} sin^{3} \tau_{xy} 
+ 4 F_{12} cos^{3} \sigma_{y} sin \tau_{xy} 
- 4 cos^{3} is2q \sigma_{y} sin \tau_{xy}
+ 2 cos^{3} \sigma_{y} sin t_{12} \tau_{xy} 
+ cos^{2} is_{2} \sigma_{y} 
+ 4 cos is1q \sigma_{y} sin^{3} \tau_{xy} 
- 2 cos \sigma_{y} sin^{3} t_{12} \tau_{xy} 
+ is_{1} \sigma_{y} sin^{2} 
*/

fatorRotar_f=-4*F12*cos*Math.pow(sin,3)*tauXY
+4*F12*Math.pow(cos,3)*sin*tauXY
-4*Math.pow(cos,3)*is2q*sin*tauXY
+2*Math.pow(cos,3)*sin*t12*tauXY
+Math.pow(cos,2)*is2
+4*cos*is1q*Math.pow(sin,3)*tauXY
-2*cos*Math.pow(sin,3)*t12*tauXY
+is1*Math.pow(sin,2);

/*
2b=
2 F_{12} cos^{4} \sigma_{x} \sigma_{y} 
+ 2 F_{12} \sigma_{x} \sigma_{y} sin^{4} 
+ 2 cos^{2} is1q \sigma_{x} \sigma_{y} sin^{2} 
\\
+ 2 cos^{2} is2q \sigma_{x} \sigma_{y} sin^{2} 
- 2 cos^{2} \sigma_{x} \sigma_{y} sin^{2} t_{12} \\

*/

fatorRotar_b=2*F12* Math.pow(cos,4)
+ 2*F12*Math.pow(sin,4) 
+ 2*Math.pow(cos,2)*is1q*Math.pow(sin,2) 
+ 2*Math.pow(cos,2)*is2q*Math.pow(sin,2) 
- 2*Math.pow(cos,2)*Math.pow(sin,2)*t12

/*
-1
- 2 cos is_{2} sin \tau_{xy} 
+ 4 cos^{2} is1q sin^{2} \tau_{xy}^{2} 
+ 4 cos^{2} is2q sin^{2} \tau_{xy}^{2} 
\\- 2 cos^{2} sin^{2} t_{12} \tau_{xy}^{2} 
+ 2 cos is_{1} sin \tau_{xy} 
+sin^{4} t_{12} \tau_{xy}^{2}
\\
- 8 F_{12} cos^{2} sin^{2} \tau_{xy}^{2} 
+ cos^{4} t_{12} \tau_{xy}^{2} 
*/

fatorRotar_g=-1
-2*cos*is2*sin*tauXY
+4*Math.pow(cos,2)*is1q*Math.pow(sin,2)*Math.pow(tauXY,2) 
+4*Math.pow(cos,2)*is2q*Math.pow(sin,2)*Math.pow(tauXY,2)
-2*Math.pow(cos,2)*Math.pow(sin,2)*t12*Math.pow(tauXY,2) 
+2*cos*is1*sin*tauXY
+Math.pow(sin,4)*t12*Math.pow(tauXY,2)
-8*F12*Math.pow(cos,2)*Math.pow(sin,2)*Math.pow(tauXY,2)
+Math.pow(cos,4)*t12*Math.pow(tauXY,2);

///

        a=fatorRotar_a;
	c=fatorRotar_c;

        b=(fatorRotar_b/2);
        d=(fatorRotar_d/2);
        f=(fatorRotar_f/2);

        g=fatorRotar_g;
}

/*


*/

function link_vertices_calculo_conica(biaxial_experimental)
{

	url_original=window.location.href;
	base_url= url_original.split("?");
//trocando para critérios
	url_criterios=base_url[0].replace("envelopes","criterios");	

	for(i=0;i<vertices_x.length;i++)
	{
		teste_sigma_x=vertices_x[i];
		teste_sigma_y=vertices_y[i];

		endereco=url_criterios+"?/"+angulo+"/"+laminaURL+"/00/"+teste_sigma_x+"/"+teste_sigma_y+"/"+tauXY+"/0/"+biaxial_experimental
		$("#vertice_"+i).text("("+teste_sigma_x+","+teste_sigma_y+")");
		$("#vertice_"+i).attr("href",endereco);
	}

	$("#origem_x_y").text("("+origem_x+","+origem_y+")");

	$("#raioMaior").text("Raio Maior  "+raioMaior);
	$("#raioMenor").text("Raio Menor   "+raioMenor);

	$("#relacaoRAIOS").text(""+(raioMaior/raioMenor));

	envio_gnu();
}

/*
Maio16
*/

function indicar_tipo_conica(a_f,b_f,c_f,d_f,f_f,g_f)
{
//Usamos um conjunto de funcoes para facilitar estas determinantes

// Para fibra

	delta_fibra=calcular_delta(a_f,b_f,c_f,d_f,f_f,g_f);

	I_fibra=a_f+c_f;

	J_fibra=calcular_J(a_f,b_f,c_f,d_f,f_f,g_f);

	K_fibra=calcular_K(a_f,b_f,c_f,d_f,f_f,g_f);


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



