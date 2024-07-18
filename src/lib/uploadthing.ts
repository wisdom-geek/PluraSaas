import { generateUploadButton, generateUploadDropzone, generateUploader } from '@uploadthing/react'
import { generateReactHelpers } from '@uploadthing/react/hooks'

import type { OurFileRouter } from '@/app/api/uploadthing/core'

// Generate the upload components
export const UploadButton = generateUploadButton<OurFileRouter>()
export const UploadDropzone = generateUploadDropzone<OurFileRouter>()
export const Uploader = generateUploader<OurFileRouter>()

// Generate the hooks for uploading
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>()