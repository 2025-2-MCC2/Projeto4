import "./style.module.css";

export default function FormMembers() {
    return (
      <div>
        <div className="topo">
          <img src="integrante1.png" alt="Ícone de inscrição" />
          <h2>#INSCRIÇÃO</h2>
        </div>
  
        <form action="integrante2.html" method="post">
          {/* Bloco de 1 integrante */}
          <div className="integrante">
            <div>
              <label className="nome">
                Nome completo do integrante<span className="required">*</span>
              </label>
              <br />
              <input className="nome" type="text" name="nome1" required />
            </div>
            <div>
              <label>
                RA<span className="required">*</span>
              </label>
              <br />
              <input type="text" name="ra1" required />
            </div>
            <div>
              <label>
                Curso do aluno<span className="required">*</span>
              </label>
              <br />
              <select className="curso" name="curso1" required>
                <option></option>
                <option>Administração</option>
                <option>Ciências Contábeis</option>
                <option>Ciências Econômicas</option>
              </select>
            </div>
          </div>
  
          <div className="integrante">
            <div>
              <label className="nome">
                Nome completo do integrante<span className="required">*</span>
              </label>
              <br />
              <input className="nome" type="text" name="nome2" required />
            </div>
            <div>
              <label>
                RA<span className="required">*</span>
              </label>
              <br />
              <input type="text" name="ra2" required />
            </div>
            <div>
              <label>
                Curso do aluno<span className="required">*</span>
              </label>
              <br />
              <select className="curso" name="curso2" required>
                <option></option>
                <option>Administração</option>
                <option>Ciências Contábeis</option>
                <option>Ciências Econômicas</option>
              </select>
            </div>
          </div>
  
          <div className="integrante">
            <div>
              <label className="nome">
                Nome completo do integrante<span className="required">*</span>
              </label>
              <br />
              <input className="nome" type="text" name="nome3" required />
            </div>
            <div>
              <label>
                RA<span className="required">*</span>
              </label>
              <br />
              <input type="text" name="ra3" required />
            </div>
            <div>
              <label>
                Curso do aluno<span className="required">*</span>
              </label>
              <br />
              <select className="curso" name="curso3" required>
                <option></option>
                <option>Administração</option>
                <option>Ciências Contábeis</option>
                <option>Ciências Econômicas</option>
              </select>
            </div>
          </div>
  
          <div className="integrante">
            <div>
              <label className="nome">
                Nome completo do integrante<span className="required">*</span>
              </label>
              <br />
              <input className="nome" type="text" name="nome4" required />
            </div>
            <div>
              <label>
                RA<span className="required">*</span>
              </label>
              <br />
              <input type="text" name="ra4" required />
            </div>
            <div>
              <label>
                Curso do aluno<span className="required">*</span>
              </label>
              <br />
              <select className="curso" name="curso4" required>
                <option></option>
                <option>Administração</option>
                <option>Ciências Contábeis</option>
                <option>Ciências Econômicas</option>
              </select>
            </div>
          </div>
  
          <div className="integrante">
            <div>
              <label className="nome">
                Nome completo do integrante<span className="required">*</span>
              </label>
              <br />
              <input className="nome" type="text" name="nome5" required />
            </div>
            <div>
              <label>
                RA<span className="required">*</span>
              </label>
              <br />
              <input type="text" name="ra5" required />
            </div>
            <div>
              <label>
                Curso do aluno<span className="required">*</span>
              </label>
              <br />
              <select className="curso" name="curso5" required>
                <option></option>
                <option>Administração</option>
                <option>Ciências Contábeis</option>
                <option>Ciências Econômicas</option>
              </select>
            </div>
          </div>
  
          <button type="submit" className="button">
            Continuar
          </button>
        </form>
      </div>
    );
  }
  