import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraCommons'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar (props) {
  return (
    <Box>
      <img style={{ borderRadius: '8px' }} src={`https://github.com/${props.githubUser}.png`} alt="Avatar" />
    </Box>
  )
}

export default function Home () {
  const githubUser = 'mavortius'
  const favPeople = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini']

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
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favPeople.length})
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
