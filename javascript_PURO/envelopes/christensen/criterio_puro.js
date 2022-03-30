function criterio_puro(sigma_x,sigma_y,tau_xy,theta,SIGMA_T_1,SIGMA_T_2,SIGMA_C_1,SIGMA_C_2,TAU12)
{

	theta_radianos=(Math.PI/180)*theta;

	c=Math.cos(theta_radianos);
	s=Math.sin(theta_radianos);
	c2=c*c;
	s2=s*s;
	sigma_1=c2*sigma_x+s2*sigma_y+2*c*s*tau_xy;
	sigma_2=s2*sigma_x+c2*sigma_y-2*c*s*tau_xy;
	tau_12=-s*c*sigma_x+s*c*sigma_y+(c2-s2)*tau_xy;

// Dentre os critérios experimentaiso mais simples, apenas escolher conforme o sinal, 
// para determinar o caso perante o qual estamos. 
// Se o reforço não tiver fibra o melhor será ADVERTIR o cálculo.


//  Modo 1 , falha na fibra:

	var termo_inversos=(1/SIGMA_T_1)-(1/SIGMA_C_1);
	
	var termo_inversos_produtos=(1/(SIGMA_T_1*SIGMA_C_1));

	if_falha_fibra=termo_inversos*sigma_1+termo_inversos_produtos*Math.pow(sigma_1,2);

//  Modo 2 , falha na Matriz:

	var termo_inversos=(1/SIGMA_T_2)-(1/SIGMA_C_2);
	
	var termo_inversos_produtos=(1/(SIGMA_T_2*SIGMA_C_2));

	var normalizado_tau_12=tau_12/TAU12;

	if_falha_matriz=termo_inversos*sigma_2+termo_inversos_produtos*Math.pow(sigma_2,2)+normalizado_tau_12*normalizado_tau_12;

	indices=[if_falha_matriz,if_falha_fibra];
	indices.sort();

//alert(indices);
return indices[1];
}

