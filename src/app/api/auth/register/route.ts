import { NextResponse } from 'next/server'

interface User {
  uid: string
  email: string
  password: string
  name: string
}

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    // Get existing users from localStorage (simulated on server)
    // In a real app, you'd use a database
    let users: User[] = []
    try {
      const existingData = await request.text()
      if (existingData) {
        users = JSON.parse(existingData)
      }
    } catch {
      users = []
    }

    // Check if user already exists
    const userExists = users.find((u: User) => u.email === email)
    if (userExists) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
    }

    // Create new user
    const uid = Date.now().toString()
    const newUser: User = {
      uid,
      email,
      password, // In production, this should be hashed!
      name
    }

    // In production, save to actual database
    // For now, this is handled by the client-side localStorage in AuthContext
    
    return NextResponse.json(
      { uid, email, name },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 400 })
  }
}
