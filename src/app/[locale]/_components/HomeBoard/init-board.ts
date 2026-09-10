const APPS_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const APPS_MS = 420;

const isAppsOpen = () =>
  document.documentElement.hasAttribute("data-apps-open");

export function initBoard(scope: ParentNode): () => void {
  const nav = scope.querySelector(".nav");
  const navToggle = nav?.querySelector(".nav__toggle");
  const navMenu = nav?.querySelector(".nav__menu");
  const bottomControls = scope.querySelector(".bottom-controls");
  const mobileNavQuery = window.matchMedia("(max-width: 640px)");
  const appsNav = nav?.querySelector('[data-w="apps"]');
  const appsTag = scope.querySelector(".apps__tag");
  const appsClose = scope.querySelector(".apps__close");
  const appsSection = scope.querySelector("#apps");
  const appsInner = appsSection?.querySelector(".apps__inner");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const copyButtons = [
    ...scope.querySelectorAll<HTMLButtonElement>("[data-copy]"),
  ];

  const setNavOpen = (isOpen: boolean) => {
    if (!nav || !navToggle || !navMenu) return;
    nav.toggleAttribute("data-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  };

  const closeNavInstantly = () => {
    if (!nav?.hasAttribute("data-open")) return;
    nav.setAttribute("data-no-motion", "");
    setNavOpen(false);
    requestAnimationFrame(() => nav.removeAttribute("data-no-motion"));
  };

  const onToggleClick = () => {
    document.documentElement.removeAttribute("data-mobile-controls-hidden");
    setNavOpen(!nav?.hasAttribute("data-open"));
  };

  const onNavMenuClick = (event: Event) => {
    if ((event.target as Element | null)?.closest("button, a")) {
      setNavOpen(false);
    }
  };

  const onDocumentKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;
    if (nav?.hasAttribute("data-open")) {
      closeNavInstantly();
      if (navToggle instanceof HTMLElement) navToggle.focus();
      return;
    }
    if (isAppsOpen()) {
      setAppsOpen(false, { animate: false });
      if (appsNav instanceof HTMLElement) appsNav.focus();
    }
  };

  const onDocumentClick = (event: MouseEvent) => {
    if (nav?.hasAttribute("data-open") && !nav.contains(event.target as Node)) {
      setNavOpen(false);
    }
  };

  const setMobileControlsHidden = (isHidden: boolean) => {
    document.documentElement.toggleAttribute(
      "data-mobile-controls-hidden",
      isHidden && mobileNavQuery.matches && !isAppsOpen()
    );
  };

  const applyAppsState = (isOpen: boolean) => {
    document.documentElement.toggleAttribute("data-apps-open", isOpen);
    appsNav?.setAttribute("aria-expanded", String(isOpen));
    appsTag?.setAttribute("aria-expanded", String(isOpen));
    scope
      .querySelectorAll<HTMLElement>(".col:not(.col--apps)")
      .forEach((col) => {
        col.inert = isOpen;
      });
    if (appsClose instanceof HTMLElement) {
      appsClose.tabIndex = isOpen ? 0 : -1;
      appsClose.setAttribute("aria-hidden", String(!isOpen));
    }
  };

  const playAppsFlip = (first: DOMRect, last: DOMRect, isOpen: boolean) => {
    if (
      !(appsSection instanceof HTMLElement) ||
      !(appsInner instanceof HTMLElement)
    ) {
      return;
    }
    if (!last.width || !last.height) return;
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const sx = first.width / last.width;
    const sy = first.height / last.height;
    if (
      Math.abs(dx) < 1 &&
      Math.abs(dy) < 1 &&
      Math.abs(sx - 1) < 0.01 &&
      Math.abs(sy - 1) < 0.01
    ) {
      return;
    }

    appsSection.getAnimations().forEach((animation) => animation.cancel());

    const duration = `${APPS_MS}ms ${APPS_EASE}`;
    appsSection.style.transformOrigin = "top left";
    appsInner.style.transformOrigin = "top left";
    appsSection.style.transition = "none";
    appsInner.style.transition = "none";
    appsSection.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
    appsInner.style.transform = `scale(${1 / sx}, ${1 / sy})`;
    appsSection.style.willChange = "transform, filter";
    appsInner.style.willChange = "transform";
    appsSection.getBoundingClientRect();
    appsSection.style.transition = `transform ${duration}`;
    appsInner.style.transition = `transform ${duration}`;
    appsSection.style.transform = "none";
    appsInner.style.transform = "none";

    const travel =
      Math.hypot(dx, dy) +
      Math.abs(1 - sx) * last.width +
      Math.abs(1 - sy) * last.height;
    const blurPeak = isOpen
      ? Math.min(8, Math.max(4, travel / 260))
      : Math.min(4, Math.max(2, travel / 420));
    appsSection.animate(
      [
        { filter: "blur(0px)" },
        { filter: `blur(${blurPeak.toFixed(2)}px)`, offset: 0.18 },
        { filter: "blur(0px)" },
      ],
      { duration: APPS_MS, easing: APPS_EASE, fill: "none" }
    );

    const clear = (event?: TransitionEvent) => {
      if (event && event.target !== appsSection) return;
      if (event && event.propertyName && event.propertyName !== "transform") {
        return;
      }
      appsSection.style.transition = "";
      appsInner.style.transition = "";
      appsSection.style.transform = "";
      appsInner.style.transform = "";
      appsSection.style.filter = "";
      appsSection.style.willChange = "";
      appsInner.style.willChange = "";
    };
    appsSection.addEventListener("transitionend", clear, { once: true });
  };

  const setAppsOpen = (isOpen: boolean, { animate = true } = {}) => {
    if (isOpen === isAppsOpen()) return;
    if (isOpen) {
      setMobileControlsHidden(false);
      closeNavInstantly();
    }

    if (
      !animate ||
      reduceMotion.matches ||
      !(appsSection instanceof HTMLElement)
    ) {
      appsSection?.getAnimations().forEach((animation) => animation.cancel());
      if (appsSection instanceof HTMLElement) appsSection.style.filter = "";
      document.documentElement.setAttribute("data-apps-instant", "");
      applyAppsState(isOpen);
      requestAnimationFrame(() => {
        document.documentElement.removeAttribute("data-apps-instant");
      });
      return;
    }

    const first = appsSection.getBoundingClientRect();
    applyAppsState(isOpen);
    const last = appsSection.getBoundingClientRect();
    playAppsFlip(first, last, isOpen);
  };

  const toggleApps = () => setAppsOpen(!isAppsOpen());

  navToggle?.addEventListener("click", onToggleClick);
  navMenu?.addEventListener("click", onNavMenuClick);
  document.addEventListener("keydown", onDocumentKeyDown);
  document.addEventListener("click", onDocumentClick);
  appsNav?.addEventListener("click", toggleApps);
  appsTag?.addEventListener("click", toggleApps);
  appsClose?.addEventListener("click", () => {
    setAppsOpen(false);
    if (appsNav instanceof HTMLElement) appsNav.focus();
  });

  let lastScrollY = window.scrollY;
  let scrollFrame = 0;

  const updateMobileControls = () => {
    scrollFrame = 0;
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    const controlHasFocus =
      (nav?.contains(document.activeElement) ?? false) ||
      (bottomControls?.contains(document.activeElement) ?? false);

    if (!mobileNavQuery.matches || currentScrollY <= 16) {
      setMobileControlsHidden(false);
    } else if (nav?.hasAttribute("data-open") || controlHasFocus) {
      setMobileControlsHidden(false);
    } else if (scrollDelta > 4) {
      setMobileControlsHidden(true);
    } else if (scrollDelta < -4) {
      setMobileControlsHidden(false);
    }

    lastScrollY = currentScrollY;
  };

  const onScroll = () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateMobileControls);
  };

  const onFocusIn = (event: FocusEvent) => {
    if (
      nav?.contains(event.target as Node) ||
      bottomControls?.contains(event.target as Node)
    ) {
      setMobileControlsHidden(false);
    }
  };

  const onMobileChange = (event: MediaQueryListEvent) => {
    lastScrollY = window.scrollY;
    setMobileControlsHidden(false);
    if (!event.matches) closeNavInstantly();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("focusin", onFocusIn);
  mobileNavQuery.addEventListener("change", onMobileChange);

  const copiedTimers = new Map<HTMLButtonElement, number>();
  const onCopy = async (event: Event) => {
    const btn = event.currentTarget as HTMLButtonElement;
    const selector = btn.getAttribute("data-copy");
    if (!selector) return;
    const el = scope.querySelector(selector);
    if (!el) return;
    const text = (el.textContent || "").replace(/\s+$/, "");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(el);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.execCommand("copy");
      selection?.removeAllRanges();
    }
    btn.dataset.copied = "true";
    btn.setAttribute("aria-label", "Copied");
    const previous = copiedTimers.get(btn);
    if (previous) window.clearTimeout(previous);
    copiedTimers.set(
      btn,
      window.setTimeout(() => {
        delete btn.dataset.copied;
        btn.setAttribute("aria-label", "Copy code");
      }, 1600)
    );
  };

  copyButtons.forEach((btn) => btn.addEventListener("click", onCopy));

  return () => {
    navToggle?.removeEventListener("click", onToggleClick);
    navMenu?.removeEventListener("click", onNavMenuClick);
    document.removeEventListener("keydown", onDocumentKeyDown);
    document.removeEventListener("click", onDocumentClick);
    appsNav?.removeEventListener("click", toggleApps);
    appsTag?.removeEventListener("click", toggleApps);
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("focusin", onFocusIn);
    mobileNavQuery.removeEventListener("change", onMobileChange);
    copyButtons.forEach((btn) => btn.removeEventListener("click", onCopy));
    copiedTimers.forEach((timer) => window.clearTimeout(timer));
    document.documentElement.removeAttribute("data-apps-open");
    document.documentElement.removeAttribute("data-apps-instant");
    document.documentElement.removeAttribute("data-mobile-controls-hidden");
    scope
      .querySelectorAll<HTMLElement>(".col:not(.col--apps)")
      .forEach((col) => {
        col.inert = false;
      });
  };
}
