import "./style.module.css";
import imageForm from "../../../assets/formImg1.png";

export default function FormInitial() {
    return (
      <div className="area">
        <div className="left">
          <img src={imageForm} alt="Lideranças Empáticas img" />
        </div>
  
        <div className="right">
          <h1>#INSCRIÇÃO</h1>
          <form action="integrante1.html" method="get">
            <div>
              <label htmlFor="nome">
                Nome completo<span className="required">*</span>
              </label>
              <br />
              <input type="text" id="nome" name="nome" required />
            </div>
  
            <div>
              <label htmlFor="ra">
                RA<span className="required">*</span>
              </label>
              <br />
              <input type="text" id="ra" name="ra" required />
            </div>
  
            <div>
              <label htmlFor="curso">
                Curso<span className="required">*</span>
              </label>
              <br />
              <input type="text" id="curso" name="curso" required />
            </div>
  
            <div>
              <label htmlFor="grupo">
                Nome do grupo<span className="required">*</span>
              </label>
              <br />
              <input type="text" id="grupo" name="grupo" required />
            </div>
  
            <button type="submit">Continuar</button>
          </form>
        </div>
      </div>
    );
  }
  