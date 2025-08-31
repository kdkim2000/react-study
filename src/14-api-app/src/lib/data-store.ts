// src/lib/data-store.ts
import { User } from '@/types/user'

class DataStore {
  private users: User[] = []
  private nextId = 1

  getAllUsers(): User[] {
    return [...this.users]
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id)
  }

  createUser(name: string, email: string): User {
    const now = new Date().toISOString()
    const newUser: User = {
      id: this.nextId++,
      name,
      email,
      createdAt: now,
      updatedAt: now
    }
    this.users.push(newUser)
    return newUser
  }

  updateUser(id: number, updates: Partial<Omit<User, 'id' | 'createdAt'>>): User | null {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex === -1) return null

    const updatedUser = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    this.users[userIndex] = updatedUser
    return updatedUser
  }

  deleteUser(id: number): boolean {
    const initialLength = this.users.length
    this.users = this.users.filter(user => user.id !== id)
    return this.users.length < initialLength
  }
}

export const dataStore = new DataStore()