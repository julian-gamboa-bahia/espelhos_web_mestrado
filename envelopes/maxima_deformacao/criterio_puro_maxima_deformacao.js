function criterio_puro_maxima_deformacao(angulo, gamma_xy)
{
        /*
        * Numerico,
        *
        *
        * */


	var Saida = [];

        var theta_radianos = (Math.PI / 180) * angulo;

        var c = Math.cos(theta_radianos);
        var s = Math.sin(theta_radianos);
        var c2 = c * c;
        var s2 = s * s;

        //vemos o IF diretamente

        var epsilon_x;
        var epsilon_y;

        var epsilon_1;
        var epsilon_2;
        var gamma_12;
        var normalizado_epsilon_T_1;
        var normalizado_epsilon_C_1;
        var normalizado_epsilon_T_2;
        var normalizado_epsilon_C_2;
        var normalizado_gamma12;

alpha=1;
beta=2;
        for (i = 0; i < possiveis_pontos_x.length; i++) {

            epsilon_x = possiveis_pontos_x[i];
            epsilon_y = possiveis_pontos_y[i];

            //calculando em locais
            epsilon_1 = c2 * epsilon_x -0.0+ s2 * epsilon_y + alpha * c * s * gamma_xy;
            epsilon_2 = s2 * epsilon_x -0.0+ c2 * epsilon_y - alpha * c * s * gamma_xy;
            gamma_12 = -beta*s * c * epsilon_x -0.0+ beta*s * c * epsilon_y + (c2 - s2) * gamma_xy;


            //normalizando
            //Para a direção local 1
		if(epsilon_1>0)
		{
			    normalizado_if_1 = Math.abs(epsilon_1 / EPSILON_T_1); // Tração
		}
		else
		{
			    normalizado_if_1 = Math.abs(epsilon_1 / EPSILON_C_1); // Compressão
		}
            //Para a direção local 2
		if(epsilon_2>0)
		{
			normalizado_if_2 = Math.abs(epsilon_2 / EPSILON_T_2); // Tração
		}
		else
		{
			normalizado_if_2 = Math.abs(epsilon_2 / EPSILON_C_2); // Compressão
		}
            //Para o esforço cisalhante
            normalizado_if_12 = Math.abs(gamma_12 / GAMMA12);
            //Se qualquer um dos anteriores supera o valor de 1, significa que o IF foi superado.
            //janeiro24 mas estando ciente do erro numérico pode ser mími é preciso definir uma tolerância
            // de 0.01

/*
if(normalizado_if_1 < 1+tolerancia)
{
	alert("normalizado_if_1  "+normalizado_if_1);
}
if(normalizado_if_2 < 1+tolerancia)
{
	alert("normalizado_if_2  "+normalizado_if_2);
}
if(normalizado_if_12 < 1+tolerancia)
{
	alert("normalizado_if_12  "+normalizado_if_12);
}

alert("Saida  "+Saida.length);
alert(Saida);
*/
            var tolerancia = 0.01;


            if (
                    (normalizado_if_1 < 1+tolerancia) &&
                            (normalizado_if_2 < 1+tolerancia) &&
                            (normalizado_if_12 < 1+tolerancia)
                    ) {
                Saida.push("true");
            } else {
                Saida.push("false");
            }

//////end for 
        }
/*
Transformamos para poder criar pontos verdadeiros
*/
	transformando_deformacoes_esforcos();

	for (i = 0; i < possiveis_pontos_y.length; i++) 
	{
                if (Saida[i]=="true") {
                    //usando apenas os pontos que sejam definidos como convenientes ou seja aqueles
                    // de IF unitário
                    TRUE_pontos_x.push(possiveis_pontos_x[i]);
                    TRUE_pontos_y.push(possiveis_pontos_y[i]);
                    TRUE_pontos_xy.push(possiveis_pontos_xy[i]);
                }
	}
///////////
}

