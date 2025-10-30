// Default FAQ content for preview
const defaultFAQContent = `
<div class="faq-accordion-container">
  <div class="faq-item">
    <button class="faq-question" aria-expanded="false">
      What is your return policy?
      <span class="faq-icon">+</span>
    </button>
    <div class="faq-answer">
      <div class="faq-answer-content">
        <ul class="faq-list">
          <li>Returns accepted within 30 days</li>
          <li>Must be in original packaging</li>
          <li>Refund processed in 5–7 business days</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="faq-item">
    <button class="faq-question" aria-expanded="false">
      Do you offer international shipping?
      <span class="faq-icon">+</span>
    </button>
    <div class="faq-answer">
      <div class="faq-answer-content">
        Yes, we ship worldwide via trusted couriers. Shipping times vary by location but typically take 7-14 business days.
      </div>
    </div>
  </div>
</div>`;

// Default styles configuration
const defaultStyles = {
  questionColor: '#1111ff',
  questionHoverColor: '#000000',
  iconColor: '#7B2CBF',
  answerColor: '#333333',
  questionFontSize: '18px',
  answerFontSize: '16px',
  questionFontWeight: '700',
  containerWidth: '800px',
  listMargin: '400px',
  borderColor: '#e0e0e0'
};

let currentStyles = { ...defaultStyles };

// Initialize the editor
document.addEventListener('DOMContentLoaded', function() {
  initializeControls();
  updatePreview();
  updateCSSCode();
  setupEventListeners();
});

function initializeControls() {
  // Set initial values for all controls
  document.getElementById('questionColor').value = currentStyles.questionColor;
  document.getElementById('questionColorText').value = currentStyles.questionColor;
  document.getElementById('questionHoverColor').value = currentStyles.questionHoverColor;
  document.getElementById('questionHoverColorText').value = currentStyles.questionHoverColor;
  document.getElementById('iconColor').value = currentStyles.iconColor;
  document.getElementById('iconColorText').value = currentStyles.iconColor;
  document.getElementById('answerColor').value = currentStyles.answerColor;
  document.getElementById('answerColorText').value = currentStyles.answerColor;
  document.getElementById('questionFontSize').value = parseInt(currentStyles.questionFontSize);
  document.getElementById('questionFontSizeValue').textContent = currentStyles.questionFontSize;
  document.getElementById('answerFontSize').value = parseInt(currentStyles.answerFontSize);
  document.getElementById('answerFontSizeValue').textContent = currentStyles.answerFontSize;
  document.getElementById('questionFontWeight').value = currentStyles.questionFontWeight;
  document.getElementById('containerWidth').value = parseInt(currentStyles.containerWidth);
  document.getElementById('containerWidthValue').textContent = currentStyles.containerWidth;
  document.getElementById('listMargin').value = parseInt(currentStyles.listMargin);
  document.getElementById('listMarginValue').textContent = currentStyles.listMargin + 'px';
  document.getElementById('borderColor').value = currentStyles.borderColor;
  document.getElementById('borderColorText').value = currentStyles.borderColor;
}

function setupEventListeners() {
  // Color controls
  document.getElementById('questionColor').addEventListener('input', (e) => {
    currentStyles.questionColor = e.target.value;
    document.getElementById('questionColorText').value = e.target.value;
    updatePreview();
    updateCSSCode();
  });

  document.getElementById('questionColorText').addEventListener('input', (e) => {
    currentStyles.questionColor = e.target.value;
    document.getElementById('questionColor').value = e.target.value;
    updatePreview();
    updateCSSCode();
  });

  document.getElementById('questionHoverColor').addEventListener('input', (e) => {
    currentStyles.questionHoverColor = e.target.value;
    document.getElementById('questionHoverColorText').value = e.target.value;
    updatePreview();
    updateCSSCode();
  });

  document.getElementById('questionHoverColorText').addEventListener('input', (e) => {
    currentStyles.questionHoverColor = e.target.value;
    document.getElementById('questionHoverColor').value = e.target.value;
    updatePreview();
    updateCSSCode();
  });

  document.getElementById('iconColor').addEventListener('input', (e) => {
    currentStyles.iconColor = e.target.value;
    document.getElementById('iconColorText').value = e.target.value;
    updatePreview();
    updateCSSCode();
  });

  document.getElementById('iconColorText').addEventListener('input', (e) => {
    currentStyles.iconColor = e.target.value;
    document.getElementById('iconColor').value = e.target.value;
    updatePreview();
    updateCSSCode();
  });

  document.getElementById('answerColor').addEventListener('input', (e) => {
    currentStyles.answerColor = e.target.value;
    document.getElementById('answerColorText').value = e.target.value;
    updatePreview();
    updateCSSCode();
  });

  document.getElementById('answerColorText').addEventListener('input', (e) => {
    currentStyles.answerColor = e.target.value;
    document.getElementById('answerColor').value = e.target.value;
    updatePreview();
    updateCSSCode();
  });

  document.getElementById('borderColor').addEventListener('input', (e) => {
    currentStyles.borderColor = e.target.value;
    document.getElementById('borderColorText').value = e.target.value;
    updatePreview();
    updateCSSCode();
  });

  document.getElementById('borderColorText').addEventListener('input', (e) => {
    currentStyles.borderColor = e.target.value;
    document.getElementById('borderColor').value = e.target.value;
    updatePreview();
    updateCSSCode();
  });

  // Font size controls
  document.getElementById('questionFontSize').addEventListener('input', (e) => {
    currentStyles.questionFontSize = e.target.value + 'px';
    document.getElementById('questionFontSizeValue').textContent = e.target.value + 'px';
    updatePreview();
    updateCSSCode();
  });

  document.getElementById('answerFontSize').addEventListener('input', (e) => {
    currentStyles.answerFontSize = e.target.value + 'px';
    document.getElementById('answerFontSizeValue').textContent = e.target.value + 'px';
    updatePreview();
    updateCSSCode();
  });

  // Other controls
  document.getElementById('questionFontWeight').addEventListener('change', (e) => {
    currentStyles.questionFontWeight = e.target.value;
    updatePreview();
    updateCSSCode();
  });

  document.getElementById('containerWidth').addEventListener('input', (e) => {
    currentStyles.containerWidth = e.target.value + 'px';
    document.getElementById('containerWidthValue').textContent = e.target.value + 'px';
    updatePreview();
    updateCSSCode();
  });

  document.getElementById('listMargin').addEventListener('input', (e) => {
    currentStyles.listMargin = e.target.value;
    document.getElementById('listMarginValue').textContent = e.target.value + 'px';
    updatePreview();
    updateCSSCode();
  });

  // Action buttons
  document.getElementById('resetStyles').addEventListener('click', resetStyles);
  document.getElementById('copyStyles').addEventListener('click', copyCSSCode);
}

function updatePreview() {
  const preview = document.getElementById('stylePreview');
  preview.innerHTML = defaultFAQContent;

  // Apply current styles
  const style = document.createElement('style');
  style.textContent = generateCSS();
  preview.appendChild(style);

  // Add interactivity to preview
  addFAQAccordionListeners(preview);
}

function generateCSS() {
  return `
.faq-accordion-container {
  max-width: ${currentStyles.containerWidth};
  margin: 0 auto;
  padding: 20px;
}

.faq-item {
  border-bottom: 1px solid ${currentStyles.borderColor};
  margin-bottom: 10px;
}

.faq-question {
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: 20px 50px 20px 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  font-family: 'Geomanist', sans-serif;
  font-weight: ${currentStyles.questionFontWeight};
  font-size: ${currentStyles.questionFontSize};
  color: ${currentStyles.questionColor};
}

.faq-question:hover { 
  color: ${currentStyles.questionHoverColor}; 
}

.faq-icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 28px;
  font-weight: 300;
  color: ${currentStyles.iconColor};
  transition: transform 0.3s ease;
}

.faq-question[aria-expanded="true"] .faq-icon {
  transform: translateY(-50%) rotate(45deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
}

.faq-answer-content {
  padding: 0 0 20px 0;
  font-family: -apple-system, Geomanist, sans-serif;
  font-size: ${currentStyles.answerFontSize};
  line-height: 1.6;
  color: ${currentStyles.answerColor};
}

.faq-list {
  margin: 15px ${currentStyles.listMargin}px 10px 0;
  padding-left: 20px;
}

.faq-list li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.faq-list li:last-child { 
  margin-bottom: 0; 
}

.faq-item.active .faq-answer {
  max-height: 500px;
  padding-top: 10px;
}

@media (max-width: 768px) {
  .faq-question { 
    font-size: 16px; 
    padding: 15px 40px 15px 0; 
  }
  .faq-list { 
    margin: 15px 250px 10px 0; 
  }
  .faq-answer-content { 
    font-size: 14px; 
  }
}

@media (max-width: 468px) {
  .faq-list { 
    margin: 15px 100px 10px 0; 
  }
}`;
}

function updateCSSCode() {
  document.getElementById('cssOutput').value = generateCSS();
}

function resetStyles() {
  currentStyles = { ...defaultStyles };
  initializeControls();
  updatePreview();
  updateCSSCode();
}

function copyCSSCode() {
  const cssOutput = document.getElementById('cssOutput');
  cssOutput.select();
  document.execCommand('copy');
  alert('✅ CSS code copied to clipboard!');
}

function addFAQAccordionListeners(container) {
  const buttons = container.querySelectorAll('.faq-question');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      btn.parentElement.classList.toggle('active');
    });
  });
}
