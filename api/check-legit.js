export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { input, url } = await req.json()
    const content = input || url

    const prompt = `You are a fraud detection expert helping international students identify scam internships, fake scholarships, and fraudulent job postings.

Analyze the following opportunity description or URL and provide a legitimacy assessment:

"${content}"

Respond with a JSON object in this exact format with no other text:
{
  "score": <number 0-100>,
  "verdict": "<safe|warning|danger>",
  "label": "<short verdict label>",
  "sub": "<one sentence summary>",
  "checks": [
    { "s": "<pass|warn|fail>", "title": "<check name>", "detail": "<explanation>" },
    { "s": "<pass|warn|fail>", "title": "<check name>", "detail": "<explanation>" },
    { "s": "<pass|warn|fail>", "title": "<check name>", "detail": "<explanation>" },
    { "s": "<pass|warn|fail>", "title": "<check name>", "detail": "<explanation>" },
    { "s": "<pass|warn|fail>", "title": "<check name>", "detail": "<explanation>" }
  ]
}

Score guide: 80-100 = legitimate, 50-79 = suspicious, 0-49 = likely scam.
Check for: upfront fees, vague descriptions, non-official email domains, unrealistic pay, missing org info, visa restrictions not disclosed, pressure tactics.`

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
    const text = data.content[0].text
    const result = JSON.parse(text)

    return new Response(JSON.stringify(result), {
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

