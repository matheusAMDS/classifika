import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from 'cloudinary'
import path from 'path'

import cloudinaryConfig from 'config/cloudinary'

cloudinary.v2.config(cloudinaryConfig)

export default {
  storage: new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
      folder: 'classifika_uploads',
      format: async (req, file) => {
        const permittedFiles = [ '.jpg', '.png', '.jpeg' ]
        const ext = path.extname(file.originalname)
        const isPermitted = permittedFiles.includes(ext) && ext
        
        return isPermitted.slice(1,)
      },
      public_id: (req, file) => {
        const originalFilename = file.originalname
        const ext = path.extname(originalFilename)
        const basename = path.basename(originalFilename, ext)
        const filename = `${Date.now()}-${basename}`

        return filename
      }
    }
  })
}