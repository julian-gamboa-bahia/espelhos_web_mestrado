/*
Ordenamos os quautro (04) pontos 
*/

function fecharPONTOS( ) {

    //Fazemos um estudo MASSIVO dos pontos
    //Estudo inicial partendo do primeiro ponto, que será um estudo especial dado que
    // não sabemos qual é o primeiro ângulo interno da área

    var numeros=[];
//Preparaos o array de numeração conforme a dimensão do TRUE_pontos_x
    for(i=0;i<TRUE_pontos_x.length;i++)
    {
        numeros.push(i);
    }


//Fazemos a varredura dos pares para obter o ângulo.
//Solução rápida: Invocar a função várias vezes

    var ponto_inicial_x = TRUE_pontos_x[0];
    var ponto_inicial_y = TRUE_pontos_y[0];

    var angulo_temporal=0.0;
    var i_temp=0,j_temp=0;

    for (i = 1; i < TRUE_pontos_x.length; i++)
    {
        for(j=i+1; j<TRUE_pontos_x.length;j++)
        {
            var angulo=calcular_angulo(ponto_inicial_x,ponto_inicial_y,i,j);

            if(angulo>=angulo_temporal)
            {
                angulo_temporal=angulo;
                i_temp=i;
                j_temp=j;
            }
        }
    }

    ANGULADOS_TRUE_pontos_x.push(TRUE_pontos_x[j_temp]);
    ANGULADOS_TRUE_pontos_y.push(TRUE_pontos_y[j_temp]);

    ANGULADOS_TRUE_pontos_x.push(TRUE_pontos_x[0]);
    ANGULADOS_TRUE_pontos_y.push(TRUE_pontos_y[0]);

    ANGULADOS_TRUE_pontos_x.push(TRUE_pontos_x[i_temp]);
    ANGULADOS_TRUE_pontos_y.push(TRUE_pontos_y[i_temp]);

//Extremo para ser estudado:

    var ANTIGO_i_temp=i_temp;
    var ANTIGO_j_temp=j_temp;

    //Estudo inicial partendo do primeiro ponto
    ponto_inicial_x = TRUE_pontos_x[ANTIGO_i_temp];
    ponto_inicial_y = TRUE_pontos_y[ANTIGO_i_temp];

    var ponto_inicial_x_CONTRA = TRUE_pontos_x[ANTIGO_j_temp];
    var ponto_inicial_y_CONTRA = TRUE_pontos_y[ANTIGO_j_temp];

//Tendo 3 ptos. Será preciso apenas detetar os outros
// No caso de apenas 4 pontos, aqui deve concluir o algoritmos
    angulo_temporal=0.0;

    for(j=1; j<TRUE_pontos_x.length;j++) //acima de 0 (Antigo Ponto Inicial)
    {
        if(j!=ANTIGO_i_temp)
        {
            var angulo=calcular_angulo(ponto_inicial_x, ponto_inicial_y, 0,j);

            if(angulo>=angulo_temporal)
            {
                angulo_temporal=angulo;
                j_temp=j;
            }
        }
    }

    ANGULADOS_TRUE_pontos_x.push(TRUE_pontos_x[j_temp]);
    ANGULADOS_TRUE_pontos_y.push(TRUE_pontos_y[j_temp]);

    for(i=0;i<ANGULADOS_TRUE_pontos_x.length;i++)
    {
        POLIGONO_TRUE_pontos_x.push(ANGULADOS_TRUE_pontos_x[i]);
        POLIGONO_TRUE_pontos_y.push(ANGULADOS_TRUE_pontos_y[i]);
    }

	construir_COM_POLIGONO_TRUE_pontos();
}

