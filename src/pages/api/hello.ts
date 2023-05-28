import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'


interface GenerateNextApiRequest extends NextApiRequest {
    body: {
      prompt: string
    }
}

const configuration = new Configuration({
    apiKey: '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'
  })
  
  const openai = new OpenAIApi(configuration)

export default async function handler(req: GenerateNextApiRequest, res: NextApiResponse) {

    const prompt = req.body.prompt

    if(!prompt || prompt === ''){
        return new Response('your Prompt', { status: 400 })
    }

  const payload = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${prompt}`,
    temperature: 0.9,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    max_tokens: 2048,
  });
  const stream = payload.data.choices[0].text?.trim()
  res.json({text: stream})
}
  