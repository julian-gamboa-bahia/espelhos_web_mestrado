function ordenar_quatro_pontos()
{
        var separacao_tecnica=Math.abs(possiveis_pontos_x[0])*1.0e-3; //pegamos o primeiro elemento

        //primeiramente evitamos que tenha um valor de X com multiplicidade

        for ( i = 0; i < possiveis_pontos_x.length; i++) {
            for ( j = i -0+1; j < possiveis_pontos_x.length; j++) {
                var diff = possiveis_pontos_x[i] - possiveis_pontos_x[j];
                if (diff == 0.0) {
                    possiveis_pontos_x[j]=possiveis_pontos_x[i] -0.0+ separacao_tecnica;
                }
            }
        }

//Fazemos ordenamento por burbulha

        var ORDEM_ASCII="true";

        var minimo=possiveis_pontos_x[0];

        for(i = 0; i < possiveis_pontos_x.length; i++)
        {
            if(possiveis_pontos_x[i]<minimo)
            {
                ORDEM_ASCII="false";
            }
            minimo=possiveis_pontos_x[i];
        }

        if(ORDEM_ASCII=="false")
        {
            var menor_arco_1_x;
            var menor_arco_1_y;
            var TEMP_arco_1_x;
            var TEMP_arco_1_y;


            for (i = 0; i < possiveis_pontos_x.length; i++)
            {
                menor_arco_1_x=possiveis_pontos_x[i]-0.0;
                menor_arco_1_y=possiveis_pontos_y[i]-0.0;

                for(j=i-0+1;j<possiveis_pontos_x.length;j++)
                {
                    if((possiveis_pontos_x[j]-0.0)<(menor_arco_1_x-0.0))
                    {
			//lert(possiveis_pontos_x[j]+" menor "+menor_arco_1_x);

                        TEMP_arco_1_x=possiveis_pontos_x[j];
                        possiveis_pontos_x[j]=menor_arco_1_x;
                        possiveis_pontos_x[i]=TEMP_arco_1_x;
//O mesmo para Y para assim manter o sistema ordenado
                        TEMP_arco_1_y=possiveis_pontos_y[j];
                        possiveis_pontos_y[j]=menor_arco_1_y;
                        possiveis_pontos_y[i]=TEMP_arco_1_y;
                        break;
                    }
///for
                }
            }
        }

/*
        //É preciso apenas ordenar por altura dado que
//Numeração em forma horaria começa pelo extremo esquerdo
        // 1) O extremo esquerdo será o ponto 1
        // 2) O extremo direito será o ponto 3
        // 3) A dúvida existe sobre os pontos 2 3  , mas entre estes escolhemos pelo coeficiente ângular
        // como regra.
        // Aquela que permita construir uma reta com o maior coeficiente ângular é o ponto.

        //TOMAR DE possiveis_pontos_y os pontos possiveis pontos 2 e 3

        var confuso_2_x=possiveis_pontos_x[1]; //Lembrar que os dois pontos estão à direito do ponto 1
        var confuso_2_y=possiveis_pontos_y[1];

        var confuso_3_x=possiveis_pontos_x[2];
        var confuso_3_y=possiveis_pontos_y[2];

//Calculamos os coeficientes angulares:
        var m_do_confuso_2=(confuso_2_y-possiveis_pontos_y[0])/(confuso_2_x-possiveis_pontos_x[0]);
        var m_do_confuso_3=(confuso_3_y-possiveis_pontos_y[0])/(confuso_3_x-possiveis_pontos_x[0]);

//Aquele ponto confuso de mairo coeficiente angular será o ponto 2

        var temp_x;
        var temp_y;

        if(m_do_confuso_2>m_do_confuso_3)
        {
            temp_x=possiveis_pontos_x[3];
            temp_y=possiveis_pontos_y[3];

//O de maior coeficiente angular será o ponto 2
            possiveis_pontos_x[1]=confuso_2_x;
            possiveis_pontos_y[1]=confuso_2_y;
//E o de menor será o ponto 4
            possiveis_pontos_x[3]=confuso_3_x;
            possiveis_pontos_y[3]=confuso_3_y;
//O antigo ponto 4 será o ponto 3
            possiveis_pontos_x[2]=temp_x;
            possiveis_pontos_y[2]=temp_y;
        }
        else
        {
            temp_x=possiveis_pontos_x[3];
            temp_y=possiveis_pontos_y[3];

//O de maior coeficiente angular será o ponto 2
            possiveis_pontos_x[1]=confuso_3_x;
            possiveis_pontos_y[1]=confuso_3_y;
//E o de menor será o ponto 4
            possiveis_pontos_x[3]=confuso_2_x;
            possiveis_pontos_y[3]=confuso_2_y;
//O antigo ponto 4 será o ponto 3
            possiveis_pontos_x[2]=temp_x;
            possiveis_pontos_y[2]=temp_y;
        }
*/
//Agora temos ordenada a informação
        for ( i = 0; i < possiveis_pontos_x.length; i++) {
		dados_GNU=dados_GNU+possiveis_pontos_x[i]+"  "+possiveis_pontos_y[i]+"%5Cn"; //%5Cn
	}

//////////////////
}
