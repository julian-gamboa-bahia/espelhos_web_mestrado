function filtro_calculo_conica_TRACAO_MATRIZ(angulo,tau_xy)
{
//Transformando para coordenadas LOCAIS

        var pares_pontos_locais_1=[];
	var pares_pontos_locais_2=[];
	var pares_pontos_locais_12=[];

	theta_radianos=(Math.PI/180)*angulo;

	cos=Math.cos(theta_radianos);
	sin=Math.sin(theta_radianos);
	c2=cos*cos;
	s2=sin*sin;

	for(i=0;i<pares_pontos_x.length;i++)
	{
		pares_pontos_locais_1[i]=c2*pares_pontos_x[i]+s2*pares_pontos_y[i]+2*cos*sin*tau_xy;
		pares_pontos_locais_2[i]=s2*pares_pontos_x[i]+c2*pares_pontos_y[i]-2*cos*sin*tau_xy;
		pares_pontos_locais_12[i]=-sin*cos*pares_pontos_x[i]+sin*cos*pares_pontos_y[i]+(c2-s2)*tau_xy;
	}

//Filtragem em coordenadas locais

//  Para valores de X
/*

		for(i=0;i<pares_pontos_locais_1.length;i++)
		{
			if(pares_pontos_locais_1[i]<0.0)
			{
				pares_pontos_locais_1[i]="null";
				pares_pontos_locais_2[i]="null";
				pares_pontos_locais_12[i]="null";
			}
		}
*/
//   Para valores de Y

		for(i=0;i<pares_pontos_locais_2.length;i++)
		{
			if(pares_pontos_locais_2[i]<0.0)
			{
				pares_pontos_locais_1[i]="null";
				pares_pontos_locais_2[i]="null";
				pares_pontos_locais_12[i]="null";
			}
		}

//alert(pares_pontos_x);
//Eliminas os null antes
		//Para x
			var indexes = getAllIndexes(pares_pontos_locais_1, "null");

			for (i=0; i<indexes.length; i++) 
			{
			    var index = pares_pontos_locais_1.indexOf("null");
			    pares_pontos_locais_1.splice(index, 1);
			}
		//Para y
			var indexes = getAllIndexes(pares_pontos_locais_2, "null");

			for (i=0; i<indexes.length; i++) 
			{
			    var index = pares_pontos_locais_2.indexOf("null");
			    pares_pontos_locais_2.splice(index, 1);
			}
		//para tauxy

			var indexes = getAllIndexes(pares_pontos_locais_12, "null");

			for (i=0; i<indexes.length; i++) 
			{
			    var index = pares_pontos_locais_12.indexOf("null");
			    pares_pontos_locais_12.splice(index, 1);
			}

//Zeramos para poder encher de novo
	pares_pontos_x=[];
	pares_pontos_y=[];
//teste
	pares_pontos_xy=[];

//	alert(pares_pontos_x.length);
//	alert(pares_pontos_y.length);

	for(i=0;i<pares_pontos_locais_1.length;i++)
	{
		pares_pontos_x[i]=c2*pares_pontos_locais_1[i]+s2*pares_pontos_locais_2[i]-2*cos*sin*pares_pontos_locais_12[i];
		pares_pontos_y[i]=s2*pares_pontos_locais_1[i]+c2*pares_pontos_locais_2[i]+2*cos*sin*pares_pontos_locais_12[i];
		pares_pontos_xy[i]=sin*cos*pares_pontos_locais_1[i]-sin*cos*pares_pontos_locais_2[i]+(c2-s2)*pares_pontos_locais_12[i];
	}


//////fim da função 
}

