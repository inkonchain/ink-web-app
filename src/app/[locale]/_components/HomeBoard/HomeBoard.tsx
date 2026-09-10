"use client";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { useRouterQuery } from "@/hooks/useRouterQuery";
import { EXTERNAL_LINKS, Link } from "@/routing";

import "./interactive-ink";

import {
  inkApps,
  inkFeaturedApps,
  mainUrl,
} from "../../apps/_components/InkApp";

import { HomeConnectPill } from "./HomeConnectPill";
import { departureMono, satoshi } from "./home-board-fonts";
import { initBoard } from "./init-board";
import { initGoo } from "./init-goo";
import { initNavGlass } from "./init-nav-glass";

import "./home-board.css";

function formatTag(tag: string) {
  return tag
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function HomeBoard() {
  const t = useTranslations("Home");
  const query = useRouterQuery();
  const { resolvedTheme, setTheme } = useTheme();
  const rootRef = useRef<HTMLDivElement>(null);

  const apps = useMemo(() => {
    const featuredIds = new Set(inkFeaturedApps.map((app) => app.id));
    return [
      ...inkFeaturedApps,
      ...inkApps.filter((app) => !featuredIds.has(app.id)),
    ];
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-home-board", "");
    return () => {
      html.removeAttribute("data-home-board");
      html.removeAttribute("data-theme");
      html.classList.remove("is-instant", "theme-fallback-transition");
    };
  }, []);

  useEffect(() => {
    if (resolvedTheme !== "dark" && resolvedTheme !== "light") return;
    document.documentElement.dataset.theme = resolvedTheme;
    window.dispatchEvent(
      new CustomEvent("inkthemechange", { detail: { theme: resolvedTheme } })
    );
  }, [resolvedTheme]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stopBoard = initBoard(root);
    const stopGlass = initNavGlass(root);
    const stopGoo = initGoo(root);
    return () => {
      stopGoo();
      stopGlass();
      stopBoard();
    };
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const apply = () => setTheme(nextTheme);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }

    if (document.startViewTransition) {
      document.startViewTransition(apply);
      return;
    }

    const html = document.documentElement;
    html.classList.add("theme-fallback-transition");
    apply();
    window.setTimeout(() => {
      html.classList.remove("theme-fallback-transition");
    }, 460);
  }, [resolvedTheme, setTheme]);

  const isDark = resolvedTheme === "dark";

  // next-themes rewrites <html> classes on theme change, so font vars stay here.
  return (
    <div
      className={`home-board ${satoshi.variable} ${departureMono.variable}`}
      ref={rootRef}
    >
      <div className="page">
        <div className="board">
          <section className="col col--about" data-name="about">
            <div className="col__top">
              <span className="pill pill--glass">{t("aboutLabel")}</span>
              <div className="col__copy">
                <p className="headline">{t("aboutHeadline")}</p>
                <div className="cta-row">
                  <Link
                    className="pill pill--purple"
                    href={{ pathname: "/bridge", query }}
                  >
                    {t("bridgeCta")}
                  </Link>
                  <Link
                    className="pill pill--gray"
                    href={EXTERNAL_LINKS.documentation}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("docsCta")}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col__bottom">
              <p className="headline headline--sm">{t("shipHeadline")}</p>
              <div className="code" data-code-story data-scene="build">
                <div className="code__bar">
                  <div
                    className="code__steps"
                    role="group"
                    aria-label={t("codeStoryLabel")}
                  >
                    <span className="code__thumb" data-code-thumb aria-hidden="true" />
                    <button
                      className="code__step"
                      type="button"
                      data-code-step="0"
                      data-current
                      aria-current="step"
                    >
                      {t("codeStepBuild")}
                    </button>
                    <button
                      className="code__step"
                      type="button"
                      data-code-step="1"
                      aria-current="false"
                    >
                      {t("codeStepTest")}
                    </button>
                    <button
                      className="code__step"
                      type="button"
                      data-code-step="2"
                      aria-current="false"
                    >
                      {t("codeStepDeploy")}
                    </button>
                    <button
                      className="code__step"
                      type="button"
                      data-code-step="3"
                      aria-current="false"
                    >
                      {t("codeStepLive")}
                    </button>
                  </div>
                </div>
                <pre>
                  <code id="deploy-snippet">
                    <span className="code__line">
                      <span className="cm">{"# foundry.toml"}</span>
                    </span>
                    <span className="code__line">&nbsp;</span>
                    <span className="code__line">
                      <span className="kw">{"[rpc_endpoints]"}</span>
                    </span>
                    <span className="code__line">
                      {"ink = "}
                      <span className="str">
                        {'"https://rpc-gel.inkonchain.com"'}
                      </span>
                      <span className="code__caret" aria-hidden="true" />
                    </span>
                  </code>
                </pre>
                <button
                  className="code__copy"
                  type="button"
                  aria-label={t("copyCode")}
                  data-copy="#deploy-snippet"
                  data-copy-text={`# foundry.toml
[rpc_endpoints]
ink = "https://rpc-gel.inkonchain.com"`}
                >
                  <span className="code__copy-icons" aria-hidden="true">
                    <svg
                      className="code__icon code__icon--copy"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M6.667 6.667V3.333H16.667V13.333H13.333M13.333 6.667V16.667H3.333V6.667H13.333Z"
                        stroke="currentColor"
                        strokeWidth="1.667"
                        strokeLinecap="round"
                      />
                    </svg>
                    <svg
                      className="code__icon code__icon--check"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M4.167 10.417 8.125 14.375 15.833 5.625"
                        stroke="currentColor"
                        strokeWidth="1.667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </section>

          <section className="col col--hero" data-name="hero">
            <interactive-ink
              className="hero-media"
              value="3"
              speed="1"
              interaction="0.7"
              edge="0"
              blur="0"
              phase="28"
            />
            <span className="pill pill--glass pill--refractive glass-bar">
              <canvas className="pill__glass" aria-hidden="true" />
              <span className="pill__label">{t("builtOnInk")}</span>
            </span>
          </section>

          <section className="col col--started" data-name="started">
            <div className="col__top">
              <span className="pill pill--glass">{t("startedLabel")}</span>
              <p className="headline headline--sm headline--narrow">
                {t("startedHeadline")}
              </p>
            </div>
            <article className="step">
              <span className="step__n">1</span>
              <div className="step__body">
                <p className="step__label">{t("stepBridge")}</p>
                <Link
                  className="pill pill--gray"
                  href={{ pathname: "/bridge", query }}
                >
                  {t("bridgeCta")}
                </Link>
              </div>
            </article>
            <article className="step">
              <span className="step__n">2</span>
              <div className="step__body">
                <p className="step__label">{t("stepTrade")}</p>
                <Link
                  className="pill pill--gray"
                  href={EXTERNAL_LINKS.nado}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("swapsCta")}
                </Link>
              </div>
            </article>
            <article className="step">
              <span className="step__n">3</span>
              <div className="step__body">
                <p className="step__label">{t("stepEarn")}</p>
                <Link
                  className="pill pill--gray"
                  href={EXTERNAL_LINKS.tydro}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("earnCta")}
                </Link>
              </div>
            </article>
          </section>

          <section className="col col--apps" id="apps" data-name="apps">
            <div className="apps__inner">
              <div className="col__top">
                <div className="apps__heading">
                  <button
                    className="pill pill--glass apps__tag"
                    type="button"
                    aria-expanded="false"
                    aria-controls="apps"
                  >
                    {t("appsLabel")}
                  </button>
                  <div className="apps__close-slot">
                    <div className="apps__close-clip">
                      <button
                        className="slider__btn apps__close"
                        type="button"
                        aria-label={t("closeApps")}
                        aria-hidden="true"
                        tabIndex={-1}
                      >
                        <span className="apps__close-icon" aria-hidden="true">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M5 5l10 10M15 5 5 15"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <p className="headline headline--sm headline--narrow">
                  {t("appsHeadline")}
                </p>
              </div>
              <div className="app-list">
                {apps.map((app) => {
                  const href = mainUrl(app, "Mainnet") || "/apps";
                  const tags = app.tags.slice(0, 2);
                  return (
                    <a
                      className="app"
                      href={href}
                      key={app.id}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="app__icon">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={app.imageUrl} alt="" />
                      </div>
                      <div className="app__meta">
                        <div className="app__copy">
                          <p className="app__name">{app.name}</p>
                          <div className="app__desc">
                            <div className="app__desc-clip">
                              <p className="app__desc-text">
                                {app.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="app__tags">
                          <div className="app__tags-clip">
                            <div className="tags">
                              {tags.map((tag) => (
                                <span className="tag" key={tag}>
                                  {formatTag(tag)}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
              <button className="pill pill--gray apps__view-all" type="button">
                {t("appsCta")}
              </button>
            </div>
          </section>
          <div className="apps-spacer" aria-hidden="true" />
        </div>

        <div className="bottom-controls">
          <div className="slider glass-bar">
            <canvas className="slider__glass" aria-hidden="true" />
            <div className="slider__items">
              <button
                className="slider__btn"
                type="button"
                data-dir="-1"
                aria-label={t("tuneLess")}
              >
                <span className="slider__icon">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/home-board/icon-minus.svg" alt="" />
                </span>
              </button>
              <div
                className="slider__track"
                role="slider"
                tabIndex={0}
                aria-label={t("tuneLabel")}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={11}
              >
                <span className="slider__line" />
                <span className="slider__thumb" />
              </div>
              <button
                className="slider__btn"
                type="button"
                data-dir="1"
                aria-label={t("tuneMore")}
              >
                <span className="slider__icon">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/home-board/icon-plus.svg" alt="" />
                </span>
              </button>
            </div>
          </div>

          <div className="theme-control glass-bar">
            <canvas className="theme-control__glass" aria-hidden="true" />
            <button
              className="slider__btn theme-toggle"
              type="button"
              aria-pressed={isDark}
              aria-label={isDark ? t("themeLight") : t("themeDark")}
              onClick={toggleTheme}
            >
              <span className="theme-toggle__icons" aria-hidden="true">
                <svg
                  className="theme-toggle__icon theme-toggle__icon--moon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.4 12.35A6.9 6.9 0 0 1 7.65 3.6 6.9 6.9 0 1 0 16.4 12.35Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  className="theme-toggle__icon theme-toggle__icon--sun"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="3.25"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M10 1.75V3.5M10 16.5V18.25M18.25 10H16.5M3.5 10H1.75M15.83 4.17 14.6 5.4M5.4 14.6 4.17 15.83M15.83 15.83 14.6 14.6M5.4 5.4 4.17 4.17"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        <nav className="nav glass-bar" aria-label={t("primaryNav")}>
          <canvas className="nav__glass" aria-hidden="true" />
          <div className="nav__items">
            <Link
              className="nav__logo"
              href={{ pathname: "/", query }}
              aria-label="Ink"
            >
              <span className="nav__logo-mark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/home-board/logo-ink.svg" alt="" />
              </span>
            </Link>
            <button
              className="nav__toggle"
              type="button"
              aria-expanded="false"
              aria-controls="mobile-nav-menu"
              aria-label={t("openMenu")}
            >
              <span className="nav__toggle-icon" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
            <div className="nav__menu" id="mobile-nav-menu">
              <div className="nav__menu-inner">
                <button
                  className="pill"
                  data-w="apps"
                  type="button"
                  aria-expanded="false"
                  aria-controls="apps"
                >
                  {t("appsLabel")}
                </button>
                <Link
                  className="pill"
                  data-w="bridge"
                  href={{ pathname: "/bridge", query }}
                >
                  {t("bridgeCta")}
                </Link>
                <Link
                  className="pill"
                  data-w="developers"
                  href={{ pathname: "/builders", query }}
                >
                  {t("developersCta")}
                </Link>
                <Link
                  className="pill"
                  data-w="docs"
                  href={EXTERNAL_LINKS.documentation}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("docsCta")}
                </Link>
                <HomeConnectPill label={t("connectCta")} />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
