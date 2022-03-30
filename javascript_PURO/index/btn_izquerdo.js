/*


*/


btn_izquerdo.onclick = function() {
	var meu_iframe = document.getElementById('meu_iframe');

if (window.location.href.indexOf('?') == -1)
{
//	alert("btn_izquerdo indexOf");
}

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
//		($("#entrada_theta").val().length!=0) & 
		($("#deformacoes_epsilon_x").val().length!=0) & 
		($("#deformacoes_epsilon_y").val().length!=0) & 
		($("#deformacoes_gamma_xy").val().length!=0) &
		$('#checkbox_deformacoes').is(':checked')
		)
		{


			theta=$("#entrada_theta").val();
			theta_radianos=(Math.PI/180)*theta;

			c=Math.cos(theta_radianos);
			s=Math.sin(theta_radianos);

			epsilon_x=$("#deformacoes_epsilon_x").val();
			epsilon_y=$("#deformacoes_epsilon_y").val();
			gamma_xy=$("#deformacoes_gamma_xy").val();


//Aqui é preciso usar a matriz S
		var valores_Q=[]
	
		valores_Q=obter_elementos_Q_barra(angulo_theta);


		var Q11=valores_Q[0];
		var Q12=valores_Q[1];
		var Q22=valores_Q[2];
		var Q66=valores_Q[3];

		var Q16=valores_Q[4];
		var Q26=valores_Q[5];

alert("Transformando as deformações em esforços. Usando a matriz Q");	

		sigma_x=Q11*epsilon_x+Q12*epsilon_y+Q16*gamma_xy;
		sigma_y=Q12*epsilon_x+Q22*epsilon_y+Q26*gamma_xy;
		tau_xy=Q16*epsilon_x+Q26*epsilon_y+Q66*gamma_xy;

//Disponibilizamos como entrada 
		alert("sigma_x  "+sigma_x);
		alert("sigma_y  "+sigma_y);
		alert("tau_xy  "+tau_xy);

		$("#entrada_sigma_x").val(sigma_x);
		$("#entrada_sigma_y").val(sigma_y);
		$("#entrada_tau_xy").val(tau_xy);


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
		meu_iframe.src=completo_url; 
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

function transformar_esforcos_deformacoes(angulo)
{
//Agora CALCULAMOS e colocamos os valores das deformações desta lâmina, usando a matriz S, 
// esta calculo é feito só se estiver ESFORÇOC colocados
		alert("Transformando os esforços indicados em deformações");

	if($("#entrada_sigma_x").val().length==0)
	{
		$("#entrada_sigma_x").val(0.0);
	}

	if($("#entrada_sigma_y").val().length==0)
	{
		$("#entrada_sigma_y").val(0.0);
	}

	if($("#entrada_tau_xy").val().length==0)
	{
		$("#entrada_tau_xy").val(0.0);
	}

//alert(NU12);

		if(
		($("#entrada_sigma_x").val().length!=0) & ($("#entrada_sigma_y").val().length!=0) & ($("#entrada_tau_xy").val().length!=0)
		)
		{
			theta=$("#entrada_theta").val();
			theta_radianos=(Math.PI/180)*theta;

			c=Math.cos(theta_radianos);
			s=Math.sin(theta_radianos);
	
	
			sigma_x=$("#entrada_sigma_x").val();
			sigma_y=$("#entrada_sigma_y").val();
			tau_xy=$("#entrada_tau_xy").val();


//Aqui é preciso usar a matriz S
		var valores_S=[]
		valores_S=obter_elementos_S_barra(angulo);

		var S11=valores_S[0];
		var S12=valores_S[1];
		var S22=valores_S[2];
		var S66=valores_S[3];

		var S16=valores_S[4];
		var S26=valores_S[5];

			epsilon_x=S11*sigma_x+S12*sigma_y+S16*tau_xy;
			epsilon_y=S12*sigma_x+S22*sigma_y+S26*tau_xy;
			gamma_xy=S16*sigma_x+S26*sigma_y+S66*tau_xy;


			$("#deformacoes_epsilon_x").val(epsilon_x);
			$("#deformacoes_epsilon_y").val(epsilon_y);
			$("#deformacoes_gamma_xy").val(gamma_xy);

		}
		else
		{
			alert("por favor indique as deformações");
		}


}

//////


function obter_elementos_S_barra(angulo)
{
       	theta_radianos = (Math.PI / 180) * angulo;
        c = Math.cos(theta_radianos);
        s = Math.sin(theta_radianos);

        S11=1/E1;
        S12=-(NU12/E1);
        S22=1/E2;
        S66=1/G12;

        S11_barra=0.0+(Math.pow(c,4))*S11+ (Math.pow(s,4))*S22 + (Math.pow(c,2))*(Math.pow(s,2))*(2*S12 + S66);
        S12_barra=0.0+(Math.pow(c,4) + Math.pow(s,4))*S12 + (Math.pow(c,2))*(Math.pow(s,2))*(S11 + S22 -S66);
        S22_barra=0.0+(Math.pow(s,4))*S11 + (Math.pow(c,2))*(Math.pow(s,2))*(2*S12 + S66) + (Math.pow(c,4))*S22;
        S66_barra=0.0+2*(Math.pow(c,2))*(Math.pow(s,2))*(2*S11 + 2*S22 - 4*S12 - S66) + (Math.pow(c,4) + Math.pow(s,4))*S66;

        S16_barra=0.0+(Math.pow(c,3))*s*(2*S11 - 2*S12 - S66) - c*(Math.pow(s,3))*(2*S22 - 2*S12 -S66);
        S26_barra=0.0+c*(Math.pow(s,3))*(2*S11 - 2*S12 - S66) - s*(Math.pow(c,3))*(2*S22 - 2*S12 - S66);

	saidaSbar=[];

	saidaSbar.push(S11_barra);
	saidaSbar.push(S12_barra);
	saidaSbar.push(S22_barra);
	saidaSbar.push(S66_barra);

	saidaSbar.push(S16_barra);
	saidaSbar.push(S26_barra);

	return saidaSbar;

}

/*
Maio 08
*/

function obter_elementos_Q_barra(angulo)
{
       var theta_radianos = (Math.PI / 180) * angulo;
        var c = Math.cos(theta_radianos);
        var s = Math.sin(theta_radianos);

        var NU21=NU12*(E2/E1);

        var Q11=E1/(1-NU21*NU12);
        var Q12=(NU12*E2)/(1-NU21*NU12);
        var Q22=E2/(1-NU21*NU12);
        var Q66=0.0+G12;
/*
alert("Q11   "+Q11);
alert("Q12   "+Q12);
alert("Q22   "+Q22);
alert("Q66   "+Q66);
alert("angulo "+angulo);
*/
        var Q11_barra=0.0+(Math.pow(c,4))*Q11+ (Math.pow(s,4))*Q22 + 2*(Math.pow(c,2))*(Math.pow(s,2))*(Q12 + 2*Q66);
        var Q12_barra=0.0+(Math.pow(c,4) + Math.pow(s,4))*Q12 + (Math.pow(c,2))*(Math.pow(s,2))*(Q11 + Q22 - 4*Q66);
        var Q22_barra=0.0+(Math.pow(s,4))*Q11 + 2*(Math.pow(c,2))*(Math.pow(s,2))*(Q12 + 2*Q66) + (Math.pow(c,4))*Q22;
        var Q66_barra=0.0+(Math.pow(c,2))*(Math.pow(s,2))*(Q11 + Q22 - 2*Q12 - 2*Q66) + (Math.pow(c,4) + Math.pow(s,4))*Q66;

        var Q16_barra=0.0+(Math.pow(c,3))*s*(Q11 - Q12 - 2*Q66) - c*(Math.pow(s,3))*(Q22 - Q12 - 2*Q66);
        var Q26_barra=0.0+c*(Math.pow(s,3))*(Q11 - Q12 - 2*Q66) - s*(Math.pow(c,3))*(Q22 - Q12 - 2*Q66);

	var saidaQbar=[];

	saidaQbar.push(Q11_barra);
	saidaQbar.push(Q12_barra);
	saidaQbar.push(Q22_barra);
	saidaQbar.push(Q66_barra);

	saidaQbar.push(Q16_barra);
	saidaQbar.push(Q26_barra);

//alert(saidaQbar);

	return saidaQbar;
}
