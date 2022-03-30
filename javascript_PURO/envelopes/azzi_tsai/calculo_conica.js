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

function calculo_conica(angulo,tau_xy)
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

//POSPOS
	pares_pontos_temp_x=[];	pares_pontos_temp_y=[];
	pares_pontos_x=[];	pares_pontos_y=[];
calcular_coeficientesPOSPOS(cos,sin);

	gerar_pontos();

//alert("calcular_coeficientesPOSPOS");


	filtro_calculo_conica_POSPOS(angulo,tau_xy);
	for(i=0;i<pares_pontos_x.length;i++)
	{
		pares_pontos_temp_x.push(pares_pontos_x[i]);
		pares_pontos_temp_y.push(pares_pontos_y[i]);
	}

		pares_pontos_temp_x.push(null);
		pares_pontos_temp_y.push(null);
gnu="";
	for(i=0;i<pares_pontos_temp_x.length;i++)
	{
		gnu=gnu+pares_pontos_temp_x[i]+"   "+pares_pontos_temp_y[i]+"\n"
	}
//alert(gnu);

//NEGPOS
	pares_pontos_x=[];	pares_pontos_y=[];

calcular_coeficientesNEGPOS(cos,sin);
	gerar_pontos();
	filtro_calculo_conica_NEGPOS(angulo,tau_xy);
	for(i=0;i<pares_pontos_x.length;i++)
	{
		pares_pontos_temp_x.push(pares_pontos_x[i]);
		pares_pontos_temp_y.push(pares_pontos_y[i]);
	}
		pares_pontos_temp_x.push(null);
		pares_pontos_temp_y.push(null);

//NEGNEG
	pares_pontos_x=[];	pares_pontos_y=[];
calcular_coeficientesNEGNEG(cos,sin);
	gerar_pontos();
	filtro_calculo_conica_NEGNEG(angulo,tau_xy);
	for(i=0;i<pares_pontos_x.length;i++)
	{
		pares_pontos_temp_x.push(pares_pontos_x[i]);
		pares_pontos_temp_y.push(pares_pontos_y[i]);
	}
		pares_pontos_temp_x.push(null);
		pares_pontos_temp_y.push(null);
//POSNEG
	pares_pontos_x=[];	pares_pontos_y=[];
calcular_coeficientesPOSNEG(cos,sin);
	gerar_pontos();
	filtro_calculo_conica_POSNEG(angulo,tau_xy);
	for(i=0;i<pares_pontos_x.length;i++)
	{
		pares_pontos_temp_x.push(pares_pontos_x[i]);
		pares_pontos_temp_y.push(pares_pontos_y[i]);
	}
		pares_pontos_temp_x.push(null);
		pares_pontos_temp_y.push(null);

//final

	pares_pontos_x=[];	pares_pontos_y=[];

	for(i=0;i<pares_pontos_temp_x.length;i++)
	{
		pares_pontos_x.push(pares_pontos_temp_x[i]);
		pares_pontos_y.push(pares_pontos_temp_y[i]);
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

/*
filtro de Distâncias
*/

////Calculamos as distancias:
		var distancias=[];
		var anterior_x=pares_pontos_x[0];
		var anterior_y=pares_pontos_y[0];

		for(i=0;i<pares_pontos_x.length-1;i++)	
		{
			delta_x=Math.pow((anterior_x-pares_pontos_x[i]),2);
			delta_y=Math.pow((anterior_y-pares_pontos_y[i]),2);		
			tempDISTANCIA=Math.sqrt(delta_x+delta_y);
			distancias.push(tempDISTANCIA)
			anterior_x=pares_pontos_x[i];
			anterior_y=pares_pontos_y[i];
		}
//calculamos a media
		var soma=0;

		for(i=0;i<distancias.length;i++)	
		{
			soma=soma+distancias[i];
		}
//colocamos apenas aqueles que sejam proximos
		var media=(soma/distancias.length);

/*
alert("pares_pontos_x "+pares_pontos_x.length);
alert("distancias "+distancias.length);
alert("media "+media);
*/
		for(i=0;i<distancias.length;i++)	
		{
			if(Math.abs(distancias[i]-media)>(media/1))
			{
				pares_pontos_x[i]="null";
				pares_pontos_y[i]="null";
			}
		}

//Passamos as informações das distancias

/*
*/


for(i=0;i<pares_pontos_x.length;i++)	
{
    text = text+'{ "x":'+pares_pontos_x[i]+' , "y":'+pares_pontos_y[i]+' },';
}


//fechando sem rabinho
//    text = text+'{ "x":'+pares_pontos_x[0]+' , "y":'+pares_pontos_y[0]+' }';
    text = text+'{ "x":'+null+' , "y":'+null+' }';

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

	link_vertices_calculo_conica();
////////////////////////////////////////////////////////
}

/*
Calculamos os coeficientes desta elipse
*/

function calcular_coeficientesNEGPOS(cos,sin)
{
        //  a*x²+c*y²+2bxy

//No quandrante (-,+) este valor deve ser de compressão 

        Quadrado_t1=(1/SIGMA_C_1)*(1/SIGMA_C_1);
        Quadrado_t2=(1/SIGMA_T_2)*(1/SIGMA_T_2);
        Quadrado_t12=(1/TAU12)*(1/TAU12);

        // sigma_X^2

/*

a=
+c^{4} \sigma_{x}^{2} t_{1}^{2} 
+ s^{4} \sigma_{x}^{2} t_{2}^{2} 
- c^{2} s^{2} \sigma_{x}^{2} t_{1}^{2} 
+ c^{2} s^{2} \sigma_{x}^{2} t_{12}^{2} 
\\
*/

fatorRotar_a=Math.pow(cos,4)*Quadrado_t1
+ Math.pow(sin,4)*Quadrado_t2
- Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t1 
+ Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12;


        //   sigma_Y^2
/*
c=
+ s^{4} \sigma_{y}^{2} t_{1}^{2} 
+ c^{4} \sigma_{y}^{2} t_{2}^{2} 
- c^{2} s^{2} \sigma_{y}^{2} t_{1}^{2} 
+ c^{2} s^{2} \sigma_{y}^{2} t_{12}^{2} 
*/

fatorRotar_c=Math.pow(sin,4)*Quadrado_t1 
+ Math.pow(cos,4)*Quadrado_t2 
- Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t1 
+ Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12;

        //   sigma_Y*sigma_X

/*

2b=
- c^{4} \sigma_{x} \sigma_{y} t_{1}^{2} 
+ 2 c^{2} s^{2} \sigma_{x} \sigma_{y} t_{1}^{2} 
- 2 c^{2} s^{2} \sigma_{x} \sigma_{y} t_{12}^{2}
\\
- s^{4} \sigma_{x} \sigma_{y} t_{1}^{2}  
+ 2 c^{2} s^{2} \sigma_{x} \sigma_{y} t_{2}^{2} 
*/

fatorRotar_b=- Math.pow(cos,4)*Quadrado_t1 
+ 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t1 
- 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12
- Math.pow(sin,4)*Quadrado_t1  
+ 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t2;

        // No caso de materiais isotropicos, ou transversalmente isotropicos temos que ajustar um pouco,
        // A representa será mudada apenas um pouco, para evitar divisão por zero.

        //  a*x²+c*y²+2bxy
	//Usando a biblioteca gráfica:

//////////////////////////// Agora as potencias SIMPLES

//  sigmaX, colocamos o 2d
/*

2d=
+ 6 Math.pow(cos,3)*sin*Quadrado_t1 *tauXY 
- 2 Math.pow(cos,3)*sin*Quadrado_t12 *tauXY 
- 2*c*Math.pow(sin,3)  Quadrado_t1 *tauXY
\\ 
+ 2*c*Math.pow(sin,3)  Quadrado_t12 *tauXY 
- 4*c*Math.pow(sin,3)  Quadrado_t2 *tauXY 
*/

fatorRotar_d=6*Math.pow(cos,3)*sin*Quadrado_t1*tauXY 
- 2*Math.pow(cos,3)*sin*Quadrado_t12*tauXY 
- 2*cos*Math.pow(sin,3)*Quadrado_t1*tauXY
+ 2*cos*Math.pow(sin,3)*Quadrado_t12*tauXY 
- 4*cos*Math.pow(sin,3)*Quadrado_t2*tauXY;

/*


2f=
+ 2 Math.pow(cos,3)*sin*Quadrado_t12 *tauXY 
- 4 Math.pow(cos,3)*sin*Quadrado_t2 *tauXY 
- 2 Math.pow(cos,3)*sin*Quadrado_t1 *tauXY
\\
+ 6*c*Math.pow(sin,3)  Quadrado_t1 *tauXY 
- 2*c*Math.pow(sin,3)  Quadrado_t12 *tauXY 

*/

fatorRotar_f=2*Math.pow(cos,3)*sin*Quadrado_t12*tauXY 
- 4*Math.pow(cos,3)*sin*Quadrado_t2*tauXY 
- 2*Math.pow(cos,3)*sin*Quadrado_t1*tauXY
+ 6*cos*Math.pow(sin,3)*Quadrado_t1*tauXY 
- 2*cos*Math.pow(sin,3)*Quadrado_t12*tauXY;

/*

g=-1
+ 8 Math.pow(cos,2) Math.pow(sin,2) Quadrado_t1 *tauXY^{2} 
- 2 Math.pow(cos,2) Math.pow(sin,2) Quadrado_t12 *tauXY^{2} 
+ 4 Math.pow(cos,2) Math.pow(sin,2) Quadrado_t2 *tauXY^{2} 
\\
+ Math.pow(cos,4) Quadrado_t12 *tauXY^{2} 
+ Math.pow(sin,4) Quadrado_t12 *tauXY^{2}


*/

factorRotar_g=8*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t1
- 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12
+ 4*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t2
+ Math.pow(cos,4)*Quadrado_t12
+ Math.pow(sin,4)*Quadrado_t12;


        a=fatorRotar_a;
	c=fatorRotar_c;

        b=(fatorRotar_b/2);
        d=(fatorRotar_d/2);
        f=(fatorRotar_f/2);

        g=-1+factorRotar_g*(tauXY*tauXY);
}

/*
Quadrado_tc
Quadrado_tc
Quadrado_tc
Quadrado_tc
Quadrado_tc
Quadrado_tc
Quadrado_tc
Quadrado_tc
*/

function calcular_coeficientesPOSNEG(cos,sin)
{
        //  a*x²+c*y²+2bxy

//No quandrante (-,-) este valor deve ser de Tração

        Quadrado_t1=(1/SIGMA_T_1)*(1/SIGMA_T_1);

        Quadrado_tc=(1/SIGMA_C_1)*(1/SIGMA_C_1);

//No quandrante (-,-) este valor deve ser de compressão 
        Quadrado_t2=(1/SIGMA_C_2)*(1/SIGMA_C_2);
        Quadrado_t12=(1/TAU12)*(1/TAU12);

        // sigma_X^2

/*

a=
cos^{4}  t_{1}^{2} 
+ cos^{2} sin^{2} t_{12}^{2}
- cos^{2}  sin^{2} tc^{2}
+ \sigma_{x}^{2} sin^{4} t_{2}^{2} 
\\
*/

fatorRotar_a=
Math.pow(cos,4)*Quadrado_t1 //cos^{4} \sigma_{x}^{2} t_{1}^{2} 
+ Math.pow(sin,4)*Quadrado_t2 //+ \sigma_{x}^{2} sin^{4} t_{2}^{2} 
- Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_tc  //- cos^{2} \sigma_{x}^{2} sin^{2} tc^{2}
+ Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12; //+ cos^{2} \sigma_{x}^{2} sin^{2} t_{12}^{2}


        //   sigma_Y^2
/*
c=
+ cos^{4}  t_{2}^{2} 
+ cos^{2}  sin^{2} t_{12}^{2} 
- cos^{2}  sin^{2} tc^{2} 
+  sin^{4} t_{1}^{2}
*/

fatorRotar_c=
Math.pow(sin,4)*Quadrado_t1  			//+ \sigma_{y}^{2} sin^{4} t_{1}^{2}
+ Math.pow(cos,4)*Quadrado_t2 			//+ cos^{4} \sigma_{y}^{2} t_{2}^{2}  
- Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_tc 	//- cos^{2} \sigma_{y}^{2} sin^{2} tc^{2} 
+ Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12; //+ cos^{2} sin^{2} t_{12}^{2} 

        //   sigma_Y*sigma_X

/*

2b=
 + 2 cos^{2} \sigma_{x} \sigma_{y} sin^{2} t_{1}^{2}
- 2 cos^{2} \sigma_{x} \sigma_{y} sin^{2} t_{12}^{2} 
+ 2 cos^{2} \sigma_{x} \sigma_{y} sin^{2} t_{2}^{2} 
- cos^{4} \sigma_{x} \sigma_{y} tc^{2} 
- \sigma_{x} \sigma_{y} sin^{4} tc^{2} 
*/

fatorRotar_b=
- Math.pow(cos,4)*Quadrado_tc			   //- cos^{4}tc^{2} 
+ 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t1  // + 2 cos^{2}  sin^{2} t_{1}^{2}
- 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12 //- 2 cos^{2}  sin^{2} t_{12}^{2} 
- Math.pow(sin,4)*Quadrado_tc			   //- sin^{4} tc^{2} 
+ 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t2; //+ 2 cos^{2}  sin^{2} t_{2}^{2} 

        // No caso de materiais isotropicos, ou transversalmente isotropicos temos que ajustar um pouco,
        // A representa será mudada apenas um pouco, para evitar divisão por zero.

        //  a*x²+c*y²+2bxy
	//Usando a biblioteca gráfica:

//////////////////////////// Agora as potencias SIMPLES

//  sigmaX, colocamos o 2d
/*

2d=
+ 4 cos^{3} \sigma_{x} sin t_{1}^{2} \tau_{xy} 
- 2 cos^{3} \sigma_{x} sin t_{12}^{2} \tau_{xy} 
+ 2 cos^{3} \sigma_{x} sin \tau_{xy} tc^{2} 
+ 2 cos \sigma_{x} sin^{3} t_{12}^{2} \tau_{xy} 
- 4 cos \sigma_{x} sin^{3} t_{2}^{2} \tau_{xy} 
- 2 cos \sigma_{x} sin^{3} \tau_{xy} tc^{2} 
*/

fatorRotar_d=
+4*Math.pow(cos,3)*sin*Quadrado_t1*tauXY  		//+ 4 cos^{3} sin t_{1}^{2} \tau_{xy} 
+ 2*sin*Math.pow(cos,3)*Quadrado_tc*tauXY		//+ 2 cos^{3}  sin \tau_{xy} tc^{2} 
- 2*Math.pow(cos,3)*sin*Quadrado_t12*tauXY		//- 2 cos^{3} sin t_{12}^{2} \tau_{xy} 
- 2*cos*Math.pow(sin,3)*Quadrado_tc*tauXY 		//- 2 cos  sin^{3} \tau_{xy} tc^{2} 
+ 2*cos*Math.pow(sin,3)*Quadrado_t12*tauXY 		//+ 2 cos  sin^{3} t_{12}^{2} \tau_{xy} 
- 4*cos*Math.pow(sin,3)*Quadrado_t2*tauXY; 		//- 4 cos  sin^{3} t_{2}^{2} \tau_{xy} 

/*

2f=
+ 2 cos^{3} sin t_{12}^{2} \tau_{xy} 
*/

fatorRotar_f=
2*Math.pow(cos,3)*sin*Quadrado_t12*tauXY 	//+ 2 cos^{3} \sigma_{y} sin t_{12}^{2} \tau_{xy} 
- 4*Math.pow(cos,3)*sin*Quadrado_t2*tauXY	//- 4 cos^{3} \sigma_{y} sin t_{2}^{2} \tau_{xy}  
- 2*Math.pow(cos,3)*sin*Quadrado_tc*tauXY	//- 2 cos^{3} \sigma_{y} sin \tau_{xy} tc^{2} 
+ 4*cos*Math.pow(sin,3)*Quadrado_t1*tauXY	//+ 4 cos \sigma_{y} sin^{3} t_{1}^{2} \tau_{xy} 
+ 2*cos*Math.pow(sin,3)*Quadrado_tc*tauXY	//+ 2 cos \sigma_{y} sin^{3} \tau_{xy} tc^{2} 
- 2*cos*Math.pow(sin,3)*Quadrado_t12*tauXY;	//- 2 cos \sigma_{y} sin^{3} t_{12}^{2} \tau_{xy} 

/*

g=-1


*/

factorRotar_g=
4*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t1 		//+ 4 cos^{2} sin^{2} t_{1}^{2} \tau_{xy}^{2} 
+4*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_tc		//+ 4 cos^{2} sin^{2} \tau_{xy}^{2} tc^{2} 
- 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12	//- 2 cos^{2} sin^{2} t_{12}^{2} \tau_{xy}^{2}
+ 4*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t2		//+ 4 cos^{2} sin^{2} t_{2}^{2} \tau_{xy}^{2} 
+ Math.pow(cos,4)*Quadrado_t12		//+ cos^{4} t_{12}^{2} \tau_{xy}^{2} 
+ Math.pow(sin,4)*Quadrado_t12;		//+ sin^{4} t_{12}^{2} \tau_{xy}^{2}


        a=fatorRotar_a;
	c=fatorRotar_c;

        b=(fatorRotar_b/2);
        d=(fatorRotar_d/2);
        f=(fatorRotar_f/2);

        g=-1+factorRotar_g*(tauXY*tauXY);
}

function calcular_coeficientesNEGNEG(cos,sin)
{
        //  a*x²+c*y²+2bxy

//No quandrante (-,-) este valor deve ser de compressão 

        Quadrado_t1=(1/SIGMA_C_1)*(1/SIGMA_C_1);

//No quandrante (-,-) este valor deve ser de compressão 

        Quadrado_t2=(1/SIGMA_C_2)*(1/SIGMA_C_2);
        Quadrado_t12=(1/TAU12)*(1/TAU12);

        // sigma_X^2

/*

a=
+c^{4} \sigma_{x}^{2} t_{1}^{2} 
+ s^{4} \sigma_{x}^{2} t_{2}^{2} 
- c^{2} s^{2} \sigma_{x}^{2} t_{1}^{2} 
+ c^{2} s^{2} \sigma_{x}^{2} t_{12}^{2} 
\\
*/

fatorRotar_a=Math.pow(cos,4)*Quadrado_t1
+ Math.pow(sin,4)*Quadrado_t2
- Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t1 
+ Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12;


        //   sigma_Y^2
/*
c=
+ s^{4} \sigma_{y}^{2} t_{1}^{2} 
+ c^{4} \sigma_{y}^{2} t_{2}^{2} 
- c^{2} s^{2} \sigma_{y}^{2} t_{1}^{2} 
+ c^{2} s^{2} \sigma_{y}^{2} t_{12}^{2} 
*/

fatorRotar_c=Math.pow(sin,4)*Quadrado_t1 
+ Math.pow(cos,4)*Quadrado_t2 
- Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t1 
+ Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12;

        //   sigma_Y*sigma_X

/*

2b=
- c^{4} \sigma_{x} \sigma_{y} t_{1}^{2} 
+ 2 c^{2} s^{2} \sigma_{x} \sigma_{y} t_{1}^{2} 
- 2 c^{2} s^{2} \sigma_{x} \sigma_{y} t_{12}^{2}
\\
- s^{4} \sigma_{x} \sigma_{y} t_{1}^{2}  
+ 2 c^{2} s^{2} \sigma_{x} \sigma_{y} t_{2}^{2} 
*/

fatorRotar_b=- Math.pow(cos,4)*Quadrado_t1 
+ 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t1 
- 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12
- Math.pow(sin,4)*Quadrado_t1  
+ 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t2;

        // No caso de materiais isotropicos, ou transversalmente isotropicos temos que ajustar um pouco,
        // A representa será mudada apenas um pouco, para evitar divisão por zero.

        //  a*x²+c*y²+2bxy
	//Usando a biblioteca gráfica:

//////////////////////////// Agora as potencias SIMPLES

//  sigmaX, colocamos o 2d
/*

2d=
+ 6 Math.pow(cos,3)*sin*Quadrado_t1 *tauXY 
- 2 Math.pow(cos,3)*sin*Quadrado_t12 *tauXY 
- 2*c*Math.pow(sin,3)  Quadrado_t1 *tauXY
\\ 
+ 2*c*Math.pow(sin,3)  Quadrado_t12 *tauXY 
- 4*c*Math.pow(sin,3)  Quadrado_t2 *tauXY 
*/

fatorRotar_d=6*Math.pow(cos,3)*sin*Quadrado_t1*tauXY 
- 2*Math.pow(cos,3)*sin*Quadrado_t12*tauXY 
- 2*cos*Math.pow(sin,3)*Quadrado_t1*tauXY
+ 2*cos*Math.pow(sin,3)*Quadrado_t12*tauXY 
- 4*cos*Math.pow(sin,3)*Quadrado_t2*tauXY;

/*


2f=
+ 2 Math.pow(cos,3)*sin*Quadrado_t12 *tauXY 
- 4 Math.pow(cos,3)*sin*Quadrado_t2 *tauXY 
- 2 Math.pow(cos,3)*sin*Quadrado_t1 *tauXY
\\
+ 6*c*Math.pow(sin,3)  Quadrado_t1 *tauXY 
- 2*c*Math.pow(sin,3)  Quadrado_t12 *tauXY 

*/

fatorRotar_f=2*Math.pow(cos,3)*sin*Quadrado_t12*tauXY 
- 4*Math.pow(cos,3)*sin*Quadrado_t2*tauXY 
- 2*Math.pow(cos,3)*sin*Quadrado_t1*tauXY
+ 6*cos*Math.pow(sin,3)*Quadrado_t1*tauXY 
- 2*cos*Math.pow(sin,3)*Quadrado_t12*tauXY;

/*

g=-1
+ 8 Math.pow(cos,2) Math.pow(sin,2) Quadrado_t1 *tauXY^{2} 
- 2 Math.pow(cos,2) Math.pow(sin,2) Quadrado_t12 *tauXY^{2} 
+ 4 Math.pow(cos,2) Math.pow(sin,2) Quadrado_t2 *tauXY^{2} 
\\
+ Math.pow(cos,4) Quadrado_t12 *tauXY^{2} 
+ Math.pow(sin,4) Quadrado_t12 *tauXY^{2}


*/

factorRotar_g=8*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t1
- 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12
+ 4*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t2
+ Math.pow(cos,4)*Quadrado_t12
+ Math.pow(sin,4)*Quadrado_t12;


        a=fatorRotar_a;
	c=fatorRotar_c;

        b=(fatorRotar_b/2);
        d=(fatorRotar_d/2);
        f=(fatorRotar_f/2);

        g=-1+factorRotar_g*(tauXY*tauXY);
}

function calcular_coeficientesPOSPOS(cos,sin)
{
        //  a*x²+c*y²+2bxy

        Quadrado_t1=(1/SIGMA_T_1)*(1/SIGMA_T_1);
        Quadrado_t2=(1/SIGMA_T_2)*(1/SIGMA_T_2);
        Quadrado_t12=(1/TAU12)*(1/TAU12);

        // sigma_X^2

/*

a=
+c^{4} \sigma_{x}^{2} t_{1}^{2} 
+ s^{4} \sigma_{x}^{2} t_{2}^{2} 
- c^{2} s^{2} \sigma_{x}^{2} t_{1}^{2} 
+ c^{2} s^{2} \sigma_{x}^{2} t_{12}^{2} 
\\
*/

fatorRotar_a=Math.pow(cos,4)*Quadrado_t1
+ Math.pow(sin,4)*Quadrado_t2
- Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t1 
+ Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12;


        //   sigma_Y^2
/*
c=
+ s^{4} \sigma_{y}^{2} t_{1}^{2} 
+ c^{4} \sigma_{y}^{2} t_{2}^{2} 
- c^{2} s^{2} \sigma_{y}^{2} t_{1}^{2} 
+ c^{2} s^{2} \sigma_{y}^{2} t_{12}^{2} 
*/

fatorRotar_c=Math.pow(sin,4)*Quadrado_t1 
+ Math.pow(cos,4)*Quadrado_t2 
- Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t1 
+ Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12;

        //   sigma_Y*sigma_X

/*

2b=
- c^{4} \sigma_{x} \sigma_{y} t_{1}^{2} 
+ 2 c^{2} s^{2} \sigma_{x} \sigma_{y} t_{1}^{2} 
- 2 c^{2} s^{2} \sigma_{x} \sigma_{y} t_{12}^{2}
\\
- s^{4} \sigma_{x} \sigma_{y} t_{1}^{2}  
+ 2 c^{2} s^{2} \sigma_{x} \sigma_{y} t_{2}^{2} 
*/

fatorRotar_b=- Math.pow(cos,4)*Quadrado_t1 
+ 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t1 
- 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12
- Math.pow(sin,4)*Quadrado_t1  
+ 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t2;

        // No caso de materiais isotropicos, ou transversalmente isotropicos temos que ajustar um pouco,
        // A representa será mudada apenas um pouco, para evitar divisão por zero.

        //  a*x²+c*y²+2bxy
	//Usando a biblioteca gráfica:

//////////////////////////// Agora as potencias SIMPLES

//  sigmaX, colocamos o 2d
/*

2d=
+ 6 Math.pow(cos,3)*sin*Quadrado_t1 *tauXY 
- 2 Math.pow(cos,3)*sin*Quadrado_t12 *tauXY 
- 2*c*Math.pow(sin,3)  Quadrado_t1 *tauXY
\\ 
+ 2*c*Math.pow(sin,3)  Quadrado_t12 *tauXY 
- 4*c*Math.pow(sin,3)  Quadrado_t2 *tauXY 
*/

fatorRotar_d=6*Math.pow(cos,3)*sin*Quadrado_t1*tauXY 
- 2*Math.pow(cos,3)*sin*Quadrado_t12*tauXY 
- 2*cos*Math.pow(sin,3)*Quadrado_t1*tauXY
+ 2*cos*Math.pow(sin,3)*Quadrado_t12*tauXY 
- 4*cos*Math.pow(sin,3)*Quadrado_t2*tauXY;

/*


2f=
+ 2 Math.pow(cos,3)*sin*Quadrado_t12 *tauXY 
- 4 Math.pow(cos,3)*sin*Quadrado_t2 *tauXY 
- 2 Math.pow(cos,3)*sin*Quadrado_t1 *tauXY
\\
+ 6*c*Math.pow(sin,3)  Quadrado_t1 *tauXY 
- 2*c*Math.pow(sin,3)  Quadrado_t12 *tauXY 

*/

fatorRotar_f=2*Math.pow(cos,3)*sin*Quadrado_t12*tauXY 
- 4*Math.pow(cos,3)*sin*Quadrado_t2*tauXY 
- 2*Math.pow(cos,3)*sin*Quadrado_t1*tauXY
+ 6*cos*Math.pow(sin,3)*Quadrado_t1*tauXY 
- 2*cos*Math.pow(sin,3)*Quadrado_t12*tauXY;

/*

g=-1
+ 8 Math.pow(cos,2) Math.pow(sin,2) Quadrado_t1 *tauXY^{2} 
- 2 Math.pow(cos,2) Math.pow(sin,2) Quadrado_t12 *tauXY^{2} 
+ 4 Math.pow(cos,2) Math.pow(sin,2) Quadrado_t2 *tauXY^{2} 
\\
+ Math.pow(cos,4) Quadrado_t12 *tauXY^{2} 
+ Math.pow(sin,4) Quadrado_t12 *tauXY^{2}


*/

factorRotar_g=8*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t1
- 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12
+ 4*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t2
+ Math.pow(cos,4)*Quadrado_t12
+ Math.pow(sin,4)*Quadrado_t12;


        a=fatorRotar_a;
	c=fatorRotar_c;

        b=(fatorRotar_b/2);
        d=(fatorRotar_d/2);
        f=(fatorRotar_f/2);

        g=-1+factorRotar_g*(tauXY*tauXY);


}

/*


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

//alert(a+"  "+b+"  "+c+"  "+d+"  "+f+"  "+g+"  "+raioMaior+"  "+raioMaior);
//1.3869007511151055e-17  -5.7351918267680336e-18  1.3869007511151055e-17  0  0  -1  350633039.5869733  350633039.5869733
//

        // Origem

origem_x=(c*d-b*f)/(b*b-a*c);
origem_y=(a*f-b*d)/(b*b-a*c);

//alert(a+"  "+b+"  "+c+"  "+d+"  "+f+"  "+g+"  "+raioMaior+"  "+raioMenor+" rotacionado  "+rotacionado+"  origem_x "+origem_x+" origem_y "+origem_y);

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
