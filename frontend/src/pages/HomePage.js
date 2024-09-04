import "../styles/components/pages/HomePage.css";

const HomePage = (props) => {
  return (
    <main className="holder">
      <div className="columnas">
        <div className="homeContainer">
          <div className="homeimg">
            <img src="images/home.png" alt="home" />
          </div>
          <div className="bienvenidos left">
            <h2>Bienvenidos</h2>
            <p>
              al gestor de pacientes que transforma la manera en que manejas tu práctica médica. Aquí podrás organizar la información de tus
              pacientes, gestionar citas, y acceder a historiales clínicos con facilidad, todo en un solo lugar.
            </p>
          </div>
        </div>
        <div className="testimonios right">
          <h2>Lo que nuestros usuarios dicen</h2>
          <div className="testimoniosContainer">
            <div className="testimonio">
              <span className="cita">"Desde que usamos este gestor, hemos reducido el tiempo de gestión en un 50%!"</span>
              <span className="autor">- Dr. Juan Pérez, Clínica Salud</span>
            </div>
            <div className="testimonio">
              <span className="cita">"La interfaz es intuitiva y nos permite acceder a toda la información en segundos."</span>
              <span className="autor">- Dra. María Gómez, Hospital Central</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
