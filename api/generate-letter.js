export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { profile, opp, tone, stage } = await req.json()

    const toneLabel =
      tone < 30 ? 'formal and professional' :
      tone < 55 ? 'balanced and clear' :
      tone < 80 ? 'warm and conversational' : 'friendly and casual'

    const prompt = `You are an expert career coach helping a student write a ${stage} for a job application.

Student Profile:
- Name: ${profile.name || 'the student'}
- School: ${profile.school || 'their university'}
- Major: ${profile.major || 'their field'}
- Year: ${profile.year || ''}
- Visa Status: ${profile.visa_status || ''}

Opportunity:
- Title: ${opp.title}
- Organization: ${opp.org}
- Location: ${opp.location || ''}
- Type: ${opp.type}

Write a ${stage} in a ${toneLabel} tone. Make it personal, specific to this opportunity, and highlight that the student brings a diverse international perspective. Keep it under 400 words. Do not include any explanation or preamble — just write the letter directly.`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()
    const letter = data.content[0].text

    return new Response(JSON.stringify({ letter }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

