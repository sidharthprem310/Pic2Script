# Pic2Script ✨
An AI-powered Image Captioning project designed to automatically generate human-readable descriptive text for any uploaded image.

## Overview
Pic2Script leverages state-of-the-art deep learning models to predict sequences of text that accurately describe visual representations. The project ships with a training notebook to architect and compile the neural network, alongside a sleek, premium Web Interface designed to consume and showcase the inference capabilities.

---

## 🏗️ Architecture & System Workflow

The architecture utilizes an Encoder-Decoder deep learning pipeline:

1. **Feature Extraction (Encoder)**: 
   The system models an **Xception** Convolutional Neural Network (pre-trained on ImageNet). We extract robust 2048-dimensional feature vectors representing the visual content of the image.

2. **Sequence Processing (Decoder)**:
   The extracted image features are fused with text sequences processed through an **Embedding** layer and an **LSTM** (Long Short-Term Memory) recurrent neural network.

3. **Inference / Presentation (Client-Side ML Web UI)**:
   A premium vanilla web interface built with Glassmorphism provides the inference execution. In a technological shift for speed and privacy, **the frontend strictly performs ML Model inferences directly within the user's browser.** Utilizing `Transformers.js`, the UI dynamically downloads and hosts a quantized `Xenova/vit-gpt2-image-captioning` model locally, evaluating visual tensors locally without requiring any external servers, backend REST APIs, or offshore Hugging Face latency.

---

## 📈 Performance Evaluation Metrics

Image Captioning models are conventionally evaluated using specialized Natural Language Processing metrics against human-annotated references in the COCO dataset.

- **BLEU (Bilingual Evaluation Understudy)**: Evaluates n-gram precision. Used to determine how many generated words precisely match human-written COCO validation annotations.
- **CIDEr (Consensus-based Image Description Evaluation)**: Specifically engineered for Image Captioning. It evaluates term frequency-inverse document frequency (`TF-IDF`), giving higher reward scores to words that describe the image comprehensively but are less universally common across the whole dataset (e.g., "Siamese Cat" vs just "Cat").
- **ROUGE-L**: Measures the longest common subsequence (LCS) between the machine-generated text and reference strings, validating the grammatical sequence structure.
- **METEOR**: Factors in synonyms and stemming (e.g., matching "running" to "ran" or "sprinting"), resolving the rigidity of BLEU's exact word-matching logic for fairer evaluation.

Evaluating the `model.h5` across the validation test splits via `pycocotools.eval` optimizes against these metrics to ensure semantically accurate predictions.

---

## 🛠️ Technologies & Libraries Used

### **Machine Learning & Data Processing**
- **Python 3**
- **TensorFlow / Keras**: Deep learning framework used for building the Xception-LSTM network.
- **NLTK (Natural Language Toolkit)**: Used for Natural Language Processing (cleaning punctuation, splitting textual dataset sentences).
- **pycocotools**: Official Python library to parse and evaluate the COCO dataset annotations.
- **NumPy & Pandas**: Array manipulations and data structuring.
- **OpenCV & Scikit-Image**: Image reading and preprocessing matrices before injecting into the network.
- **Matplotlib**: Visualizing parsed image grids and annotations during training.

### **Frontend Interface & Local Inference**
- **Transformers.js**: Hugging Face's JavaScript port, serving AI model execution (`pipeline('image-to-text')`) directly on the web browser client locally instead of relying on a Python backend.
- **HTML5 & CSS3**: Custom dark-theme stylings enforcing visual hierarchy.
- **Vanilla JavaScript (ES6)**: File manipulation, state management, and Clipboard APIs.
- **Feather Icons**: SVG web glyphs.

---

## 📊 Dataset

This model is trained on the **MS COCO 2017 Dataset** (Microsoft Common Objects in Context), utilizing:
- Over `330,000` images.
- Detailed JSON-encoded sequence captions and segmentation annotations.
- The script automatically downloads and installs `train2017`, `val2017`, and `annotations_trainval2017` splits for local neural network optimization.

---

## 🚀 How to Use

### 1. Training the Model
To train the neural network from scratch, run the provided Jupyter Notebook (`Pic2Script.ipynb`).
It is highly recommended to open the file in a GPU-accelerated environment such as **Google Colab**.
```bash
# Verify dependencies
pip install tensorflow pycocotools nltk opencv-python matplotlib
```

The script will:
- Download the COCO JSON annotations.
- Preprocess the string dictionaries using `Tokenizer` into an `<oov>` defined vocabulary.
- Output a compiled Keras model file (`model.h5`).

### 2. Launching the Web Interface
The web interface allows users to test the inference structure:
```bash
# Clone the repository
git clone https://github.com/sidharthprem310/Pic2Script.git

# Enter the directory
cd Pic2Script

# Run a local HTTP server
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser. 

---
*Author: Sidharth Prem*
