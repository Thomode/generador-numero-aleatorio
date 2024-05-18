import axios from 'axios';

// En la apijs llamamos a los metodos de las distribuciones que se encuentran en el distribucion controller

// Función para llamar al endpoint de distribución exponencial
const llamarDistribucionExponencial = async (lambda, cantidad, intervalos) => {
  const url = `http://localhost:4000/distribuciones/exponencial?lambda=${lambda}&cantidad=${cantidad}&intervalos=${intervalos}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al llamar a la API de distribución exponencial:', error);
    throw error;
  }
};

// Función para llamar al endpoint de distribución normal
const llamarDistribucionNormal = async (media, desviacion, cantidad, intervalos) => {
  const url = `http://localhost:4000/distribuciones/normal?media=${media}&desviacion=${desviacion}&cantidad=${cantidad}&intervalos=${intervalos}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al llamar a la API de distribución normal:', error);
    throw error;
  }
};

// Función para llamar al endpoint de distribución uniforme
const llamarDistribucionUniforme = async (a, b, cantidad, intervalos) => {
  const url = `http://localhost:4000/distribuciones/uniforme?a=${a}&b=${b}&cantidad=${cantidad}&intervalos=${intervalos}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al llamar a la API de distribución uniforme:', error);
    throw error;
  }
};

export { llamarDistribucionExponencial, llamarDistribucionNormal, llamarDistribucionUniforme };
