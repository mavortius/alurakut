import { SiteClient } from 'datocms-client'

export default async function api (request, response) {
  if (request.method === 'POST') {
    const apiKey = process.env.DATOCMD_API_TOKEN
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
