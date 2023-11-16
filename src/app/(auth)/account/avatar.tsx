'use client'
import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'

export default function Avatar({ uid, url, size, onUpload }) {
  const supabase = createClientComponentClient()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase])

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }

return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {avatarUrl ? (
      <Image
        width={size}
        height={size}
        src={avatarUrl}
        alt="Avatar"
        className="avatar image"
        style={{ borderRadius: '50%', objectFit: 'cover' }}
      />
    ) : (
      <div className="avatar no-image" style={{ height: size, width: size, borderRadius: '50%', backgroundColor: '#eaeaea' }} />
    )}
    <div style={{ marginTop: '1rem' }}>
      <label htmlFor="single" className="button primary block">
        {uploading ? 'Uploading ...' : 'Upload Avatar'}
      </label>
      <input
        type="file"
        id="single"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
        style={{
          width: '0.1px',
          height: '0.1px',
          opacity: 0,
          overflow: 'hidden',
          position: 'absolute',
          zIndex: -1,
        }}
      />
    </div>
    <style jsx>{`
      .button {
        padding: 0.75rem 1rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: var(--main-accent);
        color: white;
        text-align: center;
        display: inline-block;
        margin-top: 0.5rem;
      }

      .button:hover,
      .button:focus {
        background-color: #0056b3;
      }

      .button:disabled {
        background-color: #999;
        cursor: not-allowed;
      }
    `}</style>
  </div>
)
}