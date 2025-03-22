import { create } from 'zustand'

interface ComplaintState {
  step: number
  complaintType: string
  description: string
  locationAddress: string
  locationNotes: string
  evidenceFiles: File[]
  evidenceDescription: string
  contactFirstName: string
  contactLastName: string
  contactPhone: string
  contactEmail: string
  contactMethod: string
  termsAccepted: boolean
  isSubmitting: boolean
  trackingId?: string
  
  // Actions
  setStep: (step: number) => void
  setComplaintType: (type: string) => void
  setDescription: (desc: string) => void
  setLocationAddress: (address: string) => void
  setLocationNotes: (notes: string) => void
  setEvidenceFiles: (files: File[]) => void
  setEvidenceDescription: (desc: string) => void
  setContactFirstName: (name: string) => void
  setContactLastName: (name: string) => void
  setContactPhone: (phone: string) => void
  setContactEmail: (email: string) => void
  setContactMethod: (method: string) => void
  setTermsAccepted: (accepted: boolean) => void
  setIsSubmitting: (submitting: boolean) => void
  setTrackingId: (id: string) => void
  reset: () => void
}

export const useComplaintStore = create<ComplaintState>((set) => ({
  step: 1,
  complaintType: '',
  description: '',
  locationAddress: '',
  locationNotes: '',
  evidenceFiles: [],
  evidenceDescription: '',
  contactFirstName: '',
  contactLastName: '',
  contactPhone: '',
  contactEmail: '',
  contactMethod: 'phone',
  termsAccepted: false,
  isSubmitting: false,
  trackingId: undefined,

  setStep: (step) => set({ step }),
  setComplaintType: (complaintType) => set({ complaintType }),
  setDescription: (description) => set({ description }),
  setLocationAddress: (locationAddress) => set({ locationAddress }),
  setLocationNotes: (locationNotes) => set({ locationNotes }),
  setEvidenceFiles: (evidenceFiles) => set({ evidenceFiles }),
  setEvidenceDescription: (evidenceDescription) => set({ evidenceDescription }),
  setContactFirstName: (contactFirstName) => set({ contactFirstName }),
  setContactLastName: (contactLastName) => set({ contactLastName }),
  setContactPhone: (contactPhone) => set({ contactPhone }),
  setContactEmail: (contactEmail) => set({ contactEmail }),
  setContactMethod: (contactMethod) => set({ contactMethod }),
  setTermsAccepted: (termsAccepted) => set({ termsAccepted }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setTrackingId: (trackingId) => set({ trackingId }),
  reset: () => set({
    step: 1,
    complaintType: '',
    description: '',
    locationAddress: '',
    locationNotes: '',
    evidenceFiles: [],
    evidenceDescription: '',
    contactFirstName: '',
    contactLastName: '',
    contactPhone: '',
    contactEmail: '',
    contactMethod: 'phone',
    termsAccepted: false,
    isSubmitting: false,
    trackingId: undefined,
  }),
}))