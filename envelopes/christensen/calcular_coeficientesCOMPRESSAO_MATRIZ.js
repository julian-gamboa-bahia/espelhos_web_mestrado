/*
COMPRESSAO_MATRIZ
*/

function calcular_coeficientesCOMPRESSAO_MATRIZ(cos,sin)
{

TAU23=TAU12;

        Quadrado_t2=Math.pow((1/(2*TAU23)),2);

//alert(Quadrado_t2);

coeficiente=(SIGMA_C_2/(2*TAU23));

        Simples_t2=(-1+Math.pow(coeficiente,2))*(1/SIGMA_C_2);

        Quadrado_t12=(1/TAU12)*(1/TAU12);

        // sigma_X^2

/*

a=
+ \sigma_{x}^{2} sin^{4} t_{2}^{2} 
 + cos^{2} \sigma_{x}^{2} sin^{2} t_{12}^{2} 
\\

//verificcao

+ Quadrado_{t12} cos^{2}  sin^{2} 
 + Quadrado_{t2} cos^{4} 

//
 + Quadrado_{t2}  sin^{4} 
+ Quadrado_{t12} cos^{2} sin^{2} 

*/

fatorRotar_a=
+ Math.pow(sin,4)*Quadrado_t2 			//+ \sigma_{x}^{2} sin^{4} t_{2}^{2}
//+ Math.pow(cos,4)*Quadrado_t2 			
+ Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12;	// + cos^{2} \sigma_{x}^{2} sin^{2} t_{12}^{2}  


        //   sigma_Y^2
/*
c=
+ cos^{4} \sigma_{y}^{2} t_{2}^{2}
+ cos^{2} \sigma_{y}^{2} sin^{2} t_{12}^{2} 

//verificado

 + Quadrado_{t12} cos^{2} \sigma_{y}^{2} sin^{2} 
+ Quadrado_{t2} \sigma_{y}^{2} sin^{4} 

//

+ Quadrado_{t12} cos^{2} \sigma_{y}^{2} sin^{2} 
+ Quadrado_{t2} cos^{4} \sigma_{y}^{2} 

*/

fatorRotar_c=
+ Math.pow(cos,4)*Quadrado_t2 			//+ cos^{4} \sigma_{y}^{2} t_{2}^{2}
+ Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12;	//+ cos^{2} \sigma_{y}^{2} sin^{2} t_{12}^{2} 

        //   sigma_Y*sigma_X

/*

2b=
- 2 cos^{2} \sigma_{x} \sigma_{y} sin^{2} t_{12}^{2} 
+ 2 cos^{2} \sigma_{x} \sigma_{y} sin^{2} t_{2}^{2} 

//verificado

- 2 Quadrado_{t12} cos^{2}  sin^{2}
+ 2 Quadrado_{t2} cos^{2} sin^{2}

//

- 2 Quadrado_{t12} cos^{2} \sigma_{x} \sigma_{y} sin^{2} 
+ 2 Quadrado_{t2} cos^{2} \sigma_{x} \sigma_{y} sin^{2} 
*/

fatorRotar_b=
- 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12 //- 2 cos^{2} \sigma_{x} \sigma_{y} sin^{2} t_{12}^{2} 
+ 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t2; //+ 2 cos^{2} \sigma_{x} \sigma_{y} sin^{2} t_{2}^{2} 

        // No caso de materiais isotropicos, ou transversalmente isotropicos temos que ajustar um pouco,
        // A representa será mudada apenas um pouco, para evitar divisão por zero.

        //  a*x²+c*y²+2bxy
	//Usando a biblioteca gráfica:

//////////////////////////// Agora as potencias SIMPLES

//  sigmaX, colocamos o 2d
/*

2d=
+ Simples_{t2} \sigma_{x} sin^{2} 
- 2 cos^{3} \sigma_{x} sin t_{12}^{2} \tau_{xy} 
+ 2 cos \sigma_{x} sin^{3} t_{12}^{2} \tau_{xy} 
- 4 cos \sigma_{x} sin^{3} t_{2}^{2} \tau_{xy} 

//verificado

//

- 2 Quadrado_{t12} cos^{3} \sigma_{x} sin \tau_{xy} 
+ 2 Quadrado_{t12} cos \sigma_{x} sin^{3} \tau_{xy} 
- 4 Quadrado_{t2} cos \sigma_{x} sin^{3} \tau_{xy}
+ Simples_{t2} \sigma_{x} sin^{2}


*/

fatorRotar_d=
- 2*Math.pow(cos,3)*sin*Quadrado_t12*tauXY 	//- 2 cos^{3} \sigma_{x} sin t_{12}^{2} \tau_{xy} //ve - 2 Quadrado_{t12} cos^{3} sin \tau_{xy} 
+Math.pow(sin,2)*Simples_t2*tauXY		//+ Simples_{t2} \sigma_{x} sin^{2} 			//ve + Simples_{t2} \sigma_{x} sin^{2}
+ 2*cos*Math.pow(sin,3)*Quadrado_t12*tauXY 	//+ 2 cos \sigma_{x} sin^{3} t_{12}^{2} \tau_{xy} //ve + 2 Quadrado_{t12} cos \sigma_{x} sin^{3} \tau_{xy} 
- 4*cos*Math.pow(sin,3)*Quadrado_t2*tauXY;	
//+ 4*sin*Math.pow(cos,3)*Quadrado_t2*tauXY;	//- 4 cos \sigma_{x} sin^{3} t_{2}^{2} \tau_{xy}   //+ 4 Quadrado_{t2} cos^{3} \sigma_{x} sin \tau_{xy}  

/*


2f=
Simples_{t2} cos^{2} \sigma_{y} 
+ 2 cos^{3} \sigma_{y} sin t_{12}^{2} \tau_{xy} 
- 4 cos^{3} \sigma_{y} sin t_{2}^{2} \tau_{xy}
- 2cos \sigma_{y} sin^{3} t_{12}^{2} \tau_{xy} 

//verficado

- 2 Quadrado_{t12} cos \sigma_{y} sin^{3} \tau_{xy} 
+ 2 Quadrado_{t12} cos^{3} \sigma_{y} sin \tau_{xy} 
- 4 Quadrado_{t2} cos^{3} \sigma_{y} sin \tau_{xy} 
+ Simples_{t2} cos^{2} \sigma_{y} 
*/

fatorRotar_f=
- 2*Math.pow(sin,3)*cos*Quadrado_t12*tauXY 	//- 2cos \sigma_{y} sin^{3} t_{12}^{2} \tau_{xy} //ve - 2 Quadrado_{t12} cos \sigma_{y} sin^{3} \tau_{xy} 
+Math.pow(cos,2)*Simples_t2			//Simples_{t2} cos^{2} \sigma_{y} 			//ve + Simples_{t2} cos^{2} \sigma_{y} 
+ 2*sin*Math.pow(cos,3)*Quadrado_t12*tauXY 	//+ 2 cos^{3} \sigma_{y} sin t_{12}^{2} \tau_{xy} //ve + 2 Quadrado_{t12} cos^{3} \sigma_{y} sin \tau_{xy} 
- 4*sin*Math.pow(cos,3)*Quadrado_t2*tauXY;	//- 4 cos^{3} \sigma_{y} sin t_{2}^{2} \tau_{xy} //ve + 4 Quadrado_{t2} cos \sigma_{y} sin^{3} \tau_{xy} 




/*

g=-1

- 2 Simples_{t2} cos sin \tau_{xy} 
+ cos^{4} t_{12}^{2} \tau_{xy}^{2} 
- 2 cos^{2} sin^{2} t_{12}^{2} \tau_{xy}^{2} 
+ 4cos^{2} sin^{2} t_{2}^{2} \tau_{xy}^{2} 
+ sin^{4} t_{12}^{2} \tau_{xy}^{2}

//ve


- 2 Simples_{t2} cos sin \tau_{xy} 
- 2 Quadrado_{t12} cos^{2} sin^{2} \tau_{xy}^{2} 
+ 4 Quadrado_{t2} cos^{2} sin^{2} \tau_{xy}^{2} 
+ Quadrado_{t12} sin^{4} \tau_{xy}^{2} 
Quadrado_{t12} cos^{4} \tau_{xy}^{2} 
*/

factorRotar_g=
-2*cos*sin*Simples_t2*tauXY			//- 2 Simples_{t2} cos sin \tau_{xy} //- 2 Simples_{t2} cos sin \tau_{xy} 
- 2*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t12	//- 2 cos^{2} sin^{2} t_{12}^{2} \tau_{xy}^{2} //ve - 2 Quadrado_{t12} cos^{2} sin^{2} \tau_{xy}^{2} 
+ 4*Math.pow(cos,2)*Math.pow(sin,2)*Quadrado_t2 	//+ 4cos^{2} sin^{2} t_{2}^{2} \tau_{xy}^{2} //ve  + 4 Quadrado_{t2} cos^{2} sin^{2} \tau_{xy}^{2} 
//+ Math.pow(cos,4)*Quadrado_t12				
+ Math.pow(sin,4)*Quadrado_t12				//+ cos^{4} t_{12}^{2} \tau_{xy}^{2} //ve + Quadrado_{t12} sin^{4} \tau_{xy}^{2}
//+ Math.pow(sin,4)*Quadrado_t12; 			
+ Math.pow(cos,4)*Quadrado_t12; 			//+ sin^{4} t_{12}^{2} \tau_{xy}^{2} //ve Quadrado_{t12} cos^{4} \tau_{xy}^{2} 


        a=fatorRotar_a;
	c=fatorRotar_c;

        b=(fatorRotar_b/2);
        d=(fatorRotar_d/2);
        f=(fatorRotar_f/2);

        g=-1+factorRotar_g*(tauXY*tauXY);
}


