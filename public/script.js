// Rich Text Editor functionality
class FAQEditor {
  constructor() {
    this.editor = document.getElementById('faqEditor');
    this.toolbarButtons = document.querySelectorAll('.toolbar-btn');
    this.init();
  }

  init() {
    this.setupToolbar();
    this.setupTemplateButtons();
    this.setupDefaultContent();
  }

  setupToolbar() {
    this.toolbarButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const command = btn.dataset.command;
        const value = btn.dataset.value;

        if (command === 'formatBlock' && value) {
          document.execCommand(command, false, value);
        } else if (command === 'removeFormat') {
          document.execCommand('removeFormat', false, null);
          document.execCommand('unlink', false, null);
        } else {
          document.execCommand(command, false, null);
        }

        this.updateToolbarState();
        this.editor.focus();
      });
    });

    // Update toolbar state when selection changes
    document.addEventListener('selectionchange', () => {
      this.updateToolbarState();
    });
  }

  updateToolbarState() {
    this.toolbarButtons.forEach(btn => {
      const command = btn.dataset.command;
      const value = btn.dataset.value;

      if (command === 'formatBlock' && value) {
        const isActive = document.queryCommandValue('formatBlock') === value;
        btn.classList.toggle('active', isActive);
      } else if (command !== 'removeFormat' && command !== 'insertUnorderedList' && command !== 'insertOrderedList') {
        const isActive = document.queryCommandState(command);
        btn.classList.toggle('active', isActive);
      }
    });
  }

  setupTemplateButtons() {
    document.getElementById('addQuestion').addEventListener('click', () => {
      this.insertTemplate('Q: ', 'question');
    });

    document.getElementById('addAnswer').addEventListener('click', () => {
      this.insertTemplate('A: ', 'answer');
    });
  }

  insertTemplate(prefix, type) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const lineBreak = type === 'question' ? '\n\n' : '\n';
      
      // Insert at cursor position
      const templateNode = document.createTextNode(prefix);
      range.insertNode(templateNode);
      
      // Move cursor after the template
      range.setStartAfter(templateNode);
      range.setEndAfter(templateNode);
      selection.removeAllRanges();
      selection.addRange(range);
      
      this.editor.focus();
    } else {
      // If no selection, append to end
      this.insertAtEnd(prefix);
    }
  }

  insertAtEnd(text) {
    const p = document.createElement('p');
    p.textContent = text;
    this.editor.appendChild(p);
    
    // Move cursor to end
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(p);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    
    this.editor.focus();
  }

  setupDefaultContent() {
    // Add some default placeholder content
    if (this.editor.innerHTML.trim() === '') {
      this.editor.innerHTML = `
        <p>Q: What is your return policy?</p>
        <p>A: <ul><li>Returns accepted within 30 days</li><li>Must be in original packaging</li><li>Refund processed in 5–7 business days</li></ul></p>
        <p><br></p>
        <p>Q: Do you offer international shipping?</p>
        <p>A: Yes, we ship worldwide via trusted couriers.</p>
      `;
    }
  }

  getContent() {
    return this.editor.innerHTML;
  }

  getPlainText() {
    return this.editor.innerText || this.editor.textContent;
  }
}

// Initialize the editor when DOM is loaded
let faqEditor;

document.addEventListener('DOMContentLoaded', function() {
  faqEditor = new FAQEditor();

  // Update the generate button event listener
  document.getElementById('generateBtn').addEventListener('click', async () => {
    const faqs = faqEditor.getPlainText().trim();
    if (!faqs) return alert("Please add your FAQ content first.");

    const res = await fetch('/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ faqs })
    });

    const data = await res.json();
    const embedCode = data.embedCode || data.error;

    // Show the raw code in textarea
    document.getElementById('output').value = embedCode;

    // Render live preview
    const previewEl = document.getElementById('preview');
    previewEl.innerHTML = embedCode;

    // Add interactivity ONLY in live preview
    addFAQAccordionListeners(previewEl);
  });

  document.getElementById('copyBtn').addEventListener('click', () => {
    const output = document.getElementById('output');
    output.select();
    document.execCommand('copy');
    alert('✅ Embed code copied to clipboard!');
  });
});

// This function activates the accordion in preview
function addFAQAccordionListeners(previewContainer) {
  const buttons = previewContainer.querySelectorAll('.faq-question');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      btn.parentElement.classList.toggle('active');
    });
  });
}
