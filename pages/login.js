import { useState } from 'react'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { BASE_URL } from '../src/lib/AluraCommons'

export default function Login () {
  const router = useRouter()
  const [githubUser, setGithubUser] = useState('')

  function handleSubmit (e) {
    e.preventDefault()

    fetch(BASE_URL + 'api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ githubUser })
    })
      .then(async (response) => {
        const data = await response.json()
        nookies.set(null, 'USER_TOKEN', data.token, {
          path: '/',
          maxAge: 86400 * 7
        })
        await router.push('/')
      })
  }

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src={`${BASE_URL}logo.svg`} alt="Logo" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={handleSubmit}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input placeholder="Usuário" value={githubUser}
                   onChange={(e) => setGithubUser(e.target.value)} />
            <button type="submit" disabled={githubUser.length === 0}>
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>ENTRAR JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Alurakut.br</a> - <a href="/">Centro de segurança</a> - <a
            href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
}