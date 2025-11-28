document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('input-text');
    const outputArea = document.getElementById('output-text');
    const translateBtn = document.getElementById('translate-btn');
    const reverseBtn = document.getElementById('reverse-btn');

    // --- API KEY CONFIGURATION ---
    // MyMemory API allows free usage without a key for limited volume.
    // If you have a key, paste it here.
    const API_KEY = '';
    // -----------------------------

    translateBtn.addEventListener('click', async () => {
        const textToTranslate = inputArea.value.trim();

        if (!textToTranslate) {
            alert('Please enter some text to translate.');
            return;
        }

        // Note: We removed the check for API_KEY presence to allow free MyMemory usage.
        // If you switch to a paid service, you might want to re-enable a check.

        outputArea.value = 'Translating...';

        try {
            const translatedText = await realTranslate(textToTranslate, 'en', 'zh-TW');
            outputArea.value = translatedText;
        } catch (error) {
            console.error('Translation Error:', error);
            outputArea.value = 'Error: ' + error.message;
        }
    });
    // Reverse translation: Chinese to English
    reverseBtn.addEventListener('click', async () => {
        const textToTranslate = outputArea.value.trim();
        if (!textToTranslate) {
            alert('Please enter some Chinese text to translate.');
            return;
        }
        inputArea.value = 'Translating...';
        try {
            const translatedText = await realTranslate(textToTranslate, 'zh-TW', 'en');
            inputArea.value = translatedText;
        } catch (error) {
            console.error('Translation Error:', error);
            inputArea.value = 'Error: ' + error.message;
        }
    });

    async function realTranslate(text, sourceLang, targetLang) {
        // Using MyMemory API (Free for small usage, no key required for testing)
        // Docs: https://mymemory.translated.net/doc/spec.php



        let url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;

        if (API_KEY) {
            url += `&key=${API_KEY}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.responseStatus === 200) {
            return data.responseData.translatedText;
        } else {
            // MyMemory sometimes returns 403 or other codes in responseStatus even if HTTP is 200
            throw new Error(data.responseDetails || 'Translation failed');
        }
    }
});
