function criterio_puro(sigma_x,sigma_y,tau_xy,theta,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12)
{

	theta_radianos=(Math.PI/180)*theta;

	cos=Math.cos(theta_radianos);
	sin=Math.sin(theta_radianos);
	c2=cos*cos;
	s2=sin*sin;
	sigma_1=c2*sigma_x+s2*sigma_y+2*cos*sin*tau_xy;
	sigma_2=s2*sigma_x+c2*sigma_y-2*cos*sin*tau_xy;
	tau_12=-sin*cos*sigma_x+sin*cos*sigma_y+(c2-s2)*tau_xy;


// Dentre os critérios experimentaiso mais simples, apenas escolher conforme o sinal, 
// para determinar o caso perante o qual estamos. 
// Se o reforço não tiver fibra o melhor será ADVERTIR o cálculo.


if_sigma_1_MAIOR=0.0;
if_sigma_1_MENOR=0.0;
if_sigma_2_MAIOR=0.0;
if_sigma_2_MENOR=0.0;

	if(sigma_1>0) // tração na fibra
	{
		var normalizado_sigma_1=sigma_1/SIGMA_T_1;
		var normalizado_tau_12 =tau_12/TAU12;
		if_sigma_1_MAIOR=Math.pow(normalizado_sigma_1,2)+Math.pow(normalizado_tau_12,2);

//alert("sigma_1>0");

	}
	else
	{
		var normalizado_sigma_1=Math.abs(sigma_1)/SIGMA_C_1;
		if_sigma_1_MENOR=normalizado_sigma_1;
//alert("sigma_1<0");
	}


	if(sigma_2>0) //tração na matriz
	{
		var normalizado_sigma_2=sigma_2/SIGMA_T_2;
		var normalizado_tau_12 =tau_12/TAU12;
		if_sigma_2_MAIOR=Math.pow(normalizado_sigma_2,2)+Math.pow(normalizado_tau_12,2);
//alert("sigma_2>0");
	}
	else //compressão na fibra
	{
//alert("sigma_2<0");
		TAU23=TAU12;
//var TAU23=TAU12;
//alert("recebido TAU23  "+TAU23);

		var normalizado_sigma_2=sigma_2/(2*TAU23);
		var normalizado_sigma_2_c=sigma_2/SIGMA_C_2;
		var normalizado_tau_12 =tau_12/TAU12;

		var potencia=(Math.pow((SIGMA_C_2/(2*TAU23)),2)-1); 

		var complemento_especial=normalizado_sigma_2_c*potencia;

/*
alert(complemento_especial);
alert("sigma_1  "+dados_i_NOME+"  "+sigma_1);
alert("sigma_2  "+dados_i_NOME+"  "+sigma_2);
alert("tau_12  "+dados_i_NOME+"  "+tau_12);
*/
		if_sigma_2_MENOR=Math.pow(normalizado_sigma_2,2)+complemento_especial+Math.pow(normalizado_tau_12,2);
	}


//alert(if_sigma_1_MAIOR +"  "+if_sigma_1_MENOR+"  "+if_sigma_2_MAIOR+"  "+if_sigma_2_MENOR+"  ");

indices=[if_sigma_1_MAIOR,if_sigma_1_MENOR,if_sigma_2_MAIOR,if_sigma_2_MENOR];
indices.sort();

//alert(indices);
return indices[3];[0];
}

