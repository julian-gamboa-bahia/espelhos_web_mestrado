/*
Falha na matriz de uma forma mais compacta

*/

function calcular_coeficientes_falha_matriz(cos,sin)
{

// Coeficientes da Matriz 
a_m=(Math.pow(cos,2)*Math.pow(sin,2))/(Math.pow(TAU12,2))+(Math.pow(sin,4))/(SIGMA_T_2*SIGMA_C_2);

//ANTIGO	a_m=(Math.pow(cos,2)*Math.pow(sin,2))/(Math.pow(TAU12,2))  + (Math.pow(sin,4))/(Math.pow(SIGMA_T_2,2));
c_m=(Math.pow(cos,2)*Math.pow(sin,2))/(Math.pow(TAU12,2))+(Math.pow(cos,4))/(SIGMA_T_2*SIGMA_C_2);


//ANTIGO	c_m=(Math.pow(cos,2)*Math.pow(sin,2))/(Math.pow(TAU12,2))  + (Math.pow(cos,4))/(Math.pow(SIGMA_T_2,2));
DUPLO_b_m=(2*Math.pow(cos,2)*Math.pow(sin,2))/(SIGMA_T_2*SIGMA_C_2)-(2*Math.pow(cos,2)*Math.pow(sin,2))/(Math.pow(TAU12,2));


//ANTIGO 	b_m=(-(2)/(Math.pow(TAU12,2))*Math.pow(cos,2)*Math.pow(sin,2) + (2*Math.pow(cos,2))/(Math.pow(SIGMA_T_2,2))*Math.pow(sin,2))/2;
DUPLO_d_m=-(2*sin*Math.pow(cos,3)*tauXY)/(Math.pow(TAU12,2))+(2*cos*Math.pow(sin,3)*tauXY)/(Math.pow(TAU12,2))-(4*cos*tauXY*Math.pow(sin,3))/(SIGMA_T_2*SIGMA_C_2)+ Math.pow(sin,2)/SIGMA_T_2- Math.pow(sin,2)/SIGMA_C_2;

//ANTIGO 	d_m=-(((2*sin)/(Math.pow(TAU12,2)))*Math.pow(cos,3)*tauXY + ((2*cos)/(Math.pow(TAU12,2)))*Math.pow(sin,3)*tauXY- (4*cos*tauXY)/(Math.pow(SIGMA_T_2,2))*Math.pow(sin,3) )/2;

DUPLO_f_m=-(2*cos*Math.pow(sin,3)*tauXY)/(Math.pow(TAU12,2)) +(2*sin*Math.pow(cos,3)*tauXY)/(Math.pow(TAU12,2))-(4*sin*tauXY*Math.pow(cos,3))/(SIGMA_T_2*SIGMA_C_2) + Math.pow(cos,2)/SIGMA_T_2- Math.pow(cos,2)/SIGMA_C_2;
//ANTIGO	f_m=(((2*sin)/(Math.pow(TAU12,2)))*Math.pow(cos,3)*tauXY - ((2*cos)/(Math.pow(TAU12,2)))*Math.pow(sin,3)*tauXY- (4*sin	*tauXY)/(Math.pow(SIGMA_T_2,2))*Math.pow(cos,3))/2;

g_m=-1+ (Math.pow(sin,4)*Math.pow(tauXY,2))/(Math.pow(TAU12,2))-(2*Math.pow(cos,2)*Math.pow(sin,2)*Math.pow(tauXY,2))/(Math.pow(TAU12,2)) + (4*Math.pow(cos,2)*Math.pow(sin,2)*Math.pow(tauXY,2))/(SIGMA_T_2*SIGMA_C_2)+(Math.pow(cos,4)*Math.pow(tauXY,2))/(Math.pow(TAU12,2))  + (2*sin*cos*tauXY)/SIGMA_C_2- (2*sin*cos*tauXY)/SIGMA_T_2;

//ANTIGO	g_m=-1+(Math.pow(cos,4)*Math.pow(tauXY,2))/(Math.pow(TAU12,2))  + (Math.pow(sin,4)*Math.pow(tauXY,2))/(Math.pow(TAU12,2)) - (2*Math.pow(cos,2))/(Math.pow(TAU12,2))*Math.pow(sin,2)*Math.pow(tauXY,2) + (4*Math.pow(cos,2)*Math.pow(sin,2)*Math.pow(tauXY,2))/(Math.pow(SIGMA_T_2,2));


        a=a_m;
	c=c_m;

        b=DUPLO_b_m/2;
        d=DUPLO_d_m/2;
        f=DUPLO_f_m/2;

        g=g_m;

/*
a=+ \frac{cos^{2} \sigma_{x}^{2}}{\tau_{12}^{2}} sin^{2} + \frac{\sigma_{x}^{2} sin^{4}}{\sigma_{C 2} \sigma_{T 2}}
c=+ \frac{cos^{2} \sigma_{y}^{2}}{\tau_{12}^{2}} sin^{2}+ \frac{cos^{4} \sigma_{y}^{2}}{\sigma_{C 2} \sigma_{T 2}}
b=+ \frac{2 cos^{2} \sigma_{x} \sigma_{y} sin^{2}}{\sigma_{C 2} \sigma_{T 2}} - \frac{2 \sigma_{x}}{\tau_{12}^{2}} cos^{2} \sigma_{y} sin^{2} 
d=- \frac{2 \sigma_{x}}{\tau_{12}^{2}} cos^{3} sin \tau_{xy}+ \frac{2 cos}{\tau_{12}^{2}} \sigma_{x} sin^{3} \tau_{xy} + \frac{\sigma_{x} sin^{2}}{\sigma_{T 2}} 
- \frac{\sigma_{x} sin^{2}}{\sigma_{C 2}} - \frac{4 cos \sigma_{x} sin^{3} \tau_{xy}}{\sigma_{C 2} \sigma_{T 2}} 
f=+ \frac{2 \sigma_{y}}{\tau_{12}^{2}} cos^{3} sin \tau_{xy} - \frac{2 cos}{\tau_{12}^{2}} \sigma_{y} sin^{3} \tau_{xy} 
+ \frac{cos^{2} \sigma_{y}}{\sigma_{T 2}} - \frac{cos^{2} \sigma_{y}}{\sigma_{C 2}}- \frac{4 cos^{3} \sigma_{y} sin \tau_{xy}}{\sigma_{C 2} \sigma_{T 2}} 
g=\frac{cos^{4} \tau_{xy}^{2}}{\tau_{12}^{2}}  - \frac{2 cos^{2}}{\tau_{12}^{2}} sin^{2} \tau_{xy}^{2} + \frac{sin^{4} \tau_{xy}^{2}}{\tau_{12}^{2}}+ \frac{4 cos^{2} sin^{2} \tau_{xy}^{2}}{\sigma_{C 2} \sigma_{T 2}}- \frac{2 cos sin \tau_{xy}}{\sigma_{T 2}}  + \frac{2 cos sin \tau_{xy}}{\sigma_{C 2}} 

alert("matriz "+a+"  "+b+"  "+c+"  "+d+"  "+f+"  "+g+"  ");

*/

}

/*



*/

function calcular_coeficientes_falha_fibra(cos,sin)
{

// Coeficientes da FIBRA

a_f=(Math.pow(cos,4))/(SIGMA_T_1*SIGMA_C_1);
c_f=(Math.pow(sin,4))/(SIGMA_T_1*SIGMA_C_1);
DUPLO_b_f=(2*Math.pow(cos,2)*Math.pow(sin,2))/(SIGMA_T_1*SIGMA_C_1);

//alert("tauXY  "+tauXY);

DUPLO_d_f=(Math.pow(cos,2))/(SIGMA_T_1)-(Math.pow(cos,2))/(SIGMA_C_1)+(4*Math.pow(cos,3)*sin*tauXY)/(SIGMA_T_1*SIGMA_C_1);
DUPLO_f_f=(Math.pow(sin,2))/(SIGMA_T_1)-(Math.pow(sin,2))/(SIGMA_C_1)+(4*Math.pow(sin,3)*cos*tauXY)/(SIGMA_T_1*SIGMA_C_1);

g_f=-1+(2*cos*sin*tauXY)/(SIGMA_T_1)-(2*cos*sin*tauXY)/(SIGMA_C_1)+(4*Math.pow(sin,2)*Math.pow(cos,2)*Math.pow(tauXY,2))/(SIGMA_T_1*SIGMA_C_1);


/*
a=+ \frac{cos^{4} \sigma_{x}^{2}}{\sigma_{C 1} \sigma_{T 1}} 
c=+ \frac{\sigma_{y}^{2} sin^{4}}{\sigma_{C 1} \sigma_{T 1}}
b=+ \frac{2 cos^{2} \sigma_{x} \sigma_{y} sin^{2}}{\sigma_{C 1} \sigma_{T 1}} 
d=\frac{cos^{2} \sigma_{x}}{\sigma_{T 1}} - \frac{cos^{2} \sigma_{x}}{\sigma_{C 1}} + \frac{4 cos^{3} \sigma_{x} sin \tau_{xy}}{\sigma_{C 1} \sigma_{T 1}} 
f=+ \frac{\sigma_{y} sin^{2}}{\sigma_{T 1}} + \frac{4 cos \sigma_{y} sin^{3} \tau_{xy}}{\sigma_{C 1} \sigma_{T 1}} - \frac{\sigma_{y} sin^{2}}{\sigma_{C 1}} 
g
+ \frac{2 cos sin \tau_{xy}}{\sigma_{T 1}} 
- \frac{2 cos sin \tau_{xy}}{\sigma_{C 1}} 
+ \frac{4 cos^{2} sin^{2} \tau_{xy}^{2}}{\sigma_{C 1} \sigma_{T 1}} 

*/

/*
	a_f= (Math.pow(cos,2)*Math.pow(sin,2))/(Math.pow(TAU12,2))  + (Math.pow(cos,4))/(Math.pow(SIGMA_T_1,2));
	b_f= (1/2)*((2*Math.pow(cos,2))/(Math.pow(SIGMA_T_1,2))*Math.pow(sin,2)-((2)/(Math.pow(TAU12,2)))*Math.pow(cos,2)*Math.pow(sin,2));
	c_f=(Math.pow(sin,4))/(Math.pow(SIGMA_T_1,2))+ (Math.pow(cos,2)*Math.pow(sin,2))/(Math.pow(TAU12,2));
	d_f= (1/2)*(((4*sin*tauXY)/(Math.pow(SIGMA_T_1,2)))*Math.pow(cos,3)-((2*sin)/(Math.pow(TAU12,2)))*Math.pow(cos,3)*tauXY+ ((2*cos)/(Math.pow(TAU12,2)))*Math.pow(sin,3)*tauXY);
	f_f=(1/2)*(((4*cos*tauXY)/(Math.pow(SIGMA_T_1,2)))*Math.pow(sin,3)-((2*cos)/(Math.pow(TAU12,2)))*Math.pow(sin,3)*tauXY+((2*sin)/(Math.pow(TAU12,2)))*Math.pow(cos,3)*tauXY);
	g_f=-1+(Math.pow(cos,4)*Math.pow(tauXY,2))/(Math.pow(TAU12,2))-(2*Math.pow(cos,2))/(Math.pow(TAU12,2))*Math.pow(sin,2)*Math.pow(tauXY,2)+(4*Math.pow(cos,2)*Math.pow(sin,2)*Math.pow(tauXY,2))/(Math.pow(SIGMA_T_1,2)) + (Math.pow(sin,4)*Math.pow(tauXY,2))/(Math.pow(TAU12,2));
*/
        a=a_f;
	c=c_f;

        b=DUPLO_b_f/2;
        d=DUPLO_d_f/2;
        f=DUPLO_f_f/2;

        g=g_f;
}


