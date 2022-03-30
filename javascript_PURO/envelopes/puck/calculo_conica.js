


var pares_pontos_x=[];	
var pares_pontos_y=[];

var minimo_x;
var maximo_x;

var minimo_y;
var maximo_y;

var eixo_sigma_x="";
var eixo_sigma_x_negativo="";

var eixo_sigma_y="";
var eixo_sigma_y_negativo="";

//criando pontos de teste

var vertices_x=[];
var vertices_y=[];



function calculo_conica(angulo,tau_xy)
{

/*Agosto16 
Primeiramente obtemos o ponto de corte dos critérios larc03#02 e larc03#03
*/

	ponto_corte_02_03=corte_02_03(angulo,tau_xy);

	ponto_corte_02_03=corte_02_03(angulo,tau_xy);

//alert("ponto_corte_02_03  "+ponto_corte_02_03[0]);

	//Vertices
//	vertices_x.push(ponto_corte_02_03[0]);
//	vertices_y.push(ponto_corte_02_03[1]);

	//com o Ponto (Larc03.03 & Larc03.02) podemos obter uma linha reta 

	ponto_corte_02_05=testando_larc02_05(angulo,tauXY,ponto_corte_02_03);

	pares_pontos_x.push(ponto_corte_02_05[0]);	
	pares_pontos_y.push(ponto_corte_02_05[1]);

//alert("ponto_corte_02_05 x "+ponto_corte_02_05[0]);alert("ponto_corte_02_05 y "+ponto_corte_02_05[1]);

	//Vertices
//	vertices_x.push(ponto_corte_02_05[0]);
//	vertices_y.push(ponto_corte_02_05[1]);

	ponto_corte_03_01=corte_03_01(angulo,tau_xy);

//alert("ponto_corte_03_01 x "+ponto_corte_03_01[0]);alert("ponto_corte_03_01 y "+ponto_corte_03_01[1]);

	//Vertices
//	vertices_x.push(ponto_corte_03_01[0]);
//	vertices_y.push(ponto_corte_03_01[1]);

	//com o Ponto (Larc03.03 & Larc03.01) podemos obter uma linha reta 
	//que será projetada sempre e quando tenha um valor unitário

	ponto_corte_01_06=testando_larc03_01(angulo,tauXY,ponto_corte_03_01);

	pares_pontos_x.push(ponto_corte_01_06[0]);	
	pares_pontos_y.push(ponto_corte_01_06[1]);

	//Vertices
//	vertices_x.push(ponto_corte_01_06[0]);
//	vertices_y.push(ponto_corte_01_06[1]);

	/*
	Desenho da GRID
	1) Grid de linha paralelas ao criterio larc03_03
	*/
	linha_larc03_03_02(angulo,tau_xy,ponto_corte_02_03,ponto_corte_03_01);

	//linha_larc03_06_01(angulo,tau_xy,ponto_corte_02_03,ponto_corte_03_01);
	//paralelas_larc03_03(angulo,tau_xy);

	/*
	Agosto14
	Colocamos os eixos
	*/
		if(angulo % 90 != 0)
		{
			colocar_eixos(angulo,tau_xy);
		}

	/*
	Finalmente é preciso construir o gráfico
	*/
/*
Outubro31
*/
	calculo_centro_grid();

	calcula_if_grid(angulo,tau_xy);

	graham_scan();

//Fechamos o gráfico
	pares_pontos_x.push(pares_pontos_x[0]);
	pares_pontos_y.push(pares_pontos_y[0]);

	escoler_maximos_minimos();
	representacao_graph_Chartist();

	link_vertices_calculo_conica(tau_xy,angulo);
}


function escoler_maximos_minimos()
{

	//maximos

	maximo_x=pares_pontos_x[0];
	maximo_y=pares_pontos_y[0];
	minimo_x=pares_pontos_x[0];
	minimo_y=pares_pontos_y[0];

	factor_janela=1.5;

	temp=minimo_x;
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
	minimo_x=temp*factor_janela;

//alert("minimo_x  "+temp);

	vertices_x.push(pares_pontos_x[temp_i]);
	vertices_y.push(pares_pontos_y[temp_i]);

	/*
	X  Maximo
	*/
	temp=maximo_x;
	temp_i=0;
	for(i=0;i<pares_pontos_x.length;i++)
	{
		if(pares_pontos_x[i]>=temp)
		{
			temp=pares_pontos_x[i];
	temp_i=i;
		}
	}
	maximo_x=temp*factor_janela;

//alert("maximo_x  "+temp);

	vertices_x.push(pares_pontos_x[temp_i]);
	vertices_y.push(pares_pontos_y[temp_i]);

	/*
	Y  Minimo
	*/
	temp=minimo_y;
	temp_i=0;
	for(i=0;i<pares_pontos_y.length;i++)
	{
		if(pares_pontos_y[i]<=temp)
		{
			temp=pares_pontos_y[i];
			temp_i=i;
		}
	}
	minimo_y=temp*factor_janela;
//alert("minimo_y  "+temp);
	vertices_x.push(pares_pontos_x[temp_i]);
	vertices_y.push(pares_pontos_y[temp_i]);

	/*
	Y  Maximo
	*/
	temp=maximo_y;
	temp_i=0;
	for(i=0;i<pares_pontos_y.length;i++)
	{
		if(pares_pontos_y[i]>=temp)
		{
			temp=pares_pontos_y[i];
	temp_i=i;
		}
	}
//alert("maximo_y  "+temp);
	maximo_y=temp*factor_janela;
	vertices_x.push(pares_pontos_x[temp_i]);
	vertices_y.push(pares_pontos_y[temp_i]);
}

/*
Outubro31
# Construimos uma grid com muitos elementos para poder calcular o IF
*/

function comparando_cada_vertice(centro_x,centro_y)
{
	distancia=[];
	for(i=0;i<pares_pontos_x.length;i++)
	{
		distancia.push(Math.sqrt(Math.pow(pares_pontos_x[i]-centro_x,2)+Math.pow(pares_pontos_y[i]-centro_y,2)));
	}

	distancia.sort();

	raio_menor=distancia[distancia.length-1];
	raio_maior=distancia[0];
//alert("raio_maior  "+raio_maior);

	numero_circulos=numero_circulos;
	numero_passos_grid=numero_passos_grid;
	passos_inter_circulos=(raio_maior+0.0)/numero_circulos;

	raio=1.0 
	for(j=0;j<numero_circulos;j++)
	{
		circulo(raio,centro_x,centro_y,numero_passos_grid);
		raio=raio+passos_inter_circulos+0.0;
	}


}
		
function circulo(raio,centro_x,centro_y,numero_passos_grid)
{

	passo_angular=(2*Math.PI+0.0)/numero_passos_grid;
	theta=0.0;	
	for(i=0;i<numero_passos_grid;i++)
	{
			temp_x=raio*Math.cos(theta)+centro_x;
			temp_y=raio*Math.sin(theta)+centro_y;
			theta=theta+passo_angular;
			pares_pontos_x.push(temp_x);
			pares_pontos_y.push(temp_y);
	}

}

function calculo_centro_grid()
{
	total_x=0.0;
	total_y=0.0;
	for(i=0;i<pares_pontos_x.length;i++)
	{
			total_x=total_x+pares_pontos_x[i];
			total_y=total_y+pares_pontos_y[i];
	}

	centro_x=(total_x+0.0)/pares_pontos_x.length;
	centro_y=(total_y+0.0)/pares_pontos_y.length;


	comparando_cada_vertice(centro_x,centro_y);

}

/*
Agosto13
Simplificação do algoritmo
Considerações gerais:

Agosto 16: usando b e coeficiente ANGULAR é possível explorar o larc03. TENTANDO cortar este com as duas retas associadas

*/

////Agosto 12

function paralelas_larc03_03(angulo,tau_xy)
{
	
	cos=Math.cos((angulo*Math.PI)/180);
	sin=Math.sin((angulo*Math.PI)/180);

	denominador=((sin*sin)/LARC03_E1-((cos*cos)/LARC03_E2)*NU12);

	numerador_b=LARC03_EPSILON_T_1-2*cos*sin*tau_xy*((1)/LARC03_E1+((1)/LARC03_E2)*NU12);

	numerador_m=-(((cos*cos)/LARC03_E1)-((sin*sin)/LARC03_E2)*NU12);

	coeficiente_angular=numerador_m/denominador;

	b=numerador_b/denominador;

	corte_eixo_x=-(b/coeficiente_angular);

	//futuro: em função deste valor lógico vemos se construímos ou não o envelope

	//analisar_larc03_03(b,coeficiente_angular,tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);

	//Construção da linha entre o PF e 1.5*corte_eixo_x

	intervalo_pf_extremo_direito=(corte_eixo_x*1.5); //(corte_eixo_x/2);

	pontos=10;

	passo=intervalo_pf_extremo_direito/pontos;

	novo_ponto=0; //corte_eixo_x;

	for(i=0;i<pontos;i++)
	{
		novo_ponto=novo_ponto+passo;
	//explicitamos a notação y=mx+b	
		x=novo_ponto;
		y=novo_ponto*coeficiente_angular+b;
		pares_pontos_x.push(x);
		pares_pontos_y.push(y);
	//colocamos o mesmo ponto em reflexo:		pares_pontos_x.push(-x);	pares_pontos_y.push(y);
	}

	//criando uma paralela da linha anterior, mas antes é preciso definir um null

	pares_pontos_x.push(null);
	pares_pontos_y.push(null);

	//criando uma paralela da linha anterior
	//criando uma paralela da linha anterior

	//Primeiramente definimos a separação entre estas paralelas, usando um valor de "passo_paralelas"

	numero_paralelas=5;

	passo_paralelas=corte_eixo_x/numero_paralelas;

	numero_pontos_linha_1=pares_pontos_x.length;


	for(j=0;j<numero_paralelas*3;j++)
	{
		for(i=0;i<numero_pontos_linha_1;i++)
		{
			pares_pontos_x.push(pares_pontos_x[i]-passo_paralelas*j);
			pares_pontos_y.push(pares_pontos_y[i]);
		}	
	}
}

/*
Agosto 13
*/

function representacao_graph_Chartist()
{

	//determinar_maximos_valores_extremos();
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

/*****/	

var text = "";

for(i=0;i<pares_pontos_x.length;i++)	
{
    text = text+'{ "x":'+pares_pontos_x[i]+' , "y":'+pares_pontos_y[i]+' },';
}
//fechando sem rabinho
    text = text+'{ "x":'+pares_pontos_x[0]+' , "y":'+pares_pontos_y[0]+' }';

/*
alert("maximo_x "+maximo_x);
alert("minimo_x "+minimo_x);
alert("maximo_y "+maximo_y);
alert("minimo_y "+minimo_y);
alert(text);
*/

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
//////////////////////////////////////////////////////////
}
/*
Agosto14
*/
function colocar_eixos(angulo,tau_xy)
{

	cos=Math.cos((angulo*Math.PI)/180);
	sin=Math.sin((angulo*Math.PI)/180);
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
}

/*
Agosto15

*/

function link_vertices_calculo_conica(tau_xy,theta)
{

	url_original=window.location.href;
	base_url= url_original.split("?");
//trocando para critérios
	url_criterios=base_url[0].replace("envelopes","criterios");	

	//alert("vertices_x.length  "+vertices_x.length);

	for(i=0;i<vertices_x.length;i++)
	{
		teste_sigma_x=vertices_x[i];
		teste_sigma_y=vertices_y[i];

		endereco=url_criterios+"?/"+angulo+"/"+laminaURL+"/00/"+teste_sigma_x+"/"+teste_sigma_y+"/"+tauXY

		funcao_if=larc03(vertices_x[i],vertices_y[i],tau_xy,theta,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);

		$("#vertice_"+i).text("("+teste_sigma_x+","+teste_sigma_y+")");//+"   valores de if[1]  "+funcao_if[1]);
		$("#vertice_"+i).attr("href",endereco);
		
	}
}


/*
Agosto15
Usando o critério será possível determinar até onde pode-se considerar este SEGMENTO de reta
*/

function analisar_larc03_03(b,coeficiente_angular,tau_xy,theta,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12)
{


	numero_passos_larc03_03=100;
//Usando como valor o corte_eixo_x/100 <----numero_passos_larc03_03 , para poder construir uma linha reta


	var x=0.0;
	var y=0.0;	

	amplificacao=1.5;

	passo=corte_eixo_x*amplificacao/numero_passos_larc03_03;

//Criando pontos mais na esquerda

	novo_ponto=corte_eixo_x;

	for(i=numero_passos_larc03_03;i>0;i--)
	{
		//explicitamos a notação y=mx+b			
		x=novo_ponto;
		y=novo_ponto*coeficiente_angular+b;
		novo_ponto=novo_ponto-passo;	
	vertices_x.push(x);
	vertices_y.push(y);

	}	

	vertices_x.push(x);
	vertices_y.push(y);

//colocando o corte com o eixo

	vertices_x.push(corte_eixo_x);
	vertices_y.push(0);

//Criando pontos mais na direita

	novo_ponto=corte_eixo_x;

	for(i=0;i<numero_passos_larc03_03;i++)
	{
		//explicitamos a notação y=mx+b			
		x=novo_ponto;
		y=novo_ponto*coeficiente_angular+b;
		novo_ponto=novo_ponto+passo;	

			vertices_x.push(x);
	vertices_y.push(y);
	}

	vertices_x.push(x);
	vertices_y.push(y);

	//visualizamos
	saida="";

//Prévio
		theta_radianos=(Math.PI/180)*theta;
		c=Math.cos(theta_radianos);
		s=Math.sin(theta_radianos);
		c2=c*c;
		s2=s*s;

	for(i=0;i<vertices_x.length;i++)
	{
		//primeiramente vemos se respeta a condição SIGMA_1>0
		sigma_1=c2*vertices_x[i]+s2*vertices_y[i]+2*c*s*tau_xy;
		sigma_2=s2*vertices_x[i]+c2*vertices_y[i]-2*c*s*tau_xy;
		if(
			(sigma_1>=0) &&
			(sigma_2>=0)
			)
		{
			funcao_if=larc03(vertices_x[i],vertices_y[i],tau_xy,theta,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);
			saida=saida+" "+vertices_x[i]+"  "+vertices_y[i]+"         "+funcao_if[1]+"\n";		
			//saida=saida+i+") "+funcao_if[0]+"  "+funcao_if[1]+"\n";		
		}

	}
	//agosto16
	alert(saida);

}

/*
Agosto16
*/

function corte_02_03(angulo,tau_xy)
{
	//Em função do coeficiente angular do larc03.02 fazemos a varredura:
	cos=Math.cos((angulo*Math.PI)/180);
	sin=Math.sin((angulo*Math.PI)/180);

	denominador=((sin*sin)/LARC03_E1-((cos*cos)/LARC03_E2)*NU12);

	numerador_b=LARC03_EPSILON_T_1-2*cos*sin*tau_xy*((1)/LARC03_E1+((1)/LARC03_E2)*NU12);

	numerador_m=-(((cos*cos)/LARC03_E1)-((sin*sin)/LARC03_E2)*NU12);

	coeficiente_angular=numerador_m/denominador;

	b=numerador_b/denominador;

	corte_eixo_x=-(b/coeficiente_angular);

//alert("corte_eixo_x  "+corte_eixo_x);

	corte_02_03_x=[];

	corte_02_03_y=[];

	/*
	Agosto 17	
	BISECTION
	INICIO: Desde o ponto de corte com o eixo
	FIM: até um ponto que pode estar mais na direita ou esquerda
	*/

	//if(coeficiente_angular>0)
			
		amplificacao=1.0;
			//INICIO
		y=corte_eixo_x*coeficiente_angular+b;
		if_inicial=larc03(corte_eixo_x,y,tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);
			//FIM
		x=corte_eixo_x*(1+amplificacao);
		y=x*coeficiente_angular+b;
		if_final=larc03(x,y,tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);

		var anterior=x;
		var novo=0.0;

		multiplicador=10.0;
		passo_reducao=(x-corte_eixo_x)/multiplicador;

		//Vemos se o INICIO e FIM representam um intervalo CONVENIENTE
		amplificacao=1.0;
			//INICIO
		y=corte_eixo_x*coeficiente_angular+b;
		if_inicial=larc03(corte_eixo_x,y,tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);
			//FIM
		x=corte_eixo_x*(1+amplificacao);
		y=x*coeficiente_angular+b;
		if_final=larc03(x,y,tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);

		var anterior=x;
		var novo=0.0;

		multiplicador=10.0;
		passo_reducao=(x-corte_eixo_x)/multiplicador;	
	

	//Usando o método numérico BISECTION

		gaurdian=1;

		do		
		{

				gaurdian_interno=1;
				while(
					(if_inicial[1]<1)&&
					(if_final[1]>1)
					)
				{			
					x=anterior-passo_reducao;
					y=x*coeficiente_angular+b;
					if_final=larc03(x,y,tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);

					//APENAS quando for maior, pode-se atualizar o anterior

					if(if_final[1]>1)
					{
						anterior=x;				
					}

					if(if_final[1]<1)
					{
						novo=x;				
					}		

					if(gaurdian_interno>1000)
			        {
			        	alert("É preciso sair do corte_02_03 com os IFS  if_inicial[1], if_inicial[1] "+if_inicial[1]+"  "+if_final[1]);
			        	break;
			        }        
        			gaurdian_interno++;	
				}
			////////////////

				x=anterior;
				y=x*coeficiente_angular+b;
				if_final=larc03(x,y,tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);		

				x=novo;
				y=x*coeficiente_angular+b;
				if_inicial=larc03(x,y,tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);

				passo_reducao=(anterior-novo)/(multiplicador*10.0);

				proximidade=Math.abs(if_inicial[1]-if_final[1]);

				if(gaurdian>1000)
			    {
			    	//alert("É preciso sair do método corte_02_03 com a proximidade  "+proximidade);
			        break;
				}        			    
        		gaurdian++;	

		} while (0.0001<proximidade);


		//Saída: Ponto (x,y)


	    var ponto = new Object();
        ponto[0] = x;
        ponto[1] = y;
/*
alert("x  "+x);
alert("y  "+y);
*/
    	return ponto;
}

////Agosto 12

function linha_larc03_03_02(angulo,tau_xy,ponto_corte_02_03,ponto_corte_03_01)
{
	
	cos=Math.cos((angulo*Math.PI)/180);
	sin=Math.sin((angulo*Math.PI)/180);

	denominador=((sin*sin)/LARC03_E1-((cos*cos)/LARC03_E2)*NU12);

	numerador_b=LARC03_EPSILON_T_1-2*cos*sin*tau_xy*((1)/LARC03_E1+((1)/LARC03_E2)*NU12);

	numerador_m=-(((cos*cos)/LARC03_E1)-((sin*sin)/LARC03_E2)*NU12);

	coeficiente_angular=numerador_m/denominador;

	b=numerador_b/denominador;

	corte_eixo_x=-(b/coeficiente_angular);

	/*

	pares_pontos_x.push(corte_eixo_x);
	pares_pontos_y.push(0);
	*/

	pares_pontos_x.push(ponto_corte_03_01[0]);
	pares_pontos_y.push(ponto_corte_03_01[1]);

	//Até o ponto de corte com o critério Larc03.02

	pares_pontos_x.push(ponto_corte_02_03[0]);
	pares_pontos_y.push(ponto_corte_02_03[1]);

	var ordenando_pares_pontos_y = pares_pontos_y.slice();

	//ordenando , de menor para maior
	ordenando_pares_pontos_y.sort();
	
}


/*
Agosto17: Cortando Larc03.02 (Tração na fibra) com 
Larc03.01 (Compressão na Matriz. Condicionada) 

Agosto18: colocando um GUARDIAN para evitar ciclos infinitos
*/

function corte_03_01(angulo,tau_xy)
{
	//Em função do coeficiente angular do larc03.02 fazemos a varredura:
	cos=Math.cos((angulo*Math.PI)/180);
	sin=Math.sin((angulo*Math.PI)/180);

	denominador=((sin*sin)/LARC03_E1-((cos*cos)/LARC03_E2)*NU12);

	numerador_b=LARC03_EPSILON_T_1-2*cos*sin*tau_xy*((1)/LARC03_E1+((1)/LARC03_E2)*NU12);

	numerador_m=-(((cos*cos)/LARC03_E1)-((sin*sin)/LARC03_E2)*NU12);

	coeficiente_angular=numerador_m/denominador;

	b=numerador_b/denominador;

	corte_eixo_x=-(b/coeficiente_angular);

	corte_02_03_x=[];

	corte_02_03_y=[];

	/*
	Agosto 17	
	BISECTION
	INICIO: Desde o ponto de corte com o eixo
	FIM: até um ponto que pode estar mais na direita ou esquerda
	*/
			
		//Vemos se o INICIO e FIM representam um intervalo CONVENIENTE
		amplificacao=1.0;
			//PONTO DE INICIO
		y=corte_eixo_x*coeficiente_angular+b;
		if_inicial=larc03(corte_eixo_x,y,tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);
			//PONTO DE FIM
		x=0; //corte_eixo_x*(1+amplificacao);
		y=x*coeficiente_angular+b;
		if_final=larc03(x,y,tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);

		var anterior=x;
		var novo=0.0;

		multiplicador=10.0;
		passo_reducao=(x-corte_eixo_x)/multiplicador;	
	
		gaurdian=0;

//alert("x  "+x);alert("y  "+y);

	//Usando o método numérico BISECTION
		do		
		{
				gaurdian_interno=1;
				while(
					(if_inicial[2]<1)&&
					(if_final[2]>1)
					)
				{			
					x=anterior-passo_reducao;
					y=x*coeficiente_angular+b;
					if_final=larc03(x,y,tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);

					//APENAS quando for maior, pode-se atualizar o anterior

					if(if_final[2]>1)
					{
						anterior=x;				
					}

					if(if_final[2]<1)
					{
						novo=x;				
					}			


					if(gaurdian_interno>1000)
			        {
			        	alert("É preciso sair do corte_02_01 com os IFS  if_inicial[1], if_inicial[1] "+if_inicial[1]+"  "+if_final[1]);
			        	break;
			        }        
        			gaurdian_interno++;
				}
			////////////////

				x=anterior;
				y=x*coeficiente_angular+b;
				if_final=larc03(x,y,tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);		

				x=novo;
				y=x*coeficiente_angular+b;
				if_inicial=larc03(x,y,tau_xy,angulo,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);

				passo_reducao=(anterior-novo)/(multiplicador*10.0);

				proximidade=Math.abs(if_inicial[2]-if_final[2]);



				//Para aqueles angulos estranhos
				if(gaurdian>1000)
			    {
			    	alert("É preciso sair do método corte_02_01 com a proximidade  "+proximidade);
			        break;
				}        			    
        		gaurdian++;	       

		} while (0.0001<proximidade);


		//Saída: Ponto (x,y)


	    var ponto = new Object();
        ponto[0] = x;
        ponto[1] = y;


//alert("x  corte_03_01 "+x);alert("y  corte_03_01 "+y);

    	return ponto;
}


/*
Nov07
Critério Puro
*/

function larc03(sigma_x,sigma_y,tau_xy,theta,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12)
{

	theta_radianos=(Math.PI/180)*theta;
	c=Math.cos(theta_radianos);
	s=Math.sin(theta_radianos);
	c2=c*c;
	s2=s*s;
	sigma_1=c2*sigma_x+s2*sigma_y+2*c*s*tau_xy;
	sigma_2=s2*sigma_x+c2*sigma_y-2*c*s*tau_xy;
	tau_12=-s*c*sigma_x+s*c*sigma_y+(c2-s2)*tau_xy;

//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################

//Modos do IF
//	Modo 1
	if_puck_modo_1=0.0;

	if (sigma_1 >= 0.0)
	{
		EPSILON_1=((sigma_1/E1)-NU12*(sigma_2/E2));
		E1_f=E1_f_entrada+0.0;
		NU12_f=NU12_f_entrada+0.0;
		m_sigF=m_sigF_entrada;
		aux4_1 = (NU12_f/E1_f)*m_sigF*sigma_2;
		aux4 = EPSILON_1 + aux4_1;
		if_puck_modo_1 = (1.0/EPSILON_T_1)*aux4;
	}


//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################

	if(sigma_2>=0)
	{
		NU21=NU12*(E2/E1);
		lambda_22=2*((1/E2)-(Math.pow(NU21,2)/E1));
		lambda_44=1/G12;

//pode-se obter apenas usando os Lambda, e os valores de (Y_T_is,S_L_is)
//caso lâmina grossa
//estes valores de SIGMA_T_2 podem se usar como uma boa aproximação
		Y_T_is=1.12*Math.sqrt(2)*SIGMA_T_2;
		S_L_is=Math.sqrt(2)*TAU12;

		g=(lambda_22/lambda_44)*Math.pow((Y_T_is/S_L_is),2);

//Melhor usar g como quociente de G  quando não for nulo	
		
//calculo dos termos o IF2
		termo_sigma_2=(1-g)*(sigma_2/Y_T_is);
		termo_sigma_2_QUADRADO=g*Math.pow(sigma_2/Y_T_is,2);
		termo_tau_12_QUADRADO=Math.pow(tau_12/S_L_is,2);

		if_larc_03_tracao_matriz=termo_sigma_2+termo_sigma_2_QUADRADO+termo_tau_12_QUADRADO;
	}


//  Modo 2 
	if_puck_modo_2=0.0;
	if (sigma_1 < 0.0)
	{
		EPSILON_1=((sigma_1/E1)-NU12*(sigma_2/E2));
		E1_f=E1_f_entrada+1.0;
		m_sigF=m_sigF_entrada+0.0;
		NU12_f=NU12_f_entrada+0.0;
		aux5_1 = (NU12_f/E1_f)*m_sigF*sigma_2;
		aux5_2 = EPSILON_1 + aux5_1;
		aux5 = (1.0/EPSILON_C_1)*Math.abs(aux5_2);
		aux6 = Math.pow(10*GAMMA12,2);
		if_puck_modo_2 = aux5 + aux6;

if(refinamento=="bici")
{
//	alert("if_puck_modo_2  "+if_puck_modo_2);
}

	}

//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################

//Modo 3 ,
	if_puck_modo_3=0.0;
	if (sigma_2 >= 0.0)
	{
		p_plus_TL=p_plus_TL_entrada+0.0;
		sigma_1_D=sigma_1_D_entrada+0.0;
		aux7_1 = tau_12/TAU12;
		aux7 = Math.pow(aux7_1, 2);
		aux8_1 = p_plus_TL*(SIGMA_T_2/TAU12);
		aux8_2 = Math.pow(1 - aux8_1, 2);
		aux8_3_1 = sigma_2/SIGMA_T_2;
		aux8_3 = Math.pow(aux8_3_1, 2);
		aux8 = aux8_2*aux8_3;
		raiz= Math.sqrt( aux7 + aux8 );
		aux0_1 = tau_12/TAU12;
		aux0=p_plus_TL*aux0_1;
		termo_fibra=Math.abs(sigma_1/sigma_1_D);
		if_puck_modo_3=aux0+raiz;
	}

//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################

//	Modo 4 if_puck_modo_4
	if_puck_modo_4=0.0;
	if_puck_modo_5=0.0;

	if (sigma_2 < 0.0)
	{
		p_plus_TL=p_plus_TL_entrada+0.0;
		sigma_1_D=sigma_1_D_entrada+0.0;
		tau12_C=tau12_C_entrada+0.0;
		R_TT_A=R_TT_A_entrada;
		t = Math.abs(sigma_2/TAU12);
		t_maior = R_TT_A/Math.abs(tau12_C);
		if((t >= 0) && (t <= t_maior))
		{
			p_minus_TL=p_minus_TT_entrada+0.0;
			sigma_1_D=sigma_1_D_entrada+0.0;
			aux7_1 = tau_12;
			aux7 = Math.pow(aux7_1, 2);
			aux8_1 = p_minus_TL*SIGMA_T_2;
			aux8_2 = Math.pow(aux8_1, 2);
			raiz=Math.sqrt(aux7+aux8_2);
			aux0_1=raiz+p_minus_TL;
			aux0=aux0_1/TAU12;				
			termo_fibra=Math.abs(sigma_1/sigma_1_D);
			if_puck_modo_4=termo_fibra+aux0;
		}

//Modo 5, Compressão na Fibra, Depende do valor de fi
		t_INV = Math.abs(TAU12/sigma_2);
		t_maior_INV = Math.abs(tau12_C)/R_TT_A;
		if((t_INV >= 0) && (t <= t_maior_INV))
		{
			p_minus_TT=p_minus_TT_entrada+0.0;
			sigma_1_D=sigma_1_D_entrada+0.0;
			aux12_1 = 2*(1 + p_minus_TT)*tau12_C;
			aux12_2 = tau_12/aux12_1;
			aux12 = Math.pow(aux12_2,2);
			aux13_1 = sigma_2/SIGMA_C_2;
			aux13 = Math.pow(aux13_1,2);
			aux14_1 = SIGMA_C_2/(-sigma_2);
			aux14 = aux14_1*( aux12 + aux13);
			termo_fibra=Math.abs(sigma_1/sigma_1_D);
			if_puck_modo_5=termo_fibra+aux14;
		}
	}


//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################

	//entrega de resultados
	var IFs = new Object();

        IFs[0] = if_puck_modo_1;

	if(refinamento!="bici")
	{
        	IFs[1] = if_larc_03_tracao_matriz;//if_puck_modo_2
	}
	else
	{
        	IFs[1] = if_puck_modo_2;
	}

	IFs[1] = if_larc_03_tracao_matriz;

        IFs[2] = if_puck_modo_3; 
        IFs[3] = if_puck_modo_4;
        IFs[4] = if_puck_modo_5;

    return IFs;
}


/*
Agosto 18 

Em tesse deveria ser uma curva que:
1) Parte do ponto de interseção entre a RETA do Larc03.03 com Larc03.01
2) Chega até um ponto para se UNIR com Larc03.06

Mas pode se tratar inicialmente como uma linha RETA

*/
function testando_larc03_01(theta,tau_xy,ponto)
{

	//Prévio
		theta_radianos=(Math.PI/180)*theta;
		c=Math.cos(theta_radianos);
		s=Math.sin(theta_radianos);
		c2=c*c;
		s2=s*s;

	coeficiente_angular=-(s2/c2);
	//Usando a formula COEFICIENTE_ANGULAR com Ponto 
	x_0=ponto[0];
	y_0=ponto[1];

	b=-coeficiente_angular*x_0+y_0;	

	//agosto18 usando um método mais simples que o BISECTION, temos
	
	if_inicial=larc03(x_0,y_0,tau_xy,theta,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);
	if_larc_03_compressao_matriz_larc0301=if_inicial[2]; 

	x=x_0;
	y=y_0;

	passo=Math.abs(x_0/10);

	saida="";

	guardian=1;
	while(Math.abs(1-if_larc_03_compressao_matriz_larc0301)<0.01)
	{
		x=x-passo;
		y=coeficiente_angular*x+b;

		if_inicial=larc03(x,y,tau_xy,theta,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);
		if_larc_03_compressao_matriz_larc0301=if_inicial[2];

		if(guardian>1000)
		{
			//alert("vemos o larc03.01  "+if_inicial[2]); 
			break;
		}
		guardian++;
		saida=saida+"  "+if_inicial[2];
	}	

	var ponto = new Object();
    ponto[0] = x;
    ponto[1] = y;

//alert("x  "+x); alert("y  "+y); 
    return ponto;
}

/*
Domingo 19 de Agosto
*/

function testando_larc02_05(theta,tau_xy,ponto)
{

	//Prévio
		theta_radianos=(Math.PI/180)*theta;
		c=Math.cos(theta_radianos);
		s=Math.sin(theta_radianos);
		c2=c*c;
		s2=s*s;

	coeficiente_angular=-(s2/c2);
	//Usando a formula COEFICIENTE_ANGULAR com Ponto 
	x_0=ponto[0];
	y_0=ponto[1];

	b=-coeficiente_angular*x_0+y_0;	

	//agosto18 usando um método mais simples que o BISECTION, temos
	
	if_inicial=larc03(x_0,y_0,tau_xy,theta,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);
	if_larc_03_compressao_matriz_larc0302=if_inicial[1];

	x=x_0;
	y=y_0;

	passo=Math.abs(x_0/10);

	saida="";

	guardian=1;
	while(Math.abs(1-if_larc_03_compressao_matriz_larc0302)<0.01)
	{
		x=x-passo;
		y=coeficiente_angular*x+b;

		if_inicial=larc03(x,y,tau_xy,theta,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);
		if_larc_03_compressao_matriz_larc0302=if_inicial[1];

		if(guardian>1000)
		{
			//alert("vemos o larc03.02  "+if_inicial[1]); 
			break;
		}
		guardian++;
		saida=saida+"  "+if_inicial[3];
	}



	var ponto = new Object();
    ponto[0] = x;
    ponto[1] = y;
    return ponto;
}

/*
Nov07
*/

var refinamento="";

function calcula_if_grid(theta,tau_xy)
{
	grid_x_if_unitario=[];
	grid_y_if_unitario=[];
	tolerancia=0.1;

//alert("INICIO Nov07 pares_pontos_x  "+pares_pontos_x.length);

	for(j=0;j<pares_pontos_x.length;j++)
	{
		x=pares_pontos_x[j];
		y=pares_pontos_y[j];
		refinamento="bici";
		IF=larc03(x,y,tau_xy,theta,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12);

		if(IF[0]<=(1+tolerancia))
		{
			if(IF[1]<=(1+tolerancia))
			{
				if(IF[2]<=(1+tolerancia))
				{
					if(IF[3]<=(1+tolerancia))
					{
						if(IF[4]<=(1+tolerancia))
						{
							unitario=0
							if(IF[0]>=(1-tolerancia))
							{
								unitario=1
							}
							if(IF[1]>=(1-tolerancia))
							{
								unitario=1
							}
							if(IF[2]>=(1-tolerancia))
							{
								unitario=1
							}
							if(IF[3]>=(1-tolerancia))
							{
								unitario=1
							}
							if(IF[4]>=(1-tolerancia))
							{
								unitario=1
							}

							if(unitario==1)
							{
								grid_x_if_unitario.push(pares_pontos_x[j])
								grid_y_if_unitario.push(pares_pontos_y[j])

							}					
						}
					}
				}
			}
		}
	}



	pares_pontos_x=[];
	pares_pontos_y=[];


	for(k=0;k<grid_x_if_unitario.length;k++)
	{
		pares_pontos_x.push(grid_x_if_unitario[k]);
		pares_pontos_y.push(grid_y_if_unitario[k]);
	}

}
/*
Outubro31
Coletar
*/
	

function graham_scan()
{
/*
	pares_pontos_x=[]; 	pares_pontos_y=[];

	pares_pontos_x.push(4.0); 	pares_pontos_y.push(2.0);
	pares_pontos_x.push(0.0); 	pares_pontos_y.push(0.0);
	pares_pontos_x.push(7.0); 	pares_pontos_y.push(2.0);
	pares_pontos_x.push(7.5); 	pares_pontos_y.push(3.0);
	pares_pontos_x.push(8.0); 	pares_pontos_y.push(2.5);
	pares_pontos_x.push(10.0); 	pares_pontos_y.push(-1.0);
	pares_pontos_x.push(8.0); 	pares_pontos_y.push(1.0);
*/
	copiados_x = pares_pontos_x.slice();
	copiados_y = pares_pontos_y.slice();

        // Passo 1 : obter o que está na parte mais infeior do eixo Y
	pontos_ordenados_x=[];
	pontos_ordenados_y=[];

	menor_x_list=[];
	menor_y_list=[];

// Na verdade é um duplo ordenamento DISSIMULADO
// Neste primeiro FOR fazemos o ordenamento apenas para X
//Escolhe o Y que estiver na posição mais inferior

        tamanho_inicial=copiados_y.length;

        for(j=0;j<tamanho_inicial;j++)
        {
            menor_x=copiados_x[0];
            menor_y=copiados_y[0];
            indice=0;

            for(i=0;i<copiados_y.length;i++)
            {
                if(menor_y>=copiados_y[i])
                {
                    menor_y=copiados_y[i];
                    menor_x=copiados_x[i];
                    indice=i;
                    //desempate no caso de ter a mesma Y, será usado o ponto com menor X
                }
            }
            menor_x_list.push(menor_x);
            menor_y_list.push(menor_y);
		copiados_x.splice(indice,1);
		copiados_y.splice(indice,1);
        }


        //Agora escolhemos o menor valor de Y e se este tiver multiplicidade acima de um será preciso ordenar
        menor_x=menor_x_list[0];
        menor_y=menor_y_list[0];


        multiplicidade=0;

        for(i=1;i<menor_y_list.length;i++)
        {
            if(menor_y==menor_y_list[i])
            {
                multiplicidade=multiplicidade+1;
            }
        }


        if(multiplicidade>0)
        {
            // Sera preciso ordenar em X
            menor_x=menor_x_list[0];
            menor_y=menor_y_list[0];
            indice=0;
            for(i=0;i<menor_x_list.length;i++)
            {

                if(menor_x>=menor_x_list[i])
                {
                    menor_x=menor_x_list[i];
                    menor_y=menor_y_list[i];
                    indice=i;
                }
            }
        }
        pontos_ordenados_x.push(menor_x);
        pontos_ordenados_y.push(menor_y);

//# Passo 2 : ordenamos os pontos conforme o ângulo usando ARC TAN(x)

        //copiamos de NOVO dado que foi destruido
	copiados_x = pares_pontos_x.slice();
	copiados_y = pares_pontos_y.slice();

        indice_apagar=0;

	angulos=[];

        for(i=0;i<copiados_x.length;i++)
        {
            delta_x=(copiados_x[i]-menor_x)+0.0;
            delta_y=(copiados_y[i]-menor_y)+0.0;
            if(delta_x!=0.0)
            {
                angulos.push(Math.atan(delta_y/delta_x));
            }
            else
            {
                if(delta_y==0.0)
                {
                    indice_apagar=i;
                }
                else
                {
                    angulos.push(Math.PI/2.0);
                }
            }
        }
	copiados_x.splice(indice_apagar,1);
	copiados_y.splice(indice_apagar,1);

//com os ângulos pode-se ordenar
//resrevamos os ângulos para verificar a qualidade do Algoritmo
	angulo_ordenado=[];

        tamanho_inicial=angulos.length;

        for(j=0;j<tamanho_inicial;j++)
        {
            menor_angulo=angulos[0];
            x_menor_angulo=copiados_x[0];
            y_menor_angulo=copiados_y[0];
            indice=0;
            for(i=0;i<angulos.length;i++)
            {
                if(menor_angulo>=angulos[i])
                {
                    menor_angulo=angulos[i];
                    x_menor_angulo=copiados_x[i];
                    y_menor_angulo=copiados_y[i];
                    indice=i;
                }
            }
            copiados_x.splice(indice,1);
            copiados_y.splice(indice,1);
            angulos.splice(indice,1);

            angulo_ordenado.push(menor_angulo);
            pontos_ordenados_x.push(x_menor_angulo);
            pontos_ordenados_y.push(y_menor_angulo);
        }


        // Agora ver se de verdade é uma ENVOLVENTE
	stack_x=[];
	stack_y=[];

// Para 0
        stack_x.push(pontos_ordenados_x[0]);
        stack_y.push(pontos_ordenados_y[0]);
//Para 1
        stack_x.push(pontos_ordenados_x[0]);
        stack_y.push(pontos_ordenados_y[1]);



// Em tese deveria meter todos os pontos, mas é preciso ter cuidado com aqueles que estejam MUITO ADENTRO
 	for(i=2;i<pontos_ordenados_x.length;i++)
	{
		proximoTOP=stack_x.length-2;
		TOP=stack_x.length-1;
		//alert("indice "+i);
		o=ccw(stack_x[proximoTOP],stack_x[TOP],pontos_ordenados_x[i],stack_y[proximoTOP],stack_y[TOP],pontos_ordenados_y[i]);


		if(o==0.0)
		{ 
			// Caso extremo que TODOS estejam numa única linha reta
			stack_x.pop();
			stack_y.pop();

			stack_x.push(pontos_ordenados_x[i]);
			stack_y.push(pontos_ordenados_y[i]);
		}
		else
		{ 
			if(o>0.0)
			{
				// aceita positivos
				stack_x.push(pontos_ordenados_x[i]);
				stack_y.push(pontos_ordenados_y[i]);				

			}
			else
			{
				//# Nos negatiovos, ele deve REMOVER o ponto
				while((o<=0.0) && (proximoTOP>=0.0))
				{
					stack_x.pop(); //# elimina o topo da filha ou elemento C do teste
					stack_y.pop();
					proximoTOP=stack_x.length-2;
					TOP=stack_x.length-1;
					o=ccw(stack_x[proximoTOP],stack_x[TOP],pontos_ordenados_x[i],stack_y[proximoTOP],stack_y[TOP],pontos_ordenados_y[i]);

				}
				stack_x.push(pontos_ordenados_x[i]);
				stack_y.push(pontos_ordenados_y[i]);
			}
		}
	}


	pares_pontos_x=[];
	pares_pontos_y=[];
//	alert("angulo_ordenado  "+angulo_ordenado);
	for(i=0;i<stack_x.length;i++)
	{
		pares_pontos_x.push(stack_x[i]);
		pares_pontos_y.push(stack_y[i]);
	}
////
}


/*
#Return a  positive number for a left turn (ACEITA)
# and negative for a right turn (elimina)
*/
function ccw(p1_x, p2_x, p3_x,p1_y, p2_y, p3_y)
{
	//total=(p2_x+0.0 - p1_x)*(p3_y+0.0 - p1_y) - (p2_y+0.0 - p1_y)*(p3_x+0.0 - p1_x);
	//alert(" Testando com:" + p1_x+" "+p2_x+" "+p3_x+" result   "+total);	
	return (p2_x+0.0 - p1_x)*(p3_y+0.0 - p1_y) - (p2_y+0.0 - p1_y)*(p3_x+0.0 - p1_x);
}


