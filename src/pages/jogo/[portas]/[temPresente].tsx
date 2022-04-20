import { useEffect, useState } from "react";
import Porta from "../../../components/Porta";
import { atualizarPortas, criarPortas } from "../../../functions/porta";
import styles from "../../../styles/Jogo.module.css"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Jogo() {
  const router = useRouter()
  const [valido, setValido] = useState(false)
  const [portas, setPortas] = useState([])

  useEffect(() => {
    let portas = +router.query.portas
    let temPresente = +router.query.temPresente

    const qtdePortasValida = portas >= 3 && portas <= 100
    const temPresenteValido = temPresente >= 1 && temPresente <= portas
  
    setValido(qtdePortasValida && temPresenteValido)
  }, [portas, router?.query])

  useEffect(() => {
    let portas = +router.query.portas
    let temPresente = +router.query.temPresente
    setPortas(criarPortas(portas, temPresente))
  }, [router?.query])
  

  function renderizarPortas(){
    return portas.map(porta => {
      return <Porta key={porta.numero} value={porta} 
        onChange={novaPorta => setPortas(atualizarPortas(portas, novaPorta))}/>     
    })
  }

  return (
    <div className={styles.jogo}>
      <div className={styles.portas}>
          {valido ?
           renderizarPortas() : <h2>Valores inválidos!</h2>
          }
      </div>
      <div className={styles.botoes}>
          <Link href="/" passHref>
              <button>Reiniciar Jogo</button>
          </Link>
      </div>    
    </div>
  )
}