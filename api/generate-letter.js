export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { profile, opp, tone, stage } = req.body

    const toneLabel =
      tone < 30 ? 'formal and professional' :
      tone < 55 ? 'balanced and clear' :
      tone < 80 ? 'warm and conversational' : 'friendly and casual'

   const prompt = `You are an expert career coach helping a student write a ${stage} for a job application.

Student Profile:
- Name: ${profile.name || '[YOUR NAME]'}
- School: ${profile.school || '[YOUR SCHOOL]'}
- Major: ${profile.major || '[YOUR MAJOR]'}
- Year: ${profile.year || '[YOUR YEAR]'}
- Visa Status: ${profile.visa_status || '[YOUR VISA STATUS]'}

Opportunity:
- Title: ${opp.title}
- Organization: ${opp.org}
- Location: ${opp.location || ''}
- Type: ${opp.type}

Write a ${stage} in a ${toneLabel} tone. Use the student's actual name and details from their profile above. For any information that is missing or marked with brackets, keep the bracket placeholder in the letter so the student knows to fill it in — for example [YOUR SCHOOL] or [ADD YOUR GPA HERE].

Make it personal and specific to ${opp.org}. Highlight that the student brings a diverse international perspective if they are an international student. Keep it under 400 words. Do not include any explanation or preamble — just write the letter directly starting with Dear.`

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

    return res.status(200).json({ letter })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}