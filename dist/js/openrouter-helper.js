// OpenRouter AI Helper
// Supports multiple API keys and models, with automatic failover

const openRouterKeys = [
  // List your keys here (for security, rotate after this session)
  { label: 'Mistral Small', key: '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' },
  { label: 'DeepSeek R1', key: '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' },
  { label: 'NVIDIA Llama 3.1', key: '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' },
  { label: 'Kimi Dev 72b', key: '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' },
  { label: 'Qwen3 30B', key: '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' },
  { label: 'Meta Llama 4', key: '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' },
  { label: 'Qwen3 32B', key: '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' },
  { label: 'DeepSeek V3', key: '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' },
  { label: 'Google Gemma 3', key: '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' },
  { label: 'Google Gemini 2.0', key: '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' },
  { label: 'Mistral Nemo', key: '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' },
  { label: 'Agentica Deepcoder', key: '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' },
  { label: 'MiniMax M1', key: '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' },
];

const modelMap = {
  'Mistral Small': 'mistralai/mistral-small',
  'DeepSeek R1': 'deepseek-ai/deepseek-llm-r1',
  'NVIDIA Llama 3.1': 'nvidia/nemotron-llama-3-8b',
  'Kimi Dev 72b': 'moonshot-v1-72b',
  'Qwen3 30B': 'qwen/qwen3-30b',
  'Meta Llama 4': 'meta-llama/llama-4-8b',
  'Qwen3 32B': 'qwen/qwen3-32b',
  'DeepSeek V3': 'deepseek-ai/deepseek-llm-v3',
  'Google Gemma 3': 'google/gemma-3b',
  'Google Gemini 2.0': 'google/gemini-1.5-flash',
  'Mistral Nemo': 'mistralai/mistral-nemo',
  'Agentica Deepcoder': 'agentica/deepcoder-14b',
  'MiniMax M1': 'minimax/minimax-m1',
};

// Preferred fallback order for models (customize as needed)
const preferredModelOrder = [
  'Mistral Small',
  'DeepSeek R1',
  'Meta Llama 4',
  'Qwen3 30B',
  'Qwen3 32B',
  'DeepSeek V3',
  'Google Gemma 3',
  'Google Gemini 2.0',
  'Mistral Nemo',
  'Agentica Deepcoder',
  'MiniMax M1',
  'Kimi Dev 72b',
  'NVIDIA Llama 3.1',
];

/**
 * Get an AI response from OpenRouter, automatically cycling through keys and models if needed.
 * @param {string} prompt - The user prompt.
 * @param {string|string[]} [modelLabel] - The model label(s) (optional, defaults to preferred order).
 * @returns {Promise<string>} - The AI response.
 */
async function getOpenRouterAIResponse(prompt, modelLabel) {
  // Use preferredModelOrder if no modelLabel is provided
  const modelLabels = modelLabel
    ? (Array.isArray(modelLabel) ? modelLabel : [modelLabel])
    : preferredModelOrder;
  let lastError = null;
  for (const label of modelLabels) {
    const model = modelMap[label] || label;
    for (const { key } of openRouterKeys) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model,
            messages: [{ role: 'user', content: prompt }],
          }),
        });
        const data = await response.json();
        if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
          return data.choices[0].message.content;
        } else {
          lastError = data;
          // Try next key
        }
      } catch (err) {
        lastError = err;
        // Try next key
      }
    }
  }
  throw new Error('All OpenRouter API keys and models failed. Last error: ' + JSON.stringify(lastError));
}

// Expose globally for browser use
window.getOpenRouterAIResponse = getOpenRouterAIResponse;
window.openRouterModelMap = modelMap;
window.openRouterKeys = openRouterKeys; 