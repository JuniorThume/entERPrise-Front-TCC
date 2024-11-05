import { useAppContext } from "../../context/appContext/hook/useAppContext";

const Home = () => {
  const context = useAppContext();
  return (
    <>
      <div className="grid grid-rows-3 h-full">
        <div>
          <h1 className="text-black">
            Seja bem vindo(a) ao entERPrise,{" "}
            <span className="font-bold">{context.user.username}</span>!
          </h1>
          <p className="text-gray-600">
            Esta é a sua <span className="italic">área privada</span>, onde você
            pode gerenciar suas informações.
          </p>
        </div>
        <div>
          <h3 className="underline mb-2">ATUALIZAÇÕES</h3>
          <p className="indent-5">
            Esta é versão 1.0 do sistema, que conta inicialmente com o
            gerenciamento de produtos!
          </p>
        </div>
        <div>
          <h3 className="underline">SUGESTÕES</h3>
          <p className="w-1/2">
            Caso queira indicar alguma funcionalidade que o software possa ter,
            apontar bugs ou algo relacionado ao sistema, entre em contato pelo
            canais abaixo:
          </p>
          <ul className="mt-4">
            <li>
              E-mail Institucional:{" "}
              <a
                href="mailto:valmirthume.aluno@unipampa.com"
                className="text-blue-600 underline"
              >
                valmirthume.aluno@unipampa.com
              </a>
            </li>
            <li>
              E-mail Pessoal:{" "}
              <a
                href="mailto:thumejuniorvalmir@gmail.com"
                className="text-blue-600 underline"
              >
                thumejuniorvalmir@gmail.com
              </a>
            </li>
            <li>
              LinkedIn: {' '}
              <a href="https://www.linkedin.com/in/valmir-thume-junior/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer"> https://www.linkedin.com/in/valmir-thume-junior/</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
