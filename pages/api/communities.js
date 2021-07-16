import { SiteClient } from 'datocms-client'

export default async function api (request, response) {
  if (request.method === 'POST') {
    const apiKey = 'f694c58a5a828c10b79f27f5812e7e'
    const client = new SiteClient(apiKey)
    const record = await client.items.create({
      itemType: '968403',
      ...request.body
    })

    response.json({
      created: record
    })
  }
}
