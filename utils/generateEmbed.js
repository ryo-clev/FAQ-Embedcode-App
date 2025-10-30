// utils/generateEmbed.js

function parseFAQs(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const faqs = [];
  let current = { question: '', answer: '' };

  for (const line of lines) {
    if (/^Q[:\-]/i.test(line)) {
      if (current.question) faqs.push({ ...current });
      current = { question: line.replace(/^Q[:\-]\s*/i, ''), answer: '' };
    } else if (/^A[:\-]/i.test(line)) {
      current.answer = line.replace(/^A[:\-]\s*/i, '');
    } else {
      current.answer += ' ' + line;
    }
  }

  if (current.question) faqs.push(current);
  return faqs;
}

function formatAnswer(answer) {
  // Detect bullet points or numbered lists
  const hasBullets = /[•\-*]\s|\d+\.\s/.test(answer);
  if (hasBullets) {
    const items = answer
      .split(/(?:(?:•|\-|\*|\d+\.)\s+)/)
      .map(i => i.trim())
      .filter(Boolean);
    return `<ul class="faq-list">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
  }
  return `<div class="faq-answer-content">${answer}</div>`;
}

function renderFAQItem(question, answer, index) {
  return `
  <!-- FAQ Item ${index + 1} -->
  <div class="faq-item">
    <button class="faq-question" aria-expanded="false">
      ${question}
      <span class="faq-icon">+</span>
    </button>
    <div class="faq-answer">
      <div class="faq-answer-content">
        ${formatAnswer(answer)}
      </div>
    </div>
  </div>`;
}

function generateEmbed(rawText) {
  const faqs = parseFAQs(rawText);
  const faqHTML = faqs.map((f, i) => renderFAQItem(f.question, f.answer, i)).join('\n');

  const styleBlock = `
  <style>
    .faq-accordion-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .faq-item {
      border-bottom: 1px solid #e0e0e0;
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
      font-weight: 700;
      font-size: 18px;
      color: #1111ff;
    }
    .faq-question:hover { color: #000; }
    .faq-icon {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 28px;
      font-weight: 300;
      color: #7B2CBF;
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
      font-size: 16px;
      line-height: 1.6;
      color: #333;
    }
    .faq-list {
      margin: 15px 400px 10px 0;
      padding-left: 20px;
    }
    .faq-list li {
      margin-bottom: 10px;
      line-height: 1.6;
    }
    .faq-list li:last-child { margin-bottom: 0; }
    .faq-item.active .faq-answer {
      max-height: 500px;
      padding-top: 10px;
    }
    @media (max-width: 768px) {
      .faq-question { font-size: 16px; padding: 15px 40px 15px 0; }
      .faq-list { margin: 15px 250px 10px 0; }
      .faq-answer-content { font-size: 14px; }
    }
    @media (max-width: 468px) {
      .faq-list { margin: 15px 100px 10px 0; }
    }
  </style>`;

  return `
<!-- FAQ Accordion Container -->
<div class="faq-accordion-container">
${faqHTML}
</div>
${styleBlock}`;
}

module.exports = { generateEmbed };
