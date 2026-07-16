export interface Choice {
  id: 'a' | 'b' | 'c' | 'd';
  textEs: string;
  textAm: string;
}

export interface Question {
  id: number;
  subjectEs: string;
  subjectAm: string;
  questionEs: string;
  questionAm: string;
  choices: Choice[];
  correctAnswer: 'a' | 'b' | 'c' | 'd';
}

export const questions: Question[] = [
  {
    id: 1,
    subjectEs: "Matemáticas",
    subjectAm: "Մաթեմատիկա",
    questionEs: "Profesora: ¿Cuánto es ocho por siete?",
    questionAm: "Ուսուցչուհի․ Որքա՞ն է ութ անգամ յոթ։",
    choices: [
      { id: 'a', textEs: "Cincuenta y cuatro.", textAm: "Հիսունչորս։" },
      { id: 'b', textEs: "Cincuenta y seis.", textAm: "Հիսունվեց։" },
      { id: 'c', textEs: "Sesenta y cuatro.", textAm: "Վաթսունչորս։" },
      { id: 'd', textEs: "Cuarenta y ocho.", textAm: "Քառասունութ։" }
    ],
    correctAnswer: 'b'
  },
  {
    id: 2,
    subjectEs: "Horario",
    subjectAm: "Դասացուցակ",
    questionEs: "Profesora: ¿Qué asignatura tienes después de Inglés?",
    questionAm: "Ուսուցչուհի․ Ի՞նչ առարկա ունես անգլերենից հետո։",
    choices: [
      { id: 'a', textEs: "Después tengo Matemáticas.", textAm: "Հետո մաթեմատիկա ունեմ։" },
      { id: 'b', textEs: "Tengo doce años.", textAm: "Ես տասներկու տարեկան եմ։" },
      { id: 'c', textEs: "Mi libro es azul.", textAm: "Իմ գիրքը կապույտ է։" },
      { id: 'd', textEs: "Vivo cerca de la escuela.", textAm: "Ես ապրում եմ դպրոցի մոտ։" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 3,
    subjectEs: "Lengua",
    subjectAm: "Լեզու",
    questionEs: "Profesora: ¿Cuál es el plural de «el libro»?",
    questionAm: "Ուսուցչուհի․ Ո՞րն է «el libro» բառի հոգնակին։",
    choices: [
      { id: 'a', textEs: "La libros.", textAm: "La libros." },
      { id: 'b', textEs: "El libros.", textAm: "El libros." },
      { id: 'c', textEs: "Los libros.", textAm: "Los libros." },
      { id: 'd', textEs: "Las libro.", textAm: "Las libro." }
    ],
    correctAnswer: 'c'
  },
  {
    id: 4,
    subjectEs: "Geografía",
    subjectAm: "Աշխարհագրություն",
    questionEs: "Profesora: ¿En qué continente está España?",
    questionAm: "Ուսուցչուհի․ Ո՞ր մայրցամաքում է գտնվում Իսպանիան։",
    choices: [
      { id: 'a', textEs: "Está en Asia.", textAm: "Այն Ասիայում է։" },
      { id: 'b', textEs: "Está en Europa.", textAm: "Այն Եվրոպայում է։" },
      { id: 'c', textEs: "Está en África.", textAm: "Այն Աֆրիկայում է։" },
      { id: 'd', textEs: "Está en América.", textAm: "Այն Ամերիկայում է։" }
    ],
    correctAnswer: 'b'
  },
  {
    id: 5,
    subjectEs: "Ciencias naturales",
    subjectAm: "Բնագիտություն",
    questionEs: "Profesora: ¿Qué necesitan las plantas para crecer?",
    questionAm: "Ուսուցչուհի․ Ի՞նչ է անհրաժեշտ բույսերին աճելու համար։",
    choices: [
      { id: 'a', textEs: "Necesitan agua y luz.", textAm: "Նրանց ջուր և լույս է անհրաժեշտ։" },
      { id: 'b', textEs: "Necesitan un cuaderno.", textAm: "Նրանց տետր է անհրաժեշտ։" },
      { id: 'c', textEs: "Necesitan una contraseña.", textAm: "Նրանց գաղտնաբառ է անհրաժեշտ։" },
      { id: 'd', textEs: "Necesitan una bicicleta.", textAm: "Նրանց հեծանիվ է անհրաժեշտ։" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 6,
    subjectEs: "Deberes",
    subjectAm: "Տնային աշխատանք",
    questionEs: "Profesora: ¿Has terminado los deberes?",
    questionAm: "Ուսուցչուհի․ Ավարտե՞լ ես տնային աշխատանքը։",
    choices: [
      { id: 'a', textEs: "Sí, los he terminado.", textAm: "Այո՛, ավարտել եմ։" },
      { id: 'b', textEs: "Sí, tengo Matemáticas.", textAm: "Այո՛, մաթեմատիկա ունեմ։" },
      { id: 'c', textEs: "No, es lunes.", textAm: "Ո՛չ, երկուշաբթի է։" },
      { id: 'd', textEs: "Está en la biblioteca.", textAm: "Այն գրադարանում է։" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 7,
    subjectEs: "Comprensión",
    subjectAm: "Հասկանալը",
    questionEs: "Profesora: ¿Has entendido la explicación?",
    questionAm: "Ուսուցչուհի․ Հասկացե՞լ ես բացատրությունը։",
    choices: [
      { id: 'a', textEs: "No, ¿puede repetirlo más despacio?", textAm: "Ո՛չ, կարո՞ղ եք ավելի դանդաղ կրկնել։" },
      { id: 'b', textEs: "Tengo un bocadillo.", textAm: "Ես սենդվիչ ունեմ։" },
      { id: 'c', textEs: "La puerta está abierta.", textAm: "Դուռը բաց է։" },
      { id: 'd', textEs: "Juego al fútbol.", textAm: "Ես ֆուտբոլ եմ խաղում։" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 8,
    subjectEs: "Educación Física",
    subjectAm: "Ֆիզկուլտուրա",
    questionEs: "Profesora: ¿Qué necesitas para la clase de Educación Física?",
    questionAm: "Ուսուցչուհի․ Ի՞նչ է քեզ անհրաժեշտ ֆիզկուլտուրայի դասի համար։",
    choices: [
      { id: 'a', textEs: "Necesito ropa deportiva y zapatillas.", textAm: "Ինձ սպորտային հագուստ և մարզակոշիկներ են անհրաժեշտ։" },
      { id: 'b', textEs: "Necesito un diccionario.", textAm: "Ինձ բառարան է անհրաժեշտ։" },
      { id: 'c', textEs: "Necesito una calculadora.", textAm: "Ինձ հաշվիչ է անհրաժեշտ։" },
      { id: 'd', textEs: "Necesito pintura.", textAm: "Ինձ ներկ է անհրաժեշտ։" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 9,
    subjectEs: "Plataforma escolar",
    subjectAm: "Դպրոցական հարթակ",
    questionEs: "Profesora: ¿Por qué no has enviado la tarea?",
    questionAm: "Ուսուցչուհի․ Ինչո՞ւ չես ուղարկել առաջադրանքը։",
    choices: [
      { id: 'a', textEs: "Porque el archivo no se abre.", textAm: "Որովհետև ֆայլը չի բացվում։" },
      { id: 'b', textEs: "Porque tengo trece años.", textAm: "Որովհետև ես տասներեք տարեկան եմ։" },
      { id: 'c', textEs: "Porque me gusta la música.", textAm: "Որովհետև ինձ դուր է գալիս երաժշտությունը։" },
      { id: 'd', textEs: "Porque la clase es grande.", textAm: "Որովհետև դասարանը մեծ է։" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 10,
    subjectEs: "Biblioteca",
    subjectAm: "Գրադարան",
    questionEs: "Profesora: ¿Qué debes hacer in la biblioteca?",
    questionAm: "Ուսուցչուհի․ Ի՞նչ պետք է անես գրադարանում։",
    choices: [
      { id: 'a', textEs: "Debo hablar muy alto.", textAm: "Պետք է շատ բարձր խոսեմ։" },
      { id: 'b', textEs: "Debo guardar silencio.", textAm: "Պետք է լռություն պահպանեմ։" },
      { id: 'c', textEs: "Debo correr.", textAm: "Պետք է վազեմ։" },
      { id: 'd', textEs: "Debo jugar al fútbol.", textAm: "Պետք է ֆուտբոլ խաղամ։" }
    ],
    correctAnswer: 'b'
  },
  {
    id: 11,
    subjectEs: "Recreo",
    subjectAm: "Դասամիջոց",
    questionEs: "Profesora: ¿Qué haces durante el recreo?",
    questionAm: "Ուսուցչուհի․ Ի՞նչ ես անում դասամիջոցի ժամանակ։",
    choices: [
      { id: 'a', textEs: "Hablo con mis compañeros y como algo.", textAm: "Խոսում եմ դասընկերներիս հետ և ինչ-որ բան եմ ուտում։" },
      { id: 'b', textEs: "Duermo en el aula.", textAm: "Քնում եմ դասարանում։" },
      { id: 'c', textEs: "Hago un examen.", textAm: "Քննություն եմ հանձնում։" },
      { id: 'd', textEs: "Entrego mi pasaporte.", textAm: "Հանձնում եմ անձնագիրս։" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 12,
    subjectEs: "Trabajo en grupo",
    subjectAm: "Խմբային աշխատանք",
    questionEs: "Profesora: ¿Cómo podéis hacer este proyecto?",
    questionAm: "Ուսուցչուհի․ Ինչպե՞ս կարող եք կատարել այս նախագիծը։",
    choices: [
      { id: 'a', textEs: "Podemos trabajar en grupo y repartir las tareas.", textAm: "Կարող ենք աշխատել խմբով և բաժանել առաջադրանքները։" },
      { id: 'b', textEs: "Podemos salir de la escuela.", textAm: "Կարող ենք դուրս գալ դպրոցից։" },
      { id: 'c', textEs: "Podemos cerrar todos los libros.", textAm: "Կարող ենք փակել բոլոր գրքերը։" },
      { id: 'd', textEs: "Podemos no hacer nada.", textAm: "Կարող ենք ոչինչ չանել։" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 13,
    subjectEs: "Historia",
    subjectAm: "Պատմություն",
    questionEs: "Profesora: ¿Quién descubrió América?",
    questionAm: "Ուսուցչուհի․ Ո՞վ է հայտնագործել Ամերիկան։",
    choices: [
      { id: 'a', textEs: "Cristóbal Colón.", textAm: "Քրիստափոր Կոլումբոս։" },
      { id: 'b', textEs: "Leonardo da Vinci.", textAm: "Լեոնարդո դա Վինչի։" },
      { id: 'c', textEs: "Galileo Galilei.", textAm: "Գալիլեո Գալիլեյ։" },
      { id: 'd', textEs: "Marco Polo.", textAm: "Մարկո Պոլո։" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 14,
    subjectEs: "Matemáticas",
    subjectAm: "Մաթեմատիկա",
    questionEs: "Profesora: ¿Cuál es la mitad de cien?",
    questionAm: "Ուսուցչուհի․ Որքա՞ն է հարյուրի կեսը։",
    choices: [
      { id: 'a', textEs: "Veinte.", textAm: "Քսան։" },
      { id: 'b', textEs: "Cuarenta.", textAm: "Քառասուն։" },
      { id: 'c', textEs: "Cincuenta.", textAm: "Հիսուն։" },
      { id: 'd', textEs: "Setenta.", textAm: "Յոթանասուն։" }
    ],
    correctAnswer: 'c'
  },
  {
    id: 15,
    subjectEs: "Ciencias Sociales",
    subjectAm: "Հասարակագիտություն",
    questionEs: "Profesora: ¿Cuál es la capital de España?",
    questionAm: "Ուսուցչուհի․ Ո՞րն է Իսպանիայի մայրաքաղաքը։",
    choices: [
      { id: 'a', textEs: "Madrid.", textAm: "Մադրիդ:" },
      { id: 'b', textEs: "Barcelona.", textAm: "Բարսելոնա:" },
      { id: 'c', textEs: "Sevilla.", textAm: "Սևիլյա:" },
      { id: 'd', textEs: "Valencia.", textAm: "Վալենսիա:" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 16,
    subjectEs: "Tecnología",
    subjectAm: "Տեխնոլոգիա",
    questionEs: "Profesora: ¿Qué usas para escribir un correo electrónico?",
    questionAm: "Ուսուցչուհի․ Ի՞նչ ես օգտագործում էլեկտրոնային նամակ գրելու համար։",
    choices: [
      { id: 'a', textEs: "Un tenedor.", textAm: "Պատառաքաղ։" },
      { id: 'b', textEs: "Un cepillo.", textAm: "Խոզանակ։" },
      { id: 'c', textEs: "Un ordenador.", textAm: "Համակարգիչ։" },
      { id: 'd', textEs: "Una mochila.", textAm: "Ուսապարկ։" }
    ],
    correctAnswer: 'c'
  },
  {
    id: 17,
    subjectEs: "Astronomía",
    subjectAm: "Աստղագիտություն",
    questionEs: "Profesora: ¿Cuál es la estrella más cercana a la Tierra?",
    questionAm: "Ուսուցչուհի․ Ո՞րն է Երկրին ամենամոտ աստղը։",
    choices: [
      { id: 'a', textEs: "La Luna.", textAm: "Լուսինը։" },
      { id: 'b', textEs: "El Sol.", textAm: "Արևը։" },
      { id: 'c', textEs: "Sirio.", textAm: "Սիրիուսը։" },
      { id: 'd', textEs: "Marte.", textAm: "Մարսը։" }
    ],
    correctAnswer: 'b'
  },
  {
    id: 18,
    subjectEs: "Literatura",
    subjectAm: "Գրականություն",
    questionEs: "Profesora: ¿Quién escribió «Don Quijote de la Mancha»?",
    questionAm: "Ուսուցչուհի․ Ո՞վ է գրել «Դոն Կիխոտ»-ը։",
    choices: [
      { id: 'a', textEs: "Miguel de Cervantes.", textAm: "Միգել դե Սերվանտես։" },
      { id: 'b', textEs: "Federico García Lorca.", textAm: "Ֆեդերիկո Գարսիա Լորկա։" },
      { id: 'c', textEs: "Gabriel García Márquez.", textAm: "Գաբրիել Գարսիա Մարկես։" },
      { id: 'd', textEs: "Pablo Neruda.", textAm: "Պաբլո Ներուդա։" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 19,
    subjectEs: "Música",
    subjectAm: "Երաժշտություն",
    questionEs: "Profesora: ¿Qué instrumento tiene teclas blancas y negras?",
    questionAm: "Ուսուցչուհի․ Ո՞ր երաժշտական գործիքն ունի սպիտակ և սև ստեղներ։",
    choices: [
      { id: 'a', textEs: "La guitarra.", textAm: "Կիթառը։" },
      { id: 'b', textEs: "El violín.", textAm: "Ջութակը։" },
      { id: 'c', textEs: "El piano.", textAm: "Դաշնամուրը։" },
      { id: 'd', textEs: "La flauta.", textAm: "Ֆլեյտան։" }
    ],
    correctAnswer: 'c'
  },
  {
    id: 20,
    subjectEs: "Educación Plástica",
    subjectAm: "Կերպարվեստ",
    questionEs: "Profesora: ¿Qué necesitas para dibujar?",
    questionAm: "Ուսուցչուհի․ Ի՞նչ է անհրաժեշտ նկարելու համար։",
    choices: [
      { id: 'a', textEs: "Un lápiz y una hoja de papel.", textAm: "Մատիտ և թղթի թերթ։" },
      { id: 'b', textEs: "Una calculadora y una regla.", textAm: "Հաշվիչ և քանոն։" },
      { id: 'c', textEs: "Un balón y unas zapatillas.", textAm: "Գնդակ և մարզակոշիկներ։" },
      { id: 'd', textEs: "Un diccionario y un mapa.", textAm: "Բառարան և քարտեզ։" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 21,
    subjectEs: "Llegar tarde",
    subjectAm: "Ուշանալ",
    questionEs: "Profesora: ¿Por qué has llegado tarde?",
    questionAm: "Ուսուցչուհի․ Ինչո՞ւ ես ուշացել։",
    choices: [
      { id: 'a', textEs: "Porque el autobús ha llegado tarde.", textAm: "Որովհետև ավտոբուսն ուշ է եկել։" },
      { id: 'b', textEs: "Porque mi cuaderno es azul.", textAm: "Որովհետև իմ տետրը կապույտ է։" },
      { id: 'c', textEs: "Porque hoy tenemos Inglés.", textAm: "Որովհետև այսօր անգլերեն ունենք։" },
      { id: 'd', textEs: "Porque me gusta leer.", textAm: "Որովհետև ես սիրում եմ կարդալ։" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 22,
    subjectEs: "Material escolar",
    subjectAm: "Դպրոցական պարագաներ",
    questionEs: "Profesora: ¿Dónde está tu cuaderno de Ciencias?",
    questionAm: "Ուսուցչուհի․ Որտե՞ղ է քո բնագիտության տետրը։",
    choices: [
      { id: 'a', textEs: "Lo he dejado en casa.", textAm: "Ես այն տանն եմ թողել։" },
      { id: 'b', textEs: "Tengo trece años.", textAm: "Ես տասներեք տարեկան եմ։" },
      { id: 'c', textEs: "La clase termina a las dos.", textAm: "Դասը ավարտվում է ժամը երկուսին։" },
      { id: 'd', textEs: "Me gusta la Biología.", textAm: "Ես սիրում եմ կենսաբանությունը։" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 23,
    subjectEs: "Comedor escolar",
    subjectAm: "Դպրոցական ճաշարան",
    questionEs: "Profesora: ¿Qué haces antes de comer?",
    questionAm: "Ուսուցչուհի․ Ի՞նչ ես անում ուտելուց առաջ։",
    choices: [
      { id: 'a', textEs: "Me lavo las manos.", textAm: "Լվանում եմ ձեռքերս։" },
      { id: 'b', textEs: "Abro el archivo.", textAm: "Բացում եմ ֆայլը։" },
      { id: 'c', textEs: "Entrego los deberes.", textAm: "Հանձնում եմ տնային աշխատանքը։" },
      { id: 'd', textEs: "Juego al fútbol.", textAm: "Ֆուտբոլ եմ խաղում։" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 24,
    subjectEs: "Trabajo en pareja",
    subjectAm: "Զույգով աշխատանք",
    questionEs: "Profesora: Tu compañero no entiende el ejercicio. ¿Qué haces?",
    questionAm: "Ուսուցչուհի․ Քո դասընկերը չի հասկանում վարժությունը։ Ի՞նչ ես անում։",
    choices: [
      { id: 'a', textEs: "Le explico el ejercicio.", textAm: "Բացատրում եմ նրան վարժությունը։" },
      { id: 'b', textEs: "Cierro su libro.", textAm: "Փակում եմ նրա գիրքը։" },
      { id: 'c', textEs: "Me voy del aula.", textAm: "Դուրս եմ գալիս դասարանից։" },
      { id: 'd', textEs: "No le digo nada.", textAm: "Ոչինչ չեմ ասում նրան։" }
    ],
    correctAnswer: 'a'
  }
];
