
function calcula_apenas_4_vertices(alfa, s, c, tau_xy,a,b,C,d)
{
	var matriz_invertida = new Object();
	matriz_invertida=funcao_inversa_RETURN(a, b, C, d);

	eq4_1(alfa, s, c, tau_xy, matriz_invertida);
	eq4_2(alfa, s, c, tau_xy, matriz_invertida);
	eq4_3(alfa, s, c, tau_xy, matriz_invertida);
	eq4_4(alfa, s, c, tau_xy, matriz_invertida);


}



function calcula_eq4_ate_eq8_vertices(alfa, s, c, tau_xy,a,b,C,d)
{
	var matriz_invertida = new Object();
	matriz_invertida=funcao_inversa_RETURN(a, b, C, d);
	eq4_5(alfa, s, c, tau_xy, matriz_invertida);
	eq4_6(alfa, s, c, tau_xy, matriz_invertida);
	eq4_7(alfa, s, c, tau_xy, matriz_invertida);
	eq4_8(alfa, s, c, tau_xy, matriz_invertida);
//


}


function calcula_eq9_ate_eq12_vertices(alfa, s, c, tau_xy,a,b,C,d)
{
	var matriz_invertida = new Object();
	matriz_invertida=funcao_inversa_RETURN(a, b, C, d);
	eq4_9(alfa, s, c, tau_xy, matriz_invertida);
	eq4_10(alfa, s, c, tau_xy, matriz_invertida);
	eq4_11(alfa, s, c, tau_xy, matriz_invertida);
	eq4_12(alfa, s, c, tau_xy, matriz_invertida);
//


}

/*

Agora cada intersection por separado

*/


//4.1

function eq4_1(alfa, s, c, tau_xy, matriz_invertida)
{
        //Para eq. 4.1:
	var vetor_1 = SIGMA_C_1 - alfa * s * c * tau_xy;
        var vetor_2 = SIGMA_C_2 -0.0+ alfa * s * c * tau_xy;

        var inverse_a = matriz_invertida[0];
        var inverse_b = matriz_invertida[1];
        var inverse_c = matriz_invertida[2];
        var inverse_d = matriz_invertida[3];

        var x = vetor_1 * (inverse_a) -0.0+ vetor_2 * inverse_b;
        var y = vetor_1 * (inverse_c) -0.0+ vetor_2 * inverse_d;

//Desacartado problema na formulação da equação lert(alfa+"  "+s+"  "+c+"  "+tau_xy+"  "+matriz_invertida);

	possiveis_pontos_x.push(x);
	possiveis_pontos_y.push(y);
}

//4.2

function eq4_2(alfa, s, c, tau_xy, matriz_invertida)
{

        var vetor_1 = SIGMA_T_1 - alfa * s * c * tau_xy;
        var vetor_2 = SIGMA_T_2  -0.0+ alfa * s * c * tau_xy;

        var inverse_a = matriz_invertida[0];
        var inverse_b = matriz_invertida[1];
        var inverse_c = matriz_invertida[2];
        var inverse_d = matriz_invertida[3];

        var x = vetor_1 * (inverse_a)  -0.0+ vetor_2 * inverse_b;
        var y = vetor_1 * (inverse_c)  -0.0+ vetor_2 * inverse_d;

	possiveis_pontos_x.push(x);
	possiveis_pontos_y.push(y);

}

//4.3

function eq4_3(alfa, s, c, tau_xy, matriz_invertida)
{

        var vetor_1 = SIGMA_T_1 - alfa * s * c * tau_xy;
        var vetor_2 = SIGMA_C_2 -0.0+ alfa * s * c * tau_xy;

        var inverse_a = matriz_invertida[0];
        var inverse_b = matriz_invertida[1];
        var inverse_c = matriz_invertida[2];
        var inverse_d = matriz_invertida[3];

        var x = vetor_1 * (inverse_a) -0.0+ vetor_2 * inverse_b;
        var y = vetor_1 * (inverse_c) -0.0+ vetor_2 * inverse_d;

	possiveis_pontos_x.push(x);
	possiveis_pontos_y.push(y);

}

//4.4

function eq4_4(alfa, s, c, tau_xy, matriz_invertida)
{

        var vetor_1 = SIGMA_C_1 - alfa * s * c * tau_xy;
        var vetor_2 = SIGMA_T_2 -0.0+ alfa * s * c * tau_xy;

        var inverse_a = matriz_invertida[0];
        var inverse_b = matriz_invertida[1];
        var inverse_c = matriz_invertida[2];
        var inverse_d = matriz_invertida[3];

        var x = vetor_1 * (inverse_a) -0.0+ vetor_2 * inverse_b;
        var y = vetor_1 * (inverse_c) -0.0+ vetor_2 * inverse_d;

	possiveis_pontos_x.push(x);
	possiveis_pontos_y.push(y);

}

//4.5

function eq4_5(alfa, s, c, tau_xy, matriz_invertida)
{
        var c2 = c * c;
        var s2 = s * s;
        //Para eq. 4.5:
        var vetor_1 = SIGMA_C_1 - alfa * s * c * tau_xy;
        var vetor_2 = -TAU12 - (c2 - s2) * tau_xy;

        var inverse_a = matriz_invertida[0];
        var inverse_b = matriz_invertida[1];
        var inverse_c = matriz_invertida[2];
        var inverse_d = matriz_invertida[3];

        var x = vetor_1 * (inverse_a) -0.0+ vetor_2 * inverse_b;
        var y = vetor_1 * (inverse_c) -0.0+ vetor_2 * inverse_d;

        possiveis_pontos_x.push(x);
        possiveis_pontos_y.push(y);
}

//4.6
function eq4_6(alfa, s, c, tau_xy, matriz_invertida)
{
        var c2 = c * c;
        var s2 = s * s;

        //Para eq. 4.6:
        var vetor_1 = SIGMA_T_1 - alfa * s * c * tau_xy;
        var vetor_2 = TAU12 - (c2 - s2) * tau_xy;

        var inverse_a = matriz_invertida[0];
        var inverse_b = matriz_invertida[1];
        var inverse_c = matriz_invertida[2];
        var inverse_d = matriz_invertida[3];

        var x = vetor_1 * (inverse_a) -0.0+ vetor_2 * inverse_b;
        var y = vetor_1 * (inverse_c) -0.0+ vetor_2 * inverse_d;

        possiveis_pontos_x.push(x);
        possiveis_pontos_y.push(y);
}

//4.7
function eq4_7(alfa, s, c, tau_xy, matriz_invertida)
{
        var c2 = c * c;
        var s2 = s * s;
        //Para eq. 4.7:
        var vetor_1 = SIGMA_T_1 - alfa * s * c * tau_xy;
        var vetor_2 = -TAU12 + (c2 - s2) * tau_xy;

        var inverse_a = matriz_invertida[0];
        var inverse_b = matriz_invertida[1];
        var inverse_c = matriz_invertida[2];
        var inverse_d = matriz_invertida[3];

        var x = vetor_1 * (inverse_a) -0.0+ vetor_2 * inverse_b;
        var y = vetor_1 * (inverse_c) -0.0+ vetor_2 * inverse_d;

        possiveis_pontos_x.push(x);
        possiveis_pontos_y.push(y);
}
//4.8
function eq4_8(alfa, s, c, tau_xy, matriz_invertida)
{
        var c2 = c * c;
        var s2 = s * s;
        //Para eq. 4.8
        var vetor_1 = SIGMA_C_1 - alfa * s * c * tau_xy;
        var vetor_2 = TAU12 -0.0+ (c2 - s2) * tau_xy;

        var inverse_a = matriz_invertida[0];
        var inverse_b = matriz_invertida[1];
        var inverse_c = matriz_invertida[2];
        var inverse_d = matriz_invertida[3];

        var x = vetor_1 * (inverse_a) -0.0+ vetor_2 * inverse_b;
        var y = vetor_1 * (inverse_c) -0.0+ vetor_2 * inverse_d;

        possiveis_pontos_x.push(x);
        possiveis_pontos_y.push(y);
}
//4.9
function eq4_9(alfa, s, c, tau_xy, matriz_invertida)
{
        var c2 = c * c;
        var s2 = s * s;
        //Para eq. 4.9
        var vetor_1 = SIGMA_C_2 - alfa * s * c * tau_xy;
        var vetor_2 = -TAU12 - (c2 - s2) * tau_xy;

        var inverse_a = matriz_invertida[0];
        var inverse_b = matriz_invertida[1];
        var inverse_c = matriz_invertida[2];
        var inverse_d = matriz_invertida[3];

        var x = vetor_1 * (inverse_a) -0.0+ vetor_2 * inverse_b;
        var y = vetor_1 * (inverse_c) -0.0+ vetor_2 * inverse_d;

        possiveis_pontos_x.push(x);
        possiveis_pontos_y.push(y);
}
//4.10
function eq4_10(alfa, s, c, tau_xy, matriz_invertida)
{
        var c2 = c * c;
        var s2 = s * s;
        //Para eq. 4.10
        var vetor_1 = SIGMA_T_2 - alfa * s * c * tau_xy;
        var vetor_2 = TAU12 - (c2 - s2) * tau_xy;

        var inverse_a = matriz_invertida[0];
        var inverse_b = matriz_invertida[1];
        var inverse_c = matriz_invertida[2];
        var inverse_d = matriz_invertida[3];

        var x = vetor_1 * (inverse_a) -0.0+ vetor_2 * inverse_b;
        var y = vetor_1 * (inverse_c) -0.0+ vetor_2 * inverse_d;

        possiveis_pontos_x.push(x);
        possiveis_pontos_y.push(y);
}
//4.11
function eq4_11(alfa, s, c, tau_xy, matriz_invertida)
{
        var c2 = c * c;
        var s2 = s * s;
        //Para eq. 4.11
        var vetor_1 = SIGMA_T_2 - alfa * s * c * tau_xy;
        var vetor_2 = -TAU12 - (c2 - s2) * tau_xy;

        var inverse_a = matriz_invertida[0];
        var inverse_b = matriz_invertida[1];
        var inverse_c = matriz_invertida[2];
        var inverse_d = matriz_invertida[3];

        var x = vetor_1 * (inverse_a) -0.0+ vetor_2 * inverse_b;
        var y = vetor_1 * (inverse_c) -0.0+ vetor_2 * inverse_d;

        possiveis_pontos_x.push(x);
        possiveis_pontos_y.push(y);
}
//4.12
function eq4_12(alfa, s, c, tau_xy, matriz_invertida)
{
        var c2 = c * c;
        var s2 = s * s;
        //Para eq. 4.12
        var vetor_1 = SIGMA_C_2 - alfa * s * c * tau_xy;
        var vetor_2 = TAU12 - (c2 - s2) * tau_xy;

        var inverse_a = matriz_invertida[0];
        var inverse_b = matriz_invertida[1];
        var inverse_c = matriz_invertida[2];
        var inverse_d = matriz_invertida[3];

        var x = vetor_1 * (inverse_a) -0.0+ vetor_2 * inverse_b;
        var y = vetor_1 * (inverse_c) -0.0+ vetor_2 * inverse_d;

        possiveis_pontos_x.push(x);
        possiveis_pontos_y.push(y);
}
