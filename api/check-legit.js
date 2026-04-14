export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { input, url } = req.body
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

    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}