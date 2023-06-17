<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
interface Member {
    name: string,
    email: string,
    bio: string,
    institucion: string,
    role: string,
    foto?: string,
    id?: string,
    iso?: string,
    country?: string,
}
interface NetworkCountry {
    country: string,
    iso: string,
    icon: string,
    members: Member[]
}

const members = reactive<NetworkCountry[]>([
    {
        country: "Argentina",
        iso: "ar",
        icon: "https://flagcdn.com/w20/ar.png",
        members: [
            {
                name: "Pedro Darío Zapata",
                email: "pedro.zapata@unam.edu.ar",
                bio: "Me dedico a la aplicación de la biología molecular y la bioquímica a diversos campos de la biotecnología, buscando pormocionar el desarrollo de tecnología innovadora en los campos de importancia regional y nacional. Por ejemplo producción de enzimas y aplicación a diversos bioprocesos, desarrollo de bioproductos bioactivos como fertilizantes, bioinsecticidas, biofungicidas, etc.Además mediante las técnicas de la biología molecular se busca optimizar la aplicación de la ingeniería genética y otros recursos para profundizar en el conocimiento y las aplicaciones en las áreas mencionadas. Actualmente Secretario General de Ciencia y Tecnología de la Univ. Nacional de Misiones",
                institucion: "Universidad Nacional de Misiones",
                role: "Miembro",
                id: "b41ad2d4-ec1c-11ed-a05b-0242ac120003",
                foto: "https://i.ibb.co/72Bhbjj/b41ad2d4-ec1c-11ed-a05b-0242ac120003.jpg"
            },

        ],
    },

    {
        country: "Chile",
        iso: "cl",
        icon: "https://flagcdn.com/w20/cl.png",
        members: [
            {
                name: "Beatriz Millán Jara",
                email: "bmillan@udec.cl",
                bio: "Ingeniera Comercial, Magíster en Gestión Tecnológica. Con más de 15 años de experiencia en la industria y organizaciones sociales. Especialista en temas de emprendimiento e innovación. Sus actividades se vinculan con emprendedores y organizaciones del ecosistema de innovación y emprendimiento nacional e internacional. En el 2015, fue beneficiada en 'Teaching Fellow Program' de Babson College USA. Participó en el Programa 'Silicon Valley Experiential Lerning Program' (2014),UC Berkeley University, USA, y tiene la certificación del programa  'The Five Disciplines of Innovation', Stanford Research Institute (2012). Lidera la Incubadora de Empresas de la UdeC hace 9 años, y tiene a cargo las acciones de la Incubadora  y la vinculación con el entorno, emprendedores y empresarios para levantar nuevos proyectos innovadores, para la creación de empresas de alto potencial de crecimiento que generen impacto social y económico. A partir del año 2020, cargo de la creación de la Red de Mentores IU de la Universidad de Concepción, con un fuerte componente tecnológico y de innovación.",
                institucion: "IncubaUdeC Universidad de Concepción",
                role: "Miembro",
                id: "fd3f75be-ec1c-11ed-a05b-0242ac120003",
                foto: "https://i.ibb.co/rw6rFmk/fd3f75be-ec1c-11ed-a05b-0242ac120003.jpg",
            },
        ],
    },
    {
        country: "Colombia",
        iso: "co",
        icon: "https://flagcdn.com/w20/co.png",
        members: [
            {
                name: "Juan Manuel Montes Hincapie",
                email: "jmontes@udemedellin.edu.co",
                bio: "Juan Manuel Montes Hincapie (https://orcid.org/0000-0002-2014-2431) is an Associate Professor of the Administration PhD and Leader of the CITIE Research Group (Science, Technology, Innovation, and Entrepreneurship) at the University of Medellín (Colombia). He is a Chemical Engineer from the University of Antioquia (Colombia) and a PhD in Technological Innovation Projects in product and process engineering from the Polytechnic University of Catalunya (Spain). Likewise, he is a Senior Researcher recognised by the Ministry of Science, Technology, and Innovation of Colombia. His research lines are Technological innovation projects in product and process engineering; Management of science, technology, and innovation; Technology watch and competitive intelligence. ",
                institucion: "Universidad de Medellín",
                role: "Miembro",
                id: "5a6965b0-ec1d-11ed-a05b-0242ac120003",
                foto: "https://i.ibb.co/zsmBtYD/5a6965b0-ec1d-11ed-a05b-0242ac120003.jpg",
            },
        ],
    },
    {
        country: "Ecuador",
        iso: "ec",
        icon: "https://flagcdn.com/w20/ec.png",
        members: [
            {
                name: "Guido Caicedo Rossi",
                email: "caicedo@espol.edu.ec",
                bio: "Director Ejecutivo de i3LAB, ​Profesor de postgrado en ESPAE Graduate School of Management, ESPOL pregrado.​  Profesor de pregrado en la Escuela Superior Politécnica del Litoral, ESPOL​.  Miembro del Directorio Global Entrepreneurship Network GEN, Ecuador. Consultor Independiente​ ​Master en computación, por State University of New York, e Ingeniero en Computación por la Escuela Superior Politécnica del Litoral.​ Cuenta con certificaciones en Innovación, Tecnología y Negocios. Entre las empresas que ha atendido están: Novacero, Easymetering, Ecológico, targetsoft entre otras.  Además, ha sido mentor de algunas stratups notables de la ciudad tales como:   Shippify, Freaky Creations, Armarium, Red Fénix, Biodynamics, Blue Sensor, entre otras.   Es Director del programa de Innovación Institucional “Innovacción” de ESPOL. ​",
                institucion: "Centro de Emprendimiento e Innovación i3 lab -ESPOL",
                role: "Miembro",
                id: "9a333dba-ec1d-11ed-a05b-0242ac120003",
                foto: "https://i.ibb.co/1qbf0vX/i3lab-13-Johanna-Pelay.jpg",
            },
            {
                name: "Johanna Pelay Fajardo",
                email: "jpelay@espol.edu.ec",
                bio: "Johanna Pelay, MBA se especializa en el desarrollo del relacionamiento con el sector productivo en el Centro de Emprendimiento e Innovación i3 lab de la Escuela Superior Politécnica del Litoral-ESPOL, Ecuador; tales como los Desafíos de Innovación; es co-organizadora de la Semana Innovación i3 Week;  coordina el programa de Innovación Institucional llamado “Innovacción”, es la coordinadora  de los programas y talleres de innovación ofertados al sector productivo. Es docente de la materia de emprendimiento e innovación en la ESPOL,  es mentora de los Bootcamps en la   Escuela de Negocios de la ESPOL- ESPAE Ademas, trabajó en la industria naviera por 7 años llegando a puestos gerenciales. Fue cofundadora de Ecuadorian Goods, empresa de exportación de productos ecuatorianos al mercado internacional en Asia Pacífico, Europa, y EEUU.​",
                institucion: "Centro de Emprendimiento e Innovación i3 lab -ESPOL",
                role: "Miembro",
                id: "bdfdf014-ec1d-11ed-a05b-0242ac120003",
                foto: "https://i.ibb.co/1sBC35Y/bdfdf014-ec1d-11ed-a05b-0242ac120003.jpg",
            },
        ],
    },
    {
        country: "España",
        iso: "es",
        icon: "https://flagcdn.com/w20/es.png",
        members: [
            {
                name: "Jacqueline Tatiana Hidrobo Morales",
                email: "jacqueline.tatiana.hidrobo@upc.edu",
                bio: "Ph.D. research en Sostenibilidad por la Universidad Politécnica de Catalunya . Máster en Administración de Empresas especialidad Dirección Estratégica por la Universidad Politécnica de Catalunya   y Maestría en Investigación Empresarial por la Universidad de Barcelona. Ingeniera Comercial por la Universidad Alfredo Pérez Guerrero. Experta en Project management, capacidad de organización, liderazgo, comunicación efectiva, capacidad de negociación, identificación del problema y experta en manejo de gestión por resultados. ​",
                institucion: "Universitat Politécnica de Catalunya (UPC)",
                role: "Miembro",
                id: "a17d9882-db75-462b-93ca-2618cd929b1b",
                foto: "https://i.ibb.co/zhBcWDq/a17d9882-db75-462b-93ca-2618cd929b1b.jpg"
            },

            {
                name: "Juan Carlos Marcillo Delgado",
                email: "jacqueline.tatiana.hidrobo@upc.edu",
                bio: "Juan C. Marcillo-Delgado, Licenciado en Gestión Económica (Université Jean Monnet Saint Etienne; Francia, 2011), Ingeniero en Ciencias Económicas y Financieras (EPN, 2012), Máster en Dirección de Empresas MBA (EPN, 2016), Máster en Estadística e Investigación Operativa (Universidad Politécnica de Cataluña, 2018), Postgrado profesional en Sistemas de Información Geográfica (Universidad de Girona, 2019), Programa de Doctorado en Sostenibilidad (Estudiante de doctorado, UPC, 2018-2022). Su campo laboral se ha centrado en el manejo de bases de datos, manejo de información de proyectos, análisis de procesos estadísticos, análisis de cuantificación de riesgos, evaluación educativa. Sus intereses de investigación se centran en modelos estadísticos aplicados a la innovación y la comunicación para la reducción del riesgo de desastres. orcid.org/0000-0002-1991-7498​",
                institucion: "Universitat Politécnica de Catalunya (UPC)",
                role: "Miembro",
                id: "fa9b7ad7-4551-4b83-bee0-5fc965ad3402",
                foto: "https://i.ibb.co/dJNjVS2/fa9b7ad7-4551-4b83-bee0-5fc965ad3402.jpg"
            },
        ],
    },
    {
        country: "Guatemala",
        iso: "gt",
        icon: "https://flagcdn.com/w20/gt.png",
        members: [
            {
                name: "Waleska Argueta de Oliva",
                email: "wargueta@galile.edu",
                bio: "Licenciada en Química Farmacéutica de la USAC. Máster Productividad en Ciencias de la Salud de Universidad Galileo. Máster en Propiedad Intelectual e Innovación de Universidad de San Andrés de Argentina.​",
                institucion: "Universidad Galileo/CITEC",
                role: "Miembro",
                id: "5864df8a-7579-4450-a8c9-9deedac4b334",
                foto: "https://i.ibb.co/DtMjtg8/5864df8a-7579-4450-a8c9-9deedac4b334.jpg",
            },
        ],
    },
    {
        country: "Panamá",
        iso: "pa",
        icon: "https://flagcdn.com/w20/pa.png",
        members: [
            {
                name: "Zoila Yadira Guerra de Castillo ",
                email: "zoila.castillo@utp.ac.pa",
                bio: "Profesora Regular Titular por más de 35 años en la Universidad Tecnológica de Panamá. Líder de investigación del Centro de Innovación e Investigación en Logística y Cadena de Suministros (CIILCA). Miembro de IEEE, SCALE-MIT Network, Coordinadora de la Red de I+D CECIAC. Reconocida como Pionera de las Ciencias en Panamá. Consultora internacional en Logística, Supply Chain, Data Analytics, Optimización estocástica, Innovación. Diversas publicaciones. ​",
                institucion: "Universidad Tecnológica de Panamá ",
                role: "Miembro",
                id: "de85f9e4-430b-4918-b853-a4fd383121f8",
                foto: "https://i.ibb.co/3Cc3dBv/IMG-1276-zoila-castillo.jpg"
            },
        ],
    },
    {
        country: "Perú",
        iso: "pe",
        icon: "https://flagcdn.com/w20/pe.png",
        members: [
            {
                name: "José David Esquicha Tejada",
                email: "jesquicha@ucsm.edu.pe",
                bio: "Doctor. José David Esquicha Tejada, jesquicha@ucsm.edu.pe, es ingeniero de Sistemas, con un master en Dirección Estratégica de Telecomunicaciones en la Universidad Europea Miguel de Cervantes (España). Posee Título Profesional de una Segunda Especialidad en Auditoria de Sistemas y Seguridad de Información en la Universidad Católica de Santa María (Perú), es Doctor en Ciencias Ambientales y Energías Renovables, cuenta con publicaciones internacionales registradas y proyectos financiados por la Universidad Católica de Santa María, la Universidad Nacional de San Agustín de Arequipa e Internacionales. El Dr. Esquicha es profesor ordinario a tiempo parcial, es el coordinador E-quipu Santa María (Semilleros de Investigación). Sus áreas de investigación son Internet de las Cosas y la innovación educativa​",
                institucion: "Universidad Católica de Santa María",
                role: "Miembro",
                id: "65e4f3c7-85c9-4287-b023-8b71d52779c1",
                foto: "https://i.ibb.co/vvMTbkg/65e4f3c7-85c9-4287-b023-8b71d52779c1.jpg"
            },
            {
                name: "Karina Rosas Paredes",
                email: "kparedes@ucsm.edu.pe",
                bio: "Doctora en Ingeniería de Sistemas, Magister en Sistemas de Información y en Educación Superior. Certificacion CCNA CISCO. Coordinador del Área de Ingenierías del CICA-UCSM. Investigador en tecnologías de la Información. Directora de Innovación y Desarrollo Vicerrectorado de Investigación Universidad Católica de Santa María, Perú​",
                institucion: "Universidad Católica de Santa María",
                role: "Miembro",
                id: "224ee74e-6b1f-47ad-b111-117f43b7403e",
                foto: "https://i.ibb.co/XX2fgL1/224ee74e-6b1f-47ad-b111-117f43b7403e.jpg"
            },
            {
                name: "José Huerta Delgado",
                email: "jhuertad@ucsm.edu.pe",
                bio: "Magister en Administración y Dirección de Proyectos en UPC, certificado CAPM - PMI.  Actualmente trabajando en formulación, gestión de proyectos, docencia  en UCSM, Coordinador de Incubadora INNICIA y coordinador de innovación abierta en el proyecto DER 2.0 de Arequipa. Titulado con felicitaciones públicas de la Escuela Profesional de Ingeniería Comercial con especialidad de Economía de la Universidad Católica de Santa María. Especializado en Gestión de Proyectos con enfoque PMI de la Pontificia Universidad Católica del Perú​",
                institucion: "Incubadora de Empresas INNICIA",
                role: "Miembro",
                id: "3a87452b-73f6-4c4d-91c2-6d981f8d3b3d",
                foto: "https://i.ibb.co/0qZNTDy/3a87452b-73f6-4c4d-91c2-6d981f8d3b3d.png",
            },
        ],
    },
]);
const selected = ref("ALL");

const membersSelected = computed(() => {
    const data: Member[] = [];
    if (selected.value == "ALL") {
        members.forEach((e) => data.push(...e.members.map((m) => { return { ...m, iso: e.icon, country: e.country } })))
    }
    return data;
})

</script>
<template>
    <q-page padding>

        <div class="row flex justify-center items-center" style="height: 350px;">
            <div class="col-12 items-center">
                <div class="text-h3 text-bold text-secondary text-center">
                    Conoce a nuestros <span class="text-primary">Miembros</span>
                </div>
                <div class="subtitle2 text-center text-secondary q-mt-md">
                    Descubre a los especialistas de CECIAC que hacen posible la innovación y el crecimiento empresarial.
                </div>
                <!--<div class="flex justify-center items-center flex-wrap">
                    <q-chip size="sm" color="secondary" text-color="white" v-for="(tag, idx) in members" :key="idx">
                        <q-avatar>
                            <img :src="tag.icon">
                        </q-avatar>
                        <strong> {{ tag.country }}</strong>
                    </q-chip>
                </div>-->
            </div>



        </div>

        <div class="gallery">
            <div v-for="(member, key) in membersSelected" :key="key">
                <div class="main-card-container">
                    <q-card class="card-flip" flat>

                        <div class="front">
                            <q-img :src="member.foto" spinner-color="primary" spinner-size="82px" height="75%" width="100%"
                                style="border-radius: 15px 15px 0px 0px;" />
                            <q-card-section>

                                <div>
                                    <div class="text-subtitle2 text-primary">
                                        <small>{{ member.institucion }}</small>
                                    </div>
                                    <div class="text-secondary text-bold subtitle1 flex justify-between">
                                        <span>
                                            {{ member.name }}
                                        </span>
                                        <q-chip size="sm" color="secondary" text-color="white">
                                            <q-avatar>
                                                <img :src="member.iso">
                                            </q-avatar>
                                            {{ member.country }}
                                        </q-chip>
                                    </div>
                                </div>
                            </q-card-section>
                        </div>
                        <div class="back bg-secondary text-white" style="border-radius: 15px;">
                            <span class="text-bold text-primary">Resumen: </span>
                            {{ member.bio }}
                        </div>


                    </q-card>
                </div>
            </div>
        </div>


    </q-page>
</template>
<style lang="scss">
.main-card-container {
    position: relative;
    height: 100%;
    width: 100%;

    border-radius: 15px;
}

.card-flip {
    width: 100%;
    position: absolute;
    border-radius: 15px;
    height: 100%;
    transform-style: preserve-3d;
    transition: all 0.5s ease;
}

.card-flip:hover {
    transform: rotateY(180deg);
}

.front {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
}

.back {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    transform: rotateY(180deg);

    padding: 25px;
}

.gallery {
    display: grid;
    gap: 5rem;
    grid-auto-rows: 35rem;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}


@media (max-width: $breakpoint-md-min) {
    .gallery {
        display: grid;
        gap: 1rem;
        grid-auto-rows: 30rem;
        grid-template-columns: 1fr;
    }
}
</style>