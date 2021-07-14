import { useState } from 'react'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommons'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar (props) {
  return (
    <Box as="aside">
      <img style={{ borderRadius: '8px' }} src={`https://github.com/${props.githubUser}.png`} alt="Avatar" />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home () {
  const githubUser = 'mavortius'
  const [communities, setCommunities] = useState([{
    id: '1',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])
  const favPeople = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini']

  function handleSubmit (e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const community = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      image: formData.get('image')
    }
    const updatedCommunities = [...communities, community]
    setCommunities(updatedCommunities)
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input name="title" type="text"
                       placeholder="Qual vai ser o nome da sua comunidade?"
                       aria-label="Qual vai ser o nome da sua comunidade?" />
              </div>
              <div>
                <input name="image" type="text"
                       placeholder="Coloque uma URL para usarmos de capa"
                       aria-label="Coloque uma URL para usarmos de capa" />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>

            <ul>
              {communities.map((community) => (
                <li key={community.id}>
                  <a href={`/users/${community.title}`} key={community.id}>
                    <img src={community.image} alt={community.title} />
                    <span>{community.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Meus amigos ({favPeople.length})
            </h2>

            <ul>
              {favPeople.map((person) => (
                <li key={person}>
                  <a href={`/users/${person}`} key={person}>
                    <img src={`https://github.com/${person}.png`} alt={person} />
                    <span>{person}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
