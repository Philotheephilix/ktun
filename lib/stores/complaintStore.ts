// store/complaintStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Complaint {
  id: string
  complaintType: string
  description: string
  locationAddress: string
  evidenceFiles: File[]
  contactEmail: string
  createdAt: Date
}

interface ComplaintState {
  complaints: Complaint[]
  addComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt'>) => void
}

export const useComplaintStore = create<ComplaintState>()(
  persist(
    (set) => ({
      complaints: [],
      addComplaint: (newComplaint) => {
        const randomLetters = Array(5)
          .fill(0)
          .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
          .join('');
        
        const complaintWithId: Complaint = {
          ...newComplaint,
          id: `${randomLetters}}`,
          createdAt: new Date(),
        }
        set((state) => ({
          complaints: [...state.complaints, complaintWithId]
        }))
      }
    }),
    {
      name: 'complaint-storage', // Unique name for localStorage
    }
  )
)