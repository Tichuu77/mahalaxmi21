import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || 'application/json'

    // Stream the original request body through to web3forms so form-data and JSON work
    const buffer = await req.arrayBuffer()

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': contentType, Accept: 'application/json' },
      body: Buffer.from(buffer),
    })

    const text = await res.text()
    let data = {}
    try { data = text ? JSON.parse(text) : {} } catch (e) { /* ignore parse error */ }

    return NextResponse.json({ success: data.success ?? false, data, status: res.status }, { status: res.status })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
