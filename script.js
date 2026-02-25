document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const uploadZone = document.getElementById('upload-zone');
    const imageInput = document.getElementById('image-input');
    const uploadContent = document.getElementById('upload-content');
    const previewContent = document.getElementById('preview-content');
    const imagePreview = document.getElementById('image-preview');
    const removeImageBtn = document.getElementById('remove-image-btn');

    const generateBtn = document.getElementById('generate-btn');
    const regenerateBtn = document.getElementById('regenerate-btn');

    const genBtnText = generateBtn.querySelector('.btn-text');
    const genBtnIcon = generateBtn.querySelector('.btn-icon');
    const genBtnSpinner = document.getElementById('btn-spinner');

    const regenBtnText = regenerateBtn.querySelector('.btn-text');
    const regenBtnIcon = regenerateBtn.querySelector('.btn-icon');
    const regenBtnSpinner = document.getElementById('regen-spinner');

    const resultSection = document.getElementById('result-section');
    const descriptionLabel = document.getElementById('description-label');
    const copyBtn = document.getElementById('copy-btn');

    let currentFile = null;

    // --- Upload Handlers ---

    // Click to upload
    uploadZone.addEventListener('click', (e) => {
        // Prevent clicking if we already have a preview active
        // and we clicked on the remove button
        if (e.target.closest('#remove-image-btn')) return;

        if (!currentFile) {
            imageInput.click();
        }
    });

    // File selection via dialog
    imageInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });

    // Drag and Drop Events
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');

        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    // Process File
    function handleFile(file) {
        // Validate it's an image
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file (JPG, PNG, WEBP).');
            return;
        }

        currentFile = file;

        // Create Object URL for preview
        const fileUrl = URL.createObjectURL(file);
        imagePreview.src = fileUrl;

        // Update UI State
        uploadContent.classList.add('hidden');
        previewContent.classList.remove('hidden');
        generateBtn.disabled = false;

        // Reset Result if previous exists
        resultSection.classList.add('hidden');
        descriptionLabel.className = 'placeholder-text';
        descriptionLabel.textContent = 'Analyzing image content...';
        copyBtn.innerHTML = '<i data-feather="copy"></i> Copy Text';
        feather.replace();
    }

    // Remove Image
    removeImageBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        currentFile = null;
        imageInput.value = '';
        URL.revokeObjectURL(imagePreview.src);
        imagePreview.src = '';

        // Reset UI
        previewContent.classList.add('hidden');
        uploadContent.classList.remove('hidden');
        generateBtn.disabled = true;
        generateBtn.classList.remove('hidden');
        regenerateBtn.classList.add('hidden');
        resultSection.classList.add('hidden');
    });

    // --- Action Handlers ---

    const mockDescriptions = [
        "A small brown dog running across a grassy field.",
        "A group of people sitting around a wooden table talking.",
        "A train approaching a busy station platform.",
        "A bright red sports car parked in front of a modern building.",
        "Two planes flying side by side in a clear blue sky.",
        "A beautiful sunset reflecting over a calm ocean beach.",
        "A person riding a bicycle down a crowded city street."
    ];

    function simulateGeneration(isRegenerate) {
        if (!currentFile) return;

        let activeBtn, activeText, activeIcon, activeSpinner;

        if (isRegenerate) {
            activeBtn = regenerateBtn;
            activeText = regenBtnText;
            activeIcon = regenBtnIcon;
            activeSpinner = regenBtnSpinner;
            activeBtn.disabled = true;
            activeText.textContent = 'Regenerating...';
        } else {
            activeBtn = generateBtn;
            activeText = genBtnText;
            activeIcon = genBtnIcon;
            activeSpinner = genBtnSpinner;
            activeBtn.disabled = true;
            activeText.textContent = 'Generating...';
        }

        activeIcon.classList.add('hidden');
        activeSpinner.classList.remove('hidden');

        // Ensure result isn't visible yet
        resultSection.classList.add('hidden');

        // 2. Mock API Delay (Simulating ML Inference)
        setTimeout(() => {
            // Restore Button State but toggle visibility
            activeBtn.disabled = false;
            activeIcon.classList.remove('hidden');
            activeSpinner.classList.add('hidden');

            if (!isRegenerate) {
                activeText.textContent = 'Generate Description';
                generateBtn.classList.add('hidden');
                regenerateBtn.classList.remove('hidden');
            } else {
                activeText.textContent = 'Regenerate';
            }

            // Select random mock description
            const randomDesc = mockDescriptions[Math.floor(Math.random() * mockDescriptions.length)];

            // Display Result
            descriptionLabel.textContent = randomDesc;
            descriptionLabel.className = ''; // Remove placeholder class

            resultSection.classList.remove('hidden');
            resultSection.classList.add('fade-in');

        }, 2000); // 2 second mock delay
    }

    generateBtn.addEventListener('click', () => simulateGeneration(false));
    regenerateBtn.addEventListener('click', () => simulateGeneration(true));

    // Copy to Clipboard
    copyBtn.addEventListener('click', async () => {
        if (descriptionLabel.classList.contains('placeholder-text')) return;

        try {
            await navigator.clipboard.writeText(descriptionLabel.textContent);
            copyBtn.innerHTML = '<i data-feather="check"></i> Copied!';
            feather.replace();

            setTimeout(() => {
                copyBtn.innerHTML = '<i data-feather="copy"></i> Copy Text';
                feather.replace();
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy text to clipboard.');
        }
    });

});
