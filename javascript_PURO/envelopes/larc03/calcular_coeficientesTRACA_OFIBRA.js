/*
TRACA_OFIBRA

*/

function calcular_coeficientesTRACA_OFIBRA(cos,sin)
{
        //  a*x²+c*y²+2bxy

        Quadrado_t1=(1/SIGMA_T_1)*(1/SIGMA_T_1);
        Quadrado_t2=(1/SIGMA_T_2)*(1/SIGMA_T_2);
        Quadrado_t12=(1/TAU12)*(1/TAU12);

        // sigma_X^2

/*

a=
cos^{4} \sigma_{x}^{2} t_{1}^{2} 
+ cos^{2}  sin^{2} t_{12}^{2} 
\\
*/

fatorRotar_a=
- Math.pow(cos,4)*Quadrado_t1   		//cos^{4} \sigma_{x}^{2} t_{1}^{2} 
+ Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12; //+ cos^{2} \sigma_{x}^{2} sin^{2} t_{12}^{2} 



        //   sigma_Y^2
/*
c=
+ cos^{2} \sigma_{y}^{2} sin^{2} t_{12}^{2}
+ \sigma_{y}^{2} sin^{4} t_{1}^{2}
*/

fatorRotar_c=
Math.pow(sin,4)*Quadrado_t1 				//+ \sigma_{y}^{2} sin^{4} t_{1}^{2}
+ Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12;		//+ cos^{2} \sigma_{y}^{2} sin^{2} t_{12}^{2}


        //   sigma_Y*sigma_X

/*

2b=
+ 2 cos^{2} \sigma_{x}\sigma_{y} sin^{2} t_{1}^{2} 
- 2 cos^{2} \sigma_{x} \sigma_{y} sin^{2} t_{12}^{2} 
*/

fatorRotar_b=
+ 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t1 
- 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12;

        // No caso de materiais isotropicos, ou transversalmente isotropicos temos que ajustar um pouco,
        // A representa será mudada apenas um pouco, para evitar divisão por zero.

        //  a*x²+c*y²+2bxy
	//Usando a biblioteca gráfica:

//////////////////////////// Agora as potencias SIMPLES

//  sigmaX, colocamos o 2d
/*

2d=
+ 4 cos^{3} \sigma_{x} sin t_{1}^{2} \tau_{xy} 
- 2 cos^{3} \sigma_{x} sin t_{12}^{2} \tau_{xy} 
+ 2 cos \sigma_{x} sin^{3} t_{12}^{2} \tau_{xy}
*/

fatorRotar_d=
4*Math.pow(cos,3)*sin*Quadrado_t1*tauXY 		//+ 4 cos^{3} \sigma_{x} sin t_{1}^{2} \tau_{xy} 
- 2*Math.pow(cos,3)*sin*Quadrado_t12*tauXY 		//- 2 cos^{3} \sigma_{x} sin t_{12}^{2} \tau_{xy} 
+ 2*cos*Math.pow(sin,3)*Quadrado_t12*tauXY;		//+ 2 cos \sigma_{x} sin^{3} t_{12}^{2} \tau_{xy}


/*


2f=
+ 2 cos^{3} \sigma_{y} sin t_{12}^{2} \tau_{xy} 
 + 4 cos \sigma_{y} sin^{3} t_{1}^{2} \tau_{xy} 
- 2 cos \sigma_{y} sin^{3} t_{12}^{2} \tau_{xy} 

*/

fatorRotar_f=
4*Math.pow(sin,3)*cos*Quadrado_t1*tauXY 		// + 4 cos \sigma_{y} sin^{3} t_{1}^{2} \tau_{xy} 
- 2*Math.pow(sin,3)*cos*Quadrado_t12*tauXY 		//- 2 cos \sigma_{y} sin^{3} t_{12}^{2} \tau_{xy} 
+ 2*sin*Math.pow(cos,3)*Quadrado_t12*tauXY;		//+ 2 cos^{3} \sigma_{y} sin t_{12}^{2} \tau_{xy} 



/*

g=-1
+ cos^{4} t_{12}^{2} \tau_{xy}^{2} 
 + 4 cos^{2} sin^{2} t_{1}^{2} \tau_{xy}^{2} 
- 2 cos^{2} sin^{2} t_{12}^{2} \tau_{xy}^{2} 
 + sin^{4} t_{12}^{2} \tau_{xy}^{2}

*/

factorRotar_g=
4*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t1 		// + 4 cos^{2} sin^{2} t_{1}^{2} \tau_{xy}^{2} 
- 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12	//- 2 cos^{2} sin^{2} t_{12}^{2} \tau_{xy}^{2} 
+ Math.pow(cos,4)*Quadrado_t12				//+ cos^{4} t_{12}^{2} \tau_{xy}^{2} 
+ Math.pow(sin,4)*Quadrado_t12;		 		//+ sin^{4} t_{12}^{2} \tau_{xy}^{2}		




        a=fatorRotar_a;
	c=fatorRotar_c;

        b=(fatorRotar_b/2);
        d=(fatorRotar_d/2);
        f=(fatorRotar_f/2);

        g=-1+factorRotar_g*(tauXY*tauXY);

}

