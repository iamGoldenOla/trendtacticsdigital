const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { supabase, isSupabaseConfigured } = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'API is running!',
    supabase: isSupabaseConfigured ? 'configured' : 'not configured'
  });
});

// Receive quiz results - saves to Supabase (with fallback to file)
app.post('/api/quiz-results', async (req, res) => {
  const payload = req.body || {};
  
  // Validate payload
  if (!payload.summary || !payload.answers) {
    return res.status(400).json({ 
      ok: false, 
      error: 'Missing required fields: summary and answers' 
    });
  }

  try {
    // Try Supabase first (if configured)
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('quiz_results')
        .insert([
          {
            email: payload.email || null,
            summary: payload.summary,
            answers: payload.answers,
            timestamp: payload.timestamp || new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        console.error('Supabase insert error:', error);
        // Fall through to file backup
      } else {
        console.log('✅ Quiz result saved to Supabase:', data[0].id);
        return res.json({ 
          ok: true, 
          id: data[0].id,
          storage: 'supabase' 
        });
      }
    }

    // Fallback to file storage (if Supabase not configured or failed)
    const dataDir = path.join(__dirname, '..', 'data');
    const outFile = path.join(dataDir, 'quiz-results.json');
    
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    let arr = [];
    if (fs.existsSync(outFile)) {
      try {
        arr = JSON.parse(fs.readFileSync(outFile, 'utf8') || '[]');
      } catch (e) {
        arr = [];
      }
    }
    
    arr.push({
      ...payload,
      id: `file-${Date.now()}`,
      saved_at: new Date().toISOString()
    });
    
    fs.writeFileSync(outFile, JSON.stringify(arr, null, 2), 'utf8');
    console.log('✅ Quiz result saved to file (fallback)');
    
    res.json({ 
      ok: true, 
      storage: 'file',
      message: isSupabaseConfigured 
        ? 'Saved to file (Supabase insert failed)' 
        : 'Saved to file (Supabase not configured)'
    });
    
  } catch (err) {
    console.error('Failed to save quiz result:', err);
    res.status(500).json({ 
      ok: false, 
      error: 'Failed to save result',
      details: err.message 
    });
  }
});

// Optional: Get quiz results (for admin/analytics)
app.get('/api/quiz-results', async (req, res) => {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        throw error;
      }

      return res.json({ ok: true, results: data, storage: 'supabase' });
    }

    // Fallback to file
    const outFile = path.join(__dirname, '..', 'data', 'quiz-results.json');
    if (fs.existsSync(outFile)) {
      const data = JSON.parse(fs.readFileSync(outFile, 'utf8') || '[]');
      return res.json({ ok: true, results: data, storage: 'file' });
    }

    res.json({ ok: true, results: [], storage: 'none' });
  } catch (err) {
    console.error('Failed to fetch quiz results:', err);
    res.status(500).json({ ok: false, error: 'Failed to fetch results' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend API server running on port ${PORT}`);
}); 