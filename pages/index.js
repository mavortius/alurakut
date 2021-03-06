import { useEffect, useState } from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, BASE_URL, OrkutNostalgicIconSet } from '../src/lib/AluraCommons'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

const githubUrl = 'https://github.com/'
const githubApiUsersUrl = 'https://api.github.com/users/'
const datoCmsUrl = 'https://graphql.datocms.com'

function ProfileSidebar (props) {
  return (
    <Box as="aside">
      <img style={{ borderRadius: '8px' }} src={`${githubUrl}${props.githubUser}.png`} alt="Avatar" />
      <hr />

      <p>
        <a className="boxLink" href={`${githubUrl}${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox (props) {
  return <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {props.title} ({props.items.length})
    </h2>
    <ul>
      {props.items.slice(0, 6).map((item) => (
        <li key={item.id}>
          <a href={`${githubUrl}${item.login}`}>
            <img src={`${githubUrl}${item.login}.png`} alt={item.login} />
            <span>{item.login}</span>
          </a>
        </li>
      ))}
    </ul>
  </ProfileRelationsBoxWrapper>
}

export default function Home (props) {
  const [communities, setCommunities] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const githubUser = props.githubUser
  const followersUrl = `${githubApiUsersUrl}${githubUser}/followers`
  const followingUrl = `${githubApiUsersUrl}${githubUser}/following`

  useEffect(() => {
    Promise.all([
      fetch(followersUrl)
        .then((response) => response.json())
        .then((data) => setFollowers(data)),
      fetch(followingUrl)
        .then((response) => response.json())
        .then((data) => setFollowing(data)),
      fetch(datoCmsUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'bd60ca8231287bbb3039ca33540160',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'query': `query { 
        allCommunities {
            id 
            title
            imageUrl
            creatorSlug 
          } 
        }
      `
        })
      })
        .then((response) => response.json())
        .then((jsonData) => setCommunities(jsonData.data.allCommunities))
    ])
  }, [])

  function handleSubmit (e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const community = {
      title: formData.get('title'),
      imageUrl: formData.get('image'),
      creatorSlug: githubUser
    }

    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(community)
    })
      .then(async (response) => {
        const data = await response.json()
        const updatedCommunities = [...communities, data.created]
        setCommunities(updatedCommunities)
      })
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
            <h2 className="subTitle">O que voc?? deseja fazer?</h2>
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
          <ProfileRelationsBox title="Seguidores" items={followers} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>

            <ul>
              {communities.map((community) => (
                <li key={community.id}>
                  <a href={`/communities/${community.title}`} key={community.id}>
                    <img src={community.imageUrl} alt={community.title} />
                    <span>{community.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBox title="Seguindo" items={following} />
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps (context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  const response = await fetch(BASE_URL + 'api/auth', {
    headers: {
      Authorization: token
    }
  })
  const { isAuthenticated } = await response.json()

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { githubUser } = jwt.decode(token)

  return {
    props: {
      githubUser,
      isAuthenticated
    }
  }
}
