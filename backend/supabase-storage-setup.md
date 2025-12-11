# Supabase Storage Setup for Ebooks and Media Files

This guide explains how to set up Supabase Storage to manage ebooks, course media, user uploads, and other file assets for your LMS.

## Current File Storage Analysis

Currently, the LMS stores files in the local filesystem:
- Ebooks in `/ebooks/` directory (16 PDF files)
- Images in `/images/` directory
- Videos in `/videos/` directory
- Downloadable resources in `/downloads/` directory

## Benefits of Supabase Storage

1. **Scalability**: Automatically scales with your storage needs
2. **Global CDN**: Files served from edge locations worldwide
3. **Security**: Fine-grained access control with RLS policies
4. **Backup**: Automatic backups and redundancy
5. **Integration**: Seamless integration with Supabase Auth and Database
6. **Performance**: Optimized delivery with caching
7. **Management**: Easy file management through dashboard or API

## Storage Bucket Structure

We'll organize files into logical buckets:

### 1. Ebooks Bucket
- Purpose: Store all educational ebooks and PDF resources
- Path: `ebooks/`
- Public access for published ebooks
- Private access for draft/unpublished ebooks

### 2. Courses Bucket
- Purpose: Store course materials, videos, and resources
- Path: `courses/{course_id}/{module_id}/`
- Access controlled by enrollment
- Versioned for content updates

### 3. User Uploads Bucket
- Purpose: Store user-generated content
- Path: `user-uploads/{user_id}/`
- Private to each user
- Quota management

### 4. Public Assets Bucket
- Purpose: Store publicly accessible assets (logos, thumbnails, etc.)
- Path: `public/`
- Public read access
- Admin write access

### 5. Avatars Bucket
- Purpose: Store user profile pictures
- Path: `avatars/`
- Public read access
- User write access to their own avatar

## Setting Up Storage Buckets

### 1. Create Storage Buckets

In the Supabase Dashboard:
1. Go to Storage → Buckets
2. Create the following buckets:

```sql
-- Create buckets (via Supabase SQL editor)
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('ebooks', 'Ebooks Library', true),
  ('courses', 'Course Materials', false),
  ('user-uploads', 'User Uploads', false),
  ('public', 'Public Assets', true),
  ('avatars', 'User Avatars', true);
```

### 2. Configure Bucket Policies

```sql
-- Ebooks bucket policies
CREATE POLICY "Anyone can read published ebooks" ON storage.objects 
FOR SELECT USING (bucket_id = 'ebooks' AND (storage.foldername(name))[1] != 'drafts');

CREATE POLICY "Admins can upload ebooks" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'ebooks' AND auth.role() = 'authenticated' AND 
  EXISTS(SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));

CREATE POLICY "Admins can update ebooks" ON storage.objects 
FOR UPDATE USING (bucket_id = 'ebooks' AND auth.role() = 'authenticated' AND 
  EXISTS(SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));

CREATE POLICY "Admins can delete ebooks" ON storage.objects 
FOR DELETE USING (bucket_id = 'ebooks' AND auth.role() = 'authenticated' AND 
  EXISTS(SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'super_admin')));

-- Courses bucket policies
CREATE POLICY "Authenticated users can read enrolled course materials" ON storage.objects 
FOR SELECT USING (
  bucket_id = 'courses' AND 
  auth.role() = 'authenticated' AND
  EXISTS(
    SELECT 1 FROM user_enrollments ue
    JOIN courses c ON ue.course_id = c.id
    WHERE ue.user_id = auth.uid() 
    AND c.id = ((storage.foldername(name))[1])::UUID
  )
);

CREATE POLICY "Instructors can upload course materials" ON storage.objects 
FOR INSERT WITH CHECK (
  bucket_id = 'courses' AND 
  auth.role() = 'authenticated' AND
  EXISTS(
    SELECT 1 FROM courses 
    WHERE id = ((storage.foldername(name))[1])::UUID 
    AND created_by = auth.uid()
  )
);

CREATE POLICY "Instructors can update course materials" ON storage.objects 
FOR UPDATE USING (
  bucket_id = 'courses' AND 
  auth.role() = 'authenticated' AND
  EXISTS(
    SELECT 1 FROM courses 
    WHERE id = ((storage.foldername(name))[1])::UUID 
    AND created_by = auth.uid()
  )
);

CREATE POLICY "Instructors can delete course materials" ON storage.objects 
FOR DELETE USING (
  bucket_id = 'courses' AND 
  auth.role() = 'authenticated' AND
  EXISTS(
    SELECT 1 FROM courses 
    WHERE id = ((storage.foldername(name))[1])::UUID 
    AND created_by = auth.uid()
  )
);

-- User uploads bucket policies
CREATE POLICY "Users can read their own uploads" ON storage.objects 
FOR SELECT USING (
  bucket_id = 'user-uploads' AND 
  auth.role() = 'authenticated' AND
  ((storage.foldername(name))[1]) = (auth.uid())::TEXT
);

CREATE POLICY "Users can upload to their own folder" ON storage.objects 
FOR INSERT WITH CHECK (
  bucket_id = 'user-uploads' AND 
  auth.role() = 'authenticated' AND
  ((storage.foldername(name))[1]) = (auth.uid())::TEXT
);

CREATE POLICY "Users can update their own uploads" ON storage.objects 
FOR UPDATE USING (
  bucket_id = 'user-uploads' AND 
  auth.role() = 'authenticated' AND
  ((storage.foldername(name))[1]) = (auth.uid())::TEXT
);

CREATE POLICY "Users can delete their own uploads" ON storage.objects 
FOR DELETE USING (
  bucket_id = 'user-uploads' AND 
  auth.role() = 'authenticated' AND
  ((storage.foldername(name))[1]) = (auth.uid())::TEXT
);

-- Public assets bucket policies
CREATE POLICY "Anyone can read public assets" ON storage.objects 
FOR SELECT USING (bucket_id = 'public');

CREATE POLICY "Admins can upload public assets" ON storage.objects 
FOR INSERT WITH CHECK (
  bucket_id = 'public' AND 
  auth.role() = 'authenticated' AND
  EXISTS(SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

CREATE POLICY "Admins can update public assets" ON storage.objects 
FOR UPDATE USING (
  bucket_id = 'public' AND 
  auth.role() = 'authenticated' AND
  EXISTS(SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

CREATE POLICY "Admins can delete public assets" ON storage.objects 
FOR DELETE USING (
  bucket_id = 'public' AND 
  auth.role() = 'authenticated' AND
  EXISTS(SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Avatars bucket policies
CREATE POLICY "Anyone can read avatars" ON storage.objects 
FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" ON storage.objects 
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND 
  auth.role() = 'authenticated' AND
  ((storage.foldername(name))[1]) = (auth.uid())::TEXT
);

CREATE POLICY "Users can update their own avatar" ON storage.objects 
FOR UPDATE USING (
  bucket_id = 'avatars' AND 
  auth.role() = 'authenticated' AND
  ((storage.foldername(name))[1]) = (auth.uid())::TEXT
);

CREATE POLICY "Users can delete their own avatar" ON storage.objects 
FOR DELETE USING (
  bucket_id = 'avatars' AND 
  auth.role() = 'authenticated' AND
  ((storage.foldername(name))[1]) = (auth.uid())::TEXT
);

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
```

## File Organization Structure

### Ebooks Structure
```
ebooks/
├── published/
│   ├── digital-marketing-strategy.pdf
│   ├── social-media-mastery.pdf
│   ├── content-creation-handbook.pdf
│   └── ...
├── drafts/
│   ├── upcoming-course-outline.pdf
│   └── ...
└── covers/
    ├── digital-marketing-strategy-cover.jpg
    ├── social-media-mastery-cover.jpg
    └── ...
```

### Courses Structure
```
courses/
├── {course_id}/
│   ├── cover.jpg
│   ├── intro-video.mp4
│   ├── modules/
│   │   ├── {module_id}/
│   │   │   ├── lesson-1-video.mp4
│   │   │   ├── lesson-1-slides.pdf
│   │   │   ├── lesson-2-video.mp4
│   │   │   ├── lesson-2-workbook.pdf
│   │   │   └── ...
│   │   └── ...
│   └── resources/
│       ├── course-syllabus.pdf
│       ├── bonus-materials.zip
│       └── ...
└── ...
```

### User Uploads Structure
```
user-uploads/
├── {user_id}/
│   ├── profile/
│   │   └── avatar.jpg
│   ├── assignments/
│   │   ├── assignment-1.pdf
│   │   └── ...
│   ├── projects/
│   │   ├── final-project.psd
│   │   └── ...
│   └── certificates/
│       ├── course-completion.pdf
│       └── ...
└── ...
```

### Public Assets Structure
```
public/
├── logos/
│   ├── main-logo.png
│   ├── favicon.ico
│   └── ...
├── icons/
│   ├── play-button.svg
│   ├── download-icon.svg
│   └── ...
├── banners/
│   ├── homepage-hero.jpg
│   ├── course-promo-banner.jpg
│   └── ...
└── ...
```

## Migration Strategy

### 1. Ebooks Migration Script

Create `backend/scripts/migrate-ebooks.js`:

```javascript
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Function to upload all ebooks
async function migrateEbooks() {
  try {
    console.log('Starting ebooks migration...');
    
    // Path to local ebooks directory
    const ebooksDir = path.join(__dirname, '..', '..', 'ebooks');
    
    // Read all files in ebooks directory
    const files = fs.readdirSync(ebooksDir);
    
    console.log(`Found ${files.length} files to migrate`);
    
    let migratedCount = 0;
    
    // Upload each file
    for (const file of files) {
      try {
        // Skip non-PDF files
        if (!file.endsWith('.pdf')) {
          console.log(`Skipping non-PDF file: ${file}`);
          continue;
        }
        
        // Full file path
        const filePath = path.join(ebooksDir, file);
        
        // Read file
        const fileBuffer = fs.readFileSync(filePath);
        
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('ebooks')
          .upload(`published/${file}`, fileBuffer, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (error) {
          console.error(`Error uploading ${file}:`, error.message);
          continue;
        }
        
        console.log(`Uploaded ${file} successfully`);
        migratedCount++;
        
      } catch (err) {
        console.error(`Failed to process ${file}:`, err.message);
      }
    }
    
    console.log(`Migration completed. Successfully migrated ${migratedCount} out of ${files.length} files.`);
    
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

// Run migration
if (require.main === module) {
  migrateEbooks();
}

module.exports = migrateEbooks;
```

### 2. Images Migration Script

Create `backend/scripts/migrate-images.js`:

```javascript
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Function to upload public images
async function migrateImages() {
  try {
    console.log('Starting images migration...');
    
    // Path to local images directory
    const imagesDir = path.join(__dirname, '..', '..', 'images');
    
    // Read all files in images directory
    const files = fs.readdirSync(imagesDir);
    
    console.log(`Found ${files.length} files to migrate`);
    
    let migratedCount = 0;
    
    // Upload each file
    for (const file of files) {
      try {
        // Skip directories
        const filePath = path.join(imagesDir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          console.log(`Skipping directory: ${file}`);
          continue;
        }
        
        // Determine destination folder based on file type
        let destinationFolder = 'public/';
        if (file.includes('logo') || file.includes('Logo')) {
          destinationFolder = 'public/logos/';
        } else if (file.includes('brand') || file.includes('Brand')) {
          destinationFolder = 'public/brands/';
        } else if (file.includes('hero') || file.includes('Hero')) {
          destinationFolder = 'public/banners/';
        } else {
          destinationFolder = 'public/misc/';
        }
        
        // Read file
        const fileBuffer = fs.readFileSync(filePath);
        
        // Get file extension
        const ext = path.extname(file).toLowerCase();
        
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('public')
          .upload(`${destinationFolder}${file}`, fileBuffer, {
            cacheControl: '3600',
            upsert: false,
            contentType: getContentType(ext)
          });
        
        if (error) {
          console.error(`Error uploading ${file}:`, error.message);
          continue;
        }
        
        console.log(`Uploaded ${file} to ${destinationFolder} successfully`);
        migratedCount++;
        
      } catch (err) {
        console.error(`Failed to process ${file}:`, err.message);
      }
    }
    
    console.log(`Migration completed. Successfully migrated ${migratedCount} out of ${files.length} files.`);
    
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

// Helper function to get content type
function getContentType(extension) {
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };
  
  return contentTypes[extension] || 'application/octet-stream';
}

// Run migration
if (require.main === module) {
  migrateImages();
}

module.exports = migrateImages;
```

## Frontend Integration

### 1. File Upload Service

Create `frontend/src/services/fileUploadService.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

class FileUploadService {
  // Upload ebook
  async uploadEbook(file, isDraft = false) {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const folder = isDraft ? 'drafts' : 'published';
      
      const { data, error } = await supabase.storage
        .from('ebooks')
        .upload(`${folder}/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw new Error(error.message);
      
      return data;
    } catch (error) {
      throw new Error(`Failed to upload ebook: ${error.message}`);
    }
  }
  
  // Upload course material
  async uploadCourseMaterial(file, courseId, moduleId = null) {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const folder = moduleId 
        ? `courses/${courseId}/modules/${moduleId}/${fileName}`
        : `courses/${courseId}/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('courses')
        .upload(folder, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw new Error(error.message);
      
      return data;
    } catch (error) {
      throw new Error(`Failed to upload course material: ${error.message}`);
    }
  }
  
  // Upload user avatar
  async uploadAvatar(file, userId) {
    try {
      // Delete existing avatar first
      await this.deleteAvatar(userId);
      
      const fileName = `${Date.now()}-${file.name}`;
      const folder = `avatars/${userId}/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(folder, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) throw new Error(error.message);
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(folder);
      
      return { path: folder, url: publicUrl };
    } catch (error) {
      throw new Error(`Failed to upload avatar: ${error.message}`);
    }
  }
  
  // Delete user avatar
  async deleteAvatar(userId) {
    try {
      // List all avatars for this user
      const { data: files, error: listError } = await supabase.storage
        .from('avatars')
        .list(`avatars/${userId}/`);
      
      if (listError) throw new Error(listError.message);
      
      // Delete all files
      if (files && files.length > 0) {
        const filePaths = files.map(f => `avatars/${userId}/${f.name}`);
        const { error: deleteError } = await supabase.storage
          .from('avatars')
          .remove(filePaths);
        
        if (deleteError) throw new Error(deleteError.message);
      }
      
      return true;
    } catch (error) {
      throw new Error(`Failed to delete avatar: ${error.message}`);
    }
  }
  
  // Get public URL for a file
  getPublicUrl(bucket, filePath) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  }
  
  // Get signed URL for private files (expires in 1 hour)
  async getSignedUrl(bucket, filePath) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(filePath, 3600); // 1 hour expiry
    
    if (error) throw new Error(error.message);
    
    return data.signedUrl;
  }
  
  // List files in a directory
  async listFiles(bucket, prefix) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(prefix, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });
    
    if (error) throw new Error(error.message);
    
    return data;
  }
  
  // Delete a file
  async deleteFile(bucket, filePath) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);
    
    if (error) throw new Error(error.message);
    
    return true;
  }
}

export default new FileUploadService();
```

### 2. Ebook Management Component

```jsx
// In frontend/src/components/EbookManager.jsx
import React, { useState, useEffect } from 'react';
import fileUploadService from '../services/fileUploadService';

const EbookManager = () => {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  useEffect(() => {
    fetchEbooks();
  }, []);
  
  const fetchEbooks = async () => {
    try {
      setLoading(true);
      const files = await fileUploadService.listFiles('ebooks', 'published/');
      setEbooks(files);
    } catch (error) {
      console.error('Failed to fetch ebooks:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      setUploading(true);
      await fileUploadService.uploadEbook(file);
      await fetchEbooks(); // Refresh list
    } catch (error) {
      console.error('Upload failed:', error);
      alert(error.message);
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset file input
    }
  };
  
  const handleDelete = async (fileName) => {
    if (!window.confirm('Are you sure you want to delete this ebook?')) return;
    
    try {
      await fileUploadService.deleteFile('ebooks', `published/${fileName}`);
      await fetchEbooks(); // Refresh list
    } catch (error) {
      console.error('Delete failed:', error);
      alert(error.message);
    }
  };
  
  if (loading) return <div>Loading ebooks...</div>;
  
  return (
    <div className="ebook-manager">
      <h2>Ebook Manager</h2>
      
      <div className="upload-section">
        <input 
          type="file" 
          accept=".pdf" 
          onChange={handleUpload}
          disabled={uploading}
        />
        {uploading && <span>Uploading...</span>}
      </div>
      
      <div className="ebooks-list">
        {ebooks.map(ebook => (
          <div key={ebook.id} className="ebook-item">
            <h3>{ebook.name}</h3>
            <p>Size: {(ebook.metadata.size / 1024 / 1024).toFixed(2)} MB</p>
            <p>Uploaded: {new Date(ebook.created_at).toLocaleDateString()}</p>
            
            <div className="actions">
              <a 
                href={fileUploadService.getPublicUrl('ebooks', `published/${ebook.name}`)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Download
              </a>
              <button 
                onClick={() => handleDelete(ebook.name)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EbookManager;
```

### 3. Avatar Upload Component

```jsx
// In frontend/src/components/AvatarUploader.jsx
import React, { useState } from 'react';
import fileUploadService from '../services/fileUploadService';

const AvatarUploader = ({ userId, currentAvatar, onAvatarUpdate }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Preview image
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
    
    // Upload
    handleUpload(file);
  };
  
  const handleUpload = async (file) => {
    try {
      setUploading(true);
      const result = await fileUploadService.uploadAvatar(file, userId);
      onAvatarUpdate(result.url);
    } catch (error) {
      console.error('Upload failed:', error);
      alert(error.message);
    } finally {
      setUploading(false);
      setPreview(null);
    }
  };
  
  return (
    <div className="avatar-uploader">
      <div className="avatar-preview">
        <img 
          src={preview || currentAvatar || '/default-avatar.png'} 
          alt="Avatar preview" 
          className="avatar-img"
        />
      </div>
      
      <div className="upload-controls">
        <label className="btn btn-secondary">
          {uploading ? 'Uploading...' : 'Change Avatar'}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </label>
        
        {preview && (
          <button 
            onClick={() => setPreview(null)}
            className="btn btn-outline"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default AvatarUploader;
```

## Backend Integration

### 1. File Management Service

Create `backend/services/fileManagementService.js`:

```javascript
const { supabaseAdmin } = require('../supabaseAuth');

class FileManagementService {
  // Get all published ebooks
  async getPublishedEbooks() {
    try {
      const { data, error } = await supabaseAdmin.storage
        .from('ebooks')
        .list('published/', {
          limit: 1000,
          sortBy: { column: 'name', order: 'asc' }
        });
      
      if (error) throw new Error(error.message);
      
      // Get public URLs for each ebook
      const ebooks = data.map(file => ({
        ...file,
        url: this.getPublicUrl('ebooks', `published/${file.name}`)
      }));
      
      return ebooks;
    } catch (error) {
      throw new Error(`Failed to fetch ebooks: ${error.message}`);
    }
  }
  
  // Get course materials
  async getCourseMaterials(courseId) {
    try {
      const { data, error } = await supabaseAdmin.storage
        .from('courses')
        .list(`courses/${courseId}/`, {
          limit: 1000,
          sortBy: { column: 'name', order: 'asc' }
        });
      
      if (error) throw new Error(error.message);
      
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch course materials: ${error.message}`);
    }
  }
  
  // Get public URL for a file
  getPublicUrl(bucket, filePath) {
    const { data } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  }
  
  // Get signed URL for private files
  async getSignedUrl(bucket, filePath, expiresIn = 3600) {
    try {
      const { data, error } = await supabaseAdmin.storage
        .from(bucket)
        .createSignedUrl(filePath, expiresIn);
      
      if (error) throw new Error(error.message);
      
      return data.signedUrl;
    } catch (error) {
      throw new Error(`Failed to create signed URL: ${error.message}`);
    }
  }
  
  // Delete a file
  async deleteFile(bucket, filePath) {
    try {
      const { error } = await supabaseAdmin.storage
        .from(bucket)
        .remove([filePath]);
      
      if (error) throw new Error(error.message);
      
      return true;
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }
  
  // Move a file
  async moveFile(bucket, fromPath, toPath) {
    try {
      // Copy file to new location
      const { data: copyData, error: copyError } = await supabaseAdmin.storage
        .from(bucket)
        .copy(fromPath, toPath);
      
      if (copyError) throw new Error(copyError.message);
      
      // Delete original file
      await this.deleteFile(bucket, fromPath);
      
      return copyData;
    } catch (error) {
      throw new Error(`Failed to move file: ${error.message}`);
    }
  }
}

module.exports = new FileManagementService();
```

### 2. Edge Function for File Listing

Create `supabase/functions/files/list-ebooks.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { supabase } from '../_utils/supabaseClient.ts';

serve(async (_req) => {
  try {
    // List published ebooks
    const { data, error } = await supabase.storage
      .from('ebooks')
      .list('published/', {
        limit: 100,
        sortBy: { column: 'name', order: 'asc' }
      });
    
    if (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: error.message 
        }), 
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Add public URLs
    const ebooks = data.map((file: any) => ({
      ...file,
      url: supabase.storage.from('ebooks').getPublicUrl(`published/${file.name}`).data.publicUrl
    }));
    
    return new Response(
      JSON.stringify({
        success: true,
        data: ebooks
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (err) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
  }
});
```

## Performance Optimization

### 1. CDN Configuration

Enable CDN for better performance:
1. In Supabase Dashboard → Storage → Settings
2. Enable CDN for public buckets
3. Set appropriate cache headers

### 2. Image Optimization

For images, consider using Supabase's image transformation:
```javascript
// Transform images on-the-fly
const { data } = supabase.storage
  .from('public')
  .getPublicUrl('banners/homepage-hero.jpg', {
    transform: {
      width: 800,
      height: 600,
      resize: 'cover'
    }
  });
```

### 3. File Size Limits

Configure appropriate file size limits:
- Ebooks: 100MB limit
- Course videos: 2GB limit
- Images: 10MB limit
- User avatars: 5MB limit

## Security Best Practices

1. **Validate File Types**: Check MIME types and extensions
2. **Sanitize Filenames**: Prevent directory traversal attacks
3. **Limit File Sizes**: Prevent storage abuse
4. **Use Signed URLs**: For temporary access to private files
5. **Regular Audits**: Monitor storage usage and access patterns
6. **Backup Strategy**: Enable versioning for important files

## Cost Management

1. **Monitor Usage**: Track storage and bandwidth consumption
2. **Optimize Images**: Compress and resize appropriately
3. **Cleanup Old Files**: Implement retention policies
4. **Use Appropriate Tiers**: Choose storage tiers based on access frequency

## Backup and Recovery

1. **Enable Versioning**: For critical files
2. **Regular Exports**: Export file metadata periodically
3. **Disaster Recovery Plan**: Document recovery procedures
4. **Testing**: Regularly test backup restoration

This comprehensive setup migrates your file storage to Supabase Storage while maintaining security, performance, and scalability.