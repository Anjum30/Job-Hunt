import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const USERS_KEY = 'jh_users'
const SESSION_KEY = 'jh_session'
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }

const toHex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
const fromHex = (hex) => Uint8Array.from(hex.match(/.{2}/g).map((h) => parseInt(h, 16)))

// Salted PBKDF2 hash so plain passwords are never stored.
async function hashPassword(password, saltHex) {
  const salt = saltHex ? fromHex(saltHex) : crypto.getRandomValues(new Uint8Array(16))
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256)
  return { salt: toHex(salt), hash: toHex(bits) }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => read(SESSION_KEY, null))

  const startSession = (u) => {
    const session = { id: u.id, name: u.name, email: u.email }
    write(SESSION_KEY, session)
    setUser(session)
  }

  const register = async ({ name, email, password }) => {
    const users = read(USERS_KEY, [])
    const mail = email.trim().toLowerCase()
    if (users.some((u) => u.email === mail)) throw new Error('An account with this email already exists.')
    const { salt, hash } = await hashPassword(password)
    const u = { id: crypto.randomUUID(), name: name.trim(), email: mail, salt, hash }
    write(USERS_KEY, [...users, u])
    startSession(u)
  }

  const login = async ({ email, password }) => {
    const mail = email.trim().toLowerCase()
    const u = read(USERS_KEY, []).find((x) => x.email === mail)
    const bad = new Error('Incorrect email or password.')
    if (!u) throw bad
    const { hash } = await hashPassword(password, u.salt)
    if (hash !== u.hash) throw bad
    startSession(u)
  }

  const logout = () => {
    try { localStorage.removeItem(SESSION_KEY) } catch {}
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>
}
