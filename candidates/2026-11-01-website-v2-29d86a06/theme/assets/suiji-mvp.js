(function () {
  const pushEvent = (eventName, payload) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...payload });
  };

  const currentAttribution = () => {
    const params = new URLSearchParams(window.location.search);
    let referrerSource = 'direct';
    if (document.referrer) {
      try {
        referrerSource = new URL(document.referrer).hostname || 'referral';
      } catch (_error) {
        referrerSource = 'referral';
      }
    }
    const source = params.get('utm_source') || referrerSource;
    const medium = params.get('utm_medium') || '';
    const campaign = params.get('utm_campaign') || '';
    const content = params.get('utm_content') || '';
    return { source, medium, campaign, content };
  };

  const safeTag = (value) =>
    String(value || '')
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/[^a-z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48);

  class SuijiWaitlist extends HTMLElement {
    connectedCallback() {
      this.form = this.closest('form');
      this.interest = this.querySelector('[data-suiji-interest]');
      this.tags = this.querySelector('[data-suiji-tags]');
      this.note = this.querySelector('[data-suiji-note]');
      this.submit = this.querySelector('[data-suiji-submit]');
      this.locale = this.dataset.locale || document.documentElement.lang || 'en';
      this.attribution = currentAttribution();

      this.observeView();
      this.form?.addEventListener('submit', () => this.handleSubmit());

      if (this.dataset.success === 'true') {
        const savedInterest = sessionStorage.getItem('suiji_waitlist_interest') || 'not-specified';
        const savedSource = sessionStorage.getItem('suiji_waitlist_source') || this.attribution.source;
        pushEvent('waitlist_success', {
          locale: this.locale,
          interest: savedInterest,
          source: savedSource,
        });
        sessionStorage.removeItem('suiji_waitlist_interest');
        sessionStorage.removeItem('suiji_waitlist_source');
      }
    }

    observeView() {
      if (!('IntersectionObserver' in window)) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          pushEvent('waitlist_view', {
            page_type: document.body.className.match(/template-([^\s]+)/)?.[1] || 'unknown',
            locale: this.locale,
            source: this.attribution.source,
          });
          observer.disconnect();
        },
        { threshold: 0.35 }
      );
      observer.observe(this);
    }

    handleSubmit() {
      const interest = this.interest?.value || 'not-specified';
      const sourceTag = safeTag(this.attribution.source) || 'direct';
      const localeTag = safeTag(this.locale) || 'en';
      const interestTag = safeTag(interest) || 'not-specified';

      if (this.tags) {
        this.tags.value = `SUIJI_WAITLIST,locale-${localeTag},interest-${interestTag},source-${sourceTag},consent-explicit`;
      }

      if (this.note) {
        this.note.value = JSON.stringify({
          locale: this.locale,
          interest,
          ...this.attribution,
        });
      }

      pushEvent('waitlist_submit', {
        locale: this.locale,
        interest,
        source: this.attribution.source,
        medium: this.attribution.medium,
        campaign: this.attribution.campaign,
        content: this.attribution.content,
      });

      sessionStorage.setItem('suiji_waitlist_interest', interest);
      sessionStorage.setItem('suiji_waitlist_source', this.attribution.source);

      if (this.submit) {
        this.submit.disabled = true;
        this.submit.setAttribute('aria-busy', 'true');
        this.submit.textContent = this.submit.dataset.loadingLabel || 'Submitting...';
      }
    }
  }

  if (!customElements.get('suiji-waitlist')) {
    customElements.define('suiji-waitlist', SuijiWaitlist);
  }

  document.addEventListener('click', (event) => {
    const languageLink = event.target.closest('localization-form a[data-value]');
    if (languageLink) {
      pushEvent('language_change', {
        from_locale: document.documentElement.lang || 'en',
        to_locale: languageLink.dataset.value || '',
        page_type: document.body.className.match(/template-([^\s]+)/)?.[1] || 'unknown',
      });
    }

    const articleCta = event.target.closest('[data-suiji-article-cta]');
    if (articleCta) {
      pushEvent('article_cta_click', {
        article_handle: articleCta.dataset.articleHandle || '',
        topic: articleCta.dataset.topic || '',
        locale: document.documentElement.lang || 'en',
      });
    }

    const related = event.target.closest('[data-suiji-related-article]');
    if (related) {
      pushEvent('related_article_click', {
        source_article: related.dataset.sourceArticle || '',
        target_article: related.dataset.targetArticle || '',
        locale: document.documentElement.lang || 'en',
      });
    }
  });
})();
