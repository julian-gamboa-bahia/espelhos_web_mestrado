/*


*/


btn_direito.onclick = function() {
	var meu_iframe = document.getElementById('meu_iframe');

//chamando desde a TELA manualmente
	if (window.location.href.indexOf('?') == -1)
	{
		//alert("//chamando desde a TELA manualmente criterio"+criterio);
		criterioNOME=ARRAYcriterioNOME[criterio];

			if(angulo_theta==undefined)
			{
				angulo_theta=0.0;
			}

			if(entrada_sigma_x==undefined)
			{
				entrada_sigma_x=0.0;
			}

			if(entrada_sigma_y==undefined)
			{
				entrada_sigma_y=0.0;
			}

			if(entrada_tau_xy==undefined)
			{
				entrada_tau_xy=0.0;
			}

			if (window.location.href.indexOf('index.htm') > -1)
			{
				base_url=window.location.href.replace("index.htm", "");
			}
			else
			{
				base_url=window.location.href;
			}

/*
Uso da matriz Q
*/
		if(
		($("#entrada_theta").val().length!=0) & 
		($("#deformacoes_epsilon_x").val().length!=0) & 
		($("#deformacoes_epsilon_y").val().length!=0) & 
		($("#deformacoes_gamma_xy").val().length!=0) &
		$('#checkbox_deformacoes').is(':checked')
		)
		{
			alert("Transformando as deformações em esforços, usando a matriz Q");

			theta=$("#entrada_theta").val();
			theta_radianos=(Math.PI/180)*theta;

			c=Math.cos(theta_radianos);
			s=Math.sin(theta_radianos);

			epsilon_x=$("#deformacoes_epsilon_x").val();
			epsilon_y=$("#deformacoes_epsilon_y").val();
			gamma_xy=$("#deformacoes_gamma_xy").val();


NU21=NU12*(E2/E1);

/*
\frac{1}{v_{12} v_{21} - 1} 
- \frac{1}{v_{12} v_{21} - 1}
- \frac{1}{v_{12} v_{21} - 1} 

*/

sigma_x=(1/(NU12*NU21-1))*(c*gamma_xy*s*(-E1*(c*c + s*s*NU21) + E2*(c*c*NU12 + s*s) + 2*G12*(c*c - s*s)*(NU12*NU21 - 1)) 
	-epsilon_x*(E1*c*c*(c*c + s*s*NU21) + E2*s*s*(c*c*NU12 + s*s) +4*G12*c*c*s*s*(NU12*NU21 - 1)) 
	-epsilon_y*(E1*s*s*(c*c + s*s*NU21) + E2*c*c*(c*c*NU12 + s*s) -4*G12*c*c*s*s*(NU12*NU21 - 1)));

sigma_y=(-1/(NU12*NU21-1))*(c*gamma_xy*s*(E1*(c*c*NU21 + s*s) - E2*(c*c + s*s*NU12) + 2*G12*(c*c - s*s)*(NU12*NU21 - 1)) 
	+ epsilon_x*(E1*c*c*(c*c*NU21 + s*s) + E2*s*s*(c*c + s*s*NU12) - 4*G12*c*c*s*s*(NU12*NU21 - 1)) 
	+ epsilon_y*(E1*s*s*(c*c*NU21 + s*s) + E2*c*c*(c*c + s*s*NU12) + 4*G12*c*c*s*s*(NU12*NU21 - 1)));

tau_xy=(-1/(NU12*NU21-1))*(c*epsilon_x*s*(E1*c*c*(NU21 - 1) - E2*s*s*(NU12- 1) + 2*G12*(c*c - s*s)*(NU12*NU21 - 1)) 
	- c*epsilon_y*s*(-E1*s*s*(NU21 - 1) + E2*c*c*(NU12 - 1) + 2*G12*(c*c - s*s)*(NU12*NU21 - 1)) 
	+ gamma_xy*(E1*c*c*s*s*(NU21 - 1) + E2*c*c*s*s*(NU12 - 1) - G12*Math.pow((c*c - s*s),2)*(NU12*NU21 - 1)));


/*
			epsilon_1=sigma_x*(S_11*c*c + S_12*s*s) + sigma_y*(S_11*s*s + S_12*c*c) + tau_xy*(2*S_11*c*s - 2*S_12*c*s);
			epsilon_2=sigma_x*(S_12*c*c + S_22*s*s) + sigma_y*(S_12*s*s + S_22*c*c) + tau_xy*(2*S_12*c*s - 2*S_22*c*s);
			gamma_12=- S_66*c*s*sigma_x + S_66*c*s*sigma_y + S_66*tau_xy*(c*c - s*s);

			$("#deformacoes_epsilon_x").val(epsilon_1);
			$("#deformacoes_epsilon_y").val(epsilon_2);
			$("#deformacoes_gamma_xy").val(gamma_12);

*/

//após transformar e USAR colocamos na tela

			//$("#entrada_sigma_y").val(sigma_x);
			//$("#entrada_sigma_x").val(sigma_y);
			//$("#entrada_tau_xy").val(tau_xy);


			entrada_sigma_x=sigma_x;
			entrada_sigma_y=sigma_y;
			entrada_tau_xy=tau_xy;
		}
		else
		{
// Colocando primeiramente as deformações, 
// e voltando para esforços, Ele atualiza na tela
		}

		completo_url=base_url+"criterios/"+criterioNOME+".htm?/"+angulo_theta+"/"+lamina+"/00/"+entrada_sigma_x+"/"+entrada_sigma_y+"/"+entrada_tau_xy+"/0/";

		completo_url_envelopes=base_url+"envelopes/"+criterioNOME+".htm?/"+angulo_theta+"/"+lamina+"/00/"+entrada_sigma_x+"/"+entrada_sigma_y+"/"+entrada_tau_xy+"/0/";

//Invocamos o Envelope

		meu_iframe.src=completo_url_envelopes; 

		document.getElementById("url").innerHTML ="Critério <a href=\""+completo_url+"\" target=\"_black\">"+completo_url+"</a><br> Envelope:  <a href=\""+completo_url_envelopes+"\" target=\"_black\">"+completo_url_envelopes+"</a><br><br>";
		modal.style.display = "block";
	}
// No caso de que já tivese algumas informações previas, FAZ o chamado modal de forma imediata
	else 
	{

		ativar_modal(alteracao_local);  //chamado previo, sem alteracao de tela
	}
}

/*

*/
