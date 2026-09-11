import { initCodeStory } from "./init-code-story";

const APPS_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const APPS_MS = 420;

const isAppsOpen = () =>
  document.documentElement.hasAttribute("data-apps-open");

const isBridgeOpen = () =>
  document.documentElement.hasAttribute("data-bridge-open") ||
  document.documentElement.hasAttribute("data-bridge-closing");

export function initBoard(scope: ParentNode): () => void {
  const nav = scope.querySelector(".nav");
  const navToggle = nav?.querySelector(".nav__toggle");
  const navMenu = nav?.querySelector(".nav__menu");
  const bottomControls = scope.querySelector(".bottom-controls");
  const mobileNavQuery = window.matchMedia("(max-width: 640px)");
  const appsNav = nav?.querySelector('[data-w="apps"]');
  const appsTag = scope.querySelector(".apps__tag");
  const appsClose = scope.querySelector(".apps__close");
  const appsViewAll = scope.querySelector(".apps__view-all");
  const appsSection = scope.querySelector("#apps");
  const appsInner = appsSection?.querySelector(".apps__inner");
  const bridgeLayer = scope.querySelector(".bridge-layer");
  const bridgeInner = bridgeLayer?.querySelector(".bridge-layer__inner");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const copyButtons = [
    ...scope.querySelectorAll<HTMLButtonElement>("[data-copy]"),
  ];
  let flipTimer = 0;

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
      return;
    }
    if (document.documentElement.hasAttribute("data-bridge-open")) {
      window.dispatchEvent(
        new CustomEvent("ink:close-bridge", { detail: { animate: false } })
      );
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

  const applyColumnInert = () => {
    const appsOpen = isAppsOpen();
    const bridgeOpen = isBridgeOpen();
    scope
      .querySelectorAll<HTMLElement>(".col--about, .col--hero, .col--started")
      .forEach((col) => {
        col.inert = appsOpen || bridgeOpen;
      });
    const appsCol = scope.querySelector<HTMLElement>(".col--apps");
    if (appsCol) appsCol.inert = bridgeOpen;
    if (bridgeLayer instanceof HTMLElement) {
      bridgeLayer.inert =
        !document.documentElement.hasAttribute("data-bridge-open");
    }
  };

  const applyAppsState = (isOpen: boolean) => {
    document.documentElement.toggleAttribute("data-apps-open", isOpen);
    appsNav?.setAttribute("aria-expanded", String(isOpen));
    appsTag?.setAttribute("aria-expanded", String(isOpen));
    applyColumnInert();
    if (appsClose instanceof HTMLElement) {
      appsClose.tabIndex = isOpen ? 0 : -1;
      appsClose.setAttribute("aria-hidden", String(!isOpen));
    }
  };

  const playFlip = (
    section: HTMLElement,
    inner: HTMLElement | null,
    first: DOMRect,
    last: DOMRect,
    isOpen: boolean
  ) => {
    if (!last.width || !last.height) {
      return;
    }
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

    section.getAnimations().forEach((animation) => animation.cancel());
    if (flipTimer) window.clearTimeout(flipTimer);

    const duration = `${APPS_MS}ms ${APPS_EASE}`;
    section.style.transformOrigin = "top left";
    section.style.transition = "none";
    section.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
    section.style.willChange = "transform, filter";
    if (inner) {
      inner.style.transformOrigin = "top left";
      inner.style.transition = "none";
      inner.style.transform = `scale(${1 / sx}, ${1 / sy})`;
      inner.style.willChange = "transform";
    }
    section.getBoundingClientRect();
    section.style.transition = `transform ${duration}`;
    section.style.transform = "none";
    if (inner) {
      inner.style.transition = `transform ${duration}`;
      inner.style.transform = "none";
    }

    const travel =
      Math.hypot(dx, dy) +
      Math.abs(1 - sx) * last.width +
      Math.abs(1 - sy) * last.height;
    const blurPeak = isOpen
      ? Math.min(8, Math.max(4, travel / 260))
      : Math.min(4, Math.max(2, travel / 420));
    section.animate(
      [
        { filter: "blur(0px)" },
        { filter: `blur(${blurPeak.toFixed(2)}px)`, offset: 0.18 },
        { filter: "blur(0px)" },
      ],
      { duration: APPS_MS, easing: APPS_EASE, fill: "none" }
    );

    let settled = false;
    const finish = (event?: TransitionEvent) => {
      if (event && event.target !== section) return;
      if (event && event.propertyName && event.propertyName !== "transform") {
        return;
      }
      if (settled) return;
      settled = true;
      if (flipTimer) window.clearTimeout(flipTimer);
      flipTimer = 0;
      section.style.transition = "";
      section.style.transform = "";
      section.style.filter = "";
      section.style.willChange = "";
      if (inner) {
        inner.style.transition = "";
        inner.style.transform = "";
        inner.style.willChange = "";
      }
    };
    section.addEventListener("transitionend", finish, { once: true });
    flipTimer = window.setTimeout(() => finish(), APPS_MS + 80);
  };

  const playAppsFlip = (first: DOMRect, last: DOMRect, isOpen: boolean) => {
    if (
      !(appsSection instanceof HTMLElement) ||
      !(appsInner instanceof HTMLElement)
    ) {
      return;
    }
    playFlip(appsSection, appsInner, first, last, isOpen);
  };

  const setAppsOpen = (isOpen: boolean, { animate = true } = {}) => {
    if (isOpen === isAppsOpen()) return;
    if (isOpen) {
      setMobileControlsHidden(false);
      closeNavInstantly();
      const list = appsInner?.querySelector(".app-list");
      if (list) list.scrollTop = 0;
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

  const applyBridgeState = (isOpen: boolean) => {
    document.documentElement.toggleAttribute("data-bridge-open", isOpen);
    if (isOpen) {
      document.documentElement.removeAttribute("data-bridge-closing");
    }
    applyColumnInert();
  };

  let bridgeCloseTimer = 0;
  let onBridgeTransition: ((event: TransitionEvent) => void) | null = null;

  const stopBridgeClose = () => {
    if (bridgeCloseTimer) {
      window.clearTimeout(bridgeCloseTimer);
      bridgeCloseTimer = 0;
    }
    if (onBridgeTransition && bridgeLayer instanceof HTMLElement) {
      bridgeLayer.removeEventListener("transitionend", onBridgeTransition);
    }
    onBridgeTransition = null;
  };

  const finishBridgeClose = () => {
    stopBridgeClose();
    document.documentElement.removeAttribute("data-bridge-closing");
    applyColumnInert();
  };

  const setBridgeOpen = (isOpen: boolean, { animate = true } = {}) => {
    const html = document.documentElement;
    const hasOpen = html.hasAttribute("data-bridge-open");
    const hasClosing = html.hasAttribute("data-bridge-closing");
    if (isOpen && hasOpen && !hasClosing) return;
    if (!isOpen && !hasOpen && !hasClosing) return;
    if (!isOpen && hasClosing) return;

    stopBridgeClose();

    if (isOpen) {
      closeNavInstantly();
      html.removeAttribute("data-bridge-closing");
      bridgeInner?.querySelectorAll(".app-list").forEach((list) => {
        list.scrollTop = 0;
      });
    }

    const canAnimate =
      animate && !reduceMotion.matches && bridgeLayer instanceof HTMLElement;

    if (!canAnimate) {
      html.removeAttribute("data-bridge-closing");
      html.setAttribute("data-bridge-instant", "");
      applyBridgeState(isOpen);
      requestAnimationFrame(() => {
        html.removeAttribute("data-bridge-instant");
      });
      return;
    }

    if (isOpen) {
      applyBridgeState(true);
      return;
    }

    html.removeAttribute("data-bridge-open");
    html.setAttribute("data-bridge-closing", "");
    applyColumnInert();

    const layer = bridgeLayer;
    onBridgeTransition = (event: TransitionEvent) => {
      if (event.target !== layer || event.propertyName !== "opacity") return;
      finishBridgeClose();
    };
    layer.addEventListener("transitionend", onBridgeTransition);
    bridgeCloseTimer = window.setTimeout(finishBridgeClose, 220);
  };

  const toggleApps = () => {
    if (isBridgeOpen()) {
      window.dispatchEvent(new Event("ink:open-apps-from-bridge"));
      return;
    }
    setAppsOpen(!isAppsOpen());
  };
  const openApps = () => {
    if (isBridgeOpen()) {
      window.dispatchEvent(new Event("ink:open-apps-from-bridge"));
      return;
    }
    setAppsOpen(true);
  };

  const onOpenApps = () => setAppsOpen(true);
  const onCloseAppsInstant = () => setAppsOpen(false, { animate: false });
  const onSetBridge = (event: Event) => {
    const detail = (event as CustomEvent<{ open?: boolean; animate?: boolean }>)
      .detail;
    setBridgeOpen(Boolean(detail?.open), {
      animate: detail?.animate !== false,
    });
  };

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
  appsViewAll?.addEventListener("click", openApps);
  window.addEventListener("ink:open-apps", onOpenApps);
  window.addEventListener("ink:close-apps-instant", onCloseAppsInstant);
  window.addEventListener("ink:set-bridge", onSetBridge);

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
    const explicit = btn.getAttribute("data-copy-text");
    const selector = btn.getAttribute("data-copy");
    const el = selector ? scope.querySelector(selector) : null;
    const text = (explicit ?? el?.textContent ?? "").replace(/\s+$/, "");
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        document.execCommand("copy");
        selection?.removeAllRanges();
      }
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
  const stopCodeStory = initCodeStory(scope);

  const boardIsBridge =
    (scope instanceof HTMLElement && scope.hasAttribute("data-bridge-open")) ||
    document.documentElement.hasAttribute("data-bridge-open");
  if (boardIsBridge) {
    setBridgeOpen(true, { animate: false });
  }

  return () => {
    navToggle?.removeEventListener("click", onToggleClick);
    navMenu?.removeEventListener("click", onNavMenuClick);
    document.removeEventListener("keydown", onDocumentKeyDown);
    document.removeEventListener("click", onDocumentClick);
    appsNav?.removeEventListener("click", toggleApps);
    appsTag?.removeEventListener("click", toggleApps);
    appsViewAll?.removeEventListener("click", openApps);
    window.removeEventListener("ink:open-apps", onOpenApps);
    window.removeEventListener("ink:close-apps-instant", onCloseAppsInstant);
    window.removeEventListener("ink:set-bridge", onSetBridge);
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("focusin", onFocusIn);
    mobileNavQuery.removeEventListener("change", onMobileChange);
    copyButtons.forEach((btn) => btn.removeEventListener("click", onCopy));
    copiedTimers.forEach((timer) => window.clearTimeout(timer));
    if (flipTimer) window.clearTimeout(flipTimer);
    stopBridgeClose();
    stopCodeStory();
    document.documentElement.removeAttribute("data-apps-open");
    document.documentElement.removeAttribute("data-apps-instant");
    document.documentElement.removeAttribute("data-mobile-controls-hidden");
    scope.querySelectorAll<HTMLElement>(".col").forEach((col) => {
      col.inert = false;
    });
    if (bridgeLayer instanceof HTMLElement) {
      bridgeLayer.inert = false;
    }
  };
}
