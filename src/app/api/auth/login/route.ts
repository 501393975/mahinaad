import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    // Get users from localStorage (client will handle actual auth)
    // This is just a validation endpoint
    // Real authentication happens in AuthContext with localStorage

    return NextResponse.json(
      { uid: Date.now().toString(), email },
      { status: 200 }
    )
  } catch (error: any) {
    let message = 'Login failed'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
