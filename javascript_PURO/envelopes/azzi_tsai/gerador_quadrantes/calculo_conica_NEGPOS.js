function calculo_conica_NEGPOS(angulo,tau_xy,numeroPontos)
{
//angulo=0;
/*
* Numerico Puro

* Numerico Puro

* Numerico Puro

* Marco17
* */

//	var numeroPontos= 400;
//usamos o TAU XY que por default será um zero.
        var tauXY=tau_xy+0.0;

        // COORDENADAS globais:

        // os efeitos da rotação da lamina:
        // daqui pa frente COORDENADAS GLOBAIS
        var  theta_radianos=(Math.PI/180)*angulo;


        var c=Math.cos(theta_radianos);
        var s=Math.sin(theta_radianos);
        // escrevemos com mais clareza, lembrar a forma

        //  a*x²+c*y²+2bxy

//Abril 19 alert("SIGMA_C_1  "+SIGMA_C_1);
//alert("SIGMA_T_1  "+SIGMA_T_1);

        var Quadrado_t1=(1/SIGMA_C_1)*(1/SIGMA_C_1);
        var Quadrado_t2=(1/SIGMA_T_2)*(1/SIGMA_T_2);
        var Quadrado_t12=(1/TAU12)*(1/TAU12);

        // sigma_X^2

        //c^4*sigmaX^2*t1^2
        //+ c^2*s^2*sigmaX^2*t12^2
        //+ s^4*sigmaX^2*t2^2
        //- c^2*s^2*sigmaX^2*t1^2
        var fatorRotar_a=Math.pow(c,4)*Quadrado_t1+ Math.pow(c,2)*Math.pow(s,2)*Quadrado_t12
                + Math.pow(s,4)*Quadrado_t2-Math.pow(c,2)*Math.pow(s,2)*Quadrado_t1;

        //   sigma_Y^2


//  + s^4*sigmaY^2*t1^2
//   + c^2*s^2*sigmaY^2*t12^2
//  + c^4*sigmaY^2*t2^2
//   - c^2*s^2*sigmaY^2*t1^2


        var 	fatorRotar_c=Math.pow(s,4)*Quadrado_t1+ Math.pow(c,2)*Math.pow(s,2)*Quadrado_t12
                + Math.pow(c,4)*Quadrado_t2-Math.pow(c,2)*Math.pow(s,2)*Quadrado_t1;


        //   sigma_Y*sigma_X


        //   + 2*c^2*s^2*sigmaX*sigmaY*t2^2
//  +  2*c^2*s^2*sigmaX*sigmaY*t1^2
//   - c^4*sigmaX*sigmaY*t1^2
//    - s^4*sigmaX*sigmaY*t1^2
//   - 2*c^2*s^2*sigmaX*sigmaY*t12^2

        //  a*x²+c*y²+2bxy

        var fatorRotar_b=2*Math.pow(c,2)*Math.pow(s,2)*Quadrado_t2+2*Math.pow(c,2)*Math.pow(s,2)*Quadrado_t1
                -Math.pow(c,4)*Quadrado_t1-Math.pow(s,4)*Quadrado_t1-2*Math.pow(c,2)*Math.pow(s,2)*Quadrado_t1;

        // No caso de materiais isotropicos, ou transversalmente isotropicos temos que ajustar um pouco,
        // A representa será mudada apenas um pouco, para evitar divisão por zero.

        //  a*x²+c*y²+2bxy
	//Usando a biblioteca gráfica:

//////////////////////////// Agora as potencias SIMPLES

//  sigmaX
//   - 2*c*s^3*sigmaX*t1^2*tauXY
//   + 2*c*s^3*sigmaX*t12^2*tauXY
//   - 4*c*s^3*sigmaX*t2^2*tauXY
//  + 6*c^3*s*sigmaX*t1^2*tauXY
//  - 2*c^3*s*sigmaX*t12^2*tauXY

        var fatorRotar_d=
                - 2*c*Math.pow(s,3)*Quadrado_t1*tauXY  + 2*c*Math.pow(s,3)*Quadrado_t12*tauXY
                - 4*c*Math.pow(s,3)*Quadrado_t2*tauXY +
        6*Math.pow(c,3)*s*Quadrado_t1*tauXY - 2*Math.pow(c,3)*s*Quadrado_t12*tauXY;

        var fatorRotar_f=
                - 2*Math.pow(c,3)*s*Quadrado_t1*tauXY
                        + 2*Math.pow(c,3)*s*Quadrado_t12*tauXY
                        - 4*Math.pow(c,3)*s*Quadrado_t2*tauXY
                        + 6*c*Math.pow(s,3)*Quadrado_t1*tauXY
                        - 2*c*Math.pow(s,3)*Quadrado_t12*tauXY;

        //tauXY^2:
        //+ c^4*t12^2*tauXY^2  + 8*c^2*s^2*t1^2*tauXY^2  - 2*c^2*s^2*t12^2*tauXY^2  + 4*c^2*s^2*t2^2*tauXY^2  + s^4*t12^2*tauXY^2

        var factorRotar_g=
                Math.pow(c,4)*Quadrado_t12+8*Math.pow(c,2)*Math.pow(s,2)*Quadrado_t1-2*Math.pow(c,2)*Math.pow(s,2)*Quadrado_t12
                        +4*Math.pow(c,2)*Math.pow(s,2)*Quadrado_t2+Math.pow(s,4)*Quadrado_t12;

        var d=(fatorRotar_d/2);
        var f=(fatorRotar_f/2);

        var g=-1+factorRotar_g*(tauXY*tauXY);


// no caso isotropico Poupamos calculo e fazemos apenas o estudo polar:

        var rotacionado;
        var x;

        var a=fatorRotar_a;
	var c=fatorRotar_c;
        var b=(fatorRotar_b/2);

        if (a!=c){
            if (c>a){
                x=(a-c)/(2*b);
                rotacionado=0.5*Inverse_cotan(x);
            }
            else
            {
                x=(a-c)/(2*b);
                rotacionado=(Math.PI/2)+0.5*Inverse_cotan(x);
            }
        }
        else
        {
            rotacionado=0;
        }

        // vemos os cumprimentos dos eixos principais desta elipse:
        // cumprimento dos eixos, usando todos os coeficientes:	try:
        var raioMaior=Math.sqrt((2*(a*f*f+c*d*d+g*b*b-2*b*d*f-2*a*c*g))/((b*b-a*c)*(Math.sqrt(Math.pow((a-c),2)+4*b*b)-(a+c))));
        var raioMenor=Math.sqrt((2*(a*f*f+c*d*d+g*b*b-2*b*d*f-2*a*c*g))/((b*b-a*c)*(-Math.sqrt(Math.pow((a-c),2)+4*b*b)-(a+c))));

        // Origem

        var origem_x=(c*d-b*f)/(b*b-a*c);
        var origem_y=(a*f-b*d)/(b*b-a*c);


var ang=0;
var passo=((2)*Math.PI/numeroPontos);

//Fazemos  desde 0 para 2*Pi

//alert("numeroPontos  "+numeroPontos);

    for(i=0;i<numeroPontos;i++)
    {
        c=Math.cos(ang);
        s=Math.sin(ang);
         r=(raioMaior*raioMenor)/(Math.sqrt(raioMaior*raioMaior*s*s+raioMenor*raioMenor*c*c));
         x=r*c;
         y=r*s;

        // aplicamos uma rotação de euler:

        // Origem
        if (origem_x!=0){
            x=x+origem_x;
        }
        if (origem_y!=0){
            y=y+origem_y;
        }

        temporal_x=x*Math.cos(rotacionado)-y*Math.sin(rotacionado);
        temporal_y=x*Math.sin(rotacionado)+y*Math.cos(rotacionado);


        ang=ang+passo;

        pares_pontos_x[i]=temporal_x;
        pares_pontos_y[i]=temporal_y;

DEGREEang=ang*(180/Math.PI);

//alert("POS POS "+i+") "+DEGREEang);
    }

	filtro_calculo_conica_NEGPOS(angulo,tau_xy);

for(i=0;i<pares_pontos_y.length;i++)
{
	definitivo_x.push(pares_pontos_x[i]);
	definitivo_y.push(pares_pontos_y[i]);
}

////////////////////////////////////////////////////////////
}

