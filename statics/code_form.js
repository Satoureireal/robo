document.addEventListener('DOMContentLoaded', function () {
  // Chỉ chạy ở trang tiếng Việt
  const isVI =
    /^vi/i.test(document.documentElement.lang || '') ||
    !/^\/en(\/|$)/i.test(location.pathname);
  if (!isVI) return;

  // BỎ QUA form (hoặc một phần form) có chứa ID này
  const EXCLUDED_SELECTOR = '#wp_112321';

  // CSS ẩn message mặc định CHỈ áp cho wrapper được xử lý
  if (!document.getElementById('cf7-vi-style-scoped')) {
    const style = document.createElement('style');
    style.id = 'cf7-vi-style-scoped';
    style.textContent = `
      .wpcf7.cf7-vi-hide .wpcf7-response-output,
      .wpcf7.cf7-vi-hide .screen-reader-response p,
      .wpcf7.cf7-vi-hide .screen-reader-response ul { display: none !important; }
    `;
    document.head.appendChild(style);
  }

  function clearMessages(form){
    form.querySelector('.custom-error-message')?.remove();
    form.querySelector('.custom-success-message')?.remove();
  }

  function showMessage(form, text, type){
    clearMessages(form);
    const box = document.createElement('div');
    box.className = type === 'success' ? 'custom-success-message' : 'custom-error-message';
    box.textContent = text;
    box.style.cssText =
      `padding:15px;margin:10px 0;background:${type==='success'?'#e8f5e9':'#ffebee'};` +
      `color:${type==='success'?'#2e7d32':'#c62828'};border-radius:4px;border-left:4px solid ${type==='success'?'#2e7d32':'#c62828'};`;
    form.appendChild(box);
    if (type === 'success') setTimeout(() => box.remove(), 5000);
  }

  function setSubmittingState(form, on){
    const btn = form.querySelector('button.wpcf7-submit');
    if (!btn) return;
    const textEl = btn.querySelector('.text') || btn; // fallback
    if (!btn.dataset.originalText) {
      btn.dataset.originalText =
        btn.getAttribute('data-original-text') ||
        (textEl.textContent || '').trim();
    }
    if (on) { textEl.textContent = 'Đang gửi...'; btn.disabled = true; }
    else    { textEl.textContent = btn.dataset.originalText; btn.disabled = false; }
  }

  // Khởi tạo cho từng wrapper .wpcf7
  document.querySelectorAll('.wpcf7').forEach(wrapper => {
    const form = wrapper.querySelector('form.wpcf7-form');
    if (!form) return;

    // >>> BỎ QUA form có chứa #wp_112321 (descendant)
    if (form.querySelector(EXCLUDED_SELECTOR)) {
      return; // không gắn class, không add event → script khác vẫn chạy bình thường
    }

    // Chỉ áp dụng cho form được xử lý
    wrapper.classList.add('cf7-vi-hide');

    // Gắn listener TRỰC TIẾP trên form (không global)
    form.addEventListener('submit', function () {
      clearMessages(form);
      setSubmittingState(form, true);
    });

    form.addEventListener('wpcf7mailsent', function () {
      showMessage(form, 'Cảm ơn bạn! Yêu cầu của bạn đã được gửi.', 'success');
      setSubmittingState(form, false);
    });

    form.addEventListener('wpcf7invalid', function () {
      showMessage(form, 'Có một hoặc nhiều mục nhập có lỗi. Vui lòng kiểm tra lại.', 'error');
      setSubmittingState(form, false);
    });

    form.addEventListener('wpcf7mailfailed', function () {
      showMessage(form, 'Không gửi được yêu cầu của bạn. Vui lòng thử lại.', 'error');
      setSubmittingState(form, false);
    });
  });
});







document.addEventListener('DOMContentLoaded', function () {
  // Chỉ chạy ở trang English
  const isEN =
    /^en/i.test(document.documentElement.lang || '') ||
    /^\/en(\/|$)/i.test(location.pathname);
  if (!isEN) return;

  // Form/khối cần BỎ QUA (để script KHÁC vẫn chạy bình thường)
  const EXCLUDED_SELECTOR = '#wp_112321_en';

  // CSS ẩn message mặc định CHỈ áp cho wrapper được xử lý
  if (!document.getElementById('cf7-en-style')) {
    const style = document.createElement('style');
    style.id = 'cf7-en-style';
    style.textContent = `
      .wpcf7.cf7-en-hide .wpcf7-response-output,
      .wpcf7.cf7-en-hide .screen-reader-response p,
      .wpcf7.cf7-en-hide .screen-reader-response ul { display: none !important; }
    `;
    document.head.appendChild(style);
  }

  function clearMessages(form){
    form.querySelector('.custom-error-message')?.remove();
    form.querySelector('.custom-success-message')?.remove();
  }

  function showMessage(form, text, type){
    clearMessages(form);
    const m = document.createElement('div');
    m.className = type === 'success' ? 'custom-success-message' : 'custom-error-message';
    m.textContent = text;
    m.style.cssText =
      `padding:15px;margin:10px 0;background:${type==='success'?'#e8f5e9':'#ffebee'};` +
      `color:${type==='success'?'#2e7d32':'#c62828'};border-radius:4px;` +
      `border-left:4px solid ${type==='success'?'#2e7d32':'#c62828'};`;
    form.appendChild(m);
    if (type === 'success') setTimeout(() => m.remove(), 5000);
  }

  function setSubmittingState(form, on){
    const btn = form.querySelector('button.wpcf7-submit');
    if (!btn) return;
    const textEl = btn.querySelector('.text') || btn;
    if (!btn.dataset.originalText) {
      btn.dataset.originalText =
        btn.getAttribute('data-original-text') ||
        (textEl.textContent || '').trim();
    }
    if (on) { textEl.textContent = 'Sending...'; btn.disabled = true; }
    else { textEl.textContent = btn.dataset.originalText; btn.disabled = false; }
  }

  // Duyệt từng wrapper .wpcf7
  document.querySelectorAll('.wpcf7').forEach(wrapper => {
    const form = wrapper.querySelector('form.wpcf7-form');
    if (!form) return;

    // BỎ QUA TUYỆT ĐỐI form chứa #wp_112321_en
    if (form.querySelector(EXCLUDED_SELECTOR)) {
      // Không gắn class, không add event — script khác vẫn hoạt động bình thường
      return;
    }

    // Chỉ áp dụng cho form được xử lý
    wrapper.classList.add('cf7-en-hide');

    // Gắn listener TRỰC TIẾP trên form (không global)
    form.addEventListener('submit', function () {
      clearMessages(form);
      setSubmittingState(form, true);
    });

    form.addEventListener('wpcf7mailsent', function () {
      showMessage(form, 'Thank you! Your request has been sent.', 'success');
      setSubmittingState(form, false);
    });

    form.addEventListener('wpcf7invalid', function () {
      showMessage(form, 'One or more fields have an error. Please check and try again.', 'error');
      setSubmittingState(form, false);
    });

    form.addEventListener('wpcf7mailfailed', function () {
      showMessage(form, 'Your request could not be sent. Please try again.', 'error');
      setSubmittingState(form, false);
    });
  });
});
